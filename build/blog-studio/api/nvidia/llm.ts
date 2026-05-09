// Vercel Node serverless function. Proxies POST /api/nvidia/llm to NVIDIA Build's
// chat completions endpoint, injecting NVIDIA_API_KEY server-side so it never
// reaches the browser bundle.
//
// In local dev this path is intercepted by the Vite proxy (see vite.config.ts).
// In production on Vercel, this file IS the route.

export const config = {
  maxDuration: 60 // Hobby plan max. Bump to 300 on Pro for 405B long-form output.
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'NVIDIA_API_KEY environment variable is not set' });
    return;
  }

  try {
    // Vercel parses JSON bodies automatically; re-stringify for forwarding
    const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);

    const upstream = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body
    });

    const text = await upstream.text();
    res.status(upstream.status);
    res.setHeader('Content-Type', 'application/json');
    res.send(text);
  } catch (err: any) {
    console.error('[api/nvidia/llm]', err);
    res.status(502).json({
      error: 'Upstream NVIDIA proxy failed',
      message: String(err?.message ?? err)
    });
  }
}
