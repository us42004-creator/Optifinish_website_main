// Vercel Node serverless function. Proxies POST /api/nvidia/flux to NVIDIA Build's
// FLUX.1-dev image-generation endpoint.

export const config = {
  maxDuration: 60
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
    const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);

    const upstream = await fetch(
      'https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.1-dev',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body
      }
    );

    const text = await upstream.text();
    res.status(upstream.status);
    res.setHeader('Content-Type', 'application/json');
    res.send(text);
  } catch (err: any) {
    console.error('[api/nvidia/flux]', err);
    res.status(502).json({
      error: 'Upstream NVIDIA proxy failed',
      message: String(err?.message ?? err)
    });
  }
}
