// Photo library + semantic search. Scaffold version — uses BM25-ish keyword
// scoring against alt text + tags. Trust moat upgrade when real Greater Noida
// photography is uploaded; the scoring function is replaceable with CLIP
// embeddings later without touching callers.
//
// IMAGE GENERATION FLOW:
//   1. caller passes the prompt (the section's "subject" sentence)
//   2. searchBest() scores every photo in the library against the prompt
//   3. if best score ≥ THRESHOLD → return real photo URL
//   4. else → caller falls back to FLUX
//
// As the real-photo library grows, the threshold-clearing rate climbs and
// AI-generated images become the rare fallback rather than the default.

import { CategoryId } from '../types';

export interface PhotoEntry {
  id: string;
  url: string;
  alt: string;
  tags: string[];
  categories: CategoryId[] | string[]; // string[] tolerates legacy/forward IDs
  aspectRatio?: string;
  isPlaceholder?: boolean;
}

interface PhotoIndex {
  version: number;
  lastUpdated: string;
  photos: PhotoEntry[];
}

// Score above which we trust the photo enough to use it instead of FLUX.
// Tuned loose for the seeded library; bump as the library grows.
const TRUST_THRESHOLD = 1.2;

// Stop-words filtered out before scoring.
const STOP_WORDS = new Set([
  'the','a','an','of','in','on','at','to','for','with','and','or','but',
  'is','are','was','were','be','been','being','have','has','had','do','does','did',
  'this','that','these','those','it','its','as','by','from'
]);

let cachedIndex: PhotoIndex | null = null;
let cacheLoadFailed = false;

async function loadIndex(): Promise<PhotoIndex | null> {
  if (cachedIndex) return cachedIndex;
  if (cacheLoadFailed) return null;
  try {
    const res = await fetch('/photos/index.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error(`index fetch ${res.status}`);
    cachedIndex = (await res.json()) as PhotoIndex;
    return cachedIndex;
  } catch (err) {
    console.warn('[photoLibrary] index unavailable, semantic search disabled:', err);
    cacheLoadFailed = true;
    return null;
  }
}

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

// Lightweight BM25-ish scoring. Each photo's "document" is its alt text plus
// its tag list. Each query token contributes a score equal to TF × IDF.
function scoreEntry(query: string, entry: PhotoEntry, allTags: Set<string>): number {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return 0;

  const document = (entry.alt + ' ' + entry.tags.join(' ')).toLowerCase();
  const docTokens = tokenize(document);
  if (docTokens.length === 0) return 0;

  const tagSet = new Set(entry.tags.map((t) => t.toLowerCase()));

  let score = 0;
  for (const token of queryTokens) {
    // Exact tag match is the strongest signal — operators say "thermocouple",
    // we want to find a photo tagged "thermocouple".
    if (tagSet.has(token)) score += 2.0;
    // Substring match in any tag — handles "thermo" ~ "thermocouple"
    else if (entry.tags.some((t) => t.toLowerCase().includes(token))) score += 1.0;
    // Word match in alt text
    else if (docTokens.includes(token)) score += 0.6;
    // Substring in alt text — last-resort fuzzy match
    else if (document.includes(token)) score += 0.3;
  }
  // Normalise lightly by query length so longer prompts don't dominate
  return score / Math.sqrt(queryTokens.length);
}

export interface SearchHit {
  entry: PhotoEntry;
  score: number;
  trusted: boolean; // ≥ TRUST_THRESHOLD, safe to use over AI generation
}

export async function searchPhotos(query: string, limit = 3): Promise<SearchHit[]> {
  const index = await loadIndex();
  if (!index) return [];
  const allTags = new Set(index.photos.flatMap((p) => p.tags.map((t) => t.toLowerCase())));
  const hits = index.photos
    .map((entry) => ({
      entry,
      score: scoreEntry(query, entry, allTags),
      trusted: false
    }))
    .filter((h) => h.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  for (const h of hits) h.trusted = h.score >= TRUST_THRESHOLD;
  return hits;
}

// Returns the single best photo URL if its score clears the trust threshold,
// otherwise null (caller falls back to AI generation). Excludes placeholders
// — those are seed records that don't yet have real photo data.
export async function searchBest(query: string): Promise<{ url: string; alt: string } | null> {
  const hits = await searchPhotos(query, 5);
  const trustedReal = hits.find((h) => h.trusted && !h.entry.isPlaceholder);
  if (!trustedReal) return null;
  return { url: trustedReal.entry.url, alt: trustedReal.entry.alt };
}

export async function getLibraryStats(): Promise<{
  total: number;
  realPhotos: number;
  placeholders: number;
  byCategory: Record<string, number>;
}> {
  const index = await loadIndex();
  if (!index) return { total: 0, realPhotos: 0, placeholders: 0, byCategory: {} };
  const placeholders = index.photos.filter((p) => p.isPlaceholder).length;
  const byCategory: Record<string, number> = {};
  for (const p of index.photos) {
    for (const c of p.categories) {
      byCategory[c] = (byCategory[c] || 0) + 1;
    }
  }
  return {
    total: index.photos.length,
    realPhotos: index.photos.length - placeholders,
    placeholders,
    byCategory
  };
}
