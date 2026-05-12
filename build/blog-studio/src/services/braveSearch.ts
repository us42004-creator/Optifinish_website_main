// Brave Search client. Routes through /api/brave/search — Vite dev-server
// proxy locally, Vercel serverless function in production. Both inject
// BRAVE_API_KEY server-side so it never reaches the browser bundle.
//
// USE CASES INSIDE THE STUDIO
//   1. Trigger pool auto-refresh: scripts/refresh-triggers.mjs runs broad
//      queries weekly to find new regulatory + OEM events to anchor topics to.
//   2. Fresh-context topic generation: topicEngine optionally pre-fetches
//      Brave results and injects them as ground-truth in the LLM prompt, so
//      topics are anchored to actually-current events rather than the model's
//      training cutoff.
//
// BRAVE FREE TIER LIMITS: 2,000 queries/month, 1 QPS. Defaults below assume
// the free tier.

export interface BraveResult {
  title: string;
  url: string;
  description: string;
  age?: string; // e.g. "2 days ago", "3 weeks ago"
  hostname?: string;
  language?: string;
}

export interface BraveSearchOpts {
  count?: number; // 1-20, default 10
  freshness?: 'pd' | 'pw' | 'pm' | 'py'; // past day / week / month / year
  country?: string; // ISO code, default IN
  searchLang?: string; // default 'en'
  offset?: number; // pagination
  safesearch?: 'off' | 'moderate' | 'strict';
}

// Raw shape returned by Brave's API. We only consume web.results.
interface RawBraveResponse {
  web?: {
    results?: Array<{
      title: string;
      url: string;
      description: string;
      age?: string;
      language?: string;
      meta_url?: { hostname?: string };
    }>;
  };
}

export async function searchBrave(
  query: string,
  opts: BraveSearchOpts = {}
): Promise<BraveResult[]> {
  if (!query.trim()) throw new Error('searchBrave: empty query');

  const params = new URLSearchParams({ q: query });
  if (opts.count) params.set('count', String(Math.min(20, Math.max(1, opts.count))));
  if (opts.freshness) params.set('freshness', opts.freshness);
  if (opts.country) params.set('country', opts.country);
  if (opts.searchLang) params.set('search_lang', opts.searchLang);
  if (opts.offset) params.set('offset', String(opts.offset));
  if (opts.safesearch) params.set('safesearch', opts.safesearch);

  const res = await fetch(`/api/brave/search?${params.toString()}`);
  if (!res.ok) {
    const errText = await res.text().catch(() => '<no body>');
    throw new Error(`Brave Search ${res.status}: ${errText.slice(0, 200)}`);
  }
  const json = (await res.json()) as RawBraveResponse;
  return (json.web?.results ?? []).map((r) => ({
    title: r.title,
    url: r.url,
    description: r.description,
    age: r.age,
    hostname: r.meta_url?.hostname,
    language: r.language
  }));
}

// Runs N queries and dedupes results by URL. Used by refresh-triggers.mjs
// and the fresh-context topic generator to gather a broad slice of recent
// industry signal in one call.
export async function searchBraveMany(
  queries: Array<{ q: string; opts?: BraveSearchOpts }>
): Promise<Map<string, BraveResult[]>> {
  const out = new Map<string, BraveResult[]>();
  // Sequential, not parallel — Brave free tier rate limit is 1 QPS
  for (const { q, opts } of queries) {
    try {
      const results = await searchBrave(q, opts);
      out.set(q, results);
      // Tiny pause to stay under 1 QPS even on fast networks
      await new Promise((r) => setTimeout(r, 1100));
    } catch (err) {
      console.warn(`[searchBraveMany] "${q.slice(0, 40)}" failed:`, err);
      out.set(q, []);
    }
  }
  return out;
}

// Renders a Brave result set as a compact context block suitable for
// inclusion in an LLM system prompt. Each entry: "title — hostname (age)
// :: description (≤180 chars)". Cap total length so the prompt doesn't
// blow up.
export function resultsToPromptContext(
  results: BraveResult[],
  opts: { maxEntries?: number; maxDescChars?: number } = {}
): string {
  const max = opts.maxEntries ?? 8;
  const descLimit = opts.maxDescChars ?? 180;
  return results
    .slice(0, max)
    .map((r) => {
      const desc = (r.description ?? '').replace(/\s+/g, ' ').slice(0, descLimit);
      const host = r.hostname ? ` — ${r.hostname}` : '';
      const age = r.age ? ` (${r.age})` : '';
      return `• ${r.title.trim()}${host}${age} :: ${desc}`;
    })
    .join('\n');
}
