// NVIDIA Build LLM client (OpenAI-compatible chat completions).
// Routes through the Vite dev-server proxy at /nvidia/llm so the API key
// stays server-side. See vite.config.ts.

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export interface ChatOptions {
  model?: string;
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  responseFormat?: 'text' | 'json_object';
  seed?: number;
}

const DEFAULT_MODEL = 'meta/llama-3.3-70b-instruct';

export async function chatCompletion(opts: ChatOptions): Promise<string> {
  const body: Record<string, unknown> = {
    model: opts.model ?? DEFAULT_MODEL,
    messages: opts.messages,
    temperature: opts.temperature ?? 0.7,
    max_tokens: opts.maxTokens ?? 2048,
    top_p: opts.topP ?? 0.95
  };
  if (opts.responseFormat === 'json_object') {
    body.response_format = { type: 'json_object' };
  }
  if (typeof opts.seed === 'number') {
    body.seed = opts.seed;
  }

  // /api/nvidia/llm is a Vercel serverless function in production and a Vite
  // dev-server proxy locally. Both inject NVIDIA_API_KEY server-side and
  // forward to NVIDIA Build's chat completions endpoint.
  const res = await fetch('/api/nvidia/llm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '<no body>');
    throw new Error(`NVIDIA LLM ${res.status}: ${errText.slice(0, 400)}`);
  }
  const json = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = json.choices?.[0]?.message?.content;
  if (!content) throw new Error('LLM returned empty content');
  return content;
}

export async function chatJSON<T>(opts: Omit<ChatOptions, 'responseFormat'>): Promise<T> {
  const text = await chatCompletion({ ...opts, responseFormat: 'json_object' });
  // Strip code fences just in case the model wraps despite JSON mode
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '');
  try {
    return JSON.parse(cleaned) as T;
  } catch (err) {
    console.error('[chatJSON] failed to parse model output:', cleaned.slice(0, 400));
    throw err;
  }
}
