import {
  CategoryId,
  AudienceId,
  TopicIdea,
  BlogDraft,
  ImagePlacement,
  DossierSnapshot,
  StructuralShape,
  AeoBundle
} from '../types';
import { CATEGORIES, AUDIENCES } from '../constants';
import { chatJSON } from './nvidiaLlmService';
import { pickRotated, MODELS, ModelId } from './modelRouter';
import { computeEditorialFlags, flagsToHtmlComment } from './editorialFlags';
import { generateAeoBundle } from './aeoEngine';

// ─────────────────────────────────────────────────────────────
// Per-category structural blueprint. The model MUST follow the
// blueprint for the chosen category. This is what makes a Pillar
// Guide read like a Pillar Guide and a Case Study land its arc.
// ─────────────────────────────────────────────────────────────
export const CATEGORY_BLUEPRINT: Record<
  CategoryId,
  { shape: StructuralShape; sections: string[]; cta: string }
> = {
  'pillar-guide': {
    shape: 'pillar_guide',
    sections: [
      'Executive TL;DR (a one-paragraph answer the C-suite can scan)',
      'What it is and where it fits in the line',
      'The four to six sub-systems that decide outcomes',
      'Selection variables (throughput, substrate, finish spec, footprint, utilities)',
      'Cost structure in INR ranges (capex bands by capacity tier; only state ranges, never specific quotes)',
      'Compliance and certifications (BIS, ATEX, BEE, Qualicoat where relevant)',
      'Common procurement mistakes plant managers regret',
      'Next-step routing matrix (who should read what next)'
    ],
    cta: 'Download spec sheet, then book a facility walk-through'
  },
  'case-study': {
    shape: 'case_study',
    sections: [
      'The customer, their sector, what their line was running',
      'The problem in their words (no marketing voice)',
      'What it was costing them (downtime hours, rejection rate, energy waste — quantified status quo)',
      'The solution (integration approach and named systems, not feature lists)',
      'Implementation timeline (weeks, what shifted on the line)',
      'The numbers that landed (three metrics: throughput, cost, quality)',
      'Why this transfers to a similar line (or honestly, where it would not)'
    ],
    cta: 'Book a same-industry plant visit'
  },
  'comparison-decision': {
    shape: 'comparison_matrix',
    sections: [
      'The 30-second verdict, by use-case',
      'The decision matrix (use a real comparison table inside the section)',
      'Criterion deep-dive 1 with engineering reasoning',
      'Criterion deep-dive 2 with engineering reasoning',
      '5-year TCO breakdown (energy, consumables, downtime — INR-denominated qualitative ranges)',
      'Pick X if / Pick Y if — explicit routing'
    ],
    cta: 'Get a custom comparison for your line'
  },
  'cost-of-inaction': {
    shape: 'cost_of_inaction',
    sections: [
      'The hidden bill nobody puts on the P&L',
      'The 12 / 24 / 36-month projection of compounded waste',
      'Three failure modes that compound silently',
      'What an audit actually catches in 30 minutes',
      'The do-nothing vs act-now decision math',
      'One small first step that costs nothing (the audit invitation)'
    ],
    cta: 'Schedule a free on-site audit'
  },
  'facility-behind-scenes': {
    shape: 'facility_tour',
    sections: [
      'Cold open with a number (square footage, throughput, machines on floor)',
      'The line we walk you through (4-5 stations)',
      'QC and traceability discipline (torque tests, batch logs, inspection checkpoints)',
      'The people who build your system (named engineers with tenure, not stock)',
      'Standards we hold ourselves to beyond ISO',
      'When to come see it (calendared invite)'
    ],
    cta: 'Schedule a facility visit'
  },
  'technical-deep-dive': {
    shape: 'immersive_essay',
    sections: [
      'The friction this post addresses (named precisely)',
      'The mechanism, described so it could be diagrammed',
      'Where it breaks in real Indian plants',
      'The diagnostic frame an experienced engineer uses',
      'Field data (qualitative, not invented numbers)',
      'What this changes for the operator at hour six'
    ],
    cta: 'Talk to our process engineering team'
  },
  'how-to': {
    shape: 'troubleshooting_drilldown',
    sections: [
      'The defect pattern, named precisely',
      'How to spot it vs adjacent defects (with sensory signatures)',
      'Five most likely causes, ranked by frequency in Indian plants',
      'A 30-minute diagnostic walk you can run today',
      'The fix, and the re-occurrence trap',
      'Prevention: what changes upstream'
    ],
    cta: 'Send us a defect for engineering review'
  },
  'industry-trends': {
    shape: 'immersive_essay',
    sections: [
      'The trigger and its dated source',
      'What it actually does (mechanically, not legally)',
      'Who it affects most in India (specific sectors and plant sizes)',
      'Three shifts on the floor that follow',
      'The buyer-side decision window (when to act)',
      'How to get ahead of it without overspending'
    ],
    cta: 'See how this affects your line'
  }
};

// ─────────────────────────────────────────────────────────────
// System prompt — strict editorial guardrails + per-archetype
// blueprint injected dynamically below.
// ─────────────────────────────────────────────────────────────
export const buildDraftSystemPrompt = (
  categoryId: CategoryId,
  opts: { voiceNudge?: string; modelVoice?: string } = {}
): string => {
  const bp = CATEGORY_BLUEPRINT[categoryId];
  const sectionList = bp.sections.map((s, i) => `H2 ${i + 1}. ${s}`).join('\n');
  const voiceBlock =
    opts.voiceNudge && opts.modelVoice
      ? `

YOUR INTRINSIC VOICE THIS RUN: ${opts.modelVoice}.

EDITORIAL VOICE NUDGE FOR THIS RUN:
${opts.voiceNudge}
`
      : '';

  return `You are the OptiFinish editorial writer. You produce one complete blog post per call, written to the standard of a senior process engineer who has walked 200 plant floors. The reader is intelligent, busy, and skeptical of marketing.${voiceBlock}

OPTIFINISH CONTEXT:
- Indian B2B industrial powder coating equipment company (parent: VACSPL).
- Sells own powder coating plants, ovens, booths, automation (Z-TAP, ZA01).
- Authorised India partners for GEMA and DURR. Sister concern Vinayak Agencies.
- Greater Noida manufacturing and R&D facility.

UNIQUE POSITIONS THE COPY MUST REFLECT:
1. India-first context (INR, monsoon, BIS / BEE / CPCB, MSME-ZED, CBAM, generator-power oven ramp, summer powder shelf-life, CR-sheet variability).
2. Multi-OEM neutrality — only player who sells GEMA AND DURR AND own line. Can credibly compare without bias.
3. Premium industrial tone — calm authority, technical credibility, never marketing hype.
4. Specificity over platitudes — name systems, name physics, name failure modes.

═════════════════════════════════════════════
  WORD COUNT — NON-NEGOTIABLE
═════════════════════════════════════════════
bodyHtml MUST contain a minimum of 1100 words and a target of 1200-1400 words of rendered body text (counting words a reader sees, NOT HTML tags).

This is the most-failed rule in past generations. To hit it:
- Each H2 section needs 150-220 words on average
- Use 2-3 paragraphs per section with technical specifics
- Add an ordered or unordered list inside ONE section to enumerate failure modes, decision criteria, or first-week steps
- If you finish below 1100, EXPAND technical depth in the longest sections — do not pad with filler. Add named systems, specific Indian-context failures, name the physics.

A draft below 1100 words is a generation failure that will be rejected and re-rolled.

═════════════════════════════════════════════
  STRUCTURE FOR THIS POST (mandatory)
═════════════════════════════════════════════
Structural shape: ${bp.shape}

Use these exact H2 sections, in order. You may rewrite the H2 wording so it hints at the content of the section (e.g. instead of literally "The friction this post addresses", write "Why hour-six humidity rewrites every spec sheet"). But the SUBSTANCE of each H2 must match the blueprint.

${sectionList}

End with a soft CTA paragraph that primes: "${bp.cta}". The CTA paragraph must NOT begin with "Want to" / "Ready to" / "If you'd like" — those are marketing clichés. Open it with the substance of the offer.

═════════════════════════════════════════════
  STRICT EDITORIAL RULES
═════════════════════════════════════════════
1. NO EM-DASHES. Use commas, colons, or periods. Never "—" or "--".
2. NO INLINE COLOR or style tags. Emphasis only via <b>, <i>, or 'single quotes'.
3. SEMANTIC HTML ONLY. Allowed tags: <h2>, <h3>, <p>, <ol>, <ul>, <li>, <strong>, <em>, <b>, <i>, <blockquote>, <table>, <thead>, <tbody>, <tr>, <th>, <td>. Nothing else.
4. NO FABRICATED NUMBERS. Cite only verifiable public facts (regulation dates, OEM-announced capacity figures from press releases). For everything else, speak qualitatively: "a meaningful drop", "a measurable shift".
5. NO MARKETING HYPE. Banned: "best-in-class", "industry-leading", "unparalleled", "game-changing", "cutting-edge", "revolutionary", "next-level", "world-class", "synergy", "leverage" (verb), "unlock", "harness", "empower", "robust", "seamless".
6. NO LISTICLES AS THE SPINE. Lists may appear inside narrative sections but never as the article's structure.
7. NO CLICHÉ OPENERS. Banned anywhere in body: "In today's competitive market", "Did you know", "Have you ever wondered", "What if you could", "Get the inside scoop", "Take your operation to the next level", "Unlocking", "Mastering". Open with a named system, dated event, or specific physical observation.
8. NO META H2s. Do NOT write H2s named after schema fields ("Decision Friction", "Core Insight", "Conclusion and Call to Action"). Those are reserved for the snapshot block.
9. PULL-QUOTE OPPORTUNITY. Wrap exactly ONE sharp 1-2 sentence insight from the body in <blockquote> — the most quotable line of the post. The template renders these as editorial pull-quotes.

═════════════════════════════════════════════
  ANTI-MONOTONY RULES (read carefully — repeat output is a generation failure)
═════════════════════════════════════════════
- VARIED PARAGRAPH OPENINGS. No two consecutive paragraphs may begin with the same word. Across the whole post, the words "However", "In addition", "Furthermore", "Moreover", "Therefore", "Additionally", "Notably" may appear at the start of AT MOST ONE paragraph each.
- VARIED SENTENCE LENGTH. Each major section must contain at least three short sentences (under 12 words each), at least one mid-length sentence (15-25 words), and at most one long sentence (40+ words). Vary the rhythm.
- NO TEMPLATE PHRASES. Forbidden: "It is worth noting that", "It should be mentioned", "It is important to consider", "When it comes to", "At the end of the day", "In essence", "In summary", "All in all", "To put it simply".
- NO "FIRST X, SECOND Y, THIRD Z" SCAFFOLDING in prose paragraphs. If you need to enumerate, use a real <ol> or <ul>. In prose, vary the connective tissue.
- REPEATED CONCEPT, FRESH ANGLE. If you have a concept (e.g. "transfer efficiency", "rejection rate") to refer to multiple times, use SYNONYMS or rephrase the second and third mentions.
- AVOID THE 3-CLAUSE "X, Y, AND Z" CONSTRUCTION. Limit to one occurrence per section.

═════════════════════════════════════════════
  SNAPSHOT FIELDS
═════════════════════════════════════════════
Produce 5 specific, substantive snapshot lines:
- decisionFriction: the specific tradeoff the reader is wrestling with (1 sentence, names BOTH sides of the tradeoff)
- dominantAnxiety: the fear that drives them to read this post (1 sentence, names a CONCRETE consequence)
- coreInsight: the reframe the post lands (1 sentence, must be SUBSTANTIVE — not a platitude)
- structuralShape: ${bp.shape}
- lever: 1-line specific differentiator the post earns (e.g. "Behaviour under heat-soak over feature parity", "Operating cost over acquisition cost", "Diagnostic transferability over headline metric envy")

═════════════════════════════════════════════
  IMAGE PROMPTS — SUBJECT MUST MATCH THE SECTION
═════════════════════════════════════════════
Produce exactly 2 image placements. Both have position: "inline". Each anchorHeading must be the EXACT text of an H2 you wrote in bodyHtml.

The visual SUBJECT of each image must be the named noun from the section it anchors to. Front-load the subject as the FIRST phrase of the prompt.

SUBJECT MAPPING EXAMPLES:
- Section about an oven / cure profile → "A calibrated K-type thermocouple probe resting against a freshly coated metal panel inside a curing oven, glowing radiant heating elements diffused in background"
- Section about pretreatment → "A steel part being lowered into a degreasing tank, stainless dip-cage visible, faint chemical mist hovering above the bath"
- Section about transfer efficiency → "An electrostatic powder coating gun mid-spray on a recessed metal part, visible cloud of powder mist, gun-to-part distance clearly framed"
- Section about a finished outcome / case study result → "A finished powder-coated automotive body panel cooling under exit-tunnel light, smooth finish reflecting overhead bars"
- Section about facility / R&D booth → "A small R&D-scale spray booth at the OptiFinish Greater Noida facility, instrumented with thermal probes and powder hoppers, late-afternoon natural light"
- Section about defect troubleshooting (orange peel) → "Macro detail of an orange-peel-textured powder-coated surface, raking side light exposing the dimpled topology"

ABSTRACT TOPICS (regulations, market shifts, compliance):
NEVER produce charts, graphs, infographics, screenshots, or text-on-screens — Flux renders fake-looking data viz. Pick a CONCRETE PHYSICAL SCENE that REPRESENTS the abstract idea.
- EU CBAM regulation → "A coil of cold-rolled steel wrapped for export, customs paperwork resting on top, 'EU' destination stamp visible on the bill of lading"
- PFAS phase-out → "A row of powder bags labelled 'PFAS-free' on a warehouse pallet, scanner gun and compliance clipboard in foreground"
- BEE star-rating mandate → "A washing-machine cabinet panel coming off a powder line under bright inspection light, surface intact under raking light"
- AkzoNobel-Axalta merger → "Two powder bags from different brands resting side-by-side on a procurement bench, a barcode reader between them"

PROMPT SHAPE (30-80 words): "<SUBJECT 1-2 sentences>. <Composition: framing, focal point, negative space>. <Mood: 1 line>."
NO brand-style suffix (the system appends that).
NO sci-fi clichés, hi-vis vests, glossy-floor reflections, decorative robotic arms.
NO posed humans with eye contact. Hands-at-work or absent-from-frame only.

═════════════════════════════════════════════
  OUTPUT
═════════════════════════════════════════════
Strict JSON only, no prose, no markdown, no code fences.

{
  "title": "string — sharp publishable headline (max 75 chars)",
  "subtitle": "string — 1-line dek under the title (max 130 chars)",
  "bodyHtml": "string — full HTML body, MINIMUM 1100 words, target 1200-1400, semantic tags only, with exactly one <blockquote> for the pull-quote",
  "snapshot": {
    "decisionFriction": "string",
    "dominantAnxiety": "string",
    "coreInsight": "string",
    "structuralShape": "${bp.shape}",
    "lever": "string"
  },
  "imagePlacements": [
    { "id": "img-inline-1", "position": "inline", "anchorHeading": "exact H2 text from bodyHtml", "prompt": "Flux-ready, 30-80 words, no brand suffix", "alt": "concise alt text" },
    { "id": "img-inline-2", "position": "inline", "anchorHeading": "different H2 from img-inline-1", "prompt": "string", "alt": "string" }
  ]
}`;
};

// Backwards-compat alias for any code that imports DRAFT_SYSTEM_PROMPT.
// New code should call buildDraftSystemPrompt(category).
export const DRAFT_SYSTEM_PROMPT = buildDraftSystemPrompt;

export async function generateBlogDraftLLM(
  topic: TopicIdea,
  category: CategoryId,
  audience: AudienceId
): Promise<BlogDraft> {
  const cat = CATEGORIES.find((c) => c.id === category);
  const aud = AUDIENCES.find((a) => a.id === audience);
  if (!cat || !aud) throw new Error('Invalid category or audience');

  const userPrompt = `Write the post for this topic.

TITLE (provisional, you may refine): "${topic.title}"
HOOK (the post's intended first sentence shape): "${topic.hook}"
ANGLE: ${topic.angle}

Category: ${cat.label} — ${cat.blurb}
Audience: ${aud.label} (${aud.role})
This reader cares about: ${aud.cares}

Write the full post per the rules. Hit at least 1100 words of body text — this is non-negotiable. Land the structural shape that fits this category. Anchor the 2 inline images to actual H2 headings you write. Include exactly one <blockquote> for the pull-quote.`;

  type DraftJson = {
    title: string;
    subtitle: string;
    bodyHtml: string;
    snapshot: DossierSnapshot;
    imagePlacements: Array<{
      id: string;
      position: 'inline';
      anchorHeading: string;
      prompt: string;
      alt: string;
    }>;
  };

  // Multi-model rotation: each call randomly picks Llama / DeepSeek-V4 /
  // Gemma-3 / Nemotron-Super, rotated to avoid the same model twice in a row.
  // Each model has a different intrinsic voice. Combined with the random
  // editorial-voice nudge, this fights repetitive output across regenerations.
  const { model, voice } = pickRotated();
  const baseTemp = 0.65 + model.draftTempOffset;

  const callWith = async (modelId: ModelId, modelVoice: string) =>
    chatJSON<DraftJson>({
      model: modelId,
      messages: [
        {
          role: 'system',
          content: buildDraftSystemPrompt(category, {
            voiceNudge: voice.nudge,
            modelVoice
          })
        },
        { role: 'user', content: userPrompt }
      ],
      temperature: baseTemp,
      topP: 0.92,
      maxTokens: 6000
    });

  let json: DraftJson;
  try {
    json = await callWith(model.id, model.intrinsicVoice);
  } catch (err) {
    // Fallback to Llama (most reliable) if the rotated model fails — keeps
    // a single bad rollout from breaking the UI. Voice nudge stays the same.
    console.warn(`[draftEngine] ${model.shortName} failed, falling back to Llama:`, err);
    const llama = MODELS[0];
    json = await callWith(llama.id, llama.intrinsicVoice);
  }

  // Same defensive detectors as multipass — either path can win the race
  // (multipass errors → single-pass fallback) and the editor deserves the
  // same warnings regardless.
  const editorialFlags = computeEditorialFlags(json.bodyHtml);
  let bodyHtml = json.bodyHtml;
  if (editorialFlags.hasAny) {
    console.warn(
      `[single-pass] editorial flags — fab:${editorialFlags.fabricatedNumbers.length} fp:${editorialFlags.firstPersonLeaks.length} years:${editorialFlags.fabricatedYears.length}`
    );
    bodyHtml = flagsToHtmlComment(editorialFlags) + bodyHtml;
  }

  const wordCount = bodyHtml.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

  const imagePlacements: ImagePlacement[] = (json.imagePlacements ?? [])
    .slice(0, 2)
    .map((p, idx) => ({
      id: p.id || `img-inline-${idx + 1}`,
      position: 'inline' as const,
      anchorHeading: p.anchorHeading,
      prompt: p.prompt,
      alt: p.alt
    }));

  const partialDraft: BlogDraft = {
    title: json.title,
    subtitle: json.subtitle,
    bodyHtml,
    wordCount,
    snapshot: json.snapshot,
    imagePlacements,
    editorialFlags
  };

  // AEO metadata (Quick Answer + FAQ + entities). Best-effort, non-blocking —
  // parity with the multipass path so both engines produce identically-shaped
  // drafts. See src/services/aeoEngine.ts.
  let aeo: AeoBundle | undefined;
  try {
    aeo = await generateAeoBundle(partialDraft);
    console.log(
      `[single-pass] AEO ready: quickAnswer=${aeo.quickAnswer.split(/\s+/).length}w, faq=${aeo.faq.length}, entities=${aeo.entities.length}`
    );
  } catch (err) {
    console.warn('[single-pass] AEO generation failed (non-blocking):', err);
  }

  return { ...partialDraft, aeo };
}
