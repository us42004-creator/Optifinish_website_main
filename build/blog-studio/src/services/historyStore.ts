// History store — tracks every draft picked in the studio, indexed by
// category × audience. Powers the editorial calendar / gap analyzer.
//
// v1: localStorage-backed. Per-browser, no team sync. When E ships
// (Plausible + a backend DB), this gets replaced by a real persistence
// layer; the public API stays identical.

import { CategoryId, AudienceId, StructuralShape } from '../types';

export interface HistoryEntry {
  id: string; // uuid
  title: string;
  category: CategoryId;
  audience: AudienceId;
  archetype: StructuralShape;
  modelUsed: string; // e.g. "Llama-3.3-70B"
  voiceUsed: string; // e.g. "analyst"
  wordCount: number;
  pickedAt: string; // ISO date
}

const STORAGE_KEY = 'optifinish-history-v1';

function readAll(): HistoryEntry[] {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeAll(entries: HistoryEntry[]): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (err) {
    console.warn('[historyStore] localStorage write failed:', err);
  }
}

// Idempotent UUID-ish generator (no crypto.randomUUID polyfill assumption)
function uid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export function record(entry: Omit<HistoryEntry, 'id' | 'pickedAt'>): HistoryEntry {
  const full: HistoryEntry = { ...entry, id: uid(), pickedAt: new Date().toISOString() };
  const existing = readAll();
  // Keep last 200 entries — plenty for gap analysis, won't bloat localStorage
  writeAll([full, ...existing].slice(0, 200));
  return full;
}

export function all(): HistoryEntry[] {
  return readAll();
}

export function recent(limit = 30): HistoryEntry[] {
  return readAll().slice(0, limit);
}

export function recentTitles(limit = 30): string[] {
  return recent(limit).map((e) => e.title);
}

export function clear(): void {
  writeAll([]);
}

// ─────────────────────────────────────────────────────────────
// Gap analyzer — surfaces voids and overweighted clusters
// ─────────────────────────────────────────────────────────────
export interface CellStats {
  category: CategoryId;
  audience: AudienceId;
  count: number;
  lastPickedAt: string | null;
  daysSinceLastPick: number | null; // null = never
}

export function buildMatrix(
  categories: CategoryId[],
  audiences: AudienceId[]
): CellStats[][] {
  const entries = readAll();
  const now = Date.now();
  return categories.map((category) =>
    audiences.map((audience) => {
      const matching = entries.filter((e) => e.category === category && e.audience === audience);
      const lastPickedAt = matching[0]?.pickedAt ?? null;
      const daysSinceLastPick = lastPickedAt
        ? Math.floor((now - new Date(lastPickedAt).getTime()) / 86400_000)
        : null;
      return { category, audience, count: matching.length, lastPickedAt, daysSinceLastPick };
    })
  );
}

export interface Gap {
  category: CategoryId;
  audience: AudienceId;
  reason: 'never' | 'stale' | 'overweight';
  detail: string;
}

// Returns cells that need attention. "never" = matrix void, "stale" = >60
// days, "overweight" = ≥4 in last 30 days (cannibalising portfolio).
export function findGaps(
  categories: CategoryId[],
  audiences: AudienceId[]
): Gap[] {
  const entries = readAll();
  const now = Date.now();
  const gaps: Gap[] = [];

  for (const category of categories) {
    for (const audience of audiences) {
      const matching = entries.filter((e) => e.category === category && e.audience === audience);
      if (matching.length === 0) {
        gaps.push({ category, audience, reason: 'never', detail: 'no posts in this cell yet' });
        continue;
      }
      const lastPicked = new Date(matching[0].pickedAt).getTime();
      const days = Math.floor((now - lastPicked) / 86400_000);
      if (days > 60) {
        gaps.push({
          category,
          audience,
          reason: 'stale',
          detail: `last pick ${days} days ago`
        });
      }
      const recent30 = matching.filter(
        (e) => now - new Date(e.pickedAt).getTime() < 30 * 86400_000
      );
      if (recent30.length >= 4) {
        gaps.push({
          category,
          audience,
          reason: 'overweight',
          detail: `${recent30.length} posts in last 30 days — portfolio risk`
        });
      }
    }
  }
  return gaps;
}
