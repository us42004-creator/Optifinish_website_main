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
  }
  // ADD MORE HERE — minimum needed for legendary tier:
  // - https://www.bis.gov.in/standardsearch/  (BIS standards updates)
  // - https://beeindia.gov.in/en/notifications  (BEE notifications)
  // - https://www.mahindra.com/news-room       (Mahindra IR / press)
  // - https://www.tatamotors.com/press         (Tata Motors press)
  // - https://www.ather.com/press              (Ather press)
  // - https://paintindia.in/exhibitor-list     (PaintIndia exhibitors / news)
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
