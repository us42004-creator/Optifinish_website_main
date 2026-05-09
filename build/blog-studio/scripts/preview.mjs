#!/usr/bin/env node
// End-to-end preview generator. Runs the full live pipeline:
//   1. Llama 3.3 70B → 5 topic candidates anchored to real 2025-26 triggers
//   2. Llama 3.1 405B → full 1100-1400 word draft + snapshot + image prompts
//   3. FLUX.1-dev (NVIDIA Build) → 2 inline images, parallel + auto-retry
//   4. Compose OptiFinish-shaped HTML → public/preview.html
//
// Run: node scripts/preview.mjs
// Then open: http://localhost:5000/preview.html
//
// Requires the dev server running at localhost:5000 — proxy injects the
// API key so this script never touches it.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PROXY = process.env.PROXY || 'http://localhost:5001';

// ─────────────────────────────────────────────────────────────
// Demo selection — edit these to preview a different pairing
// ─────────────────────────────────────────────────────────────
const CATEGORY_ID = process.env.CATEGORY || 'pillar-guide';
const AUDIENCE_ID = process.env.AUDIENCE || 'plant-manager';

// ─────────────────────────────────────────────────────────────
// Multi-model rotation — mirrors src/services/modelRouter.ts
// ─────────────────────────────────────────────────────────────
const MODELS = [
  { id: 'meta/llama-3.3-70b-instruct',            shortName: 'Llama-3.3-70B',      intrinsicVoice: 'balanced, calm authority, slight academic register',                                            topicTempOffset: 0,     draftTempOffset: 0,     supportsJsonMode: true,  maxTokensCap: 8000 },
  { id: 'deepseek-ai/deepseek-v4-pro',            shortName: 'DeepSeek-V4-Pro',    intrinsicVoice: 'analytical, reasoning-forward, dense with structured argument',                                  topicTempOffset: -0.05, draftTempOffset: -0.05, supportsJsonMode: true,  maxTokensCap: 8000 },
  { id: 'google/gemma-3-12b-it',                  shortName: 'Gemma-3-12B',        intrinsicVoice: 'crisp, declarative, short sentences, no-nonsense',                                                topicTempOffset: 0.05,  draftTempOffset: 0.05,  supportsJsonMode: false, maxTokensCap: 4096 },
  { id: 'nvidia/llama-3.3-nemotron-super-49b-v1', shortName: 'Nemotron-Super-49B', intrinsicVoice: 'nuanced, sometimes contrarian, asks better questions, walks through reasoning',                    topicTempOffset: 0,     draftTempOffset: 0,     supportsJsonMode: true,  maxTokensCap: 8000 }
];
const VOICES = [
  { id: 'analyst',   nudge: `Open with a specific, named observation from the shop floor — a metric, a behaviour at hour six, a measurable shift. Lead with the data, not the framing. Sentence rhythm: medium, with at least three short declarative sentences per major section.` },
  { id: 'mentor',    nudge: `Write as a senior process engineer mentoring a younger one. Use "you" liberally. Walk through reasoning step by step. Each H2 poses a question and answers it. Conversational rhythm with one parenthetical aside per section.` },
  { id: 'reporter',  nudge: `Open with a scene — a specific Indian plant, a specific shift, a specific sensory detail. Carry the narrative voice through. Cinematic rhythm, varied, with occasional one-line paragraphs for emphasis.` },
  { id: 'critic',    nudge: `Open with what most articles on this topic get wrong. Take a mildly skeptical position. Each H2 contains at least one "but" or "however that" turn. Pointed, declarative, no hedging.` },
  { id: 'frame',     nudge: `Open with the trade-off itself, named explicitly. The whole post is a decision frame. Use the word "decide" at least three times. Tight balanced rhythm, parallel structure.` },
  { id: 'unhurried', nudge: `Open without urgency. The post breathes. Longer sentences in the first two paragraphs to set tone, then tighten. Each section ends with a one-line takeaway.` }
];
function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
let lastModel = null;
function pickRotated() {
  const candidates = lastModel ? MODELS.filter(m => m.id !== lastModel) : MODELS;
  const model = pickRandom(candidates);
  lastModel = model.id;
  return { model, voice: pickRandom(VOICES) };
}

// ─────────────────────────────────────────────────────────────
// Constants — MUST stay in sync with src/constants.ts
// ─────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'pillar-guide',           label: 'Pillar Guide',                blurb: 'Long-form authority anchor — one per product group',         examples: ['The complete powder coating plant reference', "Curing oven buyer's bible", 'Z-TAP automation: a 12,000-hour reference'] },
  { id: 'case-study',             label: 'Case Study / Installation',   blurb: 'Real customer outcome with quantified proof',                examples: ['Auto OEM line upgrade', 'Architectural extrusion plant', 'Whitegoods retrofit'] },
  { id: 'comparison-decision',    label: 'Comparison & Decision Frame', blurb: 'X vs Y, decision matrix, 5-year TCO',                        examples: ['Manual vs automatic line', 'Batch oven vs conveyor', 'GEMA vs Wagner vs Nordson guns'] },
  { id: 'cost-of-inaction',       label: 'Cost of Inaction',            blurb: 'Loss-aversion frame on what status-quo costs',               examples: ['What an unupgraded curing oven costs you per year', 'The hidden P&L cost of manual coating', 'Three signs your line is silently burning margin'] },
  { id: 'facility-behind-scenes', label: 'Facility / Behind the Scenes', blurb: 'Greater Noida manufacturing & R&D credibility',             examples: ['Inside the test bay', 'How a powder coating plant is built to spec', 'The Z-TAP commissioning floor'] },
  { id: 'technical-deep-dive',    label: 'Technical Deep Dive',         blurb: 'Mechanism-level. Engineer-grade depth.',                     examples: ['Powder transfer efficiency', 'Cure window control', 'Pretreatment chemistry'] },
  { id: 'how-to',                 label: 'How-To / Troubleshooting',    blurb: 'Operator-grade defect diagnosis',                            examples: ['Orange peel root causes', 'Faraday cage fixes', 'Monsoon outgassing playbook'] },
  { id: 'industry-trends',        label: 'Industry Trends & News',      blurb: 'Tied to a real dated trigger',                               examples: ['CBAM impact on Indian exporters', 'BEE Jan-2026 mandate consequences', 'GEMA OptiSpray launch breakdown'] }
];
const AUDIENCES = [
  { id: 'plant-manager',       label: 'Plant Manager',                role: 'Owns daily output and uptime',                          cares: 'Throughput, rejection rate, OEE, operator effort' },
  { id: 'procurement',         label: 'Procurement Lead',             role: 'Owns vendor selection and TCO',                         cares: 'Lifecycle cost, payback, warranty, after-sales SLA' },
  { id: 'oem-engineer',        label: 'OEM Engineer',                 role: 'Specifies coating systems for end customers',           cares: 'Spec compliance, integration, repeatability' },
  { id: 'rd-process',          label: 'R&D / Process Engineer',       role: 'Optimises finish quality and chemistry',                cares: 'Cure profile, film build, adhesion, defect physics' },
  { id: 'c-level',             label: 'C-Level / Decision Maker',     role: 'Capex sign-off and strategy',                           cares: 'ROI, capacity expansion, brand-finish quality' },
  { id: 'existing-customer',   label: 'Existing Customer',            role: 'Already operates an OptiFinish system',                 cares: 'Upgrades, AMC value, productivity tips' },
  { id: 'architect-specifier', label: 'Architect / Facade Specifier', role: 'Specifies architectural coatings on aluminium extrusion', cares: 'Qualicoat Class 2, super-durables, 25-year warranty, non-chromate pretreatment' },
  { id: 'consulting-engineer', label: 'Consulting Engineer',          role: 'External advisor recommending systems to plants',       cares: 'Verifiable references, spec compliance, technical proofs, neutral comparisons' }
];

// ─────────────────────────────────────────────────────────────
// Per-category blueprint — MUST stay in sync with src/services/draftEngine.ts
// ─────────────────────────────────────────────────────────────
const CATEGORY_BLUEPRINT = {
  'pillar-guide': { shape: 'pillar_guide', sections: ['Executive TL;DR (one-paragraph C-suite scan)', 'What it is and where it fits in the line', 'The four to six sub-systems that decide outcomes', 'Selection variables (throughput, substrate, finish spec, footprint, utilities)', 'Cost structure in INR ranges (capex bands by capacity tier, ranges only — never specific quotes)', 'Compliance and certifications (BIS, ATEX, BEE, Qualicoat where relevant)', 'Common procurement mistakes plant managers regret', 'Next-step routing matrix'], cta: 'Download spec sheet, then book a facility walk-through' },
  'case-study': { shape: 'case_study', sections: ['The customer, sector, what their line was running', 'The problem in their words (no marketing voice)', "What it was costing them (quantified status quo)", 'The solution (integration approach, named systems, not feature list)', 'Implementation timeline (weeks, what shifted on the line)', 'The numbers that landed (three metrics: throughput, cost, quality)', 'Why this transfers to a similar line (or where it would not)'], cta: 'Book a same-industry plant visit' },
  'comparison-decision': { shape: 'comparison_matrix', sections: ['The 30-second verdict by use-case', 'The decision matrix (use a real <table>)', 'Criterion deep-dive 1 with engineering reasoning', 'Criterion deep-dive 2 with engineering reasoning', '5-year TCO breakdown (energy, consumables, downtime — INR-denominated qualitative ranges)', 'Pick X if / Pick Y if — explicit routing'], cta: 'Get a custom comparison for your line' },
  'cost-of-inaction': { shape: 'cost_of_inaction', sections: ['The hidden bill nobody puts on the P&L', 'The 12 / 24 / 36-month projection of compounded waste', 'Three failure modes that compound silently', 'What an audit actually catches in 30 minutes', 'The do-nothing vs act-now decision math', 'One small first step that costs nothing'], cta: 'Schedule a free on-site audit' },
  'facility-behind-scenes': { shape: 'facility_tour', sections: ['Cold open with a number (sq ft, throughput, machines on floor)', 'The line we walk you through (4-5 stations)', 'QC and traceability discipline', 'The people who build your system (named engineers with tenure)', 'Standards we hold ourselves to beyond ISO', 'When to come see it'], cta: 'Schedule a facility visit' },
  'technical-deep-dive': { shape: 'immersive_essay', sections: ['The friction this post addresses (named precisely)', 'The mechanism, described so it could be diagrammed', 'Where it breaks in real Indian plants', 'The diagnostic frame an experienced engineer uses', 'Field data (qualitative, not invented numbers)', 'What this changes for the operator at hour six'], cta: 'Talk to our process engineering team' },
  'how-to': { shape: 'troubleshooting_drilldown', sections: ['The defect pattern, named precisely', 'How to spot it vs adjacent defects (sensory signatures)', 'Five most likely causes, ranked by frequency in Indian plants', 'A 30-minute diagnostic walk you can run today', 'The fix, and the re-occurrence trap', 'Prevention: what changes upstream'], cta: 'Send us a defect for engineering review' },
  'industry-trends': { shape: 'immersive_essay', sections: ['The trigger and its dated source', 'What it actually does (mechanically, not legally)', 'Who it affects most in India (specific sectors and plant sizes)', 'Three shifts on the floor that follow', 'The buyer-side decision window (when to act)', 'How to get ahead of it without overspending'], cta: 'See how this affects your line' }
};

// 18-trigger pool — MUST stay in sync with src/services/topicEngine.ts
const RECENT_TRIGGERS = [
  'EU CBAM live since 1 Jan 2026 — 15-22% price hit on Indian aluminium and steel exports per GTRI',
  'Mahindra inaugurated 500-robot Chakan EV paint shop on 8 Jan 2025, INR 4,500 cr investment',
  'Tata Sanand 2.0 EV plant — 80 robots, 50% automation, rotational dip e-coat',
  'JSW MG announced 16 Feb 2026: tripling Halol from 110k to 300k units annually',
  'Ather expanding from 420k to 1.42M units; Aurangabad plant goes live H2 2026',
  'WEG launched sub-110-140°C low-temperature cure powder April 2026',
  'PaintIndia 2026 confirmed 19-21 Feb at Bombay Exhibition Centre, 487+ exhibitors',
  'BYK terminated all PFAS use end-2025; EU REACH PFAS deadline end-2026',
  'BEE made energy-efficiency star labelling mandatory 1 Jan 2026 for chillers, cooling towers, distribution transformers',
  'Haier announced INR 3,500 cr third India plant Jan 2025: 4M ACs/yr by 2027',
  'Jindal Aluminium opened 25-tonne/day non-chromate powder coating line June 2025',
  'AkzoNobel-Axalta merger closing late 2026',
  'GEMA launched OptiSpray All-in-One pump (FABTECH 2025, PaintExpo 2026)',
  'Dürr Open House 21-23 April 2026 — EcoBell4 HTE robots and EcoReflect light tunnel preview',
  'AI vision inspection at 40-micron resolution: 31% QC cost cut in 6-8 weeks reported deployments',
  'Hindalco extrusion expansion June 2025 for EV, solar, smart-city profiles',
  'Axalta launched bio-based powder collection (25% lower CO2, food-waste sourced)',
  'India added 119 GW solar module capacity in 2025; 210 GW total — coating demand for MMS structures'
];

// ─────────────────────────────────────────────────────────────
// Topic prompt — MUST stay in sync with src/services/topicEngine.ts
// Note: TRIGGER POOL and voice nudge are randomised per call inside main().
// ─────────────────────────────────────────────────────────────
function buildTopicSystemPrompt({ voiceNudge, modelVoice, triggers, excludeTitles = [] }) {
  const exclusion = excludeTitles.length
    ? `

═════════════════════════════════════════════
  RECENTLY GENERATED — DO NOT REPRODUCE OR HEAVILY OVERLAP
═════════════════════════════════════════════
${excludeTitles.map((t, i) => `${i + 1}. ${t}`).join('\n')}
`
    : '';
  return `You are the OptiFinish editorial strategist. Indian B2B industrial powder coating equipment company (parent: VACSPL). Sells own plants, ovens, booths, automation (Z-TAP). Authorised India partners for GEMA and DURR. Sister concern Vinayak Agencies.

YOUR INTRINSIC VOICE THIS RUN: ${modelVoice}.

EDITORIAL VOICE NUDGE FOR THIS RUN:
${voiceNudge}

UNIQUE POSITIONS (every topic must reflect at least one):
1. India-first context (INR, monsoon, BIS/BEE/CPCB, MSME-ZED, CBAM, generator-power, summer powder shelf-life)
2. Multi-OEM neutrality (only player who sells GEMA + DURR + own line)
3. Premium industrial tone — calm authority, never marketing hype
4. Specificity over platitudes

TRIGGER POOL (curated subset, anchor at least 2 of 5 topics to one of these):
${triggers.map((t, i) => `[${i + 1}] ${t}`).join('\n')}
${exclusion}

PATTERNS TO SUBSTITUTE:
✗ "Did you know that 10% improvement..." → ✓ Open with a named system or dated event
✗ "What if you could reduce rejections by 25%..." → ✓ State the actual operator question
✗ "Get the inside scoop" → ✓ Name the source ("Two senior engineers walked us through...")
✗ "Take your operation to the next level" → ✓ Name the specific lever
✗ "In today's competitive market" → ✓ Strike entirely. Open with the technical fact.
✗ "Unlocking optimal X" / "Mastering Y" → ✓ Imperative ("How to read X" / "The case against Y")

DO NOT FABRICATE NUMBERS. No invented percentages, INR figures, or ROI claims.

REQUIRED PER TOPIC: sharp HEADLINE, 1-line HOOK, 1-line ANGLE naming structural shape, estimated read time 5-14 min.

ANTI-MONOTONY RULES:
- 5 titles MUST start with 5 DIFFERENT first words.
- AT LEAST 2 of 5 must NOT start with "How", "The", "What", "Why", or "When".
- AT LEAST 1 must be a declarative statement.
- AT LEAST 1 must be ≤ 6 words; AT LEAST 1 must be ≥ 12 words.
- Vary structural shape across the 5.

OUTPUT: STRICT JSON only.
{"topics":[{"id":"t1","title":"","angle":"","hook":"","estimatedReadTime":"7 min"}]}
Return exactly 5 topics. At least 2 must reference a TRIGGER POOL entry by content.`;
}

// ─────────────────────────────────────────────────────────────
// Draft prompt — generated from per-category blueprint
// ─────────────────────────────────────────────────────────────
function draftSystemPrompt(categoryId, opts = {}) {
  const bp = CATEGORY_BLUEPRINT[categoryId];
  const sectionList = bp.sections.map((s, i) => `H2 ${i + 1}. ${s}`).join('\n');
  const voiceBlock = opts.voiceNudge && opts.modelVoice
    ? `\n\nYOUR INTRINSIC VOICE THIS RUN: ${opts.modelVoice}.\n\nEDITORIAL VOICE NUDGE FOR THIS RUN:\n${opts.voiceNudge}\n`
    : '';

  return `You are the OptiFinish editorial writer. Senior process engineer voice. Reader is intelligent, busy, skeptical of marketing.${voiceBlock}

OPTIFINISH CONTEXT: Indian B2B powder coating equipment (VACSPL). Own plants, ovens, booths, automation (Z-TAP, ZA01). Authorised India partners for GEMA + DURR. Greater Noida facility. Sister concern Vinayak Agencies.

UNIQUE POSITIONS: India-first context (INR, monsoon, BIS/BEE/CPCB, MSME-ZED, CBAM, generator-power, summer powder shelf-life, CR-sheet variability), multi-OEM neutrality, premium industrial tone, specificity over platitudes.

═════════════════════════════════════════════
  WORD COUNT — NON-NEGOTIABLE
═════════════════════════════════════════════
bodyHtml MUST contain a minimum of 1100 words and a target of 1200-1400 words of rendered body text.

Each H2 needs 150-220 words on average. Use 2-3 paragraphs per section with technical specifics. Add an ordered or unordered list inside ONE section. If you finish below 1100, EXPAND technical depth in the longest sections — do not pad. Add named systems, specific Indian-context failures, name the physics.

A draft below 1100 words is a generation failure.

═════════════════════════════════════════════
  STRUCTURE FOR THIS POST (mandatory)
═════════════════════════════════════════════
Structural shape: ${bp.shape}

Use these exact H2 sections, in order. You may rewrite the H2 wording so it hints at content (e.g. instead of literal "The friction this post addresses", write "Why hour-six humidity rewrites every spec sheet"). But the SUBSTANCE must match the blueprint.

${sectionList}

End with a soft CTA paragraph priming: "${bp.cta}". CTA paragraph must NOT begin with "Want to" / "Ready to" / "If you'd like" — open with the substance of the offer.

═════════════════════════════════════════════
  STRICT EDITORIAL RULES
═════════════════════════════════════════════
1. NO EM-DASHES. Never "—" or "--".
2. NO INLINE COLOR/style tags. Emphasis only via <b>, <i>, or 'single quotes'.
3. SEMANTIC HTML ONLY. Allowed: <h2>, <h3>, <p>, <ol>, <ul>, <li>, <strong>, <em>, <b>, <i>, <blockquote>, <table>, <thead>, <tbody>, <tr>, <th>, <td>.
4. NO FABRICATED NUMBERS. Cite only verifiable public facts. Otherwise speak qualitatively.
5. NO MARKETING HYPE. Banned: best-in-class, industry-leading, unparalleled, game-changing, cutting-edge, revolutionary, next-level, world-class, synergy, leverage (verb), unlock, harness, empower, robust, seamless.
6. NO LISTICLES AS THE SPINE.
7. NO CLICHÉ OPENERS: "In today's competitive market", "Did you know", "Have you ever wondered", "What if you could", "Get the inside scoop", "Take your operation to the next level", "Unlocking", "Mastering".
8. NO META H2s. Never write H2s named after schema fields ("Decision Friction", "Core Insight", "Conclusion and Call to Action").
9. PULL-QUOTE: wrap exactly ONE sharp 1-2 sentence insight in <blockquote> — the most quotable line.

ANTI-MONOTONY RULES (read carefully):
- VARIED PARAGRAPH OPENINGS. No two consecutive paragraphs may begin with the same word. "However", "In addition", "Furthermore", "Moreover", "Therefore" may each appear at the start of AT MOST ONE paragraph.
- VARIED SENTENCE LENGTH. Each section: ≥3 short sentences (<12 words), ≥1 mid (15-25), ≤1 long (40+).
- NO TEMPLATE PHRASES: "It is worth noting", "It should be mentioned", "When it comes to", "At the end of the day", "In essence", "In summary", "All in all", "To put it simply".
- NO "FIRST X, SECOND Y, THIRD Z" SCAFFOLDING in prose; use real <ol>/<ul> for enumeration.
- REPEATED CONCEPT, FRESH ANGLE: re-phrase the second and third mention of any concept.
- AVOID 3-CLAUSE "X, Y, AND Z": limit one per section.

═════════════════════════════════════════════
  SNAPSHOT FIELDS
═════════════════════════════════════════════
- decisionFriction: the specific tradeoff, names BOTH sides
- dominantAnxiety: the fear, names a CONCRETE consequence
- coreInsight: the substantive reframe — never a platitude
- structuralShape: ${bp.shape}
- lever: 1-line specific differentiator (e.g. "Behaviour under heat-soak over feature parity")

═════════════════════════════════════════════
  IMAGE PROMPTS — SUBJECT MUST MATCH SECTION
═════════════════════════════════════════════
Exactly 2 inline. anchorHeading must be EXACT H2 text. Front-load subject as FIRST phrase.

SUBJECT EXAMPLES:
- Oven/cure profile → "A calibrated K-type thermocouple probe resting against a coated panel inside a curing oven, glowing radiant heating elements diffused in background"
- Pretreatment → "A steel part being lowered into a degreasing tank, stainless dip-cage visible, faint chemical mist hovering above the bath"
- Transfer efficiency → "An electrostatic powder coating gun mid-spray on a recessed metal part, visible cloud of powder mist"
- Case study result → "A finished powder-coated automotive body panel cooling under exit-tunnel light"
- Facility/R&D booth → "A small R&D-scale spray booth at Greater Noida, instrumented with thermal probes, late-afternoon natural light"
- Defect macro (orange peel) → "Macro detail of an orange-peel-textured powder-coated surface, raking side light exposing dimpled topology"

ABSTRACT TOPICS (regulations, market shifts):
NEVER charts/graphs/infographics — Flux renders fake-looking data viz. Pick a CONCRETE PHYSICAL SCENE.
- CBAM → "A coil of cold-rolled steel wrapped for export, customs paperwork resting on top, 'EU' destination stamp on bill of lading"
- PFAS → "A row of powder bags labelled 'PFAS-free' on a warehouse pallet, scanner gun and compliance clipboard in foreground"
- BEE star-rating → "A washing-machine cabinet panel coming off a powder line under bright inspection light, surface intact under raking light"
- AkzoNobel-Axalta → "Two powder bags from different brands on a procurement bench, a barcode reader between them"

PROMPT SHAPE: "<SUBJECT 1-2 sentences>. <Composition>. <Mood line>." (30-80 words)
No brand suffix. No sci-fi clichés, hi-vis vests, glossy reflections, decorative robotic arms. No posed humans with eye contact. NO charts/graphs/infographics/screenshots.

═════════════════════════════════════════════
  OUTPUT
═════════════════════════════════════════════
Strict JSON only.

{
  "title": "string (max 75 chars)",
  "subtitle": "string (max 130 chars)",
  "bodyHtml": "string — MIN 1100 words, target 1200-1400, semantic tags only, exactly one <blockquote>",
  "snapshot": { "decisionFriction": "", "dominantAnxiety": "", "coreInsight": "", "structuralShape": "${bp.shape}", "lever": "" },
  "imagePlacements": [
    { "id": "img-inline-1", "position": "inline", "anchorHeading": "", "prompt": "", "alt": "" },
    { "id": "img-inline-2", "position": "inline", "anchorHeading": "", "prompt": "", "alt": "" }
  ]
}`;
}

const FLUX_BRAND_SUFFIX = `Shot on Hasselblad X2D, 80mm lens, f/4, natural directional light. Editorial industrial photography, calm and precise, restrained color palette of graphite, steel grey, and warm white, with a single ember-orange accent acting as the warmest light source. Kodak Portra 400 color science. Sharp focus on the subject, gentle falloff into shadow.`;

// ─────────────────────────────────────────────────────────────
// CTA card copy — MUST stay in sync with src/services/templateBuilder.ts
// ─────────────────────────────────────────────────────────────
const CTA_BY_SHAPE = {
  pillar_guide:               { headline: 'Brief your engineering team with a real reference', body: 'Most plant managers we talk to want a working spec sheet and a 60-minute walk-through before they brief their team. Both are available, on calendar.', action: 'Book a facility walk-through' },
  case_study:                 { headline: 'See the diagnostic, not just the result',           body: 'The transferable part of any case study is the audit method, not the throughput number. Walk a similar live line with our process engineer.', action: 'Schedule a same-industry visit' },
  comparison_matrix:          { headline: 'Get a quote-ready comparison for your line',         body: 'Tell us your throughput, substrate, and finish spec. We return a comparison matrix in 24 hours, with five-year and ten-year TCO ranges in INR.', action: 'Request a custom comparison' },
  cost_of_inaction:           { headline: 'Schedule a free on-site audit',                       body: 'A 30-minute walk at hour six of your shift catches what a four-hour root-cause review later cannot. The audit is free. Acting on what we find is your call.', action: 'Book a free audit' },
  facility_tour:              { headline: 'Come see the floor that builds your system',         body: 'Calendared visits to the Greater Noida facility, named engineer escorting, full QC walkthrough. The floor tells you what the brochure cannot.', action: 'Schedule a facility visit' },
  troubleshooting_drilldown:  { headline: 'Stuck on a defect we did not cover here?',           body: 'Send a photo of the defect, the substrate, and the cure profile. Our process engineering team responds with a diagnostic within 24 hours.', action: 'Send a defect for review' },
  immersive_essay:            { headline: 'Talk to our process engineering team',               body: 'The questions raised in this article rarely have the same answer twice. Our team has the data on Indian conditions; bring your specifics.', action: 'Talk to engineering' }
};

// ─────────────────────────────────────────────────────────────
// API helpers — all via the Vite proxy
// ─────────────────────────────────────────────────────────────
// Returns parsed JSON. Skips response_format on models that don't support it.
async function chatJson(systemPrompt, userPrompt, opts = {}) {
  const modelId = opts.model ?? 'meta/llama-3.3-70b-instruct';
  const entry = MODELS.find(m => m.id === modelId);
  const supportsJson = entry ? entry.supportsJsonMode : true;
  const cap = entry ? entry.maxTokensCap : 8000;

  const body = {
    model: modelId,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    temperature: opts.temperature ?? 0.7,
    top_p: opts.topP ?? 0.92,
    max_tokens: Math.min(opts.maxTokens ?? 5000, cap)
  };
  if (supportsJson) body.response_format = { type: 'json_object' };

  const res = await fetch(`${PROXY}/api/nvidia/llm`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`LLM ${res.status}: ${t.slice(0, 400)}`);
  }
  const j = await res.json();
  const txt = j.choices?.[0]?.message?.content ?? '';
  return parseJsonish(txt);
}

// Returns plain text (no JSON parsing). Used for the editorial scrub
// where Gemma returns HTML directly without a JSON wrapper.
async function chatText(systemPrompt, userPrompt, opts = {}) {
  const modelId = opts.model ?? 'google/gemma-3-12b-it';
  const entry = MODELS.find(m => m.id === modelId);
  const cap = entry ? entry.maxTokensCap : 4096;
  const res = await fetch(`${PROXY}/api/nvidia/llm`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: modelId,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: opts.temperature ?? 0.5,
      top_p: opts.topP ?? 0.9,
      max_tokens: Math.min(opts.maxTokens ?? 4000, cap)
    })
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`LLM ${res.status}: ${t.slice(0, 400)}`);
  }
  const j = await res.json();
  return j.choices?.[0]?.message?.content ?? '';
}

// Tolerant JSON parser — handles code fences and prose-padded outputs from
// models that don't have JSON mode.
function parseJsonish(text) {
  const trimmed = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  try { return JSON.parse(trimmed); } catch {}
  const objStart = trimmed.indexOf('{');
  const arrStart = trimmed.indexOf('[');
  const start = objStart === -1 ? arrStart : arrStart === -1 ? objStart : Math.min(objStart, arrStart);
  if (start === -1) throw new Error('No JSON in model output');
  const opener = trimmed[start];
  const closer = opener === '{' ? '}' : ']';
  let depth = 0, inStr = false, escape = false;
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
    else if (c === closer && --depth === 0) {
      return JSON.parse(trimmed.slice(start, i + 1));
    }
  }
  throw new Error('Unterminated JSON');
}

async function fluxImage(prompt, { steps = 30, seed = 0, attempt = 1 } = {}) {
  const res = await fetch(`${PROXY}/api/nvidia/flux`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: `${prompt.trim()}\n\n${FLUX_BRAND_SUFFIX}`,
      width: 1024, height: 1024,
      cfg_scale: 5, mode: 'base',
      seed, steps, samples: 1
    })
  });
  if (!res.ok) {
    const t = await res.text();
    if (res.status >= 500 && attempt < 3) {
      console.log(`     Flux ${res.status} on attempt ${attempt}, retrying with new seed…`);
      await new Promise((r) => setTimeout(r, 1500));
      return fluxImage(prompt, { steps, seed: seed + 1000, attempt: attempt + 1 });
    }
    throw new Error(`Flux ${res.status}: ${t.slice(0, 300)}`);
  }
  const j = await res.json();
  const b64 = j?.artifacts?.[0]?.base64;
  if (!b64) throw new Error('No base64 in Flux response');
  const head = b64.slice(0, 4);
  let mime = 'image/png';
  if (head.startsWith('/9j/')) mime = 'image/jpeg';
  else if (head.startsWith('UklGR')) mime = 'image/webp';
  return `data:${mime};base64,${b64}`;
}

// ─────────────────────────────────────────────────────────────
// HTML composition — MUST stay in sync with src/services/templateBuilder.ts
// ─────────────────────────────────────────────────────────────
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const escapeReg = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function categoryIconSvg(categoryId) {
  const stroke = `stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
  const open = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" ${stroke}>`;
  const close = `</svg>`;
  switch (categoryId) {
    case 'pillar-guide':           return `${open}<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>${close}`;
    case 'case-study':             return `${open}<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6M9 16h6M9 8h.01"/>${close}`;
    case 'comparison-decision':    return `${open}<path d="M16 16l3-8 3 8c-2 1-4 1-6 0z"/><path d="M2 16l3-8 3 8c-2 1-4 1-6 0z"/><path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>${close}`;
    case 'cost-of-inaction':       return `${open}<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>${close}`;
    case 'facility-behind-scenes': return `${open}<path d="M2 20h20"/><path d="M5 20V8l5 3V8l5 3V8l4 3v9"/>${close}`;
    case 'technical-deep-dive':    return `${open}<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>${close}`;
    case 'how-to':                 return `${open}<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>${close}`;
    case 'industry-trends':        return `${open}<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>${close}`;
    default: return `${open}<circle cx="12" cy="12" r="10"/>${close}`;
  }
}

function derivePurpose(prompt) {
  const before = prompt.split(/Shot on Hasselblad/i)[0].trim();
  const sentence = before.split(/[.!?]\s/)[0];
  return sentence.length > 160 ? sentence.slice(0, 157) + '…' : sentence;
}

function injectImagesIntoBody(bodyHtml, placements) {
  const usable = placements.filter((p) => p.generatedUrl);
  if (usable.length === 0) return bodyHtml;
  let html = bodyHtml;
  for (const p of usable) {
    if (!p.anchorHeading) continue;
    const re = new RegExp(`(<h2[^>]*>\\s*${escapeReg(p.anchorHeading)}\\s*</h2>)`, 'i');
    const block = `\n<div class="img-container">\n  <img src="${esc(p.generatedUrl)}" alt="${esc(p.alt)}" />\n  <div class="img-caption"><p>Visual Insight: ${esc(derivePurpose(p.prompt))}</p></div>\n</div>\n`;
    if (re.test(html)) html = html.replace(re, `${block}$1`);
    else html = html + block;
  }
  return html;
}

const BASE_CSS = `:root{--ink-950:#0A0A0B;--ink-900:#111113;--ink-800:#1E1E22;--ink-700:#2A2A30;--ember-500:#FF6B35;--ember-400:#FF8B5C;--ember-700:#C24A20;--ember-50:#FFF5EE;--paper:#FAFAF7;--paper-warm:#FFF8F2;--steel-500:#6B7280;--steel-400:#9CA3AF}*{box-sizing:border-box}body{background:var(--paper);color:var(--ink-950);font-family:'Inter',system-ui,sans-serif;line-height:1.7;margin:0;padding:56px 24px 80px;-webkit-font-smoothing:antialiased}.container{max-width:760px;margin:0 auto;background:#fff;padding:64px 72px 56px;border-radius:32px;box-shadow:0 20px 60px rgba(10,10,11,.06)}@media(max-width:720px){body{padding:16px 8px 40px;line-height:1.65}.container{padding:32px 24px 36px;border-radius:20px}}.progress-bar{position:fixed;top:0;left:0;right:0;height:3px;background:rgba(10,10,11,.06);z-index:100}.progress-fill{height:100%;width:0;background:var(--ember-500);transition:width .08s ease-out;box-shadow:0 0 12px rgba(255,107,53,.3)}.snapshot-box{position:relative;overflow:hidden;background:linear-gradient(135deg,#2A0E04 0%,#14100E 55%,#0A0A0B 100%);color:#fff;padding:44px 44px 40px;border-radius:24px;margin-bottom:56px;border:1px solid rgba(255,107,53,.25);box-shadow:0 24px 70px rgba(255,107,53,.10)}.snapshot-box::before,.snapshot-box::after{content:'';position:absolute;width:240px;height:240px;border-radius:50%;filter:blur(70px);pointer-events:none}.snapshot-box::before{right:-70px;top:-70px;background:rgba(255,107,53,.18)}.snapshot-box::after{left:-50px;bottom:-50px;background:rgba(255,255,255,.04)}@media(max-width:720px){.snapshot-box{padding:28px 24px 26px;border-radius:18px;margin-bottom:36px}}.snapshot-head{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;margin-bottom:32px;position:relative;z-index:1;flex-wrap:wrap}.snapshot-eyebrow{display:flex;align-items:center;gap:14px}.snapshot-icon{width:42px;height:42px;display:flex;align-items:center;justify-content:center;background:rgba(255,107,53,.14);border:1px solid rgba(255,107,53,.32);border-radius:11px;color:var(--ember-400)}.snapshot-eyebrow-label{display:block;font-size:11px;font-weight:700;font-style:italic;text-transform:uppercase;letter-spacing:.32em;opacity:.95}.snapshot-eyebrow-lever{display:block;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.18em;color:rgba(255,255,255,.65);margin-top:5px;max-width:480px;line-height:1.5}.snapshot-title{font-family:'Cormorant Garamond',serif;font-size:38px;font-style:italic;font-weight:600;margin:0;color:#fff;line-height:1.1;border:none;padding:0}@media(max-width:720px){.snapshot-title{font-size:30px}}.snapshot-pill{align-self:flex-start;padding:9px 18px;border-radius:999px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.22em;background:rgba(255,107,53,.18);color:var(--ember-400);border:1px solid rgba(255,107,53,.32);backdrop-filter:blur(8px)}.snapshot-grid{display:grid;grid-template-columns:1fr 1fr;gap:36px;padding-top:32px;border-top:1px solid rgba(255,255,255,.10);position:relative;z-index:1}@media(max-width:640px){.snapshot-grid{grid-template-columns:1fr;gap:24px}}.snapshot-cell-label{display:block;font-size:10px;font-weight:700;font-style:italic;text-transform:uppercase;letter-spacing:.22em;color:rgba(255,255,255,.5);margin-bottom:9px}.snapshot-cell-value{margin:0;font-size:15px;font-weight:500;color:#fff;line-height:1.6}.snapshot-cell-value.italic{font-style:italic;opacity:.85;font-family:'JetBrains Mono',monospace;font-size:13px}.article-header{margin-bottom:40px}.article-section-marker{display:flex;align-items:center;gap:14px;font-size:10px;font-weight:700;font-style:italic;text-transform:uppercase;letter-spacing:.32em;color:var(--ink-950);margin-bottom:22px}.article-section-marker::before,.article-section-marker::after{content:'';flex:0 0 36px;height:1px;background:rgba(10,10,11,.28)}.article h1{font-family:'Cormorant Garamond',serif;font-size:46px;font-weight:700;line-height:1.12;letter-spacing:-.01em;margin:0 0 14px;color:var(--ink-950)}@media(max-width:720px){.article h1{font-size:32px}}.article-subtitle{font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:400;font-style:italic;color:var(--steel-500);margin:0 0 22px;line-height:1.45}.article-meta{display:flex;align-items:center;flex-wrap:wrap;gap:10px;font-size:10px;font-weight:700;font-style:italic;text-transform:uppercase;letter-spacing:.28em;color:var(--steel-500)}.article-meta-dot{width:4px;height:4px;border-radius:50%;background:var(--steel-400);display:inline-block}.blog-body-text{font-size:17px;line-height:1.78;color:var(--ink-900)}.blog-body-text h2{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:600;margin:56px 0 18px;color:var(--ink-950);border-bottom:1px solid rgba(255,107,53,.18);padding-bottom:12px;line-height:1.22;scroll-margin-top:24px}@media(max-width:720px){.blog-body-text h2{font-size:24px;margin:40px 0 14px}}.blog-body-text h3{font-size:16px;font-weight:700;margin:32px 0 10px;color:var(--ember-700)}.blog-body-text p{margin:0 0 20px}.blog-body-text p.lead{font-size:19px;color:var(--ink-800)}.blog-body-text>p:first-of-type::first-letter{font-family:'Cormorant Garamond',serif;font-size:72px;font-weight:700;line-height:.95;color:var(--ember-700);float:left;padding:6px 14px 0 0;margin-top:4px}@media(max-width:720px){.blog-body-text>p:first-of-type::first-letter{font-size:54px;padding:4px 10px 0 0}}.blog-body-text ul,.blog-body-text ol{padding-left:28px;margin:0 0 24px}.blog-body-text li{margin-bottom:10px;line-height:1.72}.blog-body-text strong,.blog-body-text b{font-weight:700;color:var(--ink-950)}.blog-body-text em,.blog-body-text i{font-style:italic}.blog-body-text blockquote{margin:40px 0;padding:8px 0 8px 32px;border-left:3px solid var(--ember-500);font-family:'Cormorant Garamond',serif;font-size:24px;font-style:italic;font-weight:500;line-height:1.4;color:var(--ink-800)}.blog-body-text blockquote p{margin:0}@media(max-width:720px){.blog-body-text blockquote{font-size:20px;padding-left:22px;margin:28px 0}}.blog-body-text table{width:100%;border-collapse:collapse;margin:28px 0;font-size:14px}.blog-body-text th,.blog-body-text td{padding:14px 16px;text-align:left;border-bottom:1px solid rgba(10,10,11,.08);vertical-align:top}.blog-body-text th{font-weight:700;color:var(--ink-950);background:var(--ember-50);font-size:11px;text-transform:uppercase;letter-spacing:.12em}@media(max-width:720px){.blog-body-text table{font-size:13px}.blog-body-text th,.blog-body-text td{padding:10px 12px}}.img-container{margin:56px 0;border-top:1px solid #e2e8f0;padding-top:18px}.img-container img{width:100%;border-radius:16px;display:block;box-shadow:0 12px 40px rgba(10,10,11,.06)}.img-caption{margin-top:16px;padding-bottom:16px;border-bottom:1px solid #e2e8f0}.img-caption p{margin:0;font-size:10px;font-weight:700;color:var(--steel-500);text-transform:uppercase;letter-spacing:.2em;line-height:1.55}.cta-card{position:relative;margin:64px 0 32px;padding:38px 44px 36px;background:linear-gradient(135deg,#FFF8F2 0%,#FFFFFF 100%);border:1px solid rgba(255,107,53,.20);border-radius:22px;overflow:hidden}.cta-card::before{content:'';position:absolute;top:0;left:0;width:4px;height:100%;background:var(--ember-500)}.cta-card::after{content:'';position:absolute;right:-50px;top:-50px;width:220px;height:220px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,107,53,.12),transparent);pointer-events:none}@media(max-width:720px){.cta-card{padding:28px 24px 26px;border-radius:16px;margin:44px 0 24px}}.cta-eyebrow{display:inline-block;font-size:10px;font-weight:700;font-style:italic;text-transform:uppercase;letter-spacing:.32em;color:var(--ember-700);margin-bottom:10px}.cta-headline{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:600;margin:0 0 14px;color:var(--ink-950);line-height:1.2;border:none;padding:0}@media(max-width:720px){.cta-headline{font-size:23px}}.cta-body{font-size:15px;line-height:1.65;color:var(--ink-900);margin:0 0 18px;max-width:540px}.cta-action{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.18em;color:var(--ember-700)}.article-footer{margin-top:56px;padding-top:32px;border-top:1px solid #e2e8f0;text-align:center}.article-footer-mark{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.32em;color:var(--steel-500)}`;

function buildHtml(draft, categoryId, audienceId) {
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  const aud = AUDIENCES.find((a) => a.id === audienceId);
  const articleBody = injectImagesIntoBody(draft.bodyHtml, draft.imagePlacements);
  const cta = CTA_BY_SHAPE[draft.snapshot.structuralShape] ?? CTA_BY_SHAPE.immersive_essay;
  const readMin = Math.max(3, Math.round(draft.wordCount / 220));

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(draft.title)} · OptiFinish</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>${BASE_CSS}</style>
</head>
<body>
<div class="progress-bar"><div class="progress-fill"></div></div>
<div class="container">
  <div class="snapshot-box">
    <div class="snapshot-head">
      <div class="snapshot-eyebrow">
        <div class="snapshot-icon">${categoryIconSvg(categoryId)}</div>
        <div>
          <span class="snapshot-eyebrow-label">Industrial Brief</span>
          <span class="snapshot-eyebrow-lever">Lever: ${esc(draft.snapshot.lever)}</span>
        </div>
      </div>
      <h2 class="snapshot-title">Dossier Calibration</h2>
    </div>
    <div class="snapshot-pill">Target: ${esc(aud?.label ?? '—')}</div>
    <div class="snapshot-grid">
      <div><span class="snapshot-cell-label">Decision Friction</span><p class="snapshot-cell-value">${esc(draft.snapshot.decisionFriction)}</p></div>
      <div><span class="snapshot-cell-label">Dominant Anxiety</span><p class="snapshot-cell-value">${esc(draft.snapshot.dominantAnxiety)}</p></div>
      <div><span class="snapshot-cell-label">Core Insight</span><p class="snapshot-cell-value">${esc(draft.snapshot.coreInsight)}</p></div>
      <div><span class="snapshot-cell-label">Structural Shape</span><p class="snapshot-cell-value italic">${esc(draft.snapshot.structuralShape)}</p></div>
    </div>
  </div>
  <article class="article">
    <header class="article-header">
      <div class="article-section-marker">Section 1: Research Analysis</div>
      <h1>${esc(draft.title)}</h1>
      <p class="article-subtitle">${esc(draft.subtitle)}</p>
      <div class="article-meta">
        <span>${draft.wordCount} words</span><span class="article-meta-dot"></span>
        <span>${readMin} min read</span><span class="article-meta-dot"></span>
        <span>${esc(cat?.label ?? '—')}</span><span class="article-meta-dot"></span>
        <span>${esc(aud?.label ?? '—')}</span>
      </div>
    </header>
    <div class="blog-body-text">${articleBody}</div>
    <aside class="cta-card">
      <span class="cta-eyebrow">Next step</span>
      <h3 class="cta-headline">${esc(cta.headline)}</h3>
      <p class="cta-body">${esc(cta.body)}</p>
      <span class="cta-action">→ ${esc(cta.action)}</span>
    </aside>
    <footer class="article-footer">
      <div class="article-footer-mark">OptiFinish · VACSPL · Greater Noida</div>
    </footer>
  </article>
</div>
<script>
(function(){var f=document.querySelector('.progress-fill');if(!f)return;var u=function(){var h=document.documentElement;var m=h.scrollHeight-h.clientHeight;f.style.width=(m>0?(h.scrollTop/m)*100:0)+'%';};addEventListener('scroll',u,{passive:true});addEventListener('resize',u);u();})();
</script>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────
// Multi-pass draft (mirror of src/services/draftEngineMultipass.ts)
// ─────────────────────────────────────────────────────────────
function buildOutlineSystemPrompt(category, voiceNudge, modelVoice) {
  const bp = CATEGORY_BLUEPRINT[category];
  const sectionGuide = bp.sections.map((s, i) => `${i + 1}. ${s}`).join('\n');
  return `You are the OptiFinish editorial outliner. Produce only the OUTLINE — not the body.

OPTIFINISH CONTEXT: Indian B2B powder coating equipment (VACSPL). Own plants/ovens/booths/automation (Z-TAP). Authorised India partners for GEMA + DURR. Greater Noida facility.

UNIQUE POSITIONS: India-first (INR, monsoon, BIS/BEE/CPCB, MSME-ZED, CBAM, generator-power), multi-OEM neutrality, premium industrial tone, specificity over platitudes.

YOUR INTRINSIC VOICE THIS RUN: ${modelVoice}.

EDITORIAL VOICE NUDGE FOR THIS RUN:
${voiceNudge}

STRUCTURE (mandatory): shape=${bp.shape}. Use these section ideas in order, rewrite headings to hint at content. Aim for 6-8 sections.
${sectionGuide}

HEADING QUALITY: NO meta headings ("Introduction", "Conclusion", "Benefits of"). Headings must HINT AT CONTENT. Bad: "Cure Window Control". Good: "The thermal profile that decides adhesion". Vary across the post; no two consecutive share an opening word.

INTENT FIELD: tells the writer EXACTLY what physical content the section needs (named systems like GEMA OptiSpray, named failure modes like outgassing on cast aluminium, named verifiable triggers).

SNAPSHOT: decisionFriction (names BOTH sides), dominantAnxiety (CONCRETE consequence), coreInsight (substantive reframe), structuralShape=${bp.shape}, lever (1-line specific differentiator).

IMAGES: exactly 2 inline. anchorHeading must EXACTLY match a section heading you write. Front-load CONCRETE PHYSICAL SUBJECT. NO charts/graphs/infographics. NO sci-fi clichés. NO posed humans with eye contact. 30-80 words per prompt.

WORD TARGETS: each section 170-220 words; sum to 1100-1400. Mark exactly ONE section hasPullQuote: true.

OUTPUT: Strict JSON.
{
  "title": "max 75 chars", "subtitle": "max 130 chars",
  "snapshot": {"decisionFriction":"","dominantAnxiety":"","coreInsight":"","structuralShape":"${bp.shape}","lever":""},
  "sections": [{"id":"s1","heading":"","intent":"","wordTarget":200,"hasPullQuote":false}],
  "imagePlacements": [
    {"id":"img-inline-1","position":"inline","anchorHeading":"exact heading from sections","prompt":"","alt":""},
    {"id":"img-inline-2","position":"inline","anchorHeading":"different heading","prompt":"","alt":""}
  ]
}`;
}

function buildExpandSystemPrompt(modelVoice, voiceNudge) {
  return `You are the OptiFinish editorial writer expanding ONE section. Output only this section's body HTML — no <h2>, no preamble, just paragraphs.

OPTIFINISH CONTEXT: Indian B2B powder coating equipment. Own plants/ovens/booths/automation (Z-TAP). GEMA + DURR partners. Greater Noida.

YOUR INTRINSIC VOICE THIS RUN: ${modelVoice}.

EDITORIAL VOICE NUDGE FOR THIS RUN:
${voiceNudge}

STRICT RULES:
1. NO EM-DASHES.
2. NO INLINE COLOR/style tags. Emphasis only via <b>, <i>, or 'single quotes'.
3. SEMANTIC HTML ONLY: <p>, <ol>, <ul>, <li>, <strong>, <em>, <b>, <i>, <blockquote>.
4. NO FABRICATED NUMBERS. Cite only verifiable public facts. Otherwise qualitative.
5. NO MARKETING HYPE: best-in-class, industry-leading, unparalleled, game-changing, cutting-edge, revolutionary, next-level, world-class, synergy, leverage(verb), unlock, harness, empower, robust, seamless.
6. NO CLICHÉ OPENERS or template phrases ("It is worth noting", "When it comes to", "At the end of the day", "In essence", "Did you know", "What if you could", "Take your operation to the next level", "Unlocking", "Mastering").

ANTI-MONOTONY: No two consecutive paragraphs may begin with the same word. ≥3 short sentences (<12 words), ≥1 mid (15-25), ≤1 long (40+) per section. No "First X, Second Y, Third Z" prose scaffolding — use real <ol>/<ul>. Max one 3-clause "X, Y, and Z" per section.

OUTPUT: Strict JSON. {"html": "string — body HTML only, no <h2>"}`;
}

const EDIT_SYSTEM_PROMPT = `You are a senior B2B technical editor scrubbing one OptiFinish blog draft. TIGHTEN, do not rewrite. Preserve every <h2> heading EXACTLY. Preserve any <blockquote> EXACTLY. Keep total word count within ±5%.

FIX: cliché openers, template phrases ("It is worth noting", "When it comes to", "At the end of the day", "In essence"), marketing hype (best-in-class, industry-leading, game-changing, robust, seamless, synergy, leverage(verb), unlock, harness, empower), repetitive paragraph openings (vary the second), cross-section concept repetition (synonyms/rephrasings), em-dashes (replace with comma/colon/period), overused 3-clause "X, Y, and Z".

DO NOT TOUCH: H2 headings, the <blockquote>, concrete claims (named systems, dates, OEM figures), section count, section order.

DO NOT ADD: new numbers, new claims, editorial commentary.

OUTPUT: Return ONLY the polished body HTML. No JSON wrapper, no code fences, no preamble. The first character of your output must be '<'.`;

async function runMultipassDraft(chosen, categoryId, audienceId, cat, aud, draftRun) {
  // Pass 1: outline. Needs reliable structured JSON. If the rotated model
  // doesn't support response_format (Gemma), use Llama for outline; the
  // section voice nudge still carries the intended feel through expansion.
  const outlineModel = draftRun.model.supportsJsonMode
    ? draftRun.model
    : (MODELS.find(m => m.supportsJsonMode) ?? MODELS[0]);
  if (outlineModel.id !== draftRun.model.id) {
    log('  ↳', `outline on ${outlineModel.shortName} (${draftRun.model.shortName} lacks JSON mode)`);
  }
  log('  ↳', 'Pass 1/3: outline…');
  const tA = Date.now();
  const outlineUserPrompt = `Outline this post.\n\nTITLE (provisional): "${chosen.title}"\nHOOK: "${chosen.hook}"\nANGLE: ${chosen.angle}\n\nCategory: ${cat.label} — ${cat.blurb}\nAudience: ${aud.label} (${aud.role}) — cares about: ${aud.cares}\n\nProduce 6-8 sections. wordTargets sum to 1100-1400. Mark exactly one section hasPullQuote: true. Anchor 2 inline images to two different section headings (exact text match).`;
  let outline;
  try {
    outline = await chatJson(
      buildOutlineSystemPrompt(categoryId, draftRun.voice.nudge, outlineModel.intrinsicVoice),
      outlineUserPrompt,
      { model: outlineModel.id, temperature: 0.7, maxTokens: 3500 }
    );
  } catch (err) {
    log('  ↳', `outline failed on ${outlineModel.shortName}, retrying with Llama…`);
    outline = await chatJson(
      buildOutlineSystemPrompt(categoryId, draftRun.voice.nudge, MODELS[0].intrinsicVoice),
      outlineUserPrompt,
      { model: MODELS[0].id, temperature: 0.7, maxTokens: 3500 }
    );
  }
  log('  ↳', `outline ready (${((Date.now() - tA) / 1000).toFixed(1)}s, ${outline.sections.length} sections)`);

  // Pass 2: expand sections in parallel
  log('  ↳', `Pass 2/3: expanding ${outline.sections.length} sections in parallel…`);
  const tB = Date.now();
  const sectionResults = await Promise.allSettled(
    outline.sections.map((sec, i) => {
      const prev = i > 0 ? outline.sections[i - 1] : null;
      const next = i < outline.sections.length - 1 ? outline.sections[i + 1] : null;
      const continuity =
        (prev ? `\nPrevious section was "${prev.heading}" — covered: ${prev.intent}. Do not repeat that.` : '') +
        (next ? `\nNext section will be "${next.heading}" — will cover: ${next.intent}. Set up the handoff but don't preempt.` : '');
      const userPrompt = `Expand this section.\n\nPOST CONTEXT:\n- Title: "${outline.title}"\n- Category: ${cat.label} — ${cat.blurb}\n- Audience: ${aud.label} (${aud.role}) — cares about: ${aud.cares}\n\nTHIS SECTION:\n- Heading: "${sec.heading}"\n- Intent: ${sec.intent}\n- Word target: ${sec.wordTarget} words (acceptable range: ${Math.round(sec.wordTarget * 0.85)}-${Math.round(sec.wordTarget * 1.2)})${continuity}\n\nCONSTRAINTS:\n- 2-3 paragraphs of body HTML.\n${sec.hasPullQuote ? '- Include exactly ONE <blockquote> wrapping the most quotable line.' : '- DO NOT include <blockquote>.'}\n- An <ol>/<ul> may appear if appropriate. Optional.\n\nApply ALL anti-monotony / no-fabricated-numbers / no-marketing-hype / no-cliché rules.`;
      return chatJson(
        buildExpandSystemPrompt(draftRun.model.intrinsicVoice, draftRun.voice.nudge),
        userPrompt,
        { model: draftRun.model.id, temperature: 0.65 + draftRun.model.draftTempOffset, maxTokens: 1500 }
      );
    })
  );
  const sectionHtmls = sectionResults.map((r, i) => {
    if (r.status === 'fulfilled') return r.value.html?.trim() || '';
    log('  ↳', `section ${i + 1} failed: ${r.reason.message?.slice(0, 80)}`);
    return `<p><em>Section content unavailable — re-run to fill.</em></p>`;
  });
  log('  ↳', `expansion done (${((Date.now() - tB) / 1000).toFixed(1)}s, ${sectionHtmls.filter(h => h.length > 100).length}/${outline.sections.length} solid)`);

  // Assemble
  const assembled = outline.sections
    .map((sec, i) => `<h2>${esc(sec.heading)}</h2>\n${sectionHtmls[i]}`)
    .join('\n\n');

  // Pass 3: editorial scrub (Gemma, plain-text output). Capped at 90s — the
  // sections have already been expanded individually, so the body is solid
  // even without scrub. If Gemma's queue is saturated, ship un-polished.
  log('  ↳', 'Pass 3/3: editorial scrub (Gemma, 90s ceiling)…');
  const tC = Date.now();
  let polished;
  try {
    const editPromise = chatText(
      EDIT_SYSTEM_PROMPT,
      `Edit this draft. Tighten only. Preserve all H2s and any blockquote.\n\n${assembled}`,
      { model: 'google/gemma-3-12b-it', temperature: 0.4, maxTokens: 4000 }
    );
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('editorial scrub exceeded 90s ceiling')), 90_000)
    );
    const editText = await Promise.race([editPromise, timeoutPromise]);
    const tt = editText.trim().replace(/^```(?:html)?\s*/i, '').replace(/\s*```$/i, '');
    const lt = tt.indexOf('<');
    polished = lt >= 0 ? tt.slice(lt) : assembled;
  } catch (err) {
    log('  ↳', `editorial scrub skipped (${err.message?.slice(0, 80)}), shipping un-polished body`);
    polished = assembled;
  }
  // Sanity: don't accept a polish that shrunk too much
  const origCount = assembled.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const polishedCount = polished.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  if (polishedCount < origCount * 0.85) {
    log('  ↳', `editorial pass shrank body too much (${origCount}→${polishedCount}), reverting`);
    polished = assembled;
  }
  log('  ↳', `editorial done (${((Date.now() - tC) / 1000).toFixed(1)}s)`);

  return {
    title: outline.title,
    subtitle: outline.subtitle,
    bodyHtml: polished,
    snapshot: outline.snapshot,
    imagePlacements: (outline.imagePlacements ?? []).slice(0, 2).map((p, i) => ({
      id: p.id || `img-inline-${i + 1}`,
      position: 'inline',
      anchorHeading: p.anchorHeading,
      prompt: p.prompt,
      alt: p.alt
    }))
  };
}

// ─────────────────────────────────────────────────────────────
// Pipeline
// ─────────────────────────────────────────────────────────────
function log(stage, msg) { console.log(`[${stage}] ${msg}`); }

async function main() {
  const cat = CATEGORIES.find((c) => c.id === CATEGORY_ID);
  const aud = AUDIENCES.find((a) => a.id === AUDIENCE_ID);
  if (!cat || !aud) {
    console.error(`Unknown category or audience. Valid categories: ${CATEGORIES.map(c => c.id).join(', ')}`);
    console.error(`Valid audiences: ${AUDIENCES.map(a => a.id).join(', ')}`);
    process.exit(1);
  }

  // Topic gen needs reliable structured output. If the rotated model lacks
  // JSON-mode support, the prompt-only fallback is unreliable — skip those
  // models for topic gen and use a JSON-capable model instead.
  let topicRun = pickRotated();
  while (!topicRun.model.supportsJsonMode) {
    topicRun = pickRotated();
  }
  const triggerSubset = shuffle(RECENT_TRIGGERS).slice(0, 9);
  log('1/4', `Generating topics — ${cat.label} × ${aud.label}  [model: ${topicRun.model.shortName}, voice: ${topicRun.voice.id}]…`);
  const t0 = Date.now();
  let topicResult;
  try {
    topicResult = await chatJson(
      buildTopicSystemPrompt({
        voiceNudge: topicRun.voice.nudge,
        modelVoice: topicRun.model.intrinsicVoice,
        triggers: triggerSubset
      }),
      `Generate 5 topic ideas.\n\nCategory: ${cat.label} — ${cat.blurb}\nExamples: ${cat.examples.join(', ')}\n\nAudience: ${aud.label} (${aud.role})\nCares: ${aud.cares}\n\nApply the editorial voice nudge above. Vary structural shape. Anchor at least 2 to a real TRIGGER POOL entry. Apply substitution + anti-monotony patterns. No fabricated numbers.`,
      { model: topicRun.model.id, temperature: 0.85 + topicRun.model.topicTempOffset, maxTokens: 2000 }
    );
    if (!topicResult || !Array.isArray(topicResult.topics) || topicResult.topics.length === 0) {
      throw new Error(`malformed shape: ${JSON.stringify(topicResult).slice(0, 100)}`);
    }
  } catch (err) {
    log('1/4', `${topicRun.model.shortName} failed (${err.message?.slice(0, 80)}), retrying with Llama…`);
    topicResult = await chatJson(
      buildTopicSystemPrompt({
        voiceNudge: topicRun.voice.nudge,
        modelVoice: MODELS[0].intrinsicVoice,
        triggers: triggerSubset
      }),
      `Generate 5 topic ideas.\n\nCategory: ${cat.label} — ${cat.blurb}\nExamples: ${cat.examples.join(', ')}\n\nAudience: ${aud.label} (${aud.role})\nCares: ${aud.cares}\n\nApply the editorial voice nudge above. Vary structural shape. Anchor at least 2 to a real TRIGGER POOL entry.`,
      { model: MODELS[0].id, temperature: 0.85, maxTokens: 2000 }
    );
  }
  const topics = (topicResult && Array.isArray(topicResult.topics)) ? topicResult.topics : [];
  if (topics.length === 0) throw new Error('No topics returned by either model');
  log('1/4', `${topics.length} topics in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  topics.forEach((t, i) => console.log(`     ${i + 1}. ${t.title}`));

  // Pick first topic that anchors a real trigger
  const anchored = topics.find((t) => /\b(2026|2025|Mahindra|Tata|JSW|Ather|Haier|GEMA|D[üu]rr|Jindal|Hindalco|BEE|CBAM|PFAS|PaintIndia|FABTECH|WEG|Akzo|Axalta|Ola)\b/i.test(t.title + ' ' + t.hook));
  const chosen = anchored ?? topics[0];
  log('1/4', `Picked: "${chosen.title}"`);

  // ─── MULTI-PASS draft generation (matches src/services/draftEngineMultipass.ts) ───
  // Pass 1: outline (one call) → Pass 2: parallel section expansion (N calls) → Pass 3: editorial scrub (Gemma)
  const draftRun = pickRotated();
  log('2/4', `Multi-pass draft  [model: ${draftRun.model.shortName}, voice: ${draftRun.voice.id}]`);
  const t1 = Date.now();
  const draft = await runMultipassDraft(chosen, CATEGORY_ID, AUDIENCE_ID, cat, aud, draftRun);
  draft.wordCount = String(draft.bodyHtml).replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  log('2/4', `Draft ready in ${((Date.now() - t1) / 1000).toFixed(1)}s — ${draft.wordCount} words, shape: ${draft.snapshot.structuralShape}`);
  if (draft.wordCount < 1100) {
    log('2/4', `⚠️  Below 1100-word floor (got ${draft.wordCount}). Considering re-roll…`);
  }

  log('3/4', `Rendering 2 Flux images in parallel…`);
  const t2 = Date.now();
  const placements = (draft.imagePlacements ?? []).slice(0, 2).map((p, i) => ({ ...p, id: p.id || `img-inline-${i + 1}` }));
  const imageResults = await Promise.allSettled(placements.map((p, i) => fluxImage(p.prompt, { steps: 30, seed: 41 + i })));
  imageResults.forEach((r, i) => {
    if (r.status === 'fulfilled') { placements[i].generatedUrl = r.value; log('3/4', `  image ${i + 1} ✓`); }
    else { log('3/4', `  image ${i + 1} ✗ ${r.reason.message}`); }
  });
  draft.imagePlacements = placements;
  log('3/4', `Images done in ${((Date.now() - t2) / 1000).toFixed(1)}s`);

  log('4/4', `Composing HTML…`);
  const html = buildHtml(draft, CATEGORY_ID, AUDIENCE_ID);
  const out = path.join(ROOT, 'public', 'preview.html');
  await fs.writeFile(out, html, 'utf-8');
  log('4/4', `Wrote ${out} (${(html.length / 1024).toFixed(1)} KB)`);
  console.log('');
  console.log('   ➜  Open: http://localhost:5000/preview.html');
  console.log('');
}

main().catch((e) => { console.error('FAILED:', e); process.exit(1); });
