// Voice fingerprint classifier. Stylometric scaffold — not a real ML model
// yet (no corpus to train on). Computes deterministic features from the
// draft and scores against a target profile that captures OptiFinish
// editorial guidelines.
//
// When you have 10-12 published "voice on" posts, run scripts/train-voice-
// profile.mjs on them to derive a richer profile and replace the
// DEFAULT_PROFILE constant below.

export interface VoiceProfile {
  id: string;
  name: string;
  // Target ranges. Score is highest when draft features are inside these.
  avgSentenceWords: { min: number; max: number; ideal: number };
  avgParaWords: { min: number; max: number; ideal: number };
  shortSentenceShare: { min: number; max: number }; // % sentences <12 words
  longSentenceShare: { max: number }; // % sentences >40 words
  emDashRate: { max: number }; // per 1000 words — ideally 0
  bannedPhrases: string[]; // hard fail if any present
  preferredPhrases: string[]; // bonus if present
  fleschReadingEaseRange: { min: number; max: number };
}

// Default profile encodes the editorial guidelines we've been enforcing
// in the prompt. Replace by running the trainer script on real corpus.
export const DEFAULT_PROFILE: VoiceProfile = {
  id: 'optifinish-editorial-v1',
  name: 'OptiFinish Editorial Default',
  avgSentenceWords: { min: 12, max: 22, ideal: 17 },
  avgParaWords: { min: 35, max: 80, ideal: 55 },
  shortSentenceShare: { min: 18, max: 50 }, // ≥18% should be punchy
  longSentenceShare: { max: 8 }, // ≤8% may be long
  emDashRate: { max: 0.5 }, // basically zero
  bannedPhrases: [
    'best-in-class',
    'industry-leading',
    'unparalleled',
    'game-changing',
    'cutting-edge',
    'revolutionary',
    'next-level',
    'world-class',
    'synergy',
    'unlock the',
    'harness the',
    'empower',
    'robust',
    'seamless',
    'in today',
    'did you know',
    'have you ever',
    'what if you could',
    'inside scoop',
    'take your operation',
    'unlocking',
    'mastering',
    'it is worth noting',
    'when it comes to',
    'at the end of the day',
    'in essence',
    'all in all',
    'to put it simply'
  ],
  preferredPhrases: [
    'hour six',
    'monsoon',
    'INR',
    'BIS',
    'BEE',
    'Greater Noida',
    'multi-OEM',
    'third shift',
    'rejection bin',
    'cure window'
  ],
  // Flesch range tuned for "smart-but-readable engineer prose"
  fleschReadingEaseRange: { min: 35, max: 55 }
};

export interface VoiceScore {
  overall: number; // 0-100
  features: {
    avgSentenceWords: number;
    avgParaWords: number;
    shortSentencePct: number;
    longSentencePct: number;
    emDashes: number;
    bannedHits: string[]; // every banned phrase found
    preferredHits: string[]; // every preferred phrase found
    fleschEase: number;
  };
  pass: boolean; // overall ≥ 70 AND no banned hits
  warnings: string[];
}

function htmlToPlain(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function countSyllables(word: string): number {
  // Simple syllable counter — close enough for stylometric scoring
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (w.length === 0) return 0;
  if (w.length <= 3) return 1;
  const vowelGroups = w.replace(/(?:[^aeiouy])/g, ' ').trim().split(/\s+/).filter(Boolean);
  let n = vowelGroups.length;
  if (w.endsWith('e')) n = Math.max(1, n - 1);
  return Math.max(1, n);
}

function fleschReadingEase(text: string): number {
  // 206.835 − 1.015 × (words/sentences) − 84.6 × (syllables/words)
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  if (sentences.length === 0 || words.length === 0) return 0;
  const totalSyllables = words.reduce((s, w) => s + countSyllables(w), 0);
  return 206.835 - 1.015 * (words.length / sentences.length) - 84.6 * (totalSyllables / words.length);
}

export function scoreVoice(html: string, profile: VoiceProfile = DEFAULT_PROFILE): VoiceScore {
  const text = htmlToPlain(html);
  const lower = text.toLowerCase();

  // Sentence + paragraph stats
  const sentences = text.split(/(?<=[.!?])\s+/).filter((s) => s.length > 1);
  const sentenceWordCounts = sentences.map((s) => s.split(/\s+/).filter(Boolean).length);
  const avgSentenceWords =
    sentenceWordCounts.reduce((a, b) => a + b, 0) / Math.max(1, sentenceWordCounts.length);

  const paragraphs = html.match(/<p[^>]*>[\s\S]*?<\/p>/gi) ?? [];
  const paraWordCounts = paragraphs.map(
    (p) => htmlToPlain(p).split(/\s+/).filter(Boolean).length
  );
  const avgParaWords =
    paraWordCounts.reduce((a, b) => a + b, 0) / Math.max(1, paraWordCounts.length);

  const shortSentencePct =
    (sentenceWordCounts.filter((c) => c < 12).length / Math.max(1, sentenceWordCounts.length)) *
    100;
  const longSentencePct =
    (sentenceWordCounts.filter((c) => c > 40).length / Math.max(1, sentenceWordCounts.length)) *
    100;

  const emDashes = (text.match(/—|--/g) ?? []).length;
  const totalWords = text.split(/\s+/).filter(Boolean).length;
  const emDashRate = (emDashes / Math.max(1, totalWords)) * 1000;

  const bannedHits = profile.bannedPhrases.filter((p) => lower.includes(p.toLowerCase()));
  const preferredHits = profile.preferredPhrases.filter((p) => lower.includes(p.toLowerCase()));

  const fleschEase = fleschReadingEase(text);

  // Score components (each 0-100)
  const inRange = (v: number, r: { min: number; max: number; ideal?: number }) => {
    if (v >= r.min && v <= r.max) return 100;
    const dist = v < r.min ? r.min - v : v - r.max;
    return Math.max(0, 100 - dist * 4);
  };
  const sentScore = inRange(avgSentenceWords, profile.avgSentenceWords);
  const paraScore = inRange(avgParaWords, profile.avgParaWords);
  const shortScore = inRange(shortSentencePct, profile.shortSentenceShare);
  const longScore = longSentencePct <= profile.longSentenceShare.max ? 100 : Math.max(0, 100 - (longSentencePct - profile.longSentenceShare.max) * 6);
  const emDashScore = emDashRate <= profile.emDashRate.max ? 100 : 0;
  const bannedScore = bannedHits.length === 0 ? 100 : Math.max(0, 100 - bannedHits.length * 20);
  const preferredScore = Math.min(100, preferredHits.length * 12); // 0 → 100 over 8+ matches
  const fleschScore = inRange(fleschEase, {
    min: profile.fleschReadingEaseRange.min,
    max: profile.fleschReadingEaseRange.max
  });

  const overall = Math.round(
    sentScore * 0.12 +
      paraScore * 0.1 +
      shortScore * 0.12 +
      longScore * 0.08 +
      emDashScore * 0.08 +
      bannedScore * 0.25 +
      preferredScore * 0.1 +
      fleschScore * 0.15
  );

  const warnings: string[] = [];
  if (bannedHits.length > 0) warnings.push(`Banned phrases found: ${bannedHits.join(', ')}`);
  if (avgSentenceWords > profile.avgSentenceWords.max)
    warnings.push(`Sentences too long on average (${Math.round(avgSentenceWords)} words)`);
  if (shortSentencePct < profile.shortSentenceShare.min)
    warnings.push(`Not enough short sentences (${Math.round(shortSentencePct)}%; need ${profile.shortSentenceShare.min}%+)`);
  if (longSentencePct > profile.longSentenceShare.max)
    warnings.push(`Too many long sentences (${Math.round(longSentencePct)}%)`);
  if (emDashes > 0) warnings.push(`${emDashes} em-dash${emDashes > 1 ? 'es' : ''} present`);
  if (fleschEase < profile.fleschReadingEaseRange.min) warnings.push(`Reading too dense (Flesch ${Math.round(fleschEase)})`);
  if (fleschEase > profile.fleschReadingEaseRange.max) warnings.push(`Reading too breezy for B2B (Flesch ${Math.round(fleschEase)})`);

  return {
    overall,
    features: {
      avgSentenceWords: Math.round(avgSentenceWords * 10) / 10,
      avgParaWords: Math.round(avgParaWords * 10) / 10,
      shortSentencePct: Math.round(shortSentencePct),
      longSentencePct: Math.round(longSentencePct),
      emDashes,
      bannedHits,
      preferredHits,
      fleschEase: Math.round(fleschEase * 10) / 10
    },
    pass: overall >= 70 && bannedHits.length === 0,
    warnings
  };
}
