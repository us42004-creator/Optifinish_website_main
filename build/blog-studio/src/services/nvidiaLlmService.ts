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
  // Per-call hard timeout in ms. Default 90s — long enough for any reasonable
  // NVIDIA queue but short enough that a wedged call doesn't hang the pipeline.
  timeoutMs?: number;
  // If set, the call will retry with these models in order on AbortError or
  // 5xx. Default: rotates through MODELS array excluding the original. This
  // is what kills the "studio hangs forever on one bad NVIDIA call" failure.
  fallbackModels?: string[];
}

const DEFAULT_MODEL = 'meta/llama-3.3-70b-instruct';
const DEFAULT_TIMEOUT_MS = 90_000;

// Wraps fetch with an AbortController so a single stuck NVIDIA call can't
// hang the pipeline. AbortError is caught upstream and triggers fallback.
async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function singleCall(opts: ChatOptions, modelId: string): Promise<string> {
  const entry = getModelEntry(modelId as any);
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
  if (typeof opts.seed === 'number') body.seed = opts.seed;

  const res = await fetchWithTimeout(
    '/api/nvidia/llm',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    },
    opts.timeoutMs ?? DEFAULT_TIMEOUT_MS
  );

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

export async function chatCompletion(opts: ChatOptions): Promise<string> {
  const primary = opts.model ?? DEFAULT_MODEL;
  // Fallback chain: caller-supplied → rotation excluding primary → Llama as
  // ultimate safety net. Up to 3 attempts total.
  const fallbacks =
    opts.fallbackModels ??
    MODELS.filter((m) => m.id !== primary)
      .slice(0, 2)
      .map((m) => m.id);
  const chain = [primary, ...fallbacks];

  let lastErr: unknown;
  for (let i = 0; i < chain.length; i++) {
    const m = chain[i];
    try {
      return await singleCall(opts, m);
    } catch (err: any) {
      lastErr = err;
      const msg = String(err?.message ?? err);
      const isAbort = err?.name === 'AbortError' || msg.includes('aborted');
      const is5xx = /NVIDIA LLM 5\d\d/.test(msg);
      const isRecoverable = isAbort || is5xx || msg.includes('socket') || msg.includes('fetch failed');
      if (!isRecoverable || i === chain.length - 1) throw err;
      console.warn(`[chatCompletion] ${m} failed (${msg.slice(0, 80)}), falling back to ${chain[i + 1]}`);
    }
  }
  throw lastErr;
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
