#!/usr/bin/env node
// Trigger-pool refresh script. Scrapes a curated list of regulatory + OEM
// sources for new dated events, runs them through the LLM to produce
// trigger-pool-shaped one-liners, and writes a candidates file the
// editorial team reviews before merging into topicEngine.ts.
//
// USAGE
//   node scripts/refresh-triggers.mjs
//   → writes scripts/triggers-candidates.json with proposed entries
//
// Each Sunday this should run via cron / GitHub Action. For now it's a
// one-shot CLI. SOURCES are easy to extend — add an entry to SOURCES,
// implement extract(), done.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PROXY = process.env.PROXY || 'http://localhost:5001';
const OUTPUT = path.join(__dirname, 'triggers-candidates.json');

// ─────────────────────────────────────────────────────────────
// Sources — easy to extend
// ─────────────────────────────────────────────────────────────
const SOURCES = [
  {
    id: 'cpcb-notifications',
    name: 'CPCB (Central Pollution Control Board) — recent notifications',
    url: 'https://cpcb.nic.in/important-notifications/',
    extract: extractCpcb
  },
  {
    id: 'bis-news',
    name: 'BIS (Bureau of Indian Standards) — All News',
    url: 'https://www.bis.gov.in/all-news/',
    extract: extractGenericDated
  },
  {
    id: 'bee-notifications',
    name: 'BEE (Bureau of Energy Efficiency) — Notifications & Circulars',
    url: 'https://beeindia.gov.in/en/notifications-circulars',
    extract: extractGenericDated
  },
  {
    id: 'mahindra-newsroom',
    name: 'Mahindra Group — Newsroom',
    url: 'https://www.mahindra.com/news-room',
    extract: extractGenericDated
  },
  {
    id: 'tata-motors-press',
    name: 'Tata Motors — Press Releases',
    url: 'https://www.tatamotors.com/press/',
    extract: extractGenericDated
  },
  {
    id: 'jsw-press',
    name: 'JSW Group — Press Releases',
    url: 'https://www.jsw.in/media/press-releases',
    extract: extractGenericDated
  }
  // Each extractor is intentionally conservative — returns [] on parse
  // failure rather than guessing. Add more sources by appending to this
  // array; each just needs a URL and an extractor function.
];

// ─────────────────────────────────────────────────────────────
// Source-specific extractors (light HTML scraping)
// ─────────────────────────────────────────────────────────────
async function extractCpcb(html) {
  // CPCB notifications page renders as a dated list. Pull the most recent
  // 10 entries with their dates. Defensive — if the markup changes, return [].
  try {
    const items = [];
    // Match patterns like "DD-MM-YYYY" near anchor tags
    const dateRegex = /(\d{1,2}[-/]\d{1,2}[-/]\d{4})\s*(?:[\s\S]{0,400}?)<a[^>]*>([^<]{20,200})<\/a>/gi;
    let m;
    while ((m = dateRegex.exec(html)) !== null && items.length < 10) {
      items.push({ date: m[1].trim(), title: m[2].trim().replace(/\s+/g, ' ') });
    }
    return items;
  } catch (err) {
    console.warn('[cpcb extract] failed:', err.message);
    return [];
  }
}

// Generic extractor — handles most corporate / regulatory press pages that
// render as dated anchor lists. Tries multiple date patterns:
//   - DD-MM-YYYY / DD/MM/YYYY
//   - "Month DD, YYYY" (e.g. "January 8, 2025")
//   - "DD Mon YYYY" (e.g. "8 Jan 2025")
// Tries multiple title patterns: <a>title</a>, <h3>title</h3>, <h2>title</h2>.
// Returns the most recent ~10 matches. If neither pattern fires, returns []
// rather than guessing — better to skip a source than fabricate triggers.
async function extractGenericDated(html) {
  const items = [];
  const seen = new Set();
  const push = (date, title) => {
    const t = (title || '').trim().replace(/\s+/g, ' ');
    if (t.length < 18 || t.length > 250) return;
    const key = t.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    items.push({ date: (date || '').trim(), title: t });
  };

  const patterns = [
    // Numeric date near anchor: "8-1-2025 ... <a>...</a>"
    /(\d{1,2}[-/]\d{1,2}[-/]\d{4})\s*(?:[\s\S]{0,500}?)<a[^>]*>([^<]{18,250})<\/a>/gi,
    // "Month DD, YYYY ... <a>...</a>"
    /((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2},?\s+\d{4})\s*(?:[\s\S]{0,500}?)<a[^>]*>([^<]{18,250})<\/a>/gi,
    // "DD Mon YYYY ... <a>...</a>" (Indian format common on BIS / BEE / Tata)
    /(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4})\s*(?:[\s\S]{0,500}?)<a[^>]*>([^<]{18,250})<\/a>/gi,
    // <h2/h3> headline followed by "DD-MM-YYYY"
    /<h[23][^>]*>([^<]{18,250})<\/h[23]>\s*(?:[\s\S]{0,500}?)(\d{1,2}[-/]\d{1,2}[-/]\d{4})/gi
  ];

  for (const re of patterns) {
    let m;
    while ((m = re.exec(html)) !== null && items.length < 10) {
      // Pattern 4 has title-then-date order; others have date-then-title
      if (re.source.startsWith('<h')) push(m[2], m[1]);
      else push(m[1], m[2]);
    }
    if (items.length >= 10) break;
  }
  return items;
}

// ─────────────────────────────────────────────────────────────
// LLM — converts raw source items into trigger-pool one-liners
// ─────────────────────────────────────────────────────────────
const TRIGGER_SHAPING_PROMPT = `You are formatting raw regulatory / industry events into one-line entries for OptiFinish's editorial trigger pool.

INPUT FORMAT: a list of items, each with a date and a raw title.

OUTPUT: one trigger-pool entry per item, each shaped like the existing pool. Examples of the existing pool's shape:

- "EU CBAM live since 1 Jan 2026 — 15-22% price hit on Indian aluminium and steel exports per GTRI"
- "Mahindra inaugurated 500-robot Chakan EV paint shop on 8 Jan 2025, INR 4,500 cr investment"
- "BEE made energy-efficiency star labelling mandatory 1 Jan 2026 for chillers, cooling towers, distribution transformers"

RULES:
- Lead with the named entity (regulator / OEM / company / event).
- Include the date in human-readable form (e.g. "Jan 2026", "8 Jan 2025").
- One concrete fact: a number, a deadline, a capacity figure, a regulation scope. If the source title doesn't supply one, write a faithful 1-line summary; do NOT fabricate numbers.
- Skip items that are not relevant to industrial coatings / powder coating / paint / surface finishing / metal manufacturing in India.
- Preserve technical accuracy. If the title is ambiguous, skip rather than guess.

OUTPUT: Strict JSON.

{
  "candidates": [
    { "trigger": "string", "sourceTitle": "string from input", "date": "string from input", "relevance": "high" | "medium" | "low" }
  ]
}`;

async function shapeWithLlm(sourceItems, sourceName) {
  if (sourceItems.length === 0) return [];
  const userPrompt = `Source: ${sourceName}

Raw items:
${sourceItems.map((it, i) => `${i + 1}. [${it.date}] ${it.title}`).join('\n')}

Shape into trigger-pool entries. Skip items not relevant to industrial coatings / surface finishing / metal manufacturing in India.`;

  const res = await fetch(`${PROXY}/api/nvidia/llm`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'meta/llama-3.3-70b-instruct',
      messages: [
        { role: 'system', content: TRIGGER_SHAPING_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.4,
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    })
  });
  if (!res.ok) {
    const t = await res.text();
    console.warn(`[shapeWithLlm] LLM ${res.status}: ${t.slice(0, 200)}`);
    return [];
  }
  const j = await res.json();
  const content = j.choices?.[0]?.message?.content ?? '';
  try {
    const parsed = JSON.parse(content);
    return parsed.candidates ?? [];
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────
async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'OptiFinish-TriggerRefresh/1.0 (+https://optifinish.com; editorial@optifinish.com)'
    }
  });
  if (!res.ok) throw new Error(`fetch ${url} ${res.status}`);
  return res.text();
}

async function main() {
  console.log(`[refresh-triggers] checking ${SOURCES.length} source(s)…`);
  const allCandidates = [];

  for (const src of SOURCES) {
    process.stdout.write(`  ${src.id}… `);
    try {
      const html = await fetchHtml(src.url);
      const rawItems = await src.extract(html);
      console.log(`raw items: ${rawItems.length}`);
      if (rawItems.length === 0) continue;
      const shaped = await shapeWithLlm(rawItems, src.name);
      console.log(`    → ${shaped.length} trigger candidates`);
      allCandidates.push({
        source: src.id,
        sourceUrl: src.url,
        candidates: shaped
      });
    } catch (err) {
      console.log(`failed (${err.message})`);
    }
  }

  const output = {
    generated: new Date().toISOString(),
    sources: allCandidates,
    instructions:
      'Review each candidate. Merge accepted entries into ' +
      'src/services/topicEngine.ts → RECENT_TRIGGERS_2025_2026 array. ' +
      'Keep the array length around 18-24; archive older entries to a separate log.'
  };

  await fs.writeFile(OUTPUT, JSON.stringify(output, null, 2));
  const total = allCandidates.reduce((s, b) => s + b.candidates.length, 0);
  console.log(`\n[refresh-triggers] wrote ${total} candidates → ${OUTPUT}`);
  console.log(`\nNext steps:`);
  console.log(`  1. Review ${path.relative(ROOT, OUTPUT)}`);
  console.log(
    `  2. Edit src/services/topicEngine.ts → RECENT_TRIGGERS_2025_2026, paste accepted entries`
  );
  console.log(`  3. (optional) commit and redeploy to refresh production`);
}

main().catch((e) => {
  console.error('FAILED:', e);
  process.exit(1);
});
