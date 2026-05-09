import { CategoryId, AudienceId, TopicIdea } from '../types';
import { CATEGORIES, AUDIENCES } from '../constants';
import { chatJSON } from './nvidiaLlmService';
import { pickRotated, shuffle, MODELS } from './modelRouter';

// 2025-2026 verified triggers from the niche-research synthesis.
// We show a RANDOM SUBSET of 9 to the model on each call so different runs
// see different anchors and don't keep producing CBAM topics.
// Refresh this list quarterly — that's the freshness lever.
const RECENT_TRIGGERS_2025_2026 = [
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

function buildSystemPrompt(opts: {
  voiceNudge: string;
  modelVoice: string;
  triggers: string[];
  excludeTitles: string[];
}): string {
  const { voiceNudge, modelVoice, triggers, excludeTitles } = opts;

  const exclusionBlock =
    excludeTitles.length > 0
      ? `
═════════════════════════════════════════════
  RECENTLY GENERATED — DO NOT REPRODUCE OR HEAVILY OVERLAP
═════════════════════════════════════════════
The following topics were already produced in previous calls. Do NOT pick the same trigger, the same framing, or the same archetype as any of these. Each must be a fresh editorial bet.

${excludeTitles.map((t, i) => `${i + 1}. ${t}`).join('\n')}
`
      : '';

  return `You are the OptiFinish editorial strategist. OptiFinish is an Indian B2B industrial powder coating equipment company (parent: VACSPL). They sell their own plants, ovens, booths, and automation (Z-TAP, ZA01). Authorised India partners for GEMA and DURR. Sister concern Vinayak Agencies sells powders, touch-up paints, adhesives.

YOUR INTRINSIC VOICE THIS RUN: ${modelVoice}.

EDITORIAL VOICE NUDGE FOR THIS RUN:
${voiceNudge}

UNIQUE POSITIONS (every topic must reflect at least one):
1. INDIA-FIRST CONTEXT — INR cost transparency, monsoon humidity outgassing, 40°C summer powder shelf-life, Indian CR-sheet substrates, BIS/BEE/CPCB compliance, MSME-ZED, CBAM exposure, generator-power oven ramp issues. The Indian B2B coating content space is a vacuum.
2. MULTI-OEM NEUTRALITY — OptiFinish sells GEMA AND DURR AND its own line. They can credibly compare without bias.
3. PREMIUM INDUSTRIAL TONE — calm authority, technical credibility, never marketing hype.
4. SPECIFICITY OVER PLATITUDES — every topic must hint at a real trigger, named system, or measurable shift.

AUDIENCES (tune voice to the one passed):
- Plant Manager: throughput, rejection rate, OEE, third-shift uptime
- Procurement Lead: TCO, payback, warranty, after-sales SLA, INR
- OEM Engineer: spec compliance, integration, repeatability
- R&D / Process Engineer: cure profile, film build, adhesion, defect physics
- C-Level: ROI, capacity expansion, brand-finish quality, capex sign-off
- Existing Customer: upgrades, AMC value, productivity tips
- Architect / Facade Specifier: Qualicoat Class 2, super-durables, 25-year warranty, non-chromate pretreatment
- Consulting Engineer: verifiable references, spec compliance, technical proofs, neutral comparisons

CATEGORY SHAPES (use the one passed; vary the structural angle across the 5 topics):
- Pillar Guide → long-form authority anchor
- Case Study / Installation → PAS + quantified outcome arc
- Comparison & Decision Frame → X vs Y, decision matrix, 5-yr TCO
- Cost of Inaction → loss-aversion frame
- Facility / Behind-the-Scenes → Greater Noida credibility, named engineers
- Technical Deep Dive → mechanism / process / chemistry
- How-To / Troubleshooting → operator-grade defect diagnosis
- Industry Trends & News → tied to a specific dated trigger

═════════════════════════════════════════════
  TRIGGER POOL (curated subset for this run)
═════════════════════════════════════════════
You MUST anchor at least 2 of the 5 topics to one of these real triggers. Reference the trigger explicitly in the title or hook. The other 3 topics may be evergreen-but-specific.

${triggers.map((t, i) => `[${i + 1}] ${t}`).join('\n')}
${exclusionBlock}
═════════════════════════════════════════════
  PATTERNS TO SUBSTITUTE
═════════════════════════════════════════════
✗ "Did you know that 10% improvement in X leads to..." → ✓ Open with a named system or dated event
✗ "What if you could reduce rejections by 25%..." → ✓ State the actual question the operator is asking
✗ "Get the inside scoop on..." → ✓ Name the source ("Two senior process engineers walked us through...")
✗ "Take your operation to the next level" → ✓ Name the specific lever
✗ "In today's competitive market" → ✓ Strike entirely. Open with the technical fact.
✗ "Unlocking optimal X" / "Mastering Y" → ✓ Use the imperative ("How to read X" / "The case against Y")

═════════════════════════════════════════════
  ANTI-MONOTONY RULES (read carefully)
═════════════════════════════════════════════
- The 5 titles in your output MUST start with 5 DIFFERENT first words. No two titles share an opening word.
- AT LEAST 2 of the 5 titles must NOT start with "How", "The", "What", "Why", or "When".
- AT LEAST 1 title must be a declarative statement (no question, no how-to).
- AT LEAST 1 title must be 6 words or fewer.
- AT LEAST 1 title must be 12 words or longer.
- Vary the structural shape: do not return 5 case-study-shaped or 5 pillar-shaped topics.

═════════════════════════════════════════════
  DO NOT FABRICATE NUMBERS
═════════════════════════════════════════════
You have NO real data on transfer-efficiency percentages, rejection-rate reductions, ROI figures, or cost savings for OptiFinish customers. NEVER invent a number — a B2B reader will catch it in five seconds. Use qualitative language: "a meaningful drop", "a measurable shift".

REQUIRED PER TOPIC: a sharp HEADLINE, a 1-line HOOK, a 1-line ANGLE naming the structural shape, and an estimated read time (5-14 min).

OUTPUT: STRICT JSON only, no prose, no markdown, no code fences.
{
  "topics": [
    { "id": "t1" | "t2" | ... | "t5", "title": "string", "angle": "string", "hook": "string", "estimatedReadTime": "string" }
  ]
}
Return exactly 5 topics. At least 2 must reference a TRIGGER POOL entry above by content (not by number).`;
}

export async function generateTopicIdeasLLM(
  category: CategoryId,
  audience: AudienceId,
  excludeTitles: string[] = []
): Promise<TopicIdea[]> {
  const cat = CATEGORIES.find((c) => c.id === category);
  const aud = AUDIENCES.find((a) => a.id === audience);
  if (!cat || !aud) throw new Error('Invalid category or audience');

  const { model, voice } = pickRotated();
  const triggers = shuffle(RECENT_TRIGGERS_2025_2026).slice(0, 9);

  const userPrompt = `Generate 5 topic ideas.

Category: ${cat.label} — ${cat.blurb}
Examples that fit this category: ${cat.examples.join(', ')}

Audience: ${aud.label} (${aud.role})
This reader cares about: ${aud.cares}

Apply the editorial voice nudge above. Vary structural angle across the 5 topics. Anchor at least 2 to a real TRIGGER POOL entry. Apply substitution patterns. Apply anti-monotony rules. Do not fabricate numbers.${
    excludeTitles.length > 0
      ? `

Critical: do not produce anything that overlaps with the recent titles listed in the system prompt — fresh ground only.`
      : ''
  }`;

  // First attempt with the rotated model. If it fails or returns junk, fall
  // back to a different model so a single bad rollout doesn't break the UI.
  const baseTemp = 0.85 + model.topicTempOffset;

  try {
    const result = await chatJSON<{ topics: TopicIdea[] }>({
      model: model.id,
      messages: [
        {
          role: 'system',
          content: buildSystemPrompt({
            voiceNudge: voice.nudge,
            modelVoice: model.intrinsicVoice,
            triggers,
            excludeTitles
          })
        },
        { role: 'user', content: userPrompt }
      ],
      temperature: baseTemp,
      topP: 0.95,
      maxTokens: 2000
    });

    if (!Array.isArray(result?.topics) || result.topics.length === 0) {
      throw new Error('LLM returned no topics');
    }

    return result.topics.slice(0, 5).map((t, i) => ({
      id: `t${i + 1}`,
      title: t.title?.trim() || `Topic ${i + 1}`,
      angle: t.angle?.trim() || '',
      hook: t.hook?.trim() || '',
      estimatedReadTime: t.estimatedReadTime?.trim() || '7 min'
    }));
  } catch (err) {
    console.warn(`[topicEngine] ${model.shortName} failed, falling back to Llama:`, err);
    // Fallback to Llama which we know is reliable
    const fallbackModel = MODELS[0]; // Llama 3.3 70B
    const result = await chatJSON<{ topics: TopicIdea[] }>({
      model: fallbackModel.id,
      messages: [
        {
          role: 'system',
          content: buildSystemPrompt({
            voiceNudge: voice.nudge,
            modelVoice: fallbackModel.intrinsicVoice,
            triggers,
            excludeTitles
          })
        },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.85,
      topP: 0.95,
      maxTokens: 2000
    });
    return (result?.topics ?? []).slice(0, 5).map((t, i) => ({
      id: `t${i + 1}`,
      title: t.title?.trim() || `Topic ${i + 1}`,
      angle: t.angle?.trim() || '',
      hook: t.hook?.trim() || '',
      estimatedReadTime: t.estimatedReadTime?.trim() || '7 min'
    }));
  }
}
