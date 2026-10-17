// Vercel Node serverless function. Proxies POST /api/tavily/search to
// Tavily's Web Search API, injecting TAVILY_API_KEY server-side so it
// never reaches the browser bundle.
//
// Tavily REST reference: https://docs.tavily.com/documentation/api-reference/endpoint/search
// Auth: Bearer token in Authorization header (post-2025 API).
//
// In local dev this path is intercepted by the Vite proxy (see vite.config.ts).
// In production on Vercel, this file IS the route.

export const config = {
  maxDuration: 30
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error: 'TAVILY_API_KEY environment variable is not set',
      hint: 'Get a key at https://tavily.com and set via vercel env add TAVILY_API_KEY production'
    });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);

    const upstream = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body
    });

    const text = await upstream.text();
    res.status(upstream.status);
    res.setHeader('Content-Type', 'application/json');
    // 10-minute edge cache to save Tavily quota on repeated queries during
    // one generation session (the topic engine may call for same query twice)
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=1800');
    res.send(text);
  } catch (err: any) {
    console.error('[api/tavily/search]', err);
    res.status(502).json({
      error: 'Upstream Tavily proxy failed',
      message: String(err?.message ?? err)
    });
  }
}
