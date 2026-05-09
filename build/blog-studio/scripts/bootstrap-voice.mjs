#!/usr/bin/env node
// Voice profile bootstrap. Self-tunes DEFAULT_PROFILE in voiceClassifier.ts
// by analysing curated "voice on" sample paragraphs and extracting their
// stylometric features. The samples below are hand-crafted to embody the
// editorial guidelines we've enforced through the prompt suite. Replace
// SAMPLES with real published posts when corpus exists.
//
// Run: node scripts/bootstrap-voice.mjs
// Output: prints the suggested DEFAULT_PROFILE values; you copy into
// src/services/voiceClassifier.ts.

// Three voice-on samples. Each ~150 words, embodying a different OptiFinish
// archetype voice but all sharing the editorial standard.
const SAMPLES = [
  // Sample 1 — Plant Manager voice, technical-deep-dive register
  `When humidity climbs past seventy percent on the Konkan coast, the OptiSpray pump's transfer-efficiency claim starts to mean less. The rejection bin is the honest meter. Hour six of the third shift is when the spec sheet stops mattering. That is when humidity, generator-driven voltage drift, and a powder bed that has been agitating for too long converge on one thing: rework. Plant managers who walk the line at hour six see what the morning audit cannot. The fix is rarely a new gun. It is usually a small change to how the existing gun is being used. Booth airflow tuned for a film build the line stopped running. Cure schedules left at the last powder's recipe. Gun-to-part distance set by a senior operator and lost when they retired. The cheapest upgrade is the one nobody capex-approves.`,

  // Sample 2 — Procurement voice, comparison-decision register
  `Manual versus automatic is the wrong question. The right question is what your line is actually bottlenecked on. If throughput is the constraint, automation and curing geometry, in that order. If quality is the constraint, pretreatment and gun control, in that order. If cost is the constraint, reclaim efficiency and energy profile, in that order. You buy the gun once. You operate the rejection rate every shift. Price the second one. A five-year TCO that ignores energy and rework is a finance memo, not a procurement decision. The plants that get this right do not optimise capex; they optimise the second-derivative of operating cost. The ones that get it wrong end up explaining a re-spec to the board eighteen months after commissioning.`,

  // Sample 3 — Engineer-mentor voice, troubleshooting register
  `Outgassing on cast aluminium is not a paint problem. It is a substrate problem the paint exposes. The defect signature is fine micro-blistering, usually concentrated on one face, often correlated with the monsoon. Diagnose it from upstream, not from the booth. First, check the vendor's pre-bake. Second, check whether the part sat overnight after pretreatment, absorbing moisture from the ambient air. Third, check the cure ramp; a slow climb gives entrapped gas time to escape, a steep one traps it. The fix lives one station upstream of where the defect surfaces. That is true of most powder coating defects. The booth gets blamed because the booth shows the symptom, but the cause is almost always in pretreatment, in the part, or in the time gap between the two.`
];

function tokenize(s) {
  return s.toLowerCase().split(/\s+/).filter((w) => w.length > 0);
}

function countSyllables(word) {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (w.length === 0) return 0;
  if (w.length <= 3) return 1;
  const vowelGroups = w.replace(/(?:[^aeiouy])/g, ' ').trim().split(/\s+/).filter(Boolean);
  let n = vowelGroups.length;
  if (w.endsWith('e')) n = Math.max(1, n - 1);
  return Math.max(1, n);
}

function fleschReadingEase(text) {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  if (sentences.length === 0 || words.length === 0) return 0;
  const totalSyllables = words.reduce((s, w) => s + countSyllables(w), 0);
  return 206.835 - 1.015 * (words.length / sentences.length) - 84.6 * (totalSyllables / words.length);
}

function analyse(text) {
  const sentences = text.split(/(?<=[.!?])\s+/).filter((s) => s.length > 1);
  const sentenceWordCounts = sentences.map((s) => s.split(/\s+/).filter(Boolean).length);
  const avgSentenceWords =
    sentenceWordCounts.reduce((a, b) => a + b, 0) / sentenceWordCounts.length;

  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim().length > 0);
  const paraWordCounts = paragraphs.map((p) => p.split(/\s+/).filter(Boolean).length);
  const avgParaWords = paraWordCounts.reduce((a, b) => a + b, 0) / paraWordCounts.length;

  const shortSentencePct =
    (sentenceWordCounts.filter((c) => c < 12).length / sentenceWordCounts.length) * 100;
  const longSentencePct =
    (sentenceWordCounts.filter((c) => c > 40).length / sentenceWordCounts.length) * 100;

  return {
    avgSentenceWords,
    avgParaWords,
    shortSentencePct,
    longSentencePct,
    fleschEase: fleschReadingEase(text)
  };
}

function main() {
  console.log(`[bootstrap-voice] analysing ${SAMPLES.length} voice-on samples\n`);
  const all = SAMPLES.map((s) => analyse(s));

  for (let i = 0; i < all.length; i++) {
    console.log(`Sample ${i + 1}:`);
    const a = all[i];
    console.log(`  avgSentenceWords  ${a.avgSentenceWords.toFixed(1)}`);
    console.log(`  avgParaWords      ${a.avgParaWords.toFixed(1)}`);
    console.log(`  shortSentencePct  ${a.shortSentencePct.toFixed(1)}%`);
    console.log(`  longSentencePct   ${a.longSentencePct.toFixed(1)}%`);
    console.log(`  fleschEase        ${a.fleschEase.toFixed(1)}\n`);
  }

  // Aggregate ranges (min/max across samples ± 10% pad)
  const min = (key) => Math.min(...all.map((a) => a[key]));
  const max = (key) => Math.max(...all.map((a) => a[key]));
  const avg = (key) => all.reduce((s, a) => s + a[key], 0) / all.length;

  console.log(`[bootstrap-voice] suggested DEFAULT_PROFILE values:\n`);
  console.log(`  avgSentenceWords:`);
  console.log(`    min:   ${Math.round(min('avgSentenceWords') * 0.85)}`);
  console.log(`    max:   ${Math.round(max('avgSentenceWords') * 1.15)}`);
  console.log(`    ideal: ${Math.round(avg('avgSentenceWords'))}`);
  console.log(``);
  console.log(`  avgParaWords:`);
  console.log(`    min:   ${Math.round(min('avgParaWords') * 0.7)}`);
  console.log(`    max:   ${Math.round(max('avgParaWords') * 1.3)}`);
  console.log(`    ideal: ${Math.round(avg('avgParaWords'))}`);
  console.log(``);
  console.log(`  shortSentenceShare:`);
  console.log(`    min:   ${Math.round(min('shortSentencePct') * 0.8)}`);
  console.log(`    max:   ${Math.round(max('shortSentencePct') * 1.2)}`);
  console.log(``);
  console.log(`  longSentenceShare:`);
  console.log(`    max:   ${Math.max(8, Math.round(max('longSentencePct') * 1.5))}`);
  console.log(``);
  console.log(`  fleschReadingEaseRange:`);
  console.log(`    min:   ${Math.round(min('fleschEase') - 5)}`);
  console.log(`    max:   ${Math.round(max('fleschEase') + 5)}`);
  console.log(``);
  console.log(
    `Update src/services/voiceClassifier.ts → DEFAULT_PROFILE with these values.`
  );
}

main();
