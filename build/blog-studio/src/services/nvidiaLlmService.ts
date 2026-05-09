// NVIDIA Build LLM client (OpenAI-compatible chat completions).
// Routes through /api/nvidia/llm — Vite dev-server proxy locally, Vercel
// serverless function in production. Both inject the right NVIDIA Build
// key server-side based on model prefix.

import { getModelEntry, MODELS } from './modelRouter';

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
  const modelId = opts.model ?? DEFAULT_MODEL;
  const entry = getModelEntry(modelId as any);

  // Cap max_tokens to whatever NVIDIA actually accepts for this model.
  const requestedMax = opts.maxTokens ?? 2048;
  const maxTokens = entry ? Math.min(requestedMax, entry.maxTokensCap) : requestedMax;

  const body: Record<string, unknown> = {
    model: modelId,
    messages: opts.messages,
    temperature: opts.temperature ?? 0.7,
    max_tokens: maxTokens,
    top_p: opts.topP ?? 0.95
  };

  // Only set response_format on models that support it. Gemma-3 on NVIDIA
  // Build returns 422 with response_format set; for those, rely on prompt
  // strictness ("Output: strict JSON only") and parse defensively below.
  const wantsJson = opts.responseFormat === 'json_object';
  const canUseJsonMode = entry ? entry.supportsJsonMode : true;
  if (wantsJson && canUseJsonMode) {
    body.response_format = { type: 'json_object' };
  }

  if (typeof opts.seed === 'number') {
    body.seed = opts.seed;
  }

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
  return parseJsonish<T>(text);
}

// Parses model output that's supposed to be JSON. Tolerates code fences and
// extracts the first {…} or […] block if the model padded with prose (which
// can happen when the model doesn't support response_format).
export function parseJsonish<T>(text: string): T {
  const trimmed = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  try {
    return JSON.parse(trimmed) as T;
  } catch {
    // Fallback: try to extract the first balanced JSON object/array
    const objStart = trimmed.indexOf('{');
    const arrStart = trimmed.indexOf('[');
    const start =
      objStart === -1 ? arrStart : arrStart === -1 ? objStart : Math.min(objStart, arrStart);
    if (start === -1) {
      console.error('[chatJSON] no JSON found in output:', trimmed.slice(0, 400));
      throw new Error('Model output contained no JSON');
    }
    const opener = trimmed[start];
    const closer = opener === '{' ? '}' : ']';
    let depth = 0;
    let inStr = false;
    let escape = false;
    for (let i = start; i < trimmed.length; i++) {
      const c = trimmed[i];
      if (inStr) {
        if (escape) escape = false;
        else if (c === '\\') escape = true;
        else if (c === '"') inStr = false;
        continue;
      }
      if (c === '"') inStr = true;
      else if (c === opener) depth++;
      else if (c === closer) {
        depth--;
        if (depth === 0) {
          const slice = trimmed.slice(start, i + 1);
          try {
            return JSON.parse(slice) as T;
          } catch (err) {
            console.error('[chatJSON] extraction parse failed:', slice.slice(0, 400));
            throw err;
          }
        }
      }
    }
    console.error('[chatJSON] unterminated JSON:', trimmed.slice(0, 400));
    throw new Error('Unterminated JSON in model output');
  }
}
