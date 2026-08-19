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
  // NEW: the lead paragraph (one paragraph of 60-110 words) that sits ABOVE
  // the first H2. Critical so that (a) the drop cap renders, (b) the first
  // inline image doesn't sit awkwardly at the very top of the post.
  leadParagraph: string;
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
2. Multi-OEM neutrality. OptiFinish is the authorised India partner for GEMA and DURR — they are PRODUCTS OPTIFINISH SELLS, not competitors. Never frame "GEMA vs OptiFinish" or "DURR vs OptiFinish". For comparison posts, the contrast is between buyer OPTIONS (manual vs automatic, in-line vs batch, brand A vs brand B all available through OptiFinish), never between OptiFinish and its partner brands.
3. Premium industrial tone, never marketing hype
4. Specificity over platitudes (BUT see "no fabricated numbers" below — specificity = named systems + dated events, NOT invented percentages)

HARD RULES (the outline must respect these for downstream expansion to work):
- NO FABRICATED NUMBERS. Section intents must NOT instruct the writer to "cite 22% reduction" or "98% yield" or any made-up statistic. The only numbers allowed are: regulation dates, OEM press-release capacity figures, INR capex BANDS (qualitative ranges, e.g. "small-line capex band"), or facts already in the trigger pool.
- NO FIRST-PERSON. Section intents must not direct the writer to write as "we" / "us" / "our facility". OptiFinish is named in third person.

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
  IMAGE PROMPTS (most-failed rule — read carefully)
═════════════════════════════════════════════
Exactly 2 image placements. Both inline. anchorHeading must be EXACT text of one section heading you wrote.

The image goes to an AI image model (Flux) that produces ONE photographic frame per prompt. It CANNOT:
- show two booths side-by-side for comparison
- render a labelled cross-section or exploded diagram
- highlight named sub-systems with callouts
- render branded products by company name (no "GEMA OptiSpray" logo on a pump)
- show split-screens, before/after frames, or comparison grids
- render readable text on signs, screens, or labels
- show data charts, infographics, or screenshots

If a section's content is genuinely a COMPARISON or a DIAGRAM, anchor the image to a DIFFERENT section that has a single concrete photographable subject. The post can have brilliant comparison TABLES in prose without needing a comparison IMAGE.

HARD-BANNED PROMPT PATTERNS (writing any of these is a generation failure):
- "side-by-side"
- "vs", "versus", "compared to", "comparison"
- "illustrated", "illustration"
- "cross-section", "cut-away", "exploded view"
- "diagram", "schematic", "infographic", "blueprint"
- "highlighting", "labelled", "labeled", "annotated", "callouts"
- "split-screen", "before and after"
- "showing the X branding", "with X logo visible"

REQUIRED PROMPT SHAPE (30-80 words):
First sentence = one concrete physical subject in the scene + framing. Second sentence = light + mood. Third (optional) = a small specific detail anchoring the scene to OptiFinish's world.

GOOD EXAMPLES (study these):
- "A K-type thermocouple resting against a freshly coated metal panel inside an industrial curing oven, glowing radiant heating elements diffused in the background. Side light, gentle falloff into shadow. Macro framing on the probe tip."
- "An electrostatic powder coating gun mid-spray on a recessed metal part, visible cloud of powder mist between gun and substrate. Soft cool overhead light from a high window. Gun-to-part distance clearly framed."
- "A finished powder-coated automotive body panel cooling under exit-tunnel light, smooth gloss surface catching parallel highlights from overhead bars. Cinematic chiaroscuro with a single warm key light. Conveyor hook visible."
- For abstract regulatory topics → CONCRETE physical scene representing the regulation: "A coil of cold-rolled steel wrapped for export, customs paperwork resting on top, EU destination stamp on the bill of lading. Loading-bay setting. Forklift fork tine at frame edge."

BAD EXAMPLES (would be rejected):
- ✗ "A side-by-side comparison of GEMA booth vs OptiFinish booth showing condensation differences"
- ✗ "An illustrated cross-section of an OptiFinish booth highlighting the 4 sub-systems"
- ✗ "Infographic showing throughput vs cost across configurations"
- ✗ "A diagram of the cure-window control system with labelled components"

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
  "leadParagraph": "string (60-110 words, sits above the first H2, sets the scene without any first-person and without any fabricated numbers; opens with a concrete physical observation, a dated trigger, or a sharp question — NEVER 'In today's', 'Did you know', 'Have you ever')",
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
4. NO MARKETING HYPE. Banned: best-in-class, industry-leading, unparalleled, game-changing, cutting-edge, revolutionary, next-level, world-class, synergy, leverage (verb), unlock, harness, empower, robust, seamless.
5. NO CLICHÉ OPENERS. Banned: "In today's competitive market", "Did you know", "Have you ever wondered", "What if you could", "Get the inside scoop", "Take your operation to the next level", "Unlocking", "Mastering".
6. NO TEMPLATE PHRASES. Banned: "It is worth noting that", "It should be mentioned", "When it comes to", "At the end of the day", "In essence", "All in all", "To put it simply".

═════════════════════════════════════════════
  HARD RULE: NO FABRICATED NUMBERS (most-violated rule)
═════════════════════════════════════════════
This is the rule that gets broken most often and damages OptiFinish's credibility the hardest. A B2B technical reader catches a made-up statistic in five seconds and never trusts the post again.

BANNED — never invent any of these:
- Percentages tied to outcomes: "22% reduction in re-coats", "98% first-pass yield", "31% QC cost cut", "5°C shift reduces recovery 12%". If you didn't read it in a published source, you don't know it.
- Specific temperatures, humidity %, particle sizes: "92% humidity by 6 AM", "35°C inside booths", "99.97% of particles >0.3μm". Use qualitative ranges instead ("morning humidity peaks", "summer interior temperatures", "fine particulate filtration").
- INR figures, capex amounts, payback periods: "INR 4.5 cr capex", "18-month payback". Use "capex bands" or "payback in the order of one to two years" qualitatively.
- BIS / ISO / IEC standard numbers ("IS 7386") unless they are genuinely well-known and verifiable.
- Operating costs, energy savings, throughput gains stated as specific figures.

VERIFIABLE PUBLIC FACTS ARE OK (and good):
- Regulation dates: "BEE star-labelling mandatory 1 Jan 2026", "EU CBAM live since Jan 2026".
- OEM-announced capacity figures from press releases: "Mahindra's 500-robot Chakan paint shop".
- Named launches: "GEMA OptiSpray launched at FABTECH 2025".
- These came from the trigger pool in the outline; reuse them verbatim if relevant to this section. Do not extend them with new fabricated detail.

DEFAULT: when in doubt, use qualitative language. "a meaningful drop", "a measurable shift", "the kind of difference that shows up on the third-shift report". The body is not where you fabricate; it is where you reason.

═════════════════════════════════════════════
  HARD RULE: NO FIRST-PERSON IN THE BODY
═════════════════════════════════════════════
You are writing FOR OptiFinish, but you are NOT writing AS OptiFinish in the first person. Banned everywhere in the body:
"I", "me", "my", "mine", "we", "us", "our", "ours", "I'm", "I've", "we're", "we've".
ALSO banned: "our facility", "our team", "our experience", "in our view", "OptiFinish has", "OptiFinish offers", "OptiFinish believes", "we offer", "we provide", "we recommend".

The CTA paragraph at the end is the ONLY surface that may use second-person address ("Book a facility walk-through", "Schedule an audit") but still no "we/us/our".

REWRITES:
  ✗ "Our Greater Noida facility records 92% humidity at 6 AM."
  ✓ "At the OptiFinish facility in Greater Noida, morning humidity routinely peaks in the high-eighties."
  ✓ "Indian plants find that morning humidity routinely peaks above eighty percent."

  ✗ "We've seen plants struggle with this."
  ✓ "Plants struggle with this."

═════════════════════════════════════════════
  HARD RULE: MULTI-OEM NEUTRALITY
═════════════════════════════════════════════
OptiFinish IS the authorised India partner for GEMA and DURR. They are NOT competitors of OptiFinish — they are products OptiFinish sells.

In comparison posts, compare BUYER OPTIONS, not "us vs them":
  ✗ "GEMA booths have X. OptiFinish booths have Y." (false framing — both are sold by OptiFinish)
  ✓ "Between GEMA's booth line and OptiFinish's own-manufactured booth line — both available through OptiFinish — the buyer's question is X."
  ✓ "The decision between a manual and an automatic line, regardless of brand."

NEVER write copy that positions a partner brand as inferior to OptiFinish's own line. Compare on use-case fit, not on rank.

═════════════════════════════════════════════
  ANTI-MONOTONY RULES (read carefully)
═════════════════════════════════════════════
- VARIED PARAGRAPH OPENINGS. No two consecutive paragraphs may begin with the same word.
- VARIED SENTENCE LENGTH. ≥3 short sentences (<12 words), ≥1 mid (15-25), ≤1 long (40+).
- NO "FIRST X, SECOND Y, THIRD Z" SCAFFOLDING in prose. Use real <ol>/<ul> for enumeration.
- AVOID 3-CLAUSE "X, Y, AND Z": maximum one occurrence per section.

═════════════════════════════════════════════
  SPECIFICITY REQUIREMENT (this is where LLM prose fails hardest)
═════════════════════════════════════════════
Every section must contain AT LEAST TWO of the following concrete anchors — otherwise you are writing generic B2B slop:

1. A NAMED SYSTEM or noun (e.g. "the OptiSpray pump's canister", "a K-type thermocouple", "the exit tunnel", "cast-aluminium substrate", "the Faraday cage at the recess")
2. A SENSORY DETAIL — something a human on the shop floor would actually see, hear, feel, or smell ("the smell of curing oven exhaust at hour six", "the sound of a conveyor hook striking the frame", "the tactile grain of an orange-peel finish under a fingertip", "raking morning light exposing dry-spray patches", "the low hum of a properly balanced air handler")
3. A SPECIFIC PLACE OR TIME anchor ("Konkan-coast monsoon mornings", "post-lunch dip in cure profile", "hour six of the third shift", "the first Monday after a powder-brand change")
4. A NAMED PERSON-ROLE observation ("the operator who has run this booth for eight years", "the plant manager reviewing the third-shift rejection report", "the process engineer commissioning the line", "the QC supervisor cutting cross-hatches")

If a section reads like it could belong on any powder-coating website in any country, you have not applied this rule. Rewrite until it could only belong in an OptiFinish post grounded in the Indian shop floor.

═════════════════════════════════════════════
  ONE SHARP LINE PER SECTION
═════════════════════════════════════════════
Every section must contain AT LEAST ONE sentence that would work as a pull-quote — a compressed insight, ideally a reframe, in tight language. Not marketing punch. Editorial punch. Example shapes:

  ✓ "The rejection bin is the honest meter, not the spec sheet."
  ✓ "Cost per gun is easy to compare. Cost per rejected part is what runs the plant."
  ✓ "Faraday cage dropouts do not respect a torque wrench."

Bury the sharp line inside the paragraph — don't preface it with "In other words" or "put simply".

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

═══════════════════════════════════════════════════════════
  KILL THESE AI TELLS ON SIGHT (most damaging to credibility)
═══════════════════════════════════════════════════════════

BANNED SENTENCE OPENERS (rewrite the sentence entirely):
- "It is worth noting that"
- "It should be mentioned that"
- "It is important to consider"
- "One key consideration is"
- "In today's" (any variant)
- "In the world of"
- "In the realm of"
- "When it comes to"
- "At the end of the day"
- "In essence"
- "In summary"
- "All in all"
- "To put it simply"
- "In conclusion"
- "That said"
- "That being said"
- "Ultimately"
- "Fundamentally"
- "Interestingly"
- "Notably"
- "Additionally" as a first word (use "Also" or restructure)
- "Furthermore" as a first word
- "Moreover" as a first word

BANNED CONNECTIVES (bandaid words LLMs use to fake continuity):
- "In addition to this"
- "It's worth pointing out"
- "As previously mentioned"
- "As we've discussed"
- "As mentioned above"
- "As I mentioned earlier"

BANNED HYPE VOCABULARY (delete or replace with concrete):
- "best-in-class", "industry-leading", "unparalleled"
- "game-changing", "cutting-edge", "revolutionary"
- "next-level", "world-class", "state-of-the-art"
- "robust", "seamless", "synergy"
- "leverage" (as verb), "unlock", "harness", "empower"
- "ecosystem" (as buzzword)
- "solution" (as vague noun; name the actual thing)
- "streamline", "optimize" (as vague verbs)

BANNED CONCEPT-COVER PHRASES (they signal "I don't have specifics"):
- "a variety of"
- "a range of"
- "a number of"
- "various factors"
- "multiple aspects"
- "several considerations"

RHYTHM RULES:
- No two consecutive paragraphs may start with the same word.
- If two consecutive sentences within a paragraph both start with "The" or "This", vary one of them.
- Long 3-clause "X, Y, and Z" lists — max one per section.
- Passive-voice "is being" / "are being" constructions — rewrite to active if the actor is knowable.

CROSS-SECTION REPETITION:
- If a core noun (e.g. "transfer efficiency", "cure window") appears verbatim in 3+ sections, replace 1-2 mentions with a rephrasing that keeps the meaning but varies the surface form.

═══════════════════════════════════════════════════════════
  WHAT NOT TO TOUCH
═══════════════════════════════════════════════════════════
- H2 headings (preserve exactly).
- The <blockquote> (preserve exactly, including the words inside).
- Concrete claims (named systems, dated regulations, OEM-announced capacity figures) — leave them alone.
- Section count or order.

═══════════════════════════════════════════════════════════
  WHAT NOT TO ADD
═══════════════════════════════════════════════════════════
- New numbers (especially percentages, °C values, RH percentages, INR cr/lakh figures).
- New claims about OptiFinish, GEMA, DURR, Z-TAP or any named product.
- Editorial commentary, notes, or "here's what I changed" annotations.

OUTPUT: Return ONLY the polished body HTML. No JSON wrapper, no markdown code fences, no preamble, no explanation. The first character of your output must be '<' (the start of an HTML tag).`;

async function runEditPass(fullBodyHtml: string): Promise<string> {
  // Nemotron Super 49B — bigger than Gemma 12B, catches subtler cliché
  // patterns and has better instruction-following on complex "kill these
  // phrases" checklists. Plain-text output (skip JSON mode). 120s ceiling
  // — sections were already expanded individually so if scrub times out
  // the body is still solid.
  const editPromise = chatCompletion({
    model: 'nvidia/llama-3.3-nemotron-super-49b-v1',
    messages: [
      { role: 'system', content: EDIT_SYSTEM_PROMPT },
      { role: 'user', content: `Edit this draft. Tighten only. Preserve all H2s and any blockquote. Kill every banned phrase you find.\n\n${fullBodyHtml}` }
    ],
    temperature: 0.35,
    topP: 0.9,
    maxTokens: 5000
  });
  const timeoutPromise = new Promise<string>((_, reject) =>
    setTimeout(() => reject(new Error('editorial scrub exceeded 120s ceiling')), 120_000)
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

  // Assemble: leadParagraph + (<h2>heading</h2> + section html) repeated.
  // The lead paragraph sits ABOVE the first H2 so:
  //   (a) the template's drop cap has a paragraph to apply to
  //   (b) the image-injection at H2 anchors doesn't dump an image at the
  //       very top of the post with no opening prose above it.
  const lead = outline.leadParagraph?.trim()
    ? `<p class="lead">${outline.leadParagraph.trim()}</p>`
    : '';
  let assembled = [
    lead,
    ...outline.sections.map((sec, i) => `<h2>${escapeHtml(sec.heading)}</h2>\n${sectionHtmls[i]}`)
  ]
    .filter(Boolean)
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

  // Defensive scrub for the two failure modes that damage trust most:
  // (a) fabricated specific percentages slipping through (e.g. "22% re-coats")
  // (b) first-person pronouns slipping through ("our facility", "we offer")
  // These are last-mile catches; the prompt already forbids both, but the
  // model occasionally ignores rules under length pressure. Log + flag in
  // a comment so the editor sees what was caught.
  const fabFlags = detectFabricatedNumbers(polished);
  const fpFlags = detectFirstPersonInBody(polished);
  if (fabFlags.length || fpFlags.length) {
    const notes: string[] = [];
    if (fabFlags.length)
      notes.push(`fabricated-number candidates: ${fabFlags.slice(0, 5).join(', ')}`);
    if (fpFlags.length)
      notes.push(`first-person leaks: ${fpFlags.slice(0, 5).join(', ')}`);
    console.warn(`[multipass] post-gen review flags — ${notes.join(' | ')}`);
    polished = `<!--\n  EDITORIAL REVIEW FLAGS (auto-detected, do not publish without checking):\n  ${notes.join('\n  ')}\n-->\n${polished}`;
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

// Spots obvious fabricated-statistic patterns. Tuned to be conservative —
// it's better to miss a real fabrication than to flag a real verifiable
// number (regulation date, OEM-announced capacity). Returns the raw phrases
// that look suspicious so the editor knows what to verify.
function detectFabricatedNumbers(html: string): string[] {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const hits: string[] = [];
  // "22% reduction", "98% yield", "31% improvement" — outcome percentages
  const outcomePercent =
    /\b\d{1,3}(?:\.\d+)?%\s+(?:re-?coat|yield|reduction|increase|drop|improvement|cost|cut|gain|efficiency|throughput|adhesion|recovery|first-pass|rejection|defect)/gi;
  // "5°C shift", "35°C inside", "92% humidity at" — physical claims with degrees / RH
  const physical = /\b\d{1,3}(?:\.\d+)?\s*°\s?[CcFf]\b|\b\d{1,3}%\s+(?:humidity|relative humidity|RH)\b/gi;
  // "INR 4.5 cr capex", "Rs 12 lakh" — specific INR amounts (excluding verified press-release figures)
  const inr = /\b(?:INR|Rs\.?|₹)\s*\d{1,4}(?:[,.]\d+)*\s*(?:cr|crore|lakh|lakhs)\b/gi;
  for (const re of [outcomePercent, physical, inr]) {
    let m;
    while ((m = re.exec(text)) !== null && hits.length < 8) hits.push(m[0]);
  }
  return Array.from(new Set(hits));
}

// Spots first-person pronouns and OptiFinish-as-author phrasings inside
// the body. The CTA paragraph at the bottom may legitimately use second-
// person; the rest should be third-person observational.
function detectFirstPersonInBody(html: string): string[] {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const hits: string[] = [];
  const patterns = [
    /\b(?:our|we['']?(?:re|ve|ll)?|us|my|I['']?(?:m|ve|ll))\s+(?:facility|team|booth|line|plant|customers|engineers|approach|view|experience|guide|reference)/gi,
    /\b(?:we|our|us)\s+(?:offer|provide|recommend|believe|build|sell|integrate|deliver|design|test)/gi,
    /\bOptiFinish\s+(?:has|believes|offers|provides|recommends|has been)/gi,
    /\bin\s+our\s+(?:experience|view|facility|tests|practice)/gi
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(text)) !== null && hits.length < 8) hits.push(m[0]);
  }
  return Array.from(new Set(hits));
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
