// Topic-engine learning loop hook. Tracks weights for combinations of
// (category, audience, structuralShape, voice) so the topic engine can
// bias toward patterns that converted historically.
//
// v1: weights start uniform (1.0). recordOutcome() adjusts them as
// click-stream data arrives from E (Plausible/etc). topicEngine
// consults the weights when picking which structural shape to lean
// toward for a given pairing.
//
// Behaviour today: NO BIAS YET (uniform weights = no change vs random).
// The hook is wired so that the moment E starts producing data, this
// becomes the learning loop.

import { CategoryId, AudienceId, StructuralShape } from '../types';

export type Outcome = {
  // Lightweight signal: did this post convert?
  // - 'lead'     → form submission / demo request / facility-visit booking
  // - 'engaged'  → scroll depth >70% AND dwell >60s
  // - 'bounced'  → scroll depth <20% OR dwell <10s
  // - 'visited'  → opened, no other signal yet
  signal: 'lead' | 'engaged' | 'bounced' | 'visited';
  weight?: number; // override for downstream weighting (default per signal below)
};

const SIGNAL_WEIGHT: Record<Outcome['signal'], number> = {
  lead: 5.0,
  engaged: 1.5,
  visited: 0.1,
  bounced: -0.5
};

export interface WeightKey {
  category: CategoryId;
  audience: AudienceId;
  archetype: StructuralShape;
  voice: string;
}

export interface WeightEntry extends WeightKey {
  weight: number;
  observations: number; // count of outcomes recorded
  lastUpdated: string;
}

const STORAGE_KEY = 'optifinish-topic-weights-v1';

function readAll(): WeightEntry[] {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeAll(entries: WeightEntry[]): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function keyMatch(a: WeightKey, b: WeightKey): boolean {
  return (
    a.category === b.category &&
    a.audience === b.audience &&
    a.archetype === b.archetype &&
    a.voice === b.voice
  );
}

export function recordOutcome(key: WeightKey, outcome: Outcome): void {
  const all = readAll();
  const adjustment = outcome.weight ?? SIGNAL_WEIGHT[outcome.signal];
  const existing = all.find((e) => keyMatch(e, key));
  if (existing) {
    // Online weighted-average update — recent outcomes pull the weight
    existing.weight = (existing.weight * existing.observations + adjustment) / (existing.observations + 1);
    existing.observations += 1;
    existing.lastUpdated = new Date().toISOString();
  } else {
    all.push({
      ...key,
      weight: 1.0 + adjustment, // start near 1.0, nudge by first outcome
      observations: 1,
      lastUpdated: new Date().toISOString()
    });
  }
  writeAll(all);
}

// Returns the historical weight for a given (category, audience) ranked
// by archetype. Topic engine uses this to bias which archetypes to
// suggest. Until E ships, returns null and the caller falls back to
// uniform random.
export function getArchetypeBias(
  category: CategoryId,
  audience: AudienceId
): Map<StructuralShape, number> | null {
  const all = readAll();
  const matching = all.filter((e) => e.category === category && e.audience === audience);
  if (matching.length < 5) return null; // not enough data yet
  const map = new Map<StructuralShape, number>();
  for (const e of matching) {
    map.set(e.archetype, Math.max(map.get(e.archetype) ?? 0, e.weight));
  }
  return map;
}

// For the legendary calendar UI later — exposes raw stats.
export function getAllWeights(): WeightEntry[] {
  return readAll();
}
