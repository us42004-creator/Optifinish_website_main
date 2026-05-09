// Multi-pass blog draft generation. Replaces the single-shot prompt with a
// 3-pass pipeline:
//
//   Pass 1 — OUTLINE     : one LLM call, returns title + snapshot + 6-8
//                          section headings + intents + word targets +
//                          image anchor headings + image prompts.
//                          Tiny payload, fast (~10s).
//
//   Pass 2 — EXPAND      : N LLM calls IN PARALLEL, one per section.
//                          Each section gets the model's full attention
//                          and reliably hits its 180-220 word target.
//                          This kills the 500-word JSON-mode ceiling
//                          we kept hitting in single-pass mode.
//
//   Pass 3 — EDITORIAL   : one LLM call (Gemma — crisp, declarative
//                          editor voice). Reads the assembled body and
//                          returns a polished version: kills clichés,
//                          repetition across sections, duplicate phrasings
//                          of the same concept. Preserves H2s and the
//                          blockquote.

import {
  CategoryId,
  AudienceId,
  TopicIdea,
  BlogDraft,
  ImagePlacement,
  DossierSnapshot,
  StructuralShape
} from '../types';
import { CATEGORIES, AUDIENCES } from '../constants';
import { chatJSON, chatCompletion, parseJsonish } from './nvidiaLlmService';
import { pickRotated, pickRandom, MODELS, ModelEntry, ModelId } from './modelRouter';
import { CATEGORY_BLUEPRINT } from './draftEngine';

interface OutlineSection {
  id: string;
  heading: string;
  intent: string;
  wordTarget: number;
  hasPullQuote: boolean;
}

interface OutlineJson {
  title: string;
  subtitle: string;
  snapshot: DossierSnapshot;
  sections: OutlineSection[];
  imagePlacements: Array<{
    id: string;
    position: 'inline';
    anchorHeading: string;
    prompt: string;
    alt: string;
  }>;
}

// ─────────────────────────────────────────────────────────────
// Pass 1 — Outline
// ─────────────────────────────────────────────────────────────
function buildOutlinePrompt(
  category: CategoryId,
  voiceNudge: string,
  modelVoice: string
): string {
  const bp = CATEGORY_BLUEPRINT[category];
  const sectionGuide = bp.sections.map((s, i) => `${i + 1}. ${s}`).join('\n');

  return `You are the OptiFinish editorial outliner. You produce only the OUTLINE for one blog post — not the body. The outline drives parallel per-section expansion next.

OPTIFINISH CONTEXT:
Indian B2B industrial powder coating equipment company (parent: VACSPL). Sells own plants/ovens/booths/automation (Z-TAP, ZA01). Authorised India partners for GEMA and DURR. Greater Noida facility.

UNIQUE POSITIONS THE COPY MUST REFLECT:
1. India-first (INR, monsoon, BIS / BEE / CPCB, MSME-ZED, CBAM, generator-power, summer powder shelf-life)
2. Multi-OEM neutrality (only player who sells GEMA AND DURR AND own line)
3. Premium industrial tone, never marketing hype
4. Specificity over platitudes

YOUR INTRINSIC VOICE THIS RUN: ${modelVoice}.

EDITORIAL VOICE NUDGE FOR THIS RUN:
${voiceNudge}

═════════════════════════════════════════════
  STRUCTURE (mandatory)
═════════════════════════════════════════════
Structural shape: ${bp.shape}
Use these section ideas in this order. You may rewrite the heading wording so it hints at the actual content, but the SUBSTANCE of each section must match. Aim for 6-8 sections.

${sectionGuide}

═════════════════════════════════════════════
  HEADING QUALITY RULES (these matter — most-failed in past runs)
═════════════════════════════════════════════
- NO META HEADINGS. Forbidden: "Introduction", "Conclusion", "Conclusion and Next Steps", "Decision Friction", "Core Insight", "Benefits of …".
- Each heading must HINT AT CONTENT. Bad: "Cure Window Control". Good: "The thermal profile that decides adhesion" / "Why hour-six humidity rewrites every spec sheet".
- Headings must vary in shape across the post. Mix declarative, imperative, and pointed-question forms. No two consecutive headings share an opening word.

═════════════════════════════════════════════
  SECTION INTENT RULES
═════════════════════════════════════════════
The "intent" field tells the writer who'll expand this section EXACTLY what physical content goes in:
- name the systems (e.g. "GEMA OptiSpray pump", "Dürr EcoBell4")
- name the failure modes (e.g. "outgassing on cast aluminium during monsoon")
- name the verifiable triggers (regulation date, OEM-announced figure)
- avoid generic descriptions like "discuss the importance of cure window control"

═════════════════════════════════════════════
  SNAPSHOT FIELDS
═════════════════════════════════════════════
- decisionFriction: the specific tradeoff (1 sentence, names BOTH sides)
- dominantAnxiety: the fear (1 sentence, names a CONCRETE consequence)
- coreInsight: the substantive reframe (1 sentence — never a platitude)
- structuralShape: ${bp.shape}
- lever: 1-line specific differentiator (e.g. "Behaviour under heat-soak over feature parity")

═════════════════════════════════════════════
  IMAGE PROMPTS (subject must match section)
═════════════════════════════════════════════
Exactly 2 image placements. Both inline. anchorHeading must be EXACT text of one section heading you wrote.
Front-load a CONCRETE PHYSICAL SUBJECT in the prompt's first sentence. NO charts/graphs/infographics. NO sci-fi clichés. NO posed humans with eye contact. 30-80 words per prompt.

Subject guidance per topic type:
- ovens / cure → "K-type thermocouple resting against a coated panel inside a curing oven, glowing radiant elements diffused…"
- transfer efficiency → "electrostatic powder coating gun mid-spray on a recessed metal part, visible powder mist…"
- pretreatment → "steel part being lowered into a degreasing tank, stainless dip-cage visible…"
- facility / R&D → "small R&D-scale spray booth at OptiFinish Greater Noida, instrumented with thermal probes…"
- finished outcome → "finished powder-coated automotive panel cooling under exit-tunnel light…"
- abstract regulation (CBAM, PFAS, BEE) → CONCRETE physical scene representing it: "coil of cold-rolled steel wrapped for export with EU customs paperwork on top…"

═════════════════════════════════════════════
  WORD TARGETS
═════════════════════════════════════════════
Each section's wordTarget must be 170-220. The 6-8 sections together must SUM to 1100-1400.

Mark exactly ONE section as hasPullQuote: true — the section most likely to contain the post's quotable insight (typically a section that lands the core reframe).

═════════════════════════════════════════════
  OUTPUT
═════════════════════════════════════════════
Strict JSON only.

{
  "title": "string (max 75 chars)",
  "subtitle": "string (max 130 chars)",
  "snapshot": {
    "decisionFriction": "",
    "dominantAnxiety": "",
    "coreInsight": "",
    "structuralShape": "${bp.shape}",
    "lever": ""
  },
  "sections": [
    { "id": "s1", "heading": "string", "intent": "string", "wordTarget": 200, "hasPullQuote": false }
  ],
  "imagePlacements": [
    { "id": "img-inline-1", "position": "inline", "anchorHeading": "exact heading from sections", "prompt": "string", "alt": "string" },
    { "id": "img-inline-2", "position": "inline", "anchorHeading": "different heading from sections", "prompt": "string", "alt": "string" }
  ]
}`;
}

async function runOutlinePass(
  topic: TopicIdea,
  category: CategoryId,
  audience: AudienceId,
  model: ModelEntry,
  voiceNudge: string
): Promise<OutlineJson> {
  const cat = CATEGORIES.find((c) => c.id === category)!;
  const aud = AUDIENCES.find((a) => a.id === audience)!;

  const userPrompt = `Outline this post.

TITLE (provisional): "${topic.title}"
HOOK: "${topic.hook}"
ANGLE: ${topic.angle}

Category: ${cat.label} — ${cat.blurb}
Audience: ${aud.label} (${aud.role})
Reader cares about: ${aud.cares}

Produce 6-8 sections. Section wordTargets must sum to 1100-1400. Mark exactly one section hasPullQuote: true. Anchor 2 inline images to two different section headings you wrote (exact text match).`;

  return chatJSON<OutlineJson>({
    model: model.id,
    messages: [
      { role: 'system', content: buildOutlinePrompt(category, voiceNudge, model.intrinsicVoice) },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.7,
    topP: 0.92,
    maxTokens: 3500
  });
}

// ─────────────────────────────────────────────────────────────
// Pass 2 — Expand each section in parallel
// ─────────────────────────────────────────────────────────────
function buildExpandPrompt(modelVoice: string, voiceNudge: string): string {
  return `You are the OptiFinish editorial writer expanding ONE section of a blog post. Output only this section's body HTML — no <h2> (the orchestrator adds it), no preamble, just the paragraphs/lists/optional blockquote.

OPTIFINISH CONTEXT:
Indian B2B industrial powder coating equipment company. Sells own plants/ovens/booths/automation (Z-TAP). Authorised India partners for GEMA and DURR. Greater Noida facility.

YOUR INTRINSIC VOICE THIS RUN: ${modelVoice}.

EDITORIAL VOICE NUDGE FOR THIS RUN:
${voiceNudge}

═════════════════════════════════════════════
  STRICT EDITORIAL RULES
═════════════════════════════════════════════
1. NO EM-DASHES. Use commas, colons, periods. Never "—" or "--".
2. NO INLINE COLOR or style tags. Emphasis only via <b>, <i>, or 'single quotes'.
3. SEMANTIC HTML ONLY. Tags allowed: <p>, <ol>, <ul>, <li>, <strong>, <em>, <b>, <i>, <blockquote>.
4. NO FABRICATED NUMBERS. Cite only verifiable public facts (regulation dates, OEM-announced capacity figures from press releases). Otherwise speak qualitatively: "a meaningful drop", "a measurable shift".
5. NO MARKETING HYPE. Banned: best-in-class, industry-leading, unparalleled, game-changing, cutting-edge, revolutionary, next-level, world-class, synergy, leverage (verb), unlock, harness, empower, robust, seamless.
6. NO CLICHÉ OPENERS. Banned: "In today's competitive market", "Did you know", "Have you ever wondered", "What if you could", "Get the inside scoop", "Take your operation to the next level", "Unlocking", "Mastering".
7. NO TEMPLATE PHRASES. Banned: "It is worth noting that", "It should be mentioned", "When it comes to", "At the end of the day", "In essence", "All in all", "To put it simply".

═════════════════════════════════════════════
  ANTI-MONOTONY RULES (read carefully)
═════════════════════════════════════════════
- VARIED PARAGRAPH OPENINGS. No two consecutive paragraphs may begin with the same word.
- VARIED SENTENCE LENGTH. ≥3 short sentences (<12 words), ≥1 mid (15-25), ≤1 long (40+).
- NO "FIRST X, SECOND Y, THIRD Z" SCAFFOLDING in prose. Use real <ol>/<ul> for enumeration.
- AVOID 3-CLAUSE "X, Y, AND Z": maximum one occurrence per section.

═════════════════════════════════════════════
  OUTPUT
═════════════════════════════════════════════
Strict JSON only.

{
  "html": "string — body HTML for this section only, no <h2>"
}`;
}

async function runExpandPass(
  outline: OutlineJson,
  section: OutlineSection,
  prevSection: OutlineSection | null,
  nextSection: OutlineSection | null,
  category: CategoryId,
  audience: AudienceId,
  model: ModelEntry,
  voiceNudge: string
): Promise<string> {
  const cat = CATEGORIES.find((c) => c.id === category)!;
  const aud = AUDIENCES.find((a) => a.id === audience)!;

  const continuity =
    (prevSection ? `\nPrevious section was: "${prevSection.heading}" — covered: ${prevSection.intent}. Do not repeat that material.` : '') +
    (nextSection ? `\nNext section will be: "${nextSection.heading}" — will cover: ${nextSection.intent}. Set up that handoff but do not preempt it.` : '');

  const userPrompt = `Expand this section.

POST CONTEXT:
- Title: "${outline.title}"
- Category: ${cat.label} — ${cat.blurb}
- Audience: ${aud.label} (${aud.role}) — cares about: ${aud.cares}

THIS SECTION:
- Heading (already in the post, do not repeat in your output): "${section.heading}"
- Intent: ${section.intent}
- Word target: ${section.wordTarget} words (acceptable range: ${Math.round(section.wordTarget * 0.85)}-${Math.round(section.wordTarget * 1.2)})
${continuity}

CONSTRAINTS:
- Output 2-3 paragraphs of body HTML.
${section.hasPullQuote ? '- Include exactly ONE <blockquote> wrapping the most quotable line of this section. Pick the sharpest reframe in your prose and quote it.' : '- DO NOT include <blockquote>.'}
- An <ol> or <ul> may appear if it makes sense for enumerating failure modes or decision criteria. Optional.

Apply ALL anti-monotony, no-fabricated-numbers, no-marketing-hype, no-cliché rules.`;

  // For models without JSON-mode support (Gemma), the chatJSON helper
  // already skips response_format and parses defensively. The "Strict JSON
  // only" instruction in the prompt usually suffices.
  const result = await chatJSON<{ html: string }>({
    model: model.id,
    messages: [
      { role: 'system', content: buildExpandPrompt(model.intrinsicVoice, voiceNudge) },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.65 + model.draftTempOffset,
    topP: 0.92,
    maxTokens: Math.min(1500, model.maxTokensCap)
  });

  return result.html?.trim() || '';
}

// ─────────────────────────────────────────────────────────────
// Pass 3 — Editorial scrub
// ─────────────────────────────────────────────────────────────
const EDIT_SYSTEM_PROMPT = `You are a senior B2B technical editor reviewing one OptiFinish blog draft. Your job is to TIGHTEN, not rewrite. Preserve every H2 heading exactly. Preserve the <blockquote>. Keep total word count within ±5% of the input.

WHAT TO FIX:
- Cliché openers and template phrases ("It is worth noting", "When it comes to", "At the end of the day", "In essence", "All in all").
- Marketing hype ("best-in-class", "industry-leading", "game-changing", "cutting-edge", "robust", "seamless", "synergy", "leverage" as verb, "unlock", "harness", "empower").
- Repetitive paragraph openings — if two consecutive paragraphs start with the same word, vary the second.
- Cross-section concept repetition — if "transfer efficiency" appears identically in 3 sections, replace 1-2 with synonyms or rephrasings.
- Em-dashes — replace with commas, colons, or periods.
- Generic 3-clause "X, Y, and Z" overused — limit to one per section.

WHAT NOT TO TOUCH:
- H2 headings (preserve exactly).
- The <blockquote> (preserve exactly, including the words inside).
- Concrete claims (named systems, dated regulations, verifiable OEM figures) — leave them alone.
- Section count or order.

WHAT NOT TO ADD:
- New numbers (especially percentages or INR figures).
- New claims.
- Editorial commentary or notes.

OUTPUT: Return ONLY the polished body HTML. No JSON wrapper, no markdown code fences, no preamble, no explanation. The first character of your output must be '<' (the start of an HTML tag).`;

async function runEditPass(fullBodyHtml: string): Promise<string> {
  // Gemma 3 12B — plain-text output (Gemma on NVIDIA Build rejects
  // response_format). 90s ceiling — sections were already expanded
  // individually so the body is solid even if scrub gets skipped.
  const editPromise = chatCompletion({
    model: 'google/gemma-3-12b-it',
    messages: [
      { role: 'system', content: EDIT_SYSTEM_PROMPT },
      { role: 'user', content: `Edit this draft. Tighten only. Preserve all H2s and any blockquote.\n\n${fullBodyHtml}` }
    ],
    temperature: 0.4,
    topP: 0.9,
    maxTokens: 4000
  });
  const timeoutPromise = new Promise<string>((_, reject) =>
    setTimeout(() => reject(new Error('editorial scrub exceeded 90s ceiling')), 90_000)
  );
  const text = await Promise.race([editPromise, timeoutPromise]);
  const trimmed = text.trim().replace(/^```(?:html)?\s*/i, '').replace(/\s*```$/i, '');
  const ltIdx = trimmed.indexOf('<');
  return ltIdx >= 0 ? trimmed.slice(ltIdx) : fullBodyHtml;
}

// ─────────────────────────────────────────────────────────────
// Orchestrator
// ─────────────────────────────────────────────────────────────
export async function generateBlogDraftMultipass(
  topic: TopicIdea,
  category: CategoryId,
  audience: AudienceId
): Promise<BlogDraft> {
  const cat = CATEGORIES.find((c) => c.id === category);
  const aud = AUDIENCES.find((a) => a.id === audience);
  if (!cat || !aud) throw new Error('Invalid category or audience');

  // Pick ONE model + voice for the whole draft so the post reads with one
  // voice across its sections. Different draft → different model. Editorial
  // pass below uses a different model regardless.
  const { model, voice } = pickRotated();
  console.log(`[multipass] model: ${model.shortName}, voice: ${voice.id}`);

  // ─── Pass 1: outline ───
  // Outline returns rich nested JSON. Run it on a model that supports
  // response_format (Gemma doesn't, so for Gemma drafts the outline still
  // uses Llama and the per-section voice nudge carries the Gemma feel
  // through the rest of the pipeline).
  const outlineModel = model.supportsJsonMode
    ? model
    : MODELS.find((m) => m.supportsJsonMode) ?? MODELS[0];
  if (outlineModel.id !== model.id) {
    console.log(`[multipass] outline on ${outlineModel.shortName} (rotated model ${model.shortName} lacks JSON mode)`);
  }
  const t0 = Date.now();
  let outline: OutlineJson;
  try {
    outline = await runOutlinePass(topic, category, audience, outlineModel, voice.nudge);
  } catch (err) {
    console.warn(`[multipass] outline failed on ${outlineModel.shortName}, falling back to Llama:`, err);
    outline = await runOutlinePass(topic, category, audience, MODELS[0], voice.nudge);
  }
  console.log(`[multipass] outline ready (${((Date.now() - t0) / 1000).toFixed(1)}s, ${outline.sections.length} sections)`);

  // ─── Pass 2: expand each section in parallel ───
  const t1 = Date.now();
  const sectionResults = await Promise.allSettled(
    outline.sections.map((sec, i) =>
      runExpandPass(
        outline,
        sec,
        i > 0 ? outline.sections[i - 1] : null,
        i < outline.sections.length - 1 ? outline.sections[i + 1] : null,
        category,
        audience,
        model,
        voice.nudge
      )
    )
  );
  const sectionHtmls = sectionResults.map((r, i) => {
    if (r.status === 'fulfilled') return r.value;
    console.warn(`[multipass] section ${i + 1} expand failed:`, r.reason);
    // Graceful fallback so a single bad section doesn't kill the whole post
    return `<p><em>Section content pending. Retrying generation will fill this in.</em></p>`;
  });
  console.log(`[multipass] all ${outline.sections.length} sections expanded in parallel (${((Date.now() - t1) / 1000).toFixed(1)}s)`);

  // Assemble: <h2>heading</h2> + section html, separated by blank lines
  let assembled = outline.sections
    .map((sec, i) => `<h2>${escapeHtml(sec.heading)}</h2>\n${sectionHtmls[i]}`)
    .join('\n\n');

  // ─── Pass 3: editorial scrub (Gemma) ───
  const t2 = Date.now();
  let polished: string;
  try {
    polished = await runEditPass(assembled);
    console.log(`[multipass] editorial scrub done (${((Date.now() - t2) / 1000).toFixed(1)}s)`);
  } catch (err) {
    console.warn('[multipass] editorial pass failed, shipping un-polished body:', err);
    polished = assembled;
  }

  // Sanity check: did the edit pass shrink the body too much?
  const origCount = wordCountOf(assembled);
  const polishedCount = wordCountOf(polished);
  if (polishedCount < origCount * 0.85) {
    console.warn(`[multipass] edit pass shrank body too much (${origCount} → ${polishedCount} words), reverting`);
    polished = assembled;
  }

  const wordCount = wordCountOf(polished);

  const imagePlacements: ImagePlacement[] = (outline.imagePlacements ?? [])
    .slice(0, 2)
    .map((p, idx) => ({
      id: p.id || `img-inline-${idx + 1}`,
      position: 'inline' as const,
      anchorHeading: p.anchorHeading,
      prompt: p.prompt,
      alt: p.alt
    }));

  return {
    title: outline.title,
    subtitle: outline.subtitle,
    bodyHtml: polished,
    wordCount,
    snapshot: outline.snapshot,
    imagePlacements
  };
}

function wordCountOf(html: string): number {
  return html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
}

function escapeHtml(s: string): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
