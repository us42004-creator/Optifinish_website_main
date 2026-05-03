#!/usr/bin/env node
// End-to-end preview generator. Runs the full live pipeline:
//   1. Llama 3.3 70B (NVIDIA Build) → 5 topics tuned for category × audience
//   2. Picks topic 1, calls Llama again → full 1100-1400 word draft + snapshot + image prompts
//   3. FLUX.1-dev (NVIDIA Build) → renders 2 inline images in parallel
//   4. Composes the OptiFinish-shaped HTML and writes it to public/preview.html
//
// Run: node scripts/preview.mjs
// Then open: http://localhost:5000/preview.html
//
// Requires the dev server to be running at localhost:5000 (the proxy injects
// the API keys server-side, so this script never sees them).

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PROXY = 'http://localhost:5000';

// ─────────────────────────────────────────────────────────────
// Demo selection — change these to preview a different pairing
// ─────────────────────────────────────────────────────────────
const CATEGORY_ID = 'technical-deep-dive';
const AUDIENCE_ID = 'plant-manager';

const CATEGORIES = [
  { id: 'product-spotlight', label: 'Product Spotlight', blurb: 'Deep look at a single product or system', examples: ['Z-TAP automation cell', 'GEMA OptiCenter', 'Curing oven series'] },
  { id: 'technical-deep-dive', label: 'Technical Deep Dive', blurb: 'How and why a process or technology works', examples: ['Powder transfer efficiency', 'Cure window control', 'Pretreatment chemistry'] },
  { id: 'case-study', label: 'Case Study / Installation', blurb: 'Real customer outcome with proof', examples: ['Auto OEM line upgrade', 'Architectural extrusion plant', 'Whitegoods retrofit'] },
  { id: 'industry-trends', label: 'Industry Trends & News', blurb: 'What is shifting in coating + finishing', examples: ['Energy efficiency norms', 'Low-cure powders', 'Robotics adoption in MSME plants'] },
  { id: 'how-to', label: 'How-To / Troubleshooting', blurb: 'Operator-grade problem solving', examples: ['Orange peel root causes', 'Fixing Faraday cage issues', 'Quick gun maintenance'] },
  { id: 'facility-behind-scenes', label: 'Facility / Behind the Scenes', blurb: 'Greater Noida manufacturing & R&D credibility', examples: ['How a powder coating plant is tested', 'Inside the R&D booth', 'Build-to-spec workflow'] },
  { id: 'buyers-guide', label: 'Buyer’s Guide / Comparison', blurb: 'Decision frameworks for prospects', examples: ['Manual vs automatic line', 'Batch oven vs conveyor', 'OEM vs partner-supplied guns'] }
];
const AUDIENCES = [
  { id: 'plant-manager', label: 'Plant Manager', role: 'Owns daily output and uptime', cares: 'Throughput, rejection rate, OEE, operator effort' },
  { id: 'procurement', label: 'Procurement Lead', role: 'Owns vendor selection and TCO', cares: 'Lifecycle cost, payback, warranty, after-sales SLA' },
  { id: 'oem-engineer', label: 'OEM Engineer', role: 'Specifies coating systems for end customers', cares: 'Spec compliance, integration, repeatability' },
  { id: 'rd-process', label: 'R&D / Process Engineer', role: 'Optimises finish quality and chemistry', cares: 'Cure profile, film build, adhesion, defect physics' },
  { id: 'c-level', label: 'C-Level / Decision Maker', role: 'Capex sign-off and strategy', cares: 'ROI, capacity expansion, brand-finish quality' },
  { id: 'existing-customer', label: 'Existing Customer', role: 'Already operates an OptiFinish system', cares: 'Upgrades, AMC value, productivity tips' }
];

// ─────────────────────────────────────────────────────────────
// Prompts (kept in sync with src/services/topicEngine.ts and draftEngine.ts)
// ─────────────────────────────────────────────────────────────
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

const TOPIC_SYSTEM_PROMPT = `You are the OptiFinish editorial strategist. OptiFinish is an Indian B2B industrial powder coating equipment company (parent: VACSPL). They sell their own powder coating plants, ovens, booths, and automation (Z-TAP, ZA01). Authorised India partners for GEMA and DURR. Sister concern Vinayak Agencies sells powders, touch-up paints, adhesives.

UNIQUE POSITIONS (every topic must reflect at least one):
1. INDIA-FIRST CONTEXT (INR, monsoon, BIS/BEE/CPCB, MSME-ZED, CBAM, generator-power, summer powder shelf-life, CR-sheet variability).
2. MULTI-OEM NEUTRALITY — sells GEMA AND DURR AND own line, can credibly compare.
3. PREMIUM INDUSTRIAL TONE — calm authority, technical credibility, never marketing hype.
4. SPECIFICITY OVER PLATITUDES.

TRIGGER POOL (anchor at least 2 of 5 topics to one of these):
${RECENT_TRIGGERS.map((t, i) => `[${i + 1}] ${t}`).join('\n')}

PATTERNS TO SUBSTITUTE:
✗ "Did you know that 10% improvement..." → ✓ Open with a named system or dated event
✗ "What if you could reduce rejections by 25%..." → ✓ State the actual operator question
✗ "Get the inside scoop" → ✓ Name the source ("Two senior process engineers walked us through...")
✗ "Take your operation to the next level" → ✓ Name the specific lever
✗ "In today's competitive market" → ✓ Strike entirely. Open with the technical fact.
✗ "Unlocking optimal X" / "Mastering Y" → ✓ Imperative ("How to read X" / "The case against Y")

DO NOT FABRICATE NUMBERS. No invented percentages, INR figures, or ROI claims. Use qualitative language ("a meaningful drop", "a measurable shift").

REQUIRED PER TOPIC: sharp HEADLINE, 1-line HOOK, 1-line ANGLE naming the structural shape, estimated read time 5-14 min.

VARIETY: across 5 topics, vary the structural shape.

OUTPUT: STRICT JSON only.
Schema: {"topics":[{"id":"t1","title":"","angle":"","hook":"","estimatedReadTime":"7 min"}]}
Return exactly 5 topics. At least 2 must reference a TRIGGER POOL entry by content.`;

const DRAFT_SYSTEM_PROMPT = `You are the OptiFinish editorial writer. You produce one complete blog post per call, written to the standard of a senior process engineer who has walked 200 plant floors. The reader is intelligent, busy, and skeptical of marketing.

OPTIFINISH CONTEXT:
- Indian B2B industrial powder coating equipment company (parent: VACSPL).
- Sells own powder coating plants, ovens, booths, automation (Z-TAP, ZA01).
- Authorised India partners for GEMA and DURR. Sister concern Vinayak Agencies.
- Greater Noida manufacturing & R&D facility.

UNIQUE POSITIONS: India-first context, multi-OEM neutrality, premium industrial tone, specificity over platitudes.

STRICT EDITORIAL RULES:
1. NO EM-DASHES. Use commas, colons, or periods. Never "—" or "--".
2. NO INLINE COLOR or style tags. Emphasis only via <b>, <i>, or 'single quotes'.
3. SEMANTIC HTML ONLY. Tags: <h2>, <h3>, <p>, <ol>, <ul>, <li>, <strong>, <em>, <b>, <i>.
4. NO FABRICATED NUMBERS. Cite only verifiable public facts (regulation dates, OEM-announced capacity). Otherwise speak qualitatively.
5. NO MARKETING HYPE. Banned: "best-in-class", "industry-leading", "unparalleled", "game-changing", "cutting-edge", "revolutionary", "next-level", "world-class", "synergy", "leverage" (verb).
6. NO LISTICLES. Lists may appear inside narrative but never as the article's spine.
7. NO CLICHÉ OPENERS. Banned: "In today's competitive market", "Did you know", "Have you ever wondered", "What if you could", "Get the inside scoop", "Take your operation to the next level". Open with a named system, dated event, or specific physical observation.
8. WORD COUNT: 1100-1400 words.

STRUCTURE: 5-7 H2 sections flowing as essay. Lead paragraph must NOT begin with the title's words. Final H2 lands the closing arc with a soft CTA paragraph.

SNAPSHOT FIELDS:
- decisionFriction: specific tradeoff, names both sides
- dominantAnxiety: the fear, names a concrete consequence
- coreInsight: the reframe, must be substantive
- structuralShape: pillar_guide | case_study | facility_tour | troubleshooting_drilldown | comparison_matrix | cost_of_inaction | immersive_essay
- lever: 1-line specific differentiator

IMAGE PROMPTS: exactly 2 inline. anchorHeading must be EXACT H2 text. Each prompt 30-80 words, no brand suffix, no sci-fi clichés, no hi-vis vests, no glossy reflections, no decorative robotic arms unless topic is about robots. Aim for: Indian industrial bay during normal operation, calibrated instrument on a panel, finished coated component cooling, engineer in mid-task without posed eye contact, macro process detail.

OUTPUT: Strict JSON only.
{
  "title": "string", "subtitle": "string", "bodyHtml": "string",
  "snapshot": { "decisionFriction": "", "dominantAnxiety": "", "coreInsight": "", "structuralShape": "immersive_essay", "lever": "" },
  "imagePlacements": [
    { "id": "img-inline-1", "position": "inline", "anchorHeading": "", "prompt": "", "alt": "" },
    { "id": "img-inline-2", "position": "inline", "anchorHeading": "", "prompt": "", "alt": "" }
  ]
}`;

const FLUX_BRAND_SUFFIX = `Shot on Hasselblad X2D, 80mm lens, f/4, natural directional light. Editorial industrial photography, calm and precise, restrained color palette of graphite, steel grey, and warm white, with a single ember-orange accent acting as the warmest light source. Kodak Portra 400 color science. Sharp focus on the subject, gentle falloff into shadow.`;

// ─────────────────────────────────────────────────────────────
// API helpers (all via the Vite proxy — keys never leave the dev server)
// ─────────────────────────────────────────────────────────────
async function chatJson(systemPrompt, userPrompt, opts = {}) {
  const res = await fetch(`${PROXY}/nvidia/llm/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: opts.model ?? 'meta/llama-3.3-70b-instruct',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: opts.temperature ?? 0.7,
      top_p: 0.92,
      max_tokens: opts.maxTokens ?? 5000,
      response_format: { type: 'json_object' }
    })
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`LLM ${res.status}: ${t.slice(0, 400)}`);
  }
  const j = await res.json();
  const txt = j.choices?.[0]?.message?.content ?? '';
  const cleaned = txt.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  return JSON.parse(cleaned);
}

async function fluxImage(prompt, { steps = 30, seed = 0 } = {}) {
  const res = await fetch(`${PROXY}/nvidia/flux/flux.1-dev`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: `${prompt.trim()}\n\n${FLUX_BRAND_SUFFIX}`,
      width: 1024,
      height: 1024,
      cfg_scale: 5,
      mode: 'base',
      seed,
      steps,
      samples: 1
    })
  });
  if (!res.ok) {
    const t = await res.text();
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
// HTML composition — port of src/services/templateBuilder.ts
// ─────────────────────────────────────────────────────────────
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function categoryIconSvg(categoryId) {
  const stroke = `stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
  const open = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" ${stroke}>`;
  const close = `</svg>`;
  switch (categoryId) {
    case 'product-spotlight': return `${open}<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M3 9h18"/>${close}`;
    case 'technical-deep-dive': return `${open}<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>${close}`;
    case 'case-study': return `${open}<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/>${close}`;
    case 'industry-trends': return `${open}<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>${close}`;
    case 'how-to': return `${open}<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>${close}`;
    case 'facility-behind-scenes': return `${open}<path d="M2 20h20"/><path d="M5 20V8l5 3V8l5 3V8l4 3v9"/>${close}`;
    case 'buyers-guide': return `${open}<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>${close}`;
    default: return `${open}<circle cx="12" cy="12" r="10"/>${close}`;
  }
}

function injectImagesIntoBody(bodyHtml, placements) {
  const usable = placements.filter((p) => p.generatedUrl);
  if (usable.length === 0) return bodyHtml;
  let html = bodyHtml;
  for (const p of usable) {
    if (!p.anchorHeading) continue;
    // Find the H2 with this heading text (allow some attribute variance)
    const re = new RegExp(`(<h2[^>]*>\\s*${escapeReg(p.anchorHeading)}\\s*</h2>)`, 'i');
    const block = `\n<div class="img-container">\n  <img src="${esc(p.generatedUrl)}" alt="${esc(p.alt)}" />\n  <div class="img-caption"><p>Visual Insight: ${esc(derivePurpose(p.prompt))}</p></div>\n</div>\n`;
    if (re.test(html)) {
      html = html.replace(re, `${block}$1`);
    } else {
      // anchor not found — append before last paragraph
      html = html + block;
    }
  }
  return html;
}
function escapeReg(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function derivePurpose(prompt) {
  const before = prompt.split(/Shot on Hasselblad/i)[0].trim();
  const sentence = before.split(/[.!?]\s/)[0];
  return sentence.length > 160 ? sentence.slice(0, 157) + '…' : sentence;
}

function buildHtml(draft, category, audience) {
  const cat = CATEGORIES.find((c) => c.id === category);
  const aud = AUDIENCES.find((a) => a.id === audience);
  const articleBody = injectImagesIntoBody(draft.bodyHtml, draft.imagePlacements);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(draft.title)} · OptiFinish</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --ink-950: #0A0A0B; --ink-900: #111113; --ink-800: #1E1E22; --ink-700: #2A2A30;
      --ember-500: #FF6B35; --ember-400: #FF8B5C; --ember-700: #C24A20;
      --paper: #FAFAF7; --paper-warm: #FFF8F2;
      --steel-500: #6B7280; --steel-400: #9CA3AF;
    }
    * { box-sizing: border-box; }
    body { background: var(--paper); color: var(--ink-950); font-family: 'Inter', system-ui, sans-serif; line-height: 1.65; margin: 0; padding: 40px 20px; -webkit-font-smoothing: antialiased; }
    .container { max-width: 820px; margin: 0 auto; background: #fff; padding: 60px; border-radius: 32px; box-shadow: 0 10px 40px rgba(10,10,11,0.06); }
    @media (max-width: 720px) { .container { padding: 32px 24px; border-radius: 20px; } body { padding: 16px 8px; } }

    .snapshot-box { position: relative; overflow: hidden; background: linear-gradient(135deg, #2A0E04 0%, #14100E 55%, #0A0A0B 100%); color: #fff; padding: 40px; border-radius: 24px; margin-bottom: 48px; border: 1px solid rgba(255,107,53,0.25); box-shadow: 0 20px 60px rgba(255,107,53,0.08); }
    .snapshot-box::before, .snapshot-box::after { content: ''; position: absolute; width: 220px; height: 220px; border-radius: 50%; filter: blur(60px); pointer-events: none; }
    .snapshot-box::before { right: -60px; top: -60px; background: rgba(255,107,53,0.18); }
    .snapshot-box::after { left: -40px; bottom: -40px; background: rgba(255,255,255,0.04); }
    .snapshot-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 32px; position: relative; z-index: 1; flex-wrap: wrap; }
    .snapshot-eyebrow { display: flex; align-items: center; gap: 12px; }
    .snapshot-icon { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: rgba(255,107,53,0.12); border: 1px solid rgba(255,107,53,0.3); border-radius: 10px; color: var(--ember-400); }
    .snapshot-eyebrow-label { display: block; font-size: 11px; font-weight: 700; font-style: italic; text-transform: uppercase; letter-spacing: 0.3em; opacity: 0.95; }
    .snapshot-eyebrow-lever { display: block; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.18em; color: rgba(255,255,255,0.65); margin-top: 4px; max-width: 480px; }
    .snapshot-title { font-family: 'Cormorant Garamond', serif; font-size: 38px; font-style: italic; font-weight: 600; margin: 0; color: #fff; line-height: 1.1; border: none; padding: 0; }
    .snapshot-pill { align-self: flex-start; padding: 8px 16px; border-radius: 999px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; background: rgba(255,107,53,0.18); color: var(--ember-400); border: 1px solid rgba(255,107,53,0.3); }
    .snapshot-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 36px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); position: relative; z-index: 1; }
    @media (max-width: 640px) { .snapshot-grid { grid-template-columns: 1fr; gap: 24px; } }
    .snapshot-cell-label { display: block; font-size: 10px; font-weight: 700; font-style: italic; text-transform: uppercase; letter-spacing: 0.22em; color: rgba(255,255,255,0.5); margin-bottom: 8px; }
    .snapshot-cell-value { margin: 0; font-size: 15px; font-weight: 500; color: #fff; line-height: 1.55; }
    .snapshot-cell-value.italic { font-style: italic; opacity: 0.85; font-family: 'JetBrains Mono', monospace; font-size: 13px; }

    .article { background: #fff; border-radius: 24px; padding: 0; }
    .article-header { margin-bottom: 40px; }
    .article-section-marker { display: flex; align-items: center; gap: 12px; font-size: 10px; font-weight: 700; font-style: italic; text-transform: uppercase; letter-spacing: 0.3em; color: var(--ink-950); margin-bottom: 16px; }
    .article-section-marker::before, .article-section-marker::after { content: ''; flex: 0 0 32px; height: 1px; background: rgba(10,10,11,0.3); }
    .article h1 { font-family: 'Cormorant Garamond', serif; font-size: 44px; font-weight: 700; line-height: 1.12; margin: 0 0 16px; color: var(--ink-950); }
    @media (max-width: 720px) { .article h1 { font-size: 32px; } }
    .article-meta { font-size: 10px; font-weight: 700; font-style: italic; text-transform: uppercase; letter-spacing: 0.3em; color: var(--steel-500); margin-top: 12px; }
    .article h2 { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 600; margin: 40px 0 16px; color: var(--ink-950); border-bottom: 1px solid rgba(255,107,53,0.15); padding-bottom: 10px; line-height: 1.25; }
    .article h3 { font-size: 16px; font-weight: 700; margin: 28px 0 10px; color: var(--ember-700); }
    .article p { font-size: 16px; line-height: 1.75; margin: 0 0 18px; color: var(--ink-900); }
    .article ul, .article ol { padding-left: 24px; margin: 0 0 20px; }
    .article li { margin-bottom: 10px; font-size: 16px; line-height: 1.7; }
    .article strong, .article b { font-weight: 700; color: var(--ink-950); }
    .article em, .article i { font-style: italic; }
    .img-container { margin: 48px 0; border-top: 1px solid #e2e8f0; padding-top: 16px; }
    .img-container img { width: 100%; border-radius: 16px; display: block; }
    .img-caption { margin-top: 14px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0; }
    .img-caption p { margin: 0; font-size: 10px; font-weight: 700; color: var(--steel-500); text-transform: uppercase; letter-spacing: 0.18em; line-height: 1.5; }
    .article-footer { margin-top: 56px; padding-top: 32px; border-top: 1px solid #e2e8f0; text-align: center; }
    .article-footer-mark { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.3em; color: var(--steel-500); }
  </style>
</head>
<body>
  <div class="container">
    <div class="snapshot-box">
      <div class="snapshot-head">
        <div class="snapshot-eyebrow">
          <div class="snapshot-icon">${categoryIconSvg(category)}</div>
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
        <div class="article-meta">${draft.wordCount} words · ${cat?.label ?? '—'} · ${aud?.label ?? '—'}</div>
      </header>
      <div class="blog-body-text">${articleBody}</div>
      <footer class="article-footer">
        <div class="article-footer-mark">OptiFinish · VACSPL · Greater Noida</div>
      </footer>
    </article>
  </div>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────
// Pipeline
// ─────────────────────────────────────────────────────────────
function log(stage, msg) { console.log(`[${stage}] ${msg}`); }

async function main() {
  const cat = CATEGORIES.find((c) => c.id === CATEGORY_ID);
  const aud = AUDIENCES.find((a) => a.id === AUDIENCE_ID);

  log('1/4', `Generating topics — ${cat.label} × ${aud.label}…`);
  const t0 = Date.now();
  const { topics } = await chatJson(
    TOPIC_SYSTEM_PROMPT,
    `Generate 5 topic ideas.\n\nCategory: ${cat.label} — ${cat.blurb}\nExamples: ${cat.examples.join(', ')}\n\nAudience: ${aud.label} (${aud.role})\nCares: ${aud.cares}\n\nVary structural shape. Anchor at least 2 to a real TRIGGER POOL entry. Apply substitution patterns. No fabricated numbers.`,
    { temperature: 0.85, maxTokens: 2000 }
  );
  log('1/4', `${topics.length} topics in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  topics.forEach((t, i) => console.log(`     ${i + 1}. ${t.title}`));

  // Pick the FIRST topic that anchors a trigger if any (heuristic: contains a year or named OEM)
  const anchored = topics.find((t) => /\b(2026|2025|Mahindra|Tata|JSW|Ather|Haier|GEMA|D[üu]rr|Jindal|Hindalco|BEE|CBAM|PFAS|PaintIndia|FABTECH|WEG)\b/i.test(t.title + ' ' + t.hook));
  const chosen = anchored ?? topics[0];
  log('1/4', `Picked: "${chosen.title}"`);

  log('2/4', `Generating full draft (1100-1400 words)…`);
  const t1 = Date.now();
  const draft = await chatJson(
    DRAFT_SYSTEM_PROMPT,
    `Write the post for this topic.\n\nTITLE: "${chosen.title}"\nHOOK: "${chosen.hook}"\nANGLE: ${chosen.angle}\n\nCategory: ${cat.label} — ${cat.blurb}\nAudience: ${aud.label} (${aud.role})\nCares: ${aud.cares}\n\nWrite the full post per the rules.`,
    { temperature: 0.7, maxTokens: 5000 }
  );
  draft.wordCount = String(draft.bodyHtml).replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  log('2/4', `Draft ready in ${((Date.now() - t1) / 1000).toFixed(1)}s — ${draft.wordCount} words, shape: ${draft.snapshot.structuralShape}`);

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
