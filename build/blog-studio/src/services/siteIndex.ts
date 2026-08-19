// OptiFinish live-site page index — semantic search over crawled pages
// so SEO internal-link suggestions can be VERIFIED (real URLs pointing at
// pages that actually exist) instead of LLM-invented category slugs that
// may not resolve.
//
// The index is built offline by scripts/build-site-index.mjs (crawls
// optifinish.in sitemap once, extracts title/description/first-heading
// per page). This service reads that JSON and offers keyword-scored
// search — same BM25-ish approach as photoLibrary.ts.

export interface SitePageEntry {
  url: string;           // canonical URL (https://optifinish.in/...)
  pathname: string;      // /products/automation/z-tap
  section: string;       // top-level section — "products", "blog", "facility", etc
  title: string;
  description: string;
  firstHeading: string;
  bodySnippet: string;   // first 300 chars of visible body text
}

interface SiteIndex {
  generated: string;
  source: string;
  pageCount: number;
  pages: SitePageEntry[];
}

const STOP_WORDS = new Set([
  'the','a','an','of','in','on','at','to','for','with','and','or','but',
  'is','are','was','were','be','been','being','have','has','had','do','does','did',
  'this','that','these','those','it','its','as','by','from','can','could','will'
]);

let cachedIndex: SiteIndex | null = null;
let cacheLoadFailed = false;

async function loadIndex(): Promise<SiteIndex | null> {
  if (cachedIndex) return cachedIndex;
  if (cacheLoadFailed) return null;
  try {
    const res = await fetch('/site-index.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error(`site-index fetch ${res.status}`);
    cachedIndex = (await res.json()) as SiteIndex;
    return cachedIndex;
  } catch (err) {
    console.warn('[siteIndex] site-index.json unavailable, verified internal links disabled:', err);
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

// Scoring: title match is strongest, then heading, then description, then body.
// Section-level match ("products/automation") gets a small bonus so the
// engine biases toward navigation-relevant pages, not stray blog posts.
function scoreEntry(query: string, entry: SitePageEntry): number {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return 0;

  const title = entry.title.toLowerCase();
  const heading = entry.firstHeading.toLowerCase();
  const description = entry.description.toLowerCase();
  const body = entry.bodySnippet.toLowerCase();
  const pathname = entry.pathname.toLowerCase();

  let score = 0;
  for (const token of queryTokens) {
    if (title.includes(token)) score += 2.5;
    if (heading.includes(token)) score += 1.5;
    if (description.includes(token)) score += 1.0;
    if (body.includes(token)) score += 0.4;
    if (pathname.includes(token)) score += 0.8; // URL slug match
  }
  return score / Math.sqrt(queryTokens.length);
}

export interface SiteSearchHit {
  entry: SitePageEntry;
  score: number;
}

// Search the live-site index. Returns top N pages by relevance to the query,
// each with the full page metadata (URL, title, description, section).
export async function searchSitePages(
  query: string,
  opts: { limit?: number; excludeUrls?: string[] } = {}
): Promise<SiteSearchHit[]> {
  const index = await loadIndex();
  if (!index) return [];
  const excludeSet = new Set(opts.excludeUrls ?? []);
  const limit = opts.limit ?? 5;
  return index.pages
    .filter((p) => !excludeSet.has(p.url))
    .map((entry) => ({ entry, score: scoreEntry(query, entry) }))
    .filter((h) => h.score > 0.4) // noise floor — random tag-hits don't clear this
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// Build advisory internal-link suggestions from the top hits. Returns an
// array shaped like SEO engine's `internalLinkSuggestions`, but every URL
// is verified against the live site — no fabrication.
export interface VerifiedInternalLink {
  anchor: string;        // suggested anchor text
  url: string;           // full https://optifinish.in/... URL
  pathname: string;      // /products/automation/z-tap
  section: string;
  rationale: string;
  score: number;
}

export async function suggestInternalLinks(
  query: string,
  opts: { limit?: number; excludeSection?: string } = {}
): Promise<VerifiedInternalLink[]> {
  const hits = await searchSitePages(query, { limit: (opts.limit ?? 5) * 2 });
  const filtered = opts.excludeSection
    ? hits.filter((h) => h.entry.section !== opts.excludeSection)
    : hits;
  return filtered.slice(0, opts.limit ?? 5).map((h) => ({
    anchor: (h.entry.firstHeading || h.entry.title || h.entry.pathname).slice(0, 80),
    url: h.entry.url,
    pathname: h.entry.pathname,
    section: h.entry.section,
    rationale: h.entry.description || `Live ${h.entry.section} page matching this topic`,
    score: h.score
  }));
}

export async function getSiteIndexStats(): Promise<{
  loaded: boolean;
  pageCount: number;
  generated?: string;
  sections: Record<string, number>;
}> {
  const index = await loadIndex();
  if (!index) return { loaded: false, pageCount: 0, sections: {} };
  const sections: Record<string, number> = {};
  for (const p of index.pages) sections[p.section] = (sections[p.section] || 0) + 1;
  return {
    loaded: true,
    pageCount: index.pageCount,
    generated: index.generated,
    sections
  };
}
