// Tavily Search client. Routes through /api/tavily/search — Vite dev-server
// proxy locally, Vercel serverless function in production. Both inject
// TAVILY_API_KEY server-side so it never reaches the browser bundle.
//
// USED FOR:
//   1. topicEngine — optional live-web freshness at topic gen time
//   2. draftEngine — optional grounding when the editor wants a draft to
//      reference genuinely recent events
//   3. scripts/build-site-index.mjs (indirect) — crawler uses a similar
//      pattern but hits Tavily's extract endpoint
//
// Tavily FREE tier: 1000 queries/month.

export interface TavilyResult {
  title: string;
  url: string;
  content: string; // snippet from the page
  score: number;   // relevance 0-1
  raw_content?: string;
  published_date?: string;
}

export interface TavilyResponse {
  query: string;
  answer?: string; // Tavily-synthesized answer if include_answer:true
  results: TavilyResult[];
  response_time?: number;
}

export interface TavilySearchOpts {
  searchDepth?: 'basic' | 'advanced'; // 'basic' costs 1 credit, 'advanced' costs 2
  maxResults?: number; // 1-20, default 5
  includeAnswer?: boolean; // synthesized answer, default false
  includeRawContent?: boolean; // full page content, default false
  includeDomains?: string[]; // whitelist
  excludeDomains?: string[]; // blacklist
  topic?: 'general' | 'news' | 'finance';
  days?: number; // for news topic — restrict to past N days
}

export async function searchTavily(
  query: string,
  opts: TavilySearchOpts = {}
): Promise<TavilyResponse> {
  if (!query.trim()) throw new Error('searchTavily: empty query');

  const body = {
    query,
    search_depth: opts.searchDepth ?? 'basic',
    max_results: Math.min(20, Math.max(1, opts.maxResults ?? 5)),
    include_answer: opts.includeAnswer ?? false,
    include_raw_content: opts.includeRawContent ?? false,
    include_domains: opts.includeDomains,
    exclude_domains: opts.excludeDomains,
    topic: opts.topic ?? 'general',
    ...(opts.days ? { days: opts.days } : {})
  };

  const res = await fetch('/api/tavily/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => '<no body>');
    throw new Error(`Tavily ${res.status}: ${errText.slice(0, 200)}`);
  }
  return (await res.json()) as TavilyResponse;
}

// Renders Tavily results as a compact context block for LLM prompt inclusion.
// Each entry: "title — hostname (published_date?) :: content (≤200 chars)".
export function tavilyToPromptContext(
  results: TavilyResult[],
  opts: { maxEntries?: number; maxContentChars?: number } = {}
): string {
  const max = opts.maxEntries ?? 6;
  const limit = opts.maxContentChars ?? 200;
  return results
    .slice(0, max)
    .map((r) => {
      const host = new URL(r.url).hostname.replace(/^www\./, '');
      const content = (r.content ?? '').replace(/\s+/g, ' ').slice(0, limit);
      const date = r.published_date ? ` (${r.published_date})` : '';
      return `• ${r.title.trim()} — ${host}${date} :: ${content}`;
    })
    .join('\n');
}
