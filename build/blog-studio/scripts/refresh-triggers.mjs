#!/usr/bin/env node
// Trigger-pool refresh — Brave Search edition. Replaces the regex scrapers
// with broad search queries over Brave's index, then runs results through
// Llama to shape into trigger-pool one-liners. Massively more useful than
// site-specific scrapers because Brave finds news from anywhere on the
// open web that mentions the search terms.
//
// USAGE
//   node scripts/refresh-triggers.mjs
//   → writes scripts/triggers-candidates.json with proposed entries
//
// SETUP REQUIRED
//   1. Get a Brave Search API key at https://brave.com/search/api/
//      (free tier: 2,000 queries/month, 1 QPS — plenty for weekly refresh)
//   2. Add to .env.local: BRAVE_API_KEY=BSA...
//   3. Make sure the dev server is running (pnpm dev) so the proxy works
//
// Each Sunday this should run via cron / GitHub Action.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PROXY = process.env.PROXY || 'http://localhost:5001';
const OUTPUT = path.join(__dirname, 'triggers-candidates.json');

// ─────────────────────────────────────────────────────────────
// QUERIES — broad enough to surface OEM moves, regulations, and
// industry news that matter to OptiFinish's content map.
// Each query has a freshness hint: 'pw' (past week) for fast-moving
// news, 'pm' (past month) for regulations, 'py' (past year) for slow
// signals. Tune frequencies to suit the editorial cadence.
// ─────────────────────────────────────────────────────────────
const QUERIES = [
  // India regulatory + compliance
  { q: 'BEE energy efficiency mandate India 2026', freshness: 'pm', tag: 'regulatory-bee' },
  { q: 'CBAM India aluminium steel exports impact', freshness: 'pm', tag: 'regulatory-cbam' },
  { q: 'PFAS phase out powder coating compliance India', freshness: 'pm', tag: 'regulatory-pfas' },
  { q: 'BIS Bureau Indian Standards new notification industrial coatings', freshness: 'pm', tag: 'regulatory-bis' },
  { q: 'CPCB pollution control board powder coating notification', freshness: 'pm', tag: 'regulatory-cpcb' },

  // OEM expansion + paint shop news
  { q: 'Mahindra paint shop expansion robots India', freshness: 'pm', tag: 'oem-mahindra' },
  { q: 'Tata Motors EV paint shop automation 2026', freshness: 'pm', tag: 'oem-tata' },
  { q: 'JSW MG Motor India plant expansion paint', freshness: 'pm', tag: 'oem-jsw' },
  { q: 'Ather Energy plant expansion paint coating', freshness: 'pm', tag: 'oem-ather' },
  { q: 'Hindalco Jindal aluminium extrusion coating line India', freshness: 'pm', tag: 'oem-aluminium' },

  // Industry vendors + product launches
  { q: 'GEMA OptiSpray powder coating new launch 2026', freshness: 'py', tag: 'vendor-gema' },
  { q: 'Durr powder coating booth EcoBell automation', freshness: 'py', tag: 'vendor-durr' },
  { q: 'low temperature cure powder coating India 2026', freshness: 'pm', tag: 'tech-low-cure' },
  { q: 'AI vision inspection powder coating quality control', freshness: 'pm', tag: 'tech-ai-qc' },

  // Events + market
  { q: 'PaintIndia FABTECH India 2026 exhibitor announcement', freshness: 'pm', tag: 'event' },
  { q: 'India industrial coatings market consolidation merger 2026', freshness: 'pm', tag: 'market' }
];

// ─────────────────────────────────────────────────────────────
// LLM — converts raw Brave results into trigger-pool one-liners
// ─────────────────────────────────────────────────────────────
const TRIGGER_SHAPING_PROMPT = `You are formatting raw web search results into one-line entries for OptiFinish's editorial trigger pool.

INPUT FORMAT: a list of search results, each with a title, hostname, age, and description.

OUTPUT: one trigger-pool entry per item that is GENUINELY RELEVANT to industrial coatings / powder coating / paint / surface finishing / metal manufacturing in India.

EXAMPLES OF THE EXISTING POOL'S SHAPE:
- "EU CBAM live since 1 Jan 2026 — 15-22% price hit on Indian aluminium and steel exports per GTRI"
- "Mahindra inaugurated 500-robot Chakan EV paint shop on 8 Jan 2025, INR 4,500 cr investment"
- "BEE made energy-efficiency star labelling mandatory 1 Jan 2026 for chillers, cooling towers, distribution transformers"
- "GEMA launched OptiSpray All-in-One pump (FABTECH 2025, PaintExpo 2026)"

RULES:
- Lead with the named entity (regulator / OEM / company / event).
- Include the date in human-readable form derived from the title or age field (e.g. "Jan 2026", "8 Jan 2025"). If you cannot confirm a date, skip the item.
- One concrete fact: a number, a deadline, a capacity figure, a regulation scope. If the source doesn't supply one verifiable fact, write a faithful 1-line summary; do NOT fabricate numbers.
- SKIP items that are:
  - not relevant to industrial coatings / surface finishing / metal manufacturing in India
  - obvious marketing fluff with no concrete information
  - older than 18 months (age field will tell you)
  - duplicates of entries you've already produced in this output
- Preserve technical accuracy. If the title is ambiguous, skip rather than guess.

OUTPUT: Strict JSON.

{
  "candidates": [
    {
      "trigger": "string — the formatted one-liner",
      "sourceTitle": "string from input",
      "sourceUrl": "string from input",
      "age": "string from input or empty",
      "relevance": "high" | "medium" | "low"
    }
  ]
}`;

async function shapeWithLlm(allBuckets) {
  const flatList = [];
  for (const bucket of allBuckets) {
    for (const r of bucket.results.slice(0, 6)) {
      flatList.push({
        title: r.title,
        hostname: r.hostname,
        age: r.age ?? '',
        description: r.description,
        url: r.url,
        bucket: bucket.tag
      });
    }
  }
  if (flatList.length === 0) return [];

  const userPrompt = `Search results from ${allBuckets.length} queries. Shape relevant items into trigger-pool entries.

${flatList
  .map(
    (r, i) =>
      `${i + 1}. [${r.bucket}] [${r.age || 'unknown age'}] ${r.title} — ${r.hostname}\n   ${r.description?.slice(0, 220)}\n   ${r.url}`
  )
  .join('\n\n')}

Output strict JSON. Skip anything not relevant to Indian industrial coatings, surface finishing, paint, or metal-manufacturing OEM activity.`;

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
      max_tokens: 3000,
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
// Brave call (sequential — free tier is 1 QPS)
// ─────────────────────────────────────────────────────────────
async function brave(q, freshness) {
  const params = new URLSearchParams({ q, count: '8', freshness, country: 'IN' });
  const res = await fetch(`${PROXY}/api/brave/search?${params}`);
  if (!res.ok) throw new Error(`Brave ${res.status}`);
  const json = await res.json();
  return (json.web?.results ?? []).map((r) => ({
    title: r.title,
    url: r.url,
    description: r.description,
    age: r.age,
    hostname: r.meta_url?.hostname
  }));
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────
async function main() {
  console.log(`[refresh-triggers] running ${QUERIES.length} Brave queries (sequential, ~1s each)…`);
  const buckets = [];
  for (const { q, freshness, tag } of QUERIES) {
    process.stdout.write(`  ${tag.padEnd(20)} `);
    try {
      const results = await brave(q, freshness);
      console.log(`${results.length} results`);
      buckets.push({ query: q, tag, results });
    } catch (err) {
      console.log(`✗ ${err.message?.slice(0, 80)}`);
      buckets.push({ query: q, tag, results: [] });
    }
    // Stay under 1 QPS
    await new Promise((r) => setTimeout(r, 1100));
  }

  const total = buckets.reduce((s, b) => s + b.results.length, 0);
  console.log(`\n[refresh-triggers] ${total} raw results → running through Llama to shape…`);

  const candidates = await shapeWithLlm(buckets);

  const output = {
    generated: new Date().toISOString(),
    queries: QUERIES.map((q) => q.q),
    rawResultCount: total,
    candidates,
    instructions:
      'Review each candidate. Merge accepted entries into ' +
      'src/services/topicEngine.ts → RECENT_TRIGGERS_2025_2026 array. ' +
      'Keep the array length around 18-24; archive older entries to a separate log.'
  };

  await fs.writeFile(OUTPUT, JSON.stringify(output, null, 2));
  console.log(`[refresh-triggers] wrote ${candidates.length} shaped candidates → ${OUTPUT}`);
  console.log(``);
  console.log(`Next steps:`);
  console.log(`  1. Review ${path.relative(ROOT, OUTPUT)}`);
  console.log(`  2. Merge accepted entries into src/services/topicEngine.ts`);
  console.log(`  3. (optional) commit and redeploy`);
}

main().catch((e) => {
  console.error('FAILED:', e);
  process.exit(1);
});
