// Multi-model rotation. The fight against repetitive output is fought on
// four fronts: (1) different model = different intrinsic voice, (2) different
// random voice nudge in the prompt per call, (3) different randomly-sampled
// trigger subset, (4) explicit exclusion list of recent titles.
//
// This file owns (1) and (2).

export type ModelId =
  | 'meta/llama-3.3-70b-instruct'
  | 'deepseek-ai/deepseek-v4-pro'
  | 'google/gemma-3-12b-it'
  | 'nvidia/llama-3.3-nemotron-super-49b-v1';

export interface ModelEntry {
  id: ModelId;
  shortName: string;
  intrinsicVoice: string; // baseline character of the model
  // Per-model temperature offset for different tasks. Some models need higher
  // creativity, some lower. These are deltas applied to the base temperature.
  topicTempOffset: number;
  draftTempOffset: number;
  // NVIDIA Build hosting capability flags (discovered via 422 errors at
  // runtime — kept here so callers can adapt their request shape).
  supportsJsonMode: boolean; // false → omit response_format, rely on prompt
  maxTokensCap: number; // hard ceiling NVIDIA enforces
}

export const MODELS: ModelEntry[] = [
  {
    id: 'meta/llama-3.3-70b-instruct',
    shortName: 'Llama-3.3-70B',
    intrinsicVoice: 'balanced, calm authority, slight academic register',
    topicTempOffset: 0,
    draftTempOffset: 0,
    supportsJsonMode: true,
    maxTokensCap: 8000
  },
  {
    id: 'deepseek-ai/deepseek-v4-pro',
    shortName: 'DeepSeek-V4-Pro',
    intrinsicVoice: 'analytical, reasoning-forward, dense with structured argument',
    topicTempOffset: -0.05,
    draftTempOffset: -0.05,
    supportsJsonMode: true,
    maxTokensCap: 8000
  },
  {
    id: 'google/gemma-3-12b-it',
    shortName: 'Gemma-3-12B',
    intrinsicVoice: 'crisp, declarative, short sentences, no-nonsense',
    topicTempOffset: 0.05,
    draftTempOffset: 0.05,
    // Gemma 3 on NVIDIA Build returns 422 when response_format is set, and
    // caps max_tokens at 4096. We skip JSON-mode and instruct via prompt.
    supportsJsonMode: false,
    maxTokensCap: 4096
  },
  {
    id: 'nvidia/llama-3.3-nemotron-super-49b-v1',
    shortName: 'Nemotron-Super-49B',
    intrinsicVoice: 'nuanced, sometimes contrarian, asks better questions, walks through reasoning',
    topicTempOffset: 0,
    draftTempOffset: 0,
    supportsJsonMode: true,
    maxTokensCap: 8000
  }
];

export function getModelEntry(id: ModelId): ModelEntry | undefined {
  return MODELS.find((m) => m.id === id);
}

// Voice nudges applied on top of the model's intrinsic voice. One is randomly
// selected per call. Even the same model produces different output across runs
// because the voice nudge changes.
export const VOICES = [
  {
    id: 'analyst',
    nudge: `Open the post with a specific, named observation from the shop floor — a metric, a behaviour at hour six, a measurable shift. Lead with the data, not the framing. Sentence rhythm: medium, with at least three short declarative sentences (under 10 words each) per major section to break up density.`
  },
  {
    id: 'mentor',
    nudge: `Write as a senior process engineer mentoring a younger one. Use "you" liberally. Walk through reasoning step by step. Each H2 should pose a question and answer it. Sentence rhythm: conversational, with one parenthetical aside per section.`
  },
  {
    id: 'reporter',
    nudge: `Open with a scene — a specific Indian plant, a specific shift, a specific sensory detail (the smell of curing oven exhaust, the sound of conveyor hooks, the look of a finished panel under exit-tunnel light). Carry the narrative voice through the post. Sentence rhythm: cinematic, varied, occasional one-line paragraphs for emphasis.`
  },
  {
    id: 'critic',
    nudge: `Open with what most articles on this topic get wrong. Take a mildly skeptical position toward common industry framings. Each H2 must contain at least one "but" or "however that" turn. Sentence rhythm: pointed, declarative, no hedging.`
  },
  {
    id: 'frame',
    nudge: `Open with the trade-off itself, named explicitly. The whole post is a decision frame: every section gives the reader a way to think, not just a list of facts. Use the word "decide" at least three times. Sentence rhythm: tight, balanced, often with parallel structure (X, but also Y; A, while also B).`
  },
  {
    id: 'unhurried',
    nudge: `Open without urgency. The post breathes. Use longer sentences in the first two paragraphs to set tone, then tighten. Each section ends with a one-line takeaway. Sentence rhythm: deliberate, with patience for context before payoff.`
  }
];

// Cryptographically-decent randomness for client; falls back to Math.random.
function rng(): number {
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.getRandomValues) {
    const arr = new Uint32Array(1);
    globalThis.crypto.getRandomValues(arr);
    return arr[0] / 0xffffffff;
  }
  return Math.random();
}

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

// Picks a random model + voice for a generation. The 'avoid' option excludes
// a model we've recently used (so two consecutive calls don't accidentally
// pick the same model and produce similar output).
export function pickModelAndVoice(opts: { avoidModel?: ModelId } = {}): {
  model: ModelEntry;
  voice: (typeof VOICES)[number];
} {
  const candidates = opts.avoidModel
    ? MODELS.filter((m) => m.id !== opts.avoidModel)
    : MODELS;
  return {
    model: pickRandom(candidates),
    voice: pickRandom(VOICES)
  };
}

// Keep last-used model in module scope so consecutive calls naturally rotate.
let lastModel: ModelId | undefined;
export function pickRotated(): { model: ModelEntry; voice: (typeof VOICES)[number] } {
  const result = pickModelAndVoice({ avoidModel: lastModel });
  lastModel = result.model.id;
  return result;
}

// Shuffle a copy of an array using Fisher-Yates.
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
