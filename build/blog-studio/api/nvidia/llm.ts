// Vercel Node serverless function. Multi-key dispatcher: routes the request
// to the right NVIDIA Build API key based on the model prefix, so DeepSeek /
// Gemma / Nemotron / Llama traffic each uses its own key (per-model rate-limit
// headroom, easier rotation). Falls back to NVIDIA_API_KEY if a model-specific
// key is unset.

export const config = {
  maxDuration: 60
};

function pickKey(model: string, env: NodeJS.ProcessEnv): string {
  const m = (model || '').toLowerCase();
  const fallback = env.NVIDIA_API_KEY || '';
  if (m.includes('deepseek')) return env.NVIDIA_DEEPSEEK_KEY || fallback;
  if (m.includes('gemma') || m.startsWith('google/')) return env.NVIDIA_GEMMA_KEY || fallback;
  if (m.includes('nemotron')) return env.NVIDIA_NEMOTRON_KEY || fallback;
  return fallback;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const model = (req.body?.model as string) ?? '';
  const apiKey = pickKey(model, process.env);

  if (!apiKey) {
    res.status(500).json({
      error: 'No matching NVIDIA API key for model',
      hint: 'Set NVIDIA_API_KEY or one of NVIDIA_DEEPSEEK_KEY / NVIDIA_GEMMA_KEY / NVIDIA_NEMOTRON_KEY',
      model
    });
    return;
  }

  try {
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
