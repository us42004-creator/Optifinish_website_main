// Vercel Node serverless function. Proxies GET /api/brave/search to Brave's
// Web Search API, injecting BRAVE_API_KEY server-side so it never reaches
// the browser bundle.
//
// In local dev this path is intercepted by the Vite proxy (see vite.config.ts).
// In production on Vercel, this file IS the route.

export const config = {
  maxDuration: 30
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.BRAVE_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error: 'BRAVE_API_KEY environment variable is not set',
      hint: 'Get a key at https://brave.com/search/api/ and set it via vercel env add BRAVE_API_KEY production'
    });
    return;
  }

  try {
    const q = (req.query?.q ?? '').toString().trim();
    if (!q) {
      res.status(400).json({ error: 'Missing required query parameter: q' });
      return;
    }

    const params = new URLSearchParams({ q });
    // Forward whitelisted Brave params. Defensive — only pass what we trust.
    const passthrough = ['count', 'freshness', 'country', 'search_lang', 'safesearch', 'offset'];
    for (const k of passthrough) {
      const v = req.query?.[k];
      if (typeof v === 'string' && v.length > 0) params.set(k, v);
    }
    // Sensible defaults if caller didn't specify
    if (!params.has('count')) params.set('count', '10');
    if (!params.has('country')) params.set('country', 'IN'); // India-bias for OptiFinish
    if (!params.has('search_lang')) params.set('search_lang', 'en');

    const upstream = await fetch(
      `https://api.search.brave.com/res/v1/web/search?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'X-Subscription-Token': apiKey,
          Accept: 'application/json',
          'Accept-Encoding': 'gzip'
        }
      }
    );

    const text = await upstream.text();
    res.status(upstream.status);
    res.setHeader('Content-Type', 'application/json');
    // 5-minute cache at the edge so we don't burn Brave's free-tier quota
    // on repeated identical queries during a single session
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.send(text);
  } catch (err: any) {
    console.error('[api/brave/search]', err);
    res.status(502).json({
      error: 'Upstream Brave proxy failed',
      message: String(err?.message ?? err)
    });
  }
}
