// Editorial post-generation flag detectors. Broader coverage than the
// original set that shipped in draftEngineMultipass — catches INR ranges,
// fabricated years, more outcome-percentage patterns, and bare first-
// person contractions ("we're measuring") that the narrower verb-list
// pattern missed.
//
// Called by BOTH draft engines (multipass and single-pass) so warnings
// surface regardless of which path won the race.

export interface EditorialFlags {
  fabricatedNumbers: string[]; // financial figures, percentages, physical claims
  firstPersonLeaks: string[];  // "we", "our", "us" inside body copy
  fabricatedYears: string[];   // years outside the trigger pool (invented context dates)
  hasAny: boolean;             // convenience: true iff any of the above are non-empty
}

// Years that appear in the current trigger pool + adjacent "safe" years.
// A year like "since 2010" is invented; "in Jan 2026" is fine.
const KNOWN_SAFE_YEARS = new Set([
  '2024', '2025', '2026', '2027' // current + adjacent — extend if the trigger pool ever ranges wider
]);

// ─────────────────────────────────────────────────────────────
// Fabricated financial figures, percentages, physical claims
// ─────────────────────────────────────────────────────────────
export function detectFabricatedNumbers(html: string): string[] {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const hits = new Set<string>();
  const push = (arr: RegExpMatchArray[] | null) => {
    if (!arr) return;
    for (const m of arr) hits.add(m[0]);
  };

  // Outcome percentages: expanded verb list catches "premium", "margin",
  // "PBT", "EBITDA", "payback", "ROI", "savings", "uplift", "growth"
  const outcomePercent =
    /\b\d{1,3}(?:\.\d+)?\s*%\s+(?:re-?coat|yield|reduction|increase|drop|improvement|cost|cut|gain|efficiency|throughput|adhesion|recovery|first-pass|rejection|defect|premium|margin|profit|PBT|EBITDA|payback|ROI|return|savings|uplift|growth|share|penetration|adoption)/gi;
  push([...text.matchAll(outcomePercent)]);

  // Ranged percentages ("30-50% premium") — a very common LLM hallucination shape
  const rangePercent =
    /\b\d{1,3}\s*[-–—to]{1,3}\s*\d{1,3}\s*%\s+\w+/gi;
  push([...text.matchAll(rangePercent)]);

  // Physical claims: temperature, humidity
  const physical =
    /\b\d{1,3}(?:\.\d+)?\s*°\s?[CcFf]\b|\b\d{1,3}\s*%\s+(?:humidity|relative humidity|RH)\b/gi;
  push([...text.matchAll(physical)]);

  // INR / Rs / ₹ — single amount OR ranged ("INR 5 crore to 10 crore")
  const inrSingle = /\b(?:INR|Rs\.?|₹)\s*\d{1,4}(?:[,.]\d+)*\s*(?:cr|crore|lakh|lakhs)\b/gi;
  push([...text.matchAll(inrSingle)]);
  const inrRange =
    /\b(?:INR|Rs\.?|₹)\s*\d{1,4}\s*(?:cr|crore|lakh|lakhs)?\s*(?:to|-|–|—)\s*\d{1,4}\s*(?:cr|crore|lakh|lakhs)\b/gi;
  push([...text.matchAll(inrRange)]);

  // Bare crore/lakh amounts without INR prefix ("5 crore capex", "12 lakh spend")
  const bareCrore =
    /\b\d{1,4}(?:[,.]\d+)*\s*(?:crore|lakh|lakhs)\s+(?:capex|spend|cost|invested|investment|opex|budget|price|premium|savings|margin|payback)/gi;
  push([...text.matchAll(bareCrore)]);

  return Array.from(hits).slice(0, 10);
}

// ─────────────────────────────────────────────────────────────
// First-person leaks — broader than the original verb-list pattern
// ─────────────────────────────────────────────────────────────
export function detectFirstPersonInBody(html: string): string[] {
  // Strip the CTA card AND any explicit CTA paragraph — first-person there
  // is legitimate ("Book a walk-through with us"). Only body copy matters.
  let text = html
    .replace(/<aside[^>]*class="[^"]*cta-card[^"]*"[^>]*>[\s\S]*?<\/aside>/gi, ' ')
    .replace(/<p[^>]*class="[^"]*(?:closing|cta)[^"]*"[^>]*>[\s\S]*?<\/p>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ');

  const hits = new Set<string>();
  const push = (arr: RegExpMatchArray[] | null) => {
    if (!arr) return;
    for (const m of arr) hits.add(m[0]);
  };

  // Specific "our X" phrasings (existing rule, retained)
  push([
    ...text.matchAll(
      /\b(?:our|we['’]?(?:re|ve|ll)?|us|my|I['’]?(?:m|ve|ll))\s+(?:facility|team|booth|line|plant|customers|engineers|approach|view|experience|guide|reference)/gi
    )
  ]);
  // "we + first-person verb" (existing)
  push([
    ...text.matchAll(
      /\b(?:we|our|us)\s+(?:offer|provide|recommend|believe|build|sell|integrate|deliver|design|test)/gi
    )
  ]);
  // OptiFinish as first-party subject (existing)
  push([
    ...text.matchAll(/\bOptiFinish\s+(?:has|believes|offers|provides|recommends|has been)/gi)
  ]);
  // "in our X" phrases (existing)
  push([...text.matchAll(/\bin\s+our\s+(?:experience|view|facility|tests|practice)/gi)]);

  // NEW: bare "we're / we've / we'll" contractions that don't match the specific verb list
  // Catches "we're measuring, really?" style rhetorical body copy
  push([...text.matchAll(/\bwe['’]?(?:re|ve|ll)\b\s+\w+/gi)]);
  // NEW: "our + generic noun" (decision, plans, cost, thinking) beyond the specific list
  push([
    ...text.matchAll(
      /\bour\s+(?:decision|plans?|cost|thinking|goals?|standards?|process|philosophy|position|answer|take|conclusion|numbers|figures?|data)/gi
    )
  ]);

  return Array.from(hits).slice(0, 10);
}

// ─────────────────────────────────────────────────────────────
// Fabricated years — LLM invents context dates ("since 2010",
// "practices unchanged since 1998"). Only current-era references
// are safe; anything else deserves an editor check.
// ─────────────────────────────────────────────────────────────
export function detectFabricatedYears(html: string): string[] {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const hits = new Set<string>();

  // Preposition + year pattern: "since 2010", "in 1998", "before 2005", "until 2020"
  const yearMention =
    /\b(?:since|in|by|before|until|from|circa|around)\s+((?:19\d{2}|20\d{2}))\b/gi;
  let m: RegExpExecArray | null;
  while ((m = yearMention.exec(text)) !== null && hits.size < 10) {
    const year = m[1];
    if (!KNOWN_SAFE_YEARS.has(year)) {
      // Include ~20 chars of context so the editor sees what's being dated
      const ctx = text.slice(Math.max(0, m.index - 15), m.index + m[0].length + 20).trim();
      hits.add(ctx);
    }
  }

  return Array.from(hits);
}

// One-shot detector that runs all three checks + returns a bundled result.
export function computeEditorialFlags(bodyHtml: string): EditorialFlags {
  const fabricatedNumbers = detectFabricatedNumbers(bodyHtml);
  const firstPersonLeaks = detectFirstPersonInBody(bodyHtml);
  const fabricatedYears = detectFabricatedYears(bodyHtml);
  return {
    fabricatedNumbers,
    firstPersonLeaks,
    fabricatedYears,
    hasAny: fabricatedNumbers.length + firstPersonLeaks.length + fabricatedYears.length > 0
  };
}

// Renders the flags as an HTML comment block for embedding at the top
// of the body. Editor sees it when viewing source, and the studio's
// Step 4 banner surfaces it prominently in the UI.
export function flagsToHtmlComment(flags: EditorialFlags): string {
  if (!flags.hasAny) return '';
  const notes: string[] = ['EDITORIAL REVIEW FLAGS (auto-detected, do not publish without checking):'];
  if (flags.fabricatedNumbers.length) {
    notes.push(`  fabricated numbers: ${flags.fabricatedNumbers.slice(0, 5).join(' | ')}`);
  }
  if (flags.firstPersonLeaks.length) {
    notes.push(`  first-person leaks: ${flags.firstPersonLeaks.slice(0, 5).join(' | ')}`);
  }
  if (flags.fabricatedYears.length) {
    notes.push(`  fabricated years:   ${flags.fabricatedYears.slice(0, 5).join(' | ')}`);
  }
  return `<!--\n  ${notes.join('\n  ')}\n-->\n`;
}
