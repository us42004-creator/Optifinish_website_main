// A/B variant generator. Produces two variants for each high-leverage
// surface: metaDescription, ogTitle, and CTA card text. The traffic-split
// logic happens later (depends on E, the analytics scaffold). For now,
// the editor sees both variants and picks one OR the export embeds both
// with a comment block ready for analytics activation.

import { BlogDraft } from '../types';
import { chatJSON } from './nvidiaLlmService';
import { MODELS } from './modelRouter';

export interface AbVariants {
  metaDescription: { a: string; b: string };
  ogTitle: { a: string; b: string };
  ctaHeadline: { a: string; b: string };
  rationale: string; // why these two were chosen as a useful contrast
}

interface AbLlmJson {
  metaDescription: { a: string; b: string };
  ogTitle: { a: string; b: string };
  ctaHeadline: { a: string; b: string };
  rationale: string;
}

const SYSTEM_PROMPT = `You generate A/B variants for a published OptiFinish blog post. Each variant pair must contrast a specific HYPOTHESIS — not just two synonyms. The point of A/B is to learn what works, so the variants must differ in ONE meaningful dimension.

VARIATION DIMENSIONS (pick a different one for each variant pair):

1. PROBLEM-FIRST vs OUTCOME-FIRST
   A: leads with the friction ("Hour-six humidity wrecks transfer efficiency")
   B: leads with the resolution ("Three audits that pull humidity off the rejection chart")

2. SPECIFIC vs UNIVERSAL
   A: names a system or place ("How Mahindra's Chakan paint shop handles heat soak")
   B: poses the universal question ("Why heat soak rewrites every paint-shop spec")

3. LOSS-FRAME vs GAIN-FRAME
   A: cost of inaction ("What an unupgraded curing oven costs you per year")
   B: gain of action ("The 30-minute audit that recovers a shift's worth of margin")

4. NUMERICAL vs NARRATIVE
   A: leads with a verifiable figure ("BEE's 1 Jan 2026 mandate, what changes")
   B: leads with a scene ("Walk a powder line at hour six")

INPUT RULES:
- DO NOT fabricate numbers in either variant.
- Each variant must respect the same character limits as the source field
  (metaDescription 150-160, ogTitle ≤90, ctaHeadline ≤80).
- Both variants must be VALID standalone — not just slight word swaps.

OUTPUT: Strict JSON.

{
  "metaDescription": { "a": "string (150-160 chars)", "b": "string (150-160 chars)" },
  "ogTitle":         { "a": "string (≤90 chars)",     "b": "string (≤90 chars)" },
  "ctaHeadline":     { "a": "string (≤80 chars)",     "b": "string (≤80 chars)" },
  "rationale":       "string — what dimension you tested across the variants and why it matters"
}`;

export async function generateAbVariants(draft: BlogDraft): Promise<AbVariants> {
  if (!draft.seo) {
    throw new Error('Cannot generate A/B variants without baseline SEO. Run Step 5 first.');
  }
  const llmModel = MODELS.find((m) => m.supportsJsonMode) ?? MODELS[0];

  const userPrompt = `Generate A/B variants for this post.

TITLE: "${draft.title}"
SUBTITLE: "${draft.subtitle}"

CURRENT (the "control") SEO:
- metaDescription: "${draft.seo.metaDescription}"
- ogTitle: "${draft.seo.ogTitle ?? draft.seo.metaTitle}"
- focusKeyword: "${draft.seo.focusKeyword}"

SNAPSHOT:
- Decision Friction: ${draft.snapshot?.decisionFriction ?? '-'}
- Core Insight: ${draft.snapshot?.coreInsight ?? '-'}
- Lever: ${draft.snapshot?.lever ?? '-'}

Pick ONE variation dimension from the list. Generate variant pairs that contrast cleanly along that dimension. Return strict JSON.`;

  const result = await chatJSON<AbLlmJson>({
    model: llmModel.id,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.7,
    topP: 0.92,
    maxTokens: 1500
  });

  // Defensive — enforce character limits even if LLM drifts
  const trim = (s: string, max: number) => (s.length > max ? s.slice(0, max).trimEnd() : s);
  return {
    metaDescription: {
      a: trim(result.metaDescription?.a ?? draft.seo.metaDescription, 160),
      b: trim(result.metaDescription?.b ?? draft.seo.metaDescription, 160)
    },
    ogTitle: {
      a: trim(result.ogTitle?.a ?? draft.seo.ogTitle ?? draft.seo.metaTitle, 90),
      b: trim(result.ogTitle?.b ?? draft.seo.ogTitle ?? draft.seo.metaTitle, 90)
    },
    ctaHeadline: {
      a: trim(result.ctaHeadline?.a ?? '', 80),
      b: trim(result.ctaHeadline?.b ?? '', 80)
    },
    rationale: result.rationale?.trim() ?? ''
  };
}
