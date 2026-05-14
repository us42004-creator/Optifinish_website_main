import {
  BlogDraft,
  CategoryId,
  AudienceId,
  DossierSnapshot,
  ImagePlacement,
  StructuralShape
} from '../types';
import { CATEGORIES, AUDIENCES } from '../constants';

// Master export template. Self-contained HTML — Google Fonts only,
// no Tailwind CDN, no other external deps. Adopted structurally from
// the Avacasa "Dossier Calibration" shape; visual language is OptiFinish
// (ember-orange + ink-black; Cormorant Garamond + Inter; readability-first).

interface BuildArgs {
  draft: BlogDraft;
  category: CategoryId;
  audience: AudienceId;
}

// ─────────────────────────────────────────────────────────────
// Per-archetype CTA copy. The closing card the reader sees after
// the article has the highest conversion intent on the page.
// Match the offer to the structural shape they just consumed.
// ─────────────────────────────────────────────────────────────
const CTA_BY_SHAPE: Record<
  StructuralShape,
  { headline: string; body: string; action: string }
> = {
  pillar_guide: {
    headline: 'Brief your engineering team with a real reference',
    body: 'Most plant managers we talk to want a working spec sheet and a 60-minute walk-through before they brief their team. Both are available, on calendar.',
    action: 'Book a facility walk-through'
  },
  case_study: {
    headline: 'See the diagnostic, not just the result',
    body: 'The transferable part of any case study is the audit method, not the throughput number. Walk a similar live line with our process engineer.',
    action: 'Schedule a same-industry visit'
  },
  comparison_matrix: {
    headline: 'Get a quote-ready comparison for your line',
    body: 'Tell us your throughput, substrate, and finish spec. We return a comparison matrix in 24 hours, with five-year and ten-year TCO ranges in INR.',
    action: 'Request a custom comparison'
  },
  cost_of_inaction: {
    headline: 'Schedule a free on-site audit',
    body: 'A 30-minute walk at hour six of your shift catches what a four-hour root-cause review later cannot. The audit is free. Acting on what we find is your call.',
    action: 'Book a free audit'
  },
  facility_tour: {
    headline: 'Come see the floor that builds your system',
    body: 'Calendared visits to the Greater Noida facility, named engineer escorting, full QC walkthrough. The floor tells you what the brochure cannot.',
    action: 'Schedule a facility visit'
  },
  troubleshooting_drilldown: {
    headline: 'Stuck on a defect we did not cover here?',
    body: 'Send a photo of the defect, the substrate, and the cure profile. Our process engineering team responds with a diagnostic within 24 hours.',
    action: 'Send a defect for review'
  },
  immersive_essay: {
    headline: 'Talk to our process engineering team',
    body: 'The questions raised in this article rarely have the same answer twice. Our team has the data on Indian conditions; bring your specifics.',
    action: 'Talk to engineering'
  }
};

export function buildOptiFinishBlogHtml({ draft, category, audience }: BuildArgs): string {
  const cat = CATEGORIES.find((c) => c.id === category);
  const aud = AUDIENCES.find((a) => a.id === audience);
  const snapshot: DossierSnapshot = draft.snapshot ?? fallbackSnapshot(category);
  const cta = CTA_BY_SHAPE[snapshot.structuralShape] ?? CTA_BY_SHAPE.immersive_essay;

  const seoBlock = draft.seo ? buildSeoHead(draft.seo) : '';

  const articleBody = injectImages(draft.bodyHtml, draft.imagePlacements);
  const readMin = Math.max(3, Math.round(draft.wordCount / 220));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(draft.seo?.metaTitle ?? draft.title)}</title>${seoBlock}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
${BASE_CSS}
  </style>
</head>
<body>
  <div class="progress-bar"><div class="progress-fill"></div></div>

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
        <p class="article-subtitle">${esc(draft.subtitle)}</p>
        <div class="article-meta">
          <span>${draft.wordCount} words</span>
          <span class="article-meta-dot"></span>
          <span>${readMin} min read</span>
          <span class="article-meta-dot"></span>
          <span>${cat?.label ?? '—'}</span>
          <span class="article-meta-dot"></span>
          <span>${aud?.label ?? '—'}</span>
        </div>
      </header>

      <div class="blog-body-text">${articleBody}</div>

      <!-- ───── Conversion CTA card ───── -->
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
    (function() {
      var fill = document.querySelector('.progress-fill');
      if (!fill) return;
      var update = function() {
        var h = document.documentElement;
        var max = h.scrollHeight - h.clientHeight;
        fill.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
      };
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      update();
    })();
  </script>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────
// CSS — extracted to a constant for readability
// ─────────────────────────────────────────────────────────────
const BASE_CSS = `    :root {
      --ink-950: #0A0A0B;
      --ink-900: #111113;
      --ink-800: #1E1E22;
      --ink-700: #2A2A30;
      --ember-500: #FF6B35;
      --ember-400: #FF8B5C;
      --ember-700: #C24A20;
      --ember-50:  #FFF5EE;
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
      line-height: 1.7;
      margin: 0;
      padding: 56px 24px 80px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .container {
      max-width: 760px;
      margin: 0 auto;
      background: #ffffff;
      padding: 64px 72px 56px;
      border-radius: 32px;
      box-shadow: 0 20px 60px rgba(10, 10, 11, 0.06);
    }
    @media (max-width: 720px) {
      body { padding: 16px 8px 40px; line-height: 1.65; }
      .container { padding: 32px 24px 36px; border-radius: 20px; }
    }

    /* ───── Reading progress bar ───── */
    .progress-bar {
      position: fixed; top: 0; left: 0; right: 0;
      height: 3px; background: rgba(10,10,11,0.06);
      z-index: 100;
    }
    .progress-fill {
      height: 100%; width: 0%;
      background: var(--ember-500);
      transition: width 0.08s ease-out;
      box-shadow: 0 0 12px rgba(255, 107, 53, 0.3);
    }

    /* ───── Snapshot (Dossier Calibration) ───── */
    .snapshot-box {
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, #2A0E04 0%, #14100E 55%, #0A0A0B 100%);
      color: #ffffff;
      padding: 44px 44px 40px;
      border-radius: 24px;
      margin-bottom: 56px;
      border: 1px solid rgba(255, 107, 53, 0.25);
      box-shadow: 0 24px 70px rgba(255, 107, 53, 0.10);
    }
    .snapshot-box::before, .snapshot-box::after {
      content: ''; position: absolute;
      width: 240px; height: 240px;
      border-radius: 50%;
      filter: blur(70px);
      pointer-events: none;
    }
    .snapshot-box::before {
      right: -70px; top: -70px;
      background: rgba(255, 107, 53, 0.18);
    }
    .snapshot-box::after {
      left: -50px; bottom: -50px;
      background: rgba(255, 255, 255, 0.04);
    }
    @media (max-width: 720px) {
      .snapshot-box { padding: 28px 24px 26px; border-radius: 18px; margin-bottom: 36px; }
    }

    .snapshot-head {
      display: flex; align-items: flex-start; justify-content: space-between;
      gap: 18px; margin-bottom: 32px;
      position: relative; z-index: 1;
      flex-wrap: wrap;
    }
    .snapshot-eyebrow {
      display: flex; align-items: center; gap: 14px;
    }
    .snapshot-icon {
      width: 42px; height: 42px;
      display: flex; align-items: center; justify-content: center;
      background: rgba(255, 107, 53, 0.14);
      border: 1px solid rgba(255, 107, 53, 0.32);
      border-radius: 11px;
      color: var(--ember-400);
    }
    .snapshot-eyebrow-label {
      display: block;
      font-size: 11px; font-weight: 700; font-style: italic;
      text-transform: uppercase; letter-spacing: 0.32em;
      opacity: 0.95;
    }
    .snapshot-eyebrow-lever {
      display: block;
      font-size: 10px; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.18em;
      color: rgba(255, 255, 255, 0.65);
      margin-top: 5px;
      max-width: 480px;
      line-height: 1.5;
    }
    .snapshot-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 38px; font-style: italic; font-weight: 600;
      margin: 0; color: #ffffff;
      line-height: 1.1; border: none; padding: 0;
    }
    @media (max-width: 720px) { .snapshot-title { font-size: 30px; } }

    .snapshot-pill {
      align-self: flex-start;
      padding: 9px 18px;
      border-radius: 999px;
      font-size: 10px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.22em;
      background: rgba(255, 107, 53, 0.18);
      color: var(--ember-400);
      border: 1px solid rgba(255, 107, 53, 0.32);
      backdrop-filter: blur(8px);
    }
    .snapshot-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 36px;
      padding-top: 32px;
      border-top: 1px solid rgba(255, 255, 255, 0.10);
      position: relative; z-index: 1;
    }
    @media (max-width: 640px) { .snapshot-grid { grid-template-columns: 1fr; gap: 24px; } }
    .snapshot-cell-label {
      display: block;
      font-size: 10px; font-weight: 700; font-style: italic;
      text-transform: uppercase; letter-spacing: 0.22em;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 9px;
    }
    .snapshot-cell-value {
      margin: 0; font-size: 15px; font-weight: 500;
      color: #ffffff; line-height: 1.6;
    }
    .snapshot-cell-value.italic {
      font-style: italic; opacity: 0.85;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
    }

    /* ───── Article header ───── */
    .article-header { margin-bottom: 40px; }
    .article-section-marker {
      display: flex; align-items: center; gap: 14px;
      font-size: 10px; font-weight: 700; font-style: italic;
      text-transform: uppercase; letter-spacing: 0.32em;
      color: var(--ink-950);
      margin-bottom: 22px;
    }
    .article-section-marker::before, .article-section-marker::after {
      content: ''; flex: 0 0 36px; height: 1px;
      background: rgba(10, 10, 11, 0.28);
    }
    .article h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 46px; font-weight: 700;
      line-height: 1.12; letter-spacing: -0.01em;
      margin: 0 0 14px; color: var(--ink-950);
    }
    @media (max-width: 720px) { .article h1 { font-size: 32px; } }
    .article-subtitle {
      font-family: 'Cormorant Garamond', serif;
      font-size: 19px; font-weight: 400; font-style: italic;
      color: var(--steel-500);
      margin: 0 0 22px;
      line-height: 1.45;
    }
    .article-meta {
      display: flex; align-items: center; flex-wrap: wrap;
      gap: 10px;
      font-size: 10px; font-weight: 700; font-style: italic;
      text-transform: uppercase; letter-spacing: 0.28em;
      color: var(--steel-500);
    }
    .article-meta-dot {
      width: 4px; height: 4px; border-radius: 50%;
      background: var(--steel-400);
      display: inline-block;
    }

    /* ───── Body typography (readability is the brief) ───── */
    .blog-body-text { font-size: 17px; line-height: 1.78; color: var(--ink-900); }
    .blog-body-text h2 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 30px; font-weight: 600;
      margin: 56px 0 18px; color: var(--ink-950);
      border-bottom: 1px solid rgba(255, 107, 53, 0.18);
      padding-bottom: 12px;
      line-height: 1.22;
      scroll-margin-top: 24px;
    }
    @media (max-width: 720px) { .blog-body-text h2 { font-size: 24px; margin: 40px 0 14px; } }
    .blog-body-text h3 {
      font-size: 16px; font-weight: 700;
      text-transform: none;
      margin: 32px 0 10px;
      color: var(--ember-700);
      letter-spacing: 0.005em;
    }
    .blog-body-text p {
      margin: 0 0 20px;
    }
    .blog-body-text p.lead {
      font-size: 19px;
      color: var(--ink-800);
    }

    /* Drop cap on the first paragraph of the body — editorial touch */
    .blog-body-text > p:first-of-type::first-letter {
      font-family: 'Cormorant Garamond', serif;
      font-size: 72px; font-weight: 700;
      line-height: 0.95;
      color: var(--ember-700);
      float: left;
      padding: 6px 14px 0 0;
      margin-top: 4px;
    }
    @media (max-width: 720px) {
      .blog-body-text > p:first-of-type::first-letter { font-size: 54px; padding: 4px 10px 0 0; }
    }

    .blog-body-text ul, .blog-body-text ol { padding-left: 28px; margin: 0 0 24px; }
    .blog-body-text li { margin-bottom: 10px; line-height: 1.72; }
    .blog-body-text strong, .blog-body-text b { font-weight: 700; color: var(--ink-950); }
    .blog-body-text em, .blog-body-text i { font-style: italic; }

    /* Pull-quote treatment for blockquotes */
    .blog-body-text blockquote {
      margin: 40px 0;
      padding: 8px 0 8px 32px;
      border-left: 3px solid var(--ember-500);
      font-family: 'Cormorant Garamond', serif;
      font-size: 24px; font-style: italic;
      font-weight: 500;
      line-height: 1.4;
      color: var(--ink-800);
    }
    .blog-body-text blockquote p { margin: 0; }
    @media (max-width: 720px) {
      .blog-body-text blockquote { font-size: 20px; padding-left: 22px; margin: 28px 0; }
    }

    /* Tables — for comparison archetype */
    .blog-body-text table {
      width: 100%; border-collapse: collapse;
      margin: 28px 0;
      font-size: 14px;
    }
    .blog-body-text th, .blog-body-text td {
      padding: 14px 16px;
      text-align: left;
      border-bottom: 1px solid rgba(10, 10, 11, 0.08);
      vertical-align: top;
    }
    .blog-body-text th {
      font-weight: 700; color: var(--ink-950);
      background: var(--ember-50);
      font-size: 11px;
      text-transform: uppercase; letter-spacing: 0.12em;
    }
    @media (max-width: 720px) { .blog-body-text table { font-size: 13px; } .blog-body-text th, .blog-body-text td { padding: 10px 12px; } }

    /* ───── Inline image containers ───── */
    .img-container {
      margin: 56px 0;
      border-top: 1px solid #e2e8f0;
      padding-top: 18px;
    }
    .img-container img {
      width: 100%; border-radius: 16px; display: block;
      box-shadow: 0 12px 40px rgba(10, 10, 11, 0.06);
    }
    .img-caption {
      margin-top: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e2e8f0;
    }
    .img-caption p {
      margin: 0;
      font-size: 10px; font-weight: 700;
      color: var(--steel-500);
      text-transform: uppercase; letter-spacing: 0.2em;
      line-height: 1.55;
    }

    /* ───── Conversion CTA card ───── */
    .cta-card {
      position: relative;
      margin: 64px 0 32px;
      padding: 38px 44px 36px;
      background: linear-gradient(135deg, #FFF8F2 0%, #FFFFFF 100%);
      border: 1px solid rgba(255, 107, 53, 0.20);
      border-radius: 22px;
      overflow: hidden;
    }
    .cta-card::before {
      content: '';
      position: absolute; top: 0; left: 0;
      width: 4px; height: 100%;
      background: var(--ember-500);
    }
    .cta-card::after {
      content: '';
      position: absolute; right: -50px; top: -50px;
      width: 220px; height: 220px;
      border-radius: 50%;
      background: radial-gradient(closest-side, rgba(255, 107, 53, 0.12), transparent);
      pointer-events: none;
    }
    @media (max-width: 720px) { .cta-card { padding: 28px 24px 26px; border-radius: 16px; margin: 44px 0 24px; } }

    .cta-eyebrow {
      display: inline-block;
      font-size: 10px; font-weight: 700; font-style: italic;
      text-transform: uppercase; letter-spacing: 0.32em;
      color: var(--ember-700);
      margin-bottom: 10px;
    }
    .cta-headline {
      font-family: 'Cormorant Garamond', serif;
      font-size: 28px; font-weight: 600;
      margin: 0 0 14px;
      color: var(--ink-950);
      line-height: 1.2;
      border: none; padding: 0;
    }
    @media (max-width: 720px) { .cta-headline { font-size: 23px; } }
    .cta-body {
      font-size: 15px; line-height: 1.65;
      color: var(--ink-900);
      margin: 0 0 18px;
      max-width: 540px;
    }
    .cta-action {
      display: inline-block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.18em;
      color: var(--ember-700);
    }

    /* ───── Footer ───── */
    .article-footer {
      margin-top: 56px; padding-top: 32px;
      border-top: 1px solid #e2e8f0;
      text-align: center;
    }
    .article-footer-mark {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.32em;
      color: var(--steel-500);
    }`;

// ─────────────────────────────────────────────────────────────
// helpers
// ─────────────────────────────────────────────────────────────

function esc(s: string): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Builds the full SEO <head> block: standard meta + Open Graph + Twitter Card
// + geo + canonical + Schema.org JSON-LD. Search engines and AI search crawlers
// (ChatGPT, Perplexity) all read different subsets of these — comprehensive
// coverage is the goal.
function buildSeoHead(seo: NonNullable<BlogDraft['seo']>): string {
  const url = `https://optifinish.com/blog/${seo.slug}`;
  const allKeywords = [seo.focusKeyword, ...(seo.secondaryKeywords ?? []), ...(seo.longTailKeywords ?? [])]
    .filter(Boolean)
    .join(', ');

  const lines: string[] = [
    // Standard meta
    `  <meta name="description" content="${esc(seo.metaDescription)}" />`,
    `  <meta name="keywords" content="${esc(allKeywords)}" />`,
    `  <meta name="author" content="OptiFinish" />`,
    `  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    // Geo (helps Indian search ranking + Google Business signals)
    `  <meta name="geo.region" content="${esc(seo.geoRegion ?? 'IN-UP')}" />`,
    `  <meta name="geo.placename" content="${esc(seo.geoPlacename ?? 'Greater Noida')}" />`,
    `  <link rel="canonical" href="${esc(url)}" />`,
    // Open Graph (LinkedIn, Facebook, WhatsApp share previews)
    `  <meta property="og:type" content="${esc(seo.ogType ?? 'article')}" />`,
    `  <meta property="og:locale" content="${esc(seo.ogLocale ?? 'en_IN')}" />`,
    `  <meta property="og:url" content="${esc(url)}" />`,
    `  <meta property="og:title" content="${esc(seo.ogTitle ?? seo.metaTitle)}" />`,
    `  <meta property="og:description" content="${esc(seo.ogDescription ?? seo.metaDescription)}" />`,
    `  <meta property="og:site_name" content="OptiFinish" />`
  ];

  if (seo.ogImage) {
    lines.push(
      `  <meta property="og:image" content="${esc(seo.ogImage)}" />`,
      `  <meta property="og:image:width" content="1024" />`,
      `  <meta property="og:image:height" content="1024" />`
    );
  }

  // Twitter Card
  lines.push(
    `  <meta name="twitter:card" content="${esc(seo.twitterCard ?? 'summary_large_image')}" />`,
    `  <meta name="twitter:title" content="${esc(seo.twitterTitle ?? seo.metaTitle)}" />`,
    `  <meta name="twitter:description" content="${esc(seo.twitterDescription ?? seo.metaDescription)}" />`
  );
  if (seo.twitterImage) {
    lines.push(`  <meta name="twitter:image" content="${esc(seo.twitterImage)}" />`);
  }

  // Article-specific Open Graph
  lines.push(
    `  <meta property="article:published_time" content="${new Date().toISOString()}" />`,
    `  <meta property="article:section" content="${esc(seo.schemaType ?? 'BlogPosting')}" />`
  );
  for (const k of (seo.secondaryKeywords ?? []).slice(0, 6)) {
    lines.push(`  <meta property="article:tag" content="${esc(k)}" />`);
  }

  // Schema.org JSON-LD (already includes BlogPosting/HowTo/TechArticle +
  // BreadcrumbList + Organization in a @graph)
  lines.push(
    `  <script type="application/ld+json">${seo.schemaJsonLd}</script>`
  );

  return '\n' + lines.join('\n');
}

// Inject up to 2 inline images at the H2 anchor headings the model produced.
// Image anchors that fall on the FIRST H2 get re-routed to the second H2
// instead — otherwise the image sits at the very top of the post with no
// opening prose above it, the drop cap can't render, and the article looks
// headless. If both anchors hit the first H2, the second falls through to
// the gentle end-of-body fallback.
function injectImages(bodyHtml: string, placements: ImagePlacement[]): string {
  const usable = placements.filter((p) => !!p.generatedUrl).slice(0, 2);
  if (usable.length === 0) return bodyHtml;

  // Find all H2 headings in order so we can re-route an anchor that lands on
  // the first one (and detect anchors that don't exist in the body).
  const h2Matches = Array.from(bodyHtml.matchAll(/<h2[^>]*>\s*([^<]+?)\s*<\/h2>/gi));
  const firstH2Text = h2Matches[0]?.[1]?.trim().toLowerCase() ?? '';
  const secondH2Text = h2Matches[1]?.[1]?.trim().toLowerCase() ?? '';
  const usedAnchors = new Set<string>();

  let html = bodyHtml;
  for (const p of usable) {
    let anchor = p.anchorHeading?.trim() ?? '';
    if (!anchor) continue;
    const al = anchor.toLowerCase();

    // Re-route first-H2 anchor to second H2 (or skip if already used)
    if (al === firstH2Text && secondH2Text && !usedAnchors.has(secondH2Text)) {
      anchor = h2Matches[1][1].trim();
    }
    // Don't double-insert at the same anchor
    if (usedAnchors.has(anchor.toLowerCase())) {
      continue;
    }

    const re = new RegExp(`(<h2[^>]*>\\s*${escapeReg(anchor)}\\s*</h2>)`, 'i');
    const block = imageContainer(p);
    if (re.test(html)) {
      html = html.replace(re, `${block}$1`);
      usedAnchors.add(anchor.toLowerCase());
    } else {
      html = html + block;
    }
  }
  return html;
}

function escapeReg(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function imageContainer(p: ImagePlacement): string {
  const purpose = derivePurposeFromPrompt(p.prompt);
  return `
<div class="img-container">
  <img src="${esc(p.generatedUrl ?? '')}" alt="${esc(p.alt)}" />
  <div class="img-caption"><p>Visual Insight: ${esc(purpose)}</p></div>
</div>`;
}

function derivePurposeFromPrompt(prompt: string): string {
  const beforeSuffix = prompt.split(/Shot on Hasselblad/i)[0].trim();
  const firstSentence = beforeSuffix.split(/[.!?]\s/)[0];
  return firstSentence.length > 160 ? firstSentence.slice(0, 157) + '…' : firstSentence;
}

// Fallback snapshot if the LLM hasn't produced one (mock path).
function fallbackSnapshot(category: CategoryId): DossierSnapshot {
  const map: Record<CategoryId, DossierSnapshot> = {
    'pillar-guide': {
      decisionFriction: 'Choosing depth of investment when the spec sheet looks similar across vendors but operational behaviour at full duty cycle is not.',
      dominantAnxiety: 'Specifying a system that looks correct on paper and re-spec\'ing it eighteen months later.',
      coreInsight: 'A pillar buy is decided by behaviour under heat-soak, not by feature parity at commissioning.',
      structuralShape: 'pillar_guide',
      lever: 'Behaviour under heat-soak over feature parity.'
    },
    'case-study': {
      decisionFriction: 'Comparing claimed outcomes vs measurable outcomes when every vendor brings a case study.',
      dominantAnxiety: 'Buying a system based on a customer story that does not transfer to your line.',
      coreInsight: 'The transferable part of a case study is the diagnostic process, not the throughput number.',
      structuralShape: 'case_study',
      lever: 'Diagnostic transferability over headline metric envy.'
    },
    'comparison-decision': {
      decisionFriction: 'Manual vs automatic, batch vs conveyor, partner-supplied vs OEM-built — when every option is defensible.',
      dominantAnxiety: 'Optimising on capex when opex (energy, powder, rework) drives 80% of TCO.',
      coreInsight: 'You buy the gun. You operate the rejection rate. Price the second one.',
      structuralShape: 'comparison_matrix',
      lever: 'Operating cost over acquisition cost.'
    },
    'cost-of-inaction': {
      decisionFriction: 'Deferring a capex review until "next FY" when the meter is already running.',
      dominantAnxiety: 'Being the last plant to retool when the cost of inaction shows up on the audit.',
      coreInsight: 'The 18-month gap between "we should fix this" and "we have to fix this" is where margin lives.',
      structuralShape: 'cost_of_inaction',
      lever: 'The 18-month decision window.'
    },
    'facility-behind-scenes': {
      decisionFriction: 'Trusting an Indian-manufactured system at the same level as a European one.',
      dominantAnxiety: 'Buying capacity that does not match build quality.',
      coreInsight: 'The traceability discipline of the manufacturer in Greater Noida tells you more than the brochure ever will.',
      structuralShape: 'facility_tour',
      lever: 'Traceability discipline over country-of-origin shorthand.'
    },
    'technical-deep-dive': {
      decisionFriction: 'When the standard explanation stops matching what the line actually does at hour six.',
      dominantAnxiety: 'A defect signature that none of the operators can name.',
      coreInsight: 'Most powder coating defects are physics, not chemistry. The fix usually lives upstream of where the defect appears.',
      structuralShape: 'immersive_essay',
      lever: 'Locating cause one upstream station from where the defect surfaces.'
    },
    'how-to': {
      decisionFriction: 'Whether to escalate a defect now or hope the next batch resolves it.',
      dominantAnxiety: 'Burning a shift chasing a defect that turns out to be operator-induced.',
      coreInsight: 'A 30-minute audit at hour six of the shift catches what a 4-hour root-cause investigation later cannot.',
      structuralShape: 'troubleshooting_drilldown',
      lever: 'Hour-six audits over post-mortem investigations.'
    },
    'industry-trends': {
      decisionFriction: 'Reading regulatory or market shifts early enough to act, not late enough to be priced in.',
      dominantAnxiety: 'Being caught flat-footed when a draft notification becomes a deadline.',
      coreInsight: 'In Indian coating, the regulation usually arrives twice: first as a draft nobody reads, then as a deadline nobody can meet.',
      structuralShape: 'immersive_essay',
      lever: 'The 18-month draft-to-deadline gap.'
    }
  };
  return map[category];
}

// Inline SVG icons per category (Lucide-style, monoline).
function categoryIconSvg(category: CategoryId): string {
  const stroke = `stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
  const open = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" ${stroke}>`;
  const close = `</svg>`;
  switch (category) {
    case 'pillar-guide':
      // book-marked
      return `${open}<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>${close}`;
    case 'case-study':
      // clipboard-list
      return `${open}<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6M9 16h6M9 8h.01"/>${close}`;
    case 'comparison-decision':
      // scale (balance)
      return `${open}<path d="M16 16l3-8 3 8c-2 1-4 1-6 0z"/><path d="M2 16l3-8 3 8c-2 1-4 1-6 0z"/><path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>${close}`;
    case 'cost-of-inaction':
      // trending-down
      return `${open}<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>${close}`;
    case 'facility-behind-scenes':
      // factory
      return `${open}<path d="M2 20h20"/><path d="M5 20V8l5 3V8l5 3V8l4 3v9"/>${close}`;
    case 'technical-deep-dive':
      // settings (cog)
      return `${open}<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>${close}`;
    case 'how-to':
      // wrench
      return `${open}<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>${close}`;
    case 'industry-trends':
      // activity (pulse)
      return `${open}<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>${close}`;
  }
}
