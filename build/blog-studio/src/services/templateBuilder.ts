import {
  BlogDraft,
  CategoryId,
  AudienceId,
  DossierSnapshot,
  ImagePlacement
} from '../types';
import { CATEGORIES, AUDIENCES } from '../constants';

// Master export template, structurally adapted from the user's Avacasa
// "Blog (27.2) 1.html" with OptiFinish brand swaps. All CSS is inlined so
// the exported file ships standalone (no Tailwind CDN, no external assets
// other than Google Fonts).

interface BuildArgs {
  draft: BlogDraft;
  category: CategoryId;
  audience: AudienceId;
}

export function buildOptiFinishBlogHtml({ draft, category, audience }: BuildArgs): string {
  const cat = CATEGORIES.find((c) => c.id === category);
  const aud = AUDIENCES.find((a) => a.id === audience);
  const snapshot: DossierSnapshot = draft.snapshot ?? fallbackSnapshot(category);

  const seoBlock = draft.seo
    ? `
  <meta name="description" content="${esc(draft.seo.metaDescription)}" />
  <meta name="keywords" content="${esc([draft.seo.focusKeyword, ...draft.seo.secondaryKeywords].join(', '))}" />
  <link rel="canonical" href="https://optifinish.com/blog/${esc(draft.seo.slug)}" />
  <script type="application/ld+json">${draft.seo.schemaJsonLd}</script>`
    : '';

  const articleBody = injectImages(draft.bodyHtml, draft.imagePlacements);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(draft.seo?.metaTitle ?? draft.title)}</title>${seoBlock}
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --ink-950: #0A0A0B;
      --ink-900: #111113;
      --ink-800: #1E1E22;
      --ink-700: #2A2A30;
      --ember-500: #FF6B35;
      --ember-400: #FF8B5C;
      --ember-700: #C24A20;
      --paper: #FAFAF7;
      --paper-warm: #FFF8F2;
      --steel-500: #6B7280;
      --steel-400: #9CA3AF;
    }
    * { box-sizing: border-box; }
    body {
      background-color: var(--paper);
      color: var(--ink-950);
      font-family: 'Inter', system-ui, sans-serif;
      line-height: 1.65;
      margin: 0;
      padding: 40px 20px;
      -webkit-font-smoothing: antialiased;
    }
    .container {
      max-width: 820px;
      margin: 0 auto;
      background: #ffffff;
      padding: 60px;
      border-radius: 32px;
      box-shadow: 0 10px 40px rgba(10, 10, 11, 0.06);
    }
    @media (max-width: 720px) {
      .container { padding: 32px 24px; border-radius: 20px; }
      body { padding: 16px 8px; }
    }

    /* ───── Snapshot (Dossier Calibration) ───── */
    .snapshot-box {
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, #2A0E04 0%, #14100E 55%, #0A0A0B 100%);
      color: #ffffff;
      padding: 40px;
      border-radius: 24px;
      margin-bottom: 48px;
      border: 1px solid rgba(255, 107, 53, 0.25);
      box-shadow: 0 20px 60px rgba(255, 107, 53, 0.08);
    }
    .snapshot-box::before, .snapshot-box::after {
      content: '';
      position: absolute;
      width: 220px; height: 220px;
      border-radius: 50%;
      filter: blur(60px);
      pointer-events: none;
    }
    .snapshot-box::before {
      right: -60px; top: -60px;
      background: rgba(255, 107, 53, 0.18);
    }
    .snapshot-box::after {
      left: -40px; bottom: -40px;
      background: rgba(255, 255, 255, 0.04);
    }
    .snapshot-head {
      display: flex; align-items: flex-start; justify-content: space-between;
      gap: 16px; margin-bottom: 32px; position: relative; z-index: 1;
      flex-wrap: wrap;
    }
    .snapshot-eyebrow {
      display: flex; align-items: center; gap: 12px;
    }
    .snapshot-icon {
      width: 40px; height: 40px;
      display: flex; align-items: center; justify-content: center;
      background: rgba(255, 107, 53, 0.12);
      border: 1px solid rgba(255, 107, 53, 0.3);
      border-radius: 10px;
      color: var(--ember-400);
    }
    .snapshot-eyebrow-label {
      display: block;
      font-size: 11px;
      font-weight: 700;
      font-style: italic;
      text-transform: uppercase;
      letter-spacing: 0.3em;
      opacity: 0.95;
    }
    .snapshot-eyebrow-lever {
      display: block;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.18em;
      color: rgba(255, 255, 255, 0.65);
      margin-top: 4px;
      max-width: 480px;
    }
    .snapshot-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 38px;
      font-style: italic;
      font-weight: 600;
      margin: 0;
      color: #ffffff;
      line-height: 1.1;
      border: none; padding: 0;
    }
    .snapshot-pill {
      align-self: flex-start;
      padding: 8px 16px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      background: rgba(255, 107, 53, 0.18);
      color: var(--ember-400);
      border: 1px solid rgba(255, 107, 53, 0.3);
      backdrop-filter: blur(8px);
    }
    .snapshot-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 36px;
      padding-top: 32px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      position: relative; z-index: 1;
    }
    @media (max-width: 640px) {
      .snapshot-grid { grid-template-columns: 1fr; gap: 24px; }
    }
    .snapshot-cell-label {
      display: block;
      font-size: 10px;
      font-weight: 700;
      font-style: italic;
      text-transform: uppercase;
      letter-spacing: 0.22em;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 8px;
    }
    .snapshot-cell-value {
      margin: 0;
      font-size: 15px;
      font-weight: 500;
      color: #ffffff;
      line-height: 1.55;
    }
    .snapshot-cell-value.italic { font-style: italic; opacity: 0.85; font-family: 'JetBrains Mono', monospace; font-size: 13px; }

    /* ───── Article ───── */
    .article {
      background: #ffffff;
      border-radius: 24px;
      padding: 0;
    }
    .article-header { margin-bottom: 40px; }
    .article-section-marker {
      display: flex; align-items: center; gap: 12px;
      font-size: 10px;
      font-weight: 700;
      font-style: italic;
      text-transform: uppercase;
      letter-spacing: 0.3em;
      color: var(--ink-950);
      margin-bottom: 16px;
    }
    .article-section-marker::before, .article-section-marker::after {
      content: ''; flex: 0 0 32px;
      height: 1px;
      background: rgba(10, 10, 11, 0.3);
    }
    .article h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 44px;
      font-weight: 700;
      line-height: 1.12;
      margin: 0 0 16px;
      color: var(--ink-950);
    }
    @media (max-width: 720px) { .article h1 { font-size: 32px; } }
    .article-meta {
      font-size: 10px;
      font-weight: 700;
      font-style: italic;
      text-transform: uppercase;
      letter-spacing: 0.3em;
      color: var(--steel-500);
      margin-top: 12px;
    }
    .article h2 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 28px;
      font-weight: 600;
      margin: 40px 0 16px;
      color: var(--ink-950);
      border-bottom: 1px solid rgba(255, 107, 53, 0.15);
      padding-bottom: 10px;
      line-height: 1.25;
    }
    .article h3 {
      font-size: 16px;
      font-weight: 700;
      text-transform: none;
      margin: 28px 0 10px;
      color: var(--ember-700);
    }
    .article p {
      font-size: 16px;
      line-height: 1.75;
      margin: 0 0 18px;
      color: var(--ink-900);
    }
    .article p.lead {
      font-size: 18px;
      color: var(--ink-800);
    }
    .article p.closing {
      font-style: italic;
      color: var(--steel-500);
    }
    .article ul, .article ol { padding-left: 24px; margin: 0 0 20px; }
    .article li { margin-bottom: 10px; font-size: 16px; line-height: 1.7; }
    .article strong, .article b { font-weight: 700; color: var(--ink-950); }
    .article em, .article i { font-style: italic; }

    /* ───── Image containers ───── */
    .img-container {
      margin: 48px 0;
      border-top: 1px solid #e2e8f0;
      padding-top: 16px;
    }
    .img-container img {
      width: 100%;
      border-radius: 16px;
      display: block;
    }
    .img-caption {
      margin-top: 14px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e2e8f0;
    }
    .img-caption p {
      margin: 0;
      font-size: 10px;
      font-weight: 700;
      color: var(--steel-500);
      text-transform: uppercase;
      letter-spacing: 0.18em;
      line-height: 1.5;
    }

    /* ───── Footer ───── */
    .article-footer {
      margin-top: 56px;
      padding-top: 32px;
      border-top: 1px solid #e2e8f0;
      text-align: center;
    }
    .article-footer-mark {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.3em;
      color: var(--steel-500);
    }
  </style>
</head>
<body>
  <div class="container">

    <!-- ───── Dossier Calibration ───── -->
    <div class="snapshot-box">
      <div class="snapshot-head">
        <div class="snapshot-eyebrow">
          <div class="snapshot-icon">${categoryIconSvg(category)}</div>
          <div>
            <span class="snapshot-eyebrow-label">Industrial Brief</span>
            <span class="snapshot-eyebrow-lever">Lever: ${esc(snapshot.lever)}</span>
          </div>
        </div>
        <h2 class="snapshot-title">Dossier Calibration</h2>
      </div>
      <div class="snapshot-pill">Target: ${esc(aud?.label ?? '—')}</div>
      <div class="snapshot-grid">
        <div>
          <span class="snapshot-cell-label">Decision Friction</span>
          <p class="snapshot-cell-value">${esc(snapshot.decisionFriction)}</p>
        </div>
        <div>
          <span class="snapshot-cell-label">Dominant Anxiety</span>
          <p class="snapshot-cell-value">${esc(snapshot.dominantAnxiety)}</p>
        </div>
        <div>
          <span class="snapshot-cell-label">Core Insight</span>
          <p class="snapshot-cell-value">${esc(snapshot.coreInsight)}</p>
        </div>
        <div>
          <span class="snapshot-cell-label">Structural Shape</span>
          <p class="snapshot-cell-value italic">${esc(snapshot.structuralShape)}</p>
        </div>
      </div>
    </div>

    <!-- ───── Article ───── -->
    <article class="article">
      <header class="article-header">
        <div class="article-section-marker">Section 1: Research Analysis</div>
        <h1>${esc(draft.title)}</h1>
        <div class="article-meta">
          ${draft.wordCount} words · ${cat?.label ?? '—'} · ${aud?.label ?? '—'}
        </div>
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

// ───── helpers ─────

function esc(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Inject up to 2 inline images between H2 sections, matching Avacasa's
// "no hero, no closing — both images sit between sections" convention.
// Each image gets a "Visual Insight: ..." caption built from the prompt purpose.
function injectImages(bodyHtml: string, placements: ImagePlacement[]): string {
  const usable = placements.filter((p) => !!p.generatedUrl).slice(0, 2);
  if (usable.length === 0) return bodyHtml;

  // Split body on <h2> boundaries so we can inject between sections.
  const parts = bodyHtml.split(/(<h2[^>]*>)/i);
  // parts looks like [pre, '<h2>', section1HtmlAfterH2, '<h2>', section2..., ...]
  const h2Indices: number[] = [];
  for (let i = 1; i < parts.length; i += 2) h2Indices.push(i);

  if (h2Indices.length === 0) {
    // No H2 anchors found — append both images at the end.
    return bodyHtml + usable.map((p) => imageContainer(p)).join('\n');
  }

  // Insertion points: after section 1 (before h2_2), after section 3 (before h2_4)
  // Falls back to evenly distributing if there aren't enough H2s.
  const insertBefore: number[] = [];
  if (h2Indices[1]) insertBefore.push(h2Indices[1]);
  if (h2Indices[3]) insertBefore.push(h2Indices[3]);
  else if (h2Indices[2]) insertBefore.push(h2Indices[2]);

  // Insert from last to first so indices don't shift
  for (let i = Math.min(usable.length, insertBefore.length) - 1; i >= 0; i--) {
    parts.splice(insertBefore[i], 0, imageContainer(usable[i]));
  }
  return parts.join('');
}

function imageContainer(p: ImagePlacement): string {
  const purpose = derivePurposeFromPrompt(p.prompt);
  return `
<div class="img-container">
  <img src="${esc(p.generatedUrl ?? '')}" alt="${esc(p.alt)}" />
  <div class="img-caption"><p>Visual Insight: ${esc(purpose)}</p></div>
</div>`;
}

// Pull the first sentence of the prompt (before the brand suffix) as the
// "purpose" caption text. The brand suffix starts with "Shot on Hasselblad".
function derivePurposeFromPrompt(prompt: string): string {
  const beforeSuffix = prompt.split(/Shot on Hasselblad/i)[0].trim();
  // First sentence
  const firstSentence = beforeSuffix.split(/[.!?]\s/)[0];
  return firstSentence.length > 160 ? firstSentence.slice(0, 157) + '…' : firstSentence;
}

// Sensible default snapshot if the LLM hasn't produced one yet.
// Each tile reads as a believable B2B-industrial line, not lorem ipsum.
function fallbackSnapshot(category: CategoryId): DossierSnapshot {
  const map: Record<CategoryId, DossierSnapshot> = {
    'product-spotlight': {
      decisionFriction: 'Choosing the right configuration when the spec sheet looks similar across vendors but the third-shift behaviour does not.',
      dominantAnxiety: 'Specifying a system that looks correct on paper and re-spec\'ing it 18 months later.',
      coreInsight: 'The product you should buy is the one that fails gracefully under the conditions you actually run, not the one that demos best.',
      structuralShape: 'pillar_guide',
      lever: 'Behaviour under heat-soak over feature parity.'
    },
    'technical-deep-dive': {
      decisionFriction: 'When the standard explanation stops matching what the line actually does at hour six.',
      dominantAnxiety: 'A defect signature that none of the operators can name.',
      coreInsight: 'Most powder-coating defects are physics, not chemistry. The fix usually lives upstream of where the defect appears.',
      structuralShape: 'troubleshooting_drilldown',
      lever: 'Locating the cause one upstream station from where the defect surfaces.'
    },
    'case-study': {
      decisionFriction: 'Comparing claimed outcomes vs. measurable outcomes when every vendor brings a case study.',
      dominantAnxiety: 'Buying a system based on a customer story that does not transfer to your line.',
      coreInsight: 'The transferable part of a case study is the diagnostic process, not the throughput number.',
      structuralShape: 'case_study',
      lever: 'Diagnostic transferability over headline metric envy.'
    },
    'industry-trends': {
      decisionFriction: 'Reading regulatory or market shifts early enough to act, not late enough to be priced in.',
      dominantAnxiety: 'Being the last plant to retool when the cost of inaction shows up on the audit.',
      coreInsight: 'In Indian coating, the regulation usually arrives twice: first as a draft notification nobody reads, then as a deadline nobody can meet.',
      structuralShape: 'cost_of_inaction',
      lever: 'The 18-month gap between draft and deadline is where margin lives.'
    },
    'how-to': {
      decisionFriction: 'Whether to escalate a defect now or hope the next batch resolves it.',
      dominantAnxiety: 'Burning a shift chasing a defect that turns out to be operator-induced.',
      coreInsight: 'A 30-minute audit at hour six of the shift catches what a 4-hour root-cause investigation later cannot.',
      structuralShape: 'troubleshooting_drilldown',
      lever: 'Hour-six audits over post-mortem investigations.'
    },
    'facility-behind-scenes': {
      decisionFriction: 'Trusting an Indian-manufactured system at the same level as a European one.',
      dominantAnxiety: 'Buying capacity that does not match build quality.',
      coreInsight: 'The traceability discipline of the manufacturer in Greater Noida tells you more than the brochure ever will.',
      structuralShape: 'facility_tour',
      lever: 'Traceability discipline over country-of-origin shorthand.'
    },
    'buyers-guide': {
      decisionFriction: 'Manual vs. automatic, batch vs. conveyor, partner-supplied vs. OEM-built — when every option is defensible.',
      dominantAnxiety: 'Optimising on capex when opex (energy, powder, rework) drives 80 % of TCO.',
      coreInsight: 'You buy the gun. You operate the rejection rate. Price the second one.',
      structuralShape: 'comparison_matrix',
      lever: 'Operating cost over acquisition cost.'
    }
  };
  return map[category];
}

// Inline SVG icons per category — match the Lucide aesthetic the source file uses.
function categoryIconSvg(category: CategoryId): string {
  const stroke = `stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
  const open = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" ${stroke}>`;
  const close = `</svg>`;
  switch (category) {
    case 'product-spotlight':
      return `${open}<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M3 9h18"/>${close}`;
    case 'technical-deep-dive':
      return `${open}<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>${close}`;
    case 'case-study':
      return `${open}<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/>${close}`;
    case 'industry-trends':
      return `${open}<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>${close}`;
    case 'how-to':
      return `${open}<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>${close}`;
    case 'facility-behind-scenes':
      return `${open}<path d="M2 20h20"/><path d="M5 20V8l5 3V8l5 3V8l4 3v9"/>${close}`;
    case 'buyers-guide':
      return `${open}<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>${close}`;
  }
}
