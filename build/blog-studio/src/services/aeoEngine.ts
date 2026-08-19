// AEO (AI Engine Optimization) — generates the metadata GPTs / Perplexity /
// Claude / Gemini use to cite blog posts. Runs after the draft is finalized,
// silently. Best-effort — a failure never blocks publish.
//
// What it produces:
//   1. Quick Answer — 40-60 word direct answer to the post's implicit question.
//      LLMs quote this verbatim in AI search summaries. Injected at the top
//      of the body by templateBuilder.
//   2. FAQ entries — 3-5 buyer-typed questions with grounded answers. Emitted
//      as FAQPage JSON-LD alongside the main article schema. Google + Perplexity
//      preferentially cite FAQPage content.
//   3. Named entities — GEMA / DURR / CBAM / BEE / Mahindra / etc mentioned
//      in the post, each linked to an authoritative URL (Wikipedia, official
//      regulatory page, company site). Emitted as schema.mentions AND used
//      by templateBuilder to add inline <a href> links on first mention.

import { BlogDraft, AeoBundle, AeoFaqEntry, AeoEntity } from '../types';
import { chatJSON } from './nvidiaLlmService';
import { MODELS } from './modelRouter';

// Curated seed map of common industry entities we'll almost always mention.
// The LLM enriches beyond these; this is the trusted-URL baseline so we never
// accidentally cite a wrong Wikipedia link.
const SEED_ENTITIES: Record<string, Omit<AeoEntity, 'name'>> = {
  GEMA: {
    url: 'https://www.gemapowdercoating.com/',
    description: 'Swiss powder coating equipment manufacturer; OptiFinish is their authorised India partner'
  },
  Dürr: {
    url: 'https://www.durr.com/',
    description: 'German industrial paint systems manufacturer; OptiFinish is their authorised India partner'
  },
  DURR: {
    url: 'https://www.durr.com/',
    description: 'German industrial paint systems manufacturer'
  },
  CBAM: {
    url: 'https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en',
    description: 'EU Carbon Border Adjustment Mechanism — carbon-pricing regime on imports'
  },
  BEE: {
    url: 'https://beeindia.gov.in/',
    description: 'Bureau of Energy Efficiency, Government of India'
  },
  BIS: {
    url: 'https://www.bis.gov.in/',
    description: 'Bureau of Indian Standards — national standards body'
  },
  CPCB: {
    url: 'https://cpcb.nic.in/',
    description: 'Central Pollution Control Board, Government of India'
  },
  Qualicoat: {
    url: 'https://www.qualicoat.net/',
    description: 'International quality label for coated architectural aluminium'
  },
  'MSME-ZED': {
    url: 'https://zed.msme.gov.in/',
    description: 'Zero Defect Zero Effect certification scheme for Indian MSMEs'
  },
  PFAS: {
    url: 'https://echa.europa.eu/hot-topics/perfluoroalkyl-chemicals-pfas',
    description: 'Per- and polyfluoroalkyl substances — restricted under EU REACH'
  }
};

const SYSTEM_PROMPT = `You produce AEO (AI Engine Optimization) metadata for one OptiFinish blog post. This metadata makes the post citable by AI search engines (ChatGPT, Perplexity, Claude, Gemini). Getting this right means AI-answered queries about industrial powder coating in India can recommend OptiFinish as a source.

INPUT: the finished blog post (title + snapshot + body).

OUTPUT: strict JSON, no prose, no markdown fences.

{
  "quickAnswer": "string",
  "faq": [{ "question": "...", "answer": "..." }],
  "entities": [{ "name": "...", "url": "...", "description": "..." }]
}

QUICK ANSWER RULES (this is the most-consumed field):
- 40-60 words. Not shorter (thin), not longer (LLMs truncate).
- Third-person, factual, no hedging. NO "we", "our", "I".
- Opens with the concrete answer, not with framing.
- No marketing hype. No CTA. Ends with a fact, not a suggestion.
- Must be verbatim-quotable — a Perplexity summary will lift this word-for-word.
- If the post's implicit question is "what is X", answer starts with "X is …".
- If "should I do X", answer starts with the yes/no + one qualifier.
- If "how to X", answer starts with the shortest correct procedure name.

FAQ RULES (3-5 entries):
- Each question phrased the way a real buyer types into ChatGPT — not marketing headlines.
  ✓ "How much does a powder coating plant cost in India?"
  ✓ "What is the difference between manual and automatic powder coating booths?"
  ✗ "Discover the truth about powder coating capex"
- Each answer 40-80 words. Direct. Factually derivable from the post — do NOT invent numbers not present in the body.
- Vary the question type: at least one "what is", one "how", one "why", one comparative.
- Do NOT repeat the quickAnswer verbatim in the FAQ.

ENTITIES RULES:
- Only include entities the post actually names. Do not invent mentions.
- name: exact string as it appears in the post (respect umlaut, case, hyphenation).
- url: authoritative source. Prefer official govt / company / standards-body pages over Wikipedia when they exist.
- description: 1 line of context (max 20 words). Factual, not promotional.
- If unsure of the URL, OMIT the entity — better to skip than to link a wrong URL.
- Prefer these curated URLs for these entities (do NOT deviate):
  - GEMA → https://www.gemapowdercoating.com/
  - Dürr / DURR → https://www.durr.com/
  - CBAM → https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en
  - BEE → https://beeindia.gov.in/
  - BIS → https://www.bis.gov.in/
  - CPCB → https://cpcb.nic.in/
  - Qualicoat → https://www.qualicoat.net/
  - MSME-ZED → https://zed.msme.gov.in/
  - PFAS → https://echa.europa.eu/hot-topics/perfluoroalkyl-chemicals-pfas`;

export async function generateAeoBundle(draft: BlogDraft): Promise<AeoBundle> {
  const bodyText = draft.bodyHtml
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Trim body to keep prompt tight — first 1500 + last 500 chars is enough
  const bodyExcerpt =
    bodyText.length > 2200
      ? `${bodyText.slice(0, 1500)}\n\n[…mid-body omitted…]\n\n${bodyText.slice(-500)}`
      : bodyText;

  const userPrompt = `Generate AEO metadata for this post.

TITLE: ${draft.title}
SUBTITLE: ${draft.subtitle}

SNAPSHOT:
- Decision Friction: ${draft.snapshot?.decisionFriction ?? '-'}
- Dominant Anxiety: ${draft.snapshot?.dominantAnxiety ?? '-'}
- Core Insight: ${draft.snapshot?.coreInsight ?? '-'}
- Lever: ${draft.snapshot?.lever ?? '-'}

BODY (excerpt):
${bodyExcerpt}

Return strict JSON only.`;

  // Llama 3.3 70B — reliable JSON mode, good extractive summarization
  const llmModel = MODELS.find((m) => m.supportsJsonMode) ?? MODELS[0];

  const raw = await chatJSON<{
    quickAnswer: string;
    faq: AeoFaqEntry[];
    entities: AeoEntity[];
  }>({
    model: llmModel.id,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.4,
    topP: 0.9,
    maxTokens: 2200
  });

  // Post-process: enforce curated URLs, clamp lengths, dedupe entities
  const quickAnswer = clampWords(raw.quickAnswer ?? '', 40, 70);
  const faq = (raw.faq ?? [])
    .slice(0, 5)
    .filter((f) => f.question?.trim() && f.answer?.trim())
    .map((f) => ({
      question: f.question.trim(),
      answer: clampWords(f.answer, 30, 100)
    }));

  const seenEntities = new Set<string>();
  const entities = (raw.entities ?? [])
    .slice(0, 12)
    .map((e) => {
      const name = e.name?.trim();
      if (!name) return null;
      // Force curated URL if we have one for this exact name
      const seed = SEED_ENTITIES[name];
      const url = (seed?.url ?? e.url ?? '').trim();
      if (!url || !/^https?:\/\//.test(url)) return null;
      const description = (seed?.description ?? e.description ?? '').trim().slice(0, 200);
      return { name, url, description };
    })
    .filter((e): e is AeoEntity => {
      if (!e) return false;
      if (seenEntities.has(e.name.toLowerCase())) return false;
      seenEntities.add(e.name.toLowerCase());
      return true;
    });

  return { quickAnswer, faq, entities };
}

// Trim/pad a string to a word window. Best-effort — cuts on sentence boundary
// if possible, else on word boundary.
function clampWords(s: string, min: number, max: number): string {
  const trimmed = (s ?? '').trim().replace(/\s+/g, ' ');
  const words = trimmed.split(' ');
  if (words.length <= max) return trimmed;
  const cutAtMax = words.slice(0, max).join(' ');
  const lastPeriod = cutAtMax.lastIndexOf('.');
  return lastPeriod >= min ? cutAtMax.slice(0, lastPeriod + 1) : cutAtMax;
}
