// Weekly Editorial Brief — replaces the scattered "pick category, pick
// audience, hope a good topic surfaces" flow with a research-driven feed
// of 5-7 curated topic cards. The editor scrolls the brief and clicks
// "Start writing" — the pipeline jumps straight to draft with category
// and audience pre-selected.
//
// PIPELINE:
//   1. Run TAVILY_QUERIES in parallel (10 topical queries covering the
//      distinct classes of "why now" trigger — regulations, OEM launches,
//      defect trends, macro shifts, buyer questions, procurement pain).
//      Each query excludes optifinish.in so we surface EXTERNAL industry
//      motion, not our own claims cited back at us.
//   2. Aggregate + dedupe evidence by URL.
//   3. Ask the LLM to synthesise 5-7 topic CARDS. Each card must name the
//      trigger, the searcher's implicit question, our angle, the gap in
//      our current content (checked against siteIndex titles), and the
//      pipeline category/audience the writer should start with.
//   4. Cache to localStorage with a 7-day TTL. Refresh button re-runs.

import {
  WeeklyBrief,
  WeeklyBriefCard,
  CategoryId,
  AudienceId
} from '../types';
import { searchTavily, TavilyResult } from './tavilySearch';
import { searchSitePages } from './siteIndex';
import { chatJSON } from './nvidiaLlmService';
import { MODELS } from './modelRouter';
import { CATEGORIES, AUDIENCES } from '../constants';

// Ten queries covering distinct "why-now" trigger classes. Ordered so early
// queries hit the most reliably-updated public sources; if the free tier
// throttles late queries the brief still has substance.
const TAVILY_QUERIES: Array<{ q: string; classHint: string }> = [
  { q: 'India powder coating regulation 2026 BIS BEE CPCB', classHint: 'regulation' },
  { q: 'EU CBAM steel aluminium India export coating', classHint: 'trade-policy' },
  { q: 'GEMA powder coating equipment launch 2026', classHint: 'oem-launch' },
  { q: 'Dürr paint shop automation India 2026', classHint: 'oem-launch' },
  { q: 'PFAS restriction powder coating industry 2026', classHint: 'materials-shift' },
  { q: 'India automotive OEM paint shop capex 2026', classHint: 'sector-capex' },
  { q: 'powder coating defect troubleshooting India monsoon', classHint: 'process-pain' },
  { q: 'MSME ZED certification manufacturing India 2026', classHint: 'compliance' },
  { q: 'AkzoNobel Axalta merger coatings market India', classHint: 'market-shift' },
  { q: 'architectural aluminium Qualicoat India specification', classHint: 'sector-standard' }
];

const CATEGORY_IDS = CATEGORIES.map((c) => c.id) as CategoryId[];
const AUDIENCE_IDS = AUDIENCES.map((a) => a.id) as AudienceId[];

const OWN_DOMAINS_EXCLUDE = ['optifinish.in', 'optifinish.com', 'www.optifinish.in'];

// LocalStorage key + 7-day TTL. Editor can force a refresh anytime.
const LS_KEY = 'optifinish.blogStudio.weeklyBrief.v1';
const TTL_MS = 7 * 24 * 60 * 60 * 1000;

interface AggregatedEvidence {
  title: string;
  url: string;
  hostname: string;
  content: string;         // trimmed
  publishedDate?: string;
  classHint: string;       // which query surfaced it
}

// ─────────────────────────────────────────────────────────────
// Stage 1 — run 10 Tavily queries in parallel, aggregate + dedupe
// ─────────────────────────────────────────────────────────────
async function gatherEvidence(): Promise<AggregatedEvidence[]> {
  const settled = await Promise.allSettled(
    TAVILY_QUERIES.map((q) =>
      searchTavily(q.q, {
        searchDepth: 'basic',
        maxResults: 4,
        topic: 'general',
        excludeDomains: OWN_DOMAINS_EXCLUDE
      }).then((res) => ({ res, classHint: q.classHint }))
    )
  );

  const seen = new Set<string>();
  const evidence: AggregatedEvidence[] = [];
  let queriesSucceeded = 0;

  for (const s of settled) {
    if (s.status !== 'fulfilled') continue;
    queriesSucceeded++;
    for (const r of s.value.res.results ?? []) {
      const url = (r.url || '').trim();
      if (!url || seen.has(url)) continue;
      seen.add(url);
      try {
        const hostname = new URL(url).hostname.replace(/^www\./, '');
        evidence.push({
          title: (r.title ?? '').trim(),
          url,
          hostname,
          content: (r.content ?? '').replace(/\s+/g, ' ').slice(0, 240),
          publishedDate: r.published_date,
          classHint: s.value.classHint
        });
      } catch {
        // ignore malformed URL
      }
    }
  }
  console.log(`[weeklyBrief] evidence: ${evidence.length} items across ${queriesSucceeded}/${TAVILY_QUERIES.length} queries`);
  return evidence;
}

// ─────────────────────────────────────────────────────────────
// Stage 2 — gap analysis vs the crawled site-index. For each evidence
// title, ask siteIndex whether OptiFinish's live site already covers it.
// Low-score matches → real gap; high-score matches → we already have it.
// ─────────────────────────────────────────────────────────────
async function analyseGaps(evidence: AggregatedEvidence[]): Promise<
  Array<{ evidence: AggregatedEvidence; topSiteMatchScore: number; topSiteMatchTitle: string | null }>
> {
  const gaps = await Promise.all(
    evidence.map(async (e) => {
      try {
        const hits = await searchSitePages(e.title, { limit: 1 });
        return {
          evidence: e,
          topSiteMatchScore: hits[0]?.score ?? 0,
          topSiteMatchTitle: hits[0]?.entry.title ?? null
        };
      } catch {
        return { evidence: e, topSiteMatchScore: 0, topSiteMatchTitle: null };
      }
    })
  );
  return gaps;
}

// ─────────────────────────────────────────────────────────────
// Stage 3 — synthesis. LLM reads evidence + gap map, returns 5-7 cards.
// ─────────────────────────────────────────────────────────────
const SYNTHESIS_SYSTEM = `You are the editor of OptiFinish's B2B industrial blog. Once a week you produce a shortlist of 5-7 topic cards for the writing team. Each card names ONE post worth writing THIS WEEK.

CONTEXT — OptiFinish is:
- Indian B2B industrial powder coating equipment company (parent VACSPL, Greater Noida).
- Manufactures own plants / ovens / booths / automation (Z-TAP, ZA01).
- Authorised India partner for GEMA (Switzerland) and Dürr (Germany).
- Sister concern Vinayak Agencies — powders, touch-up paints, adhesives.

WHAT MAKES A GOOD CARD:
1. Anchored to a REAL trigger from the EVIDENCE — a dated regulation, an OEM launch, a market shift, a documented buyer pain. Never invent one.
2. Answers a question an Indian buyer would actually type into Google or ChatGPT this month.
3. Names an ANGLE that ONLY OptiFinish can credibly write — leverages the multi-OEM neutrality (sells GEMA, Dürr AND own line), the Greater Noida manufacturing footprint, or the specific Indian regulatory/climate context.
4. FILLS A GAP — a topic the crawled OptiFinish site does NOT yet cover well. Prefer evidence items whose topSiteMatchScore is LOW.
5. Pre-picks the pipeline category and audience that fit best.

CATEGORIES (pick one per card): pillar-guide, case-study, comparison-decision, cost-of-inaction, facility-behind-scenes, technical-deep-dive, how-to, industry-trends.

AUDIENCES (pick one per card): plant-manager, procurement, oem-engineer, rd-process, c-level, existing-customer, architect-specifier, consulting-engineer.

DIVERSITY: across the 5-7 cards, use at least 3 different categories and at least 4 different audiences. Do NOT let one audience or category dominate.

OUTPUT: strict JSON, no prose, no markdown fences.

{
  "cards": [
    {
      "title": "provisional post title (max 90 chars, no trailing brand)",
      "whyNow": "1-2 sentences naming the concrete trigger from EVIDENCE (with a date if given)",
      "searchDemand": "1 sentence — the buyer query this post answers, phrased as they would type it",
      "optifinishAngle": "1 sentence — the specific thing only OptiFinish can credibly say",
      "gapInOurContent": "1 sentence — what the crawled site does NOT yet cover",
      "suggestedCategory": "one of the category ids above",
      "suggestedAudience": "one of the audience ids above",
      "evidenceUrls": ["url1", "url2", "..."]
    }
  ]
}`;

async function synthesiseCards(
  gaps: Array<{ evidence: AggregatedEvidence; topSiteMatchScore: number; topSiteMatchTitle: string | null }>
): Promise<WeeklyBriefCard[]> {
  // Trim to the most useful ~20 evidence items (prioritise low-site-match =
  // real gaps) so the synthesis prompt fits comfortably.
  const ranked = [...gaps].sort((a, b) => a.topSiteMatchScore - b.topSiteMatchScore).slice(0, 22);

  const evidenceBlock = ranked
    .map(
      (g, i) =>
        `[${i + 1}] class:${g.evidence.classHint} · gap-score:${g.topSiteMatchScore.toFixed(2)}${g.topSiteMatchTitle ? ` (site match: "${g.topSiteMatchTitle.slice(0, 60)}")` : ' (no site match)'}\n  ${g.evidence.title}\n  ${g.evidence.hostname}${g.evidence.publishedDate ? ` · ${g.evidence.publishedDate}` : ''}\n  ${g.evidence.url}\n  ${g.evidence.content}`
    )
    .join('\n\n');

  const userPrompt = `Produce this week's editorial brief.

EVIDENCE (${ranked.length} items, sorted by gap-first — LOW gap-score = topic NOT covered on our site):

${evidenceBlock}

Produce 5-7 cards. Prefer topics with LOW gap-score. Each card's evidenceUrls must be URLs from the list above (2-4 per card). Diversity across categories and audiences (rules in system prompt). Strict JSON only.`;

  const llmModel = MODELS.find((m) => m.supportsJsonMode) ?? MODELS[0];
  const raw = await chatJSON<{ cards: Array<Omit<WeeklyBriefCard, 'id'> & { suggestedCategory: string; suggestedAudience: string }> }>({
    model: llmModel.id,
    messages: [
      { role: 'system', content: SYNTHESIS_SYSTEM },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.55,
    topP: 0.9,
    maxTokens: 3500
  });

  const validEvidenceUrls = new Set(ranked.map((g) => g.evidence.url));

  const cards = (raw.cards ?? [])
    .slice(0, 7)
    .map((c, idx) => {
      const cat = CATEGORY_IDS.includes(c.suggestedCategory as CategoryId)
        ? (c.suggestedCategory as CategoryId)
        : 'industry-trends';
      const aud = AUDIENCE_IDS.includes(c.suggestedAudience as AudienceId)
        ? (c.suggestedAudience as AudienceId)
        : 'plant-manager';
      // Only keep evidence URLs the LLM actually saw — kills hallucinated links
      const urls = (c.evidenceUrls ?? []).filter((u) => validEvidenceUrls.has(u)).slice(0, 4);
      const card: WeeklyBriefCard = {
        id: `card-${Date.now().toString(36)}-${idx}`,
        title: (c.title ?? '').trim().slice(0, 120),
        whyNow: (c.whyNow ?? '').trim(),
        searchDemand: (c.searchDemand ?? '').trim(),
        optifinishAngle: (c.optifinishAngle ?? '').trim(),
        gapInOurContent: (c.gapInOurContent ?? '').trim(),
        suggestedCategory: cat,
        suggestedAudience: aud,
        evidenceUrls: urls
      };
      return card;
    })
    .filter((c) => c.title.length > 0);

  return cards;
}

// ─────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────
export async function generateWeeklyBrief(): Promise<WeeklyBrief> {
  const evidence = await gatherEvidence();
  if (evidence.length === 0) {
    throw new Error('Weekly brief: Tavily returned no usable evidence (check TAVILY_API_KEY / quota)');
  }
  const gaps = await analyseGaps(evidence);
  const cards = await synthesiseCards(gaps);
  const brief: WeeklyBrief = {
    generatedAt: new Date().toISOString(),
    cards,
    totalQueriesRun: TAVILY_QUERIES.length,
    totalEvidenceCollected: evidence.length
  };
  saveBriefToCache(brief);
  return brief;
}

// ─────────────────────────────────────────────────────────────
// LocalStorage cache — 7-day TTL. The brief is expensive (10 Tavily calls +
// one 3.5k-token LLM call) so we don't want to run it on every studio load.
// ─────────────────────────────────────────────────────────────
export function loadBriefFromCache(): WeeklyBrief | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as WeeklyBrief;
    const age = Date.now() - new Date(parsed.generatedAt).getTime();
    if (age > TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveBriefToCache(brief: WeeklyBrief): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(brief));
  } catch (err) {
    console.warn('[weeklyBrief] localStorage write failed:', err);
  }
}

export function clearBriefCache(): void {
  try {
    localStorage.removeItem(LS_KEY);
  } catch {
    // ignore
  }
}
