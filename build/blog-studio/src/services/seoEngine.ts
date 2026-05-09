// Real SEO module. Single LLM call extracts keywords + writes meta tags
// tuned to the actual body content. Schema.org JSON-LD is generated in
// code (deterministic) per archetype. Health scores are computed locally.

import { BlogDraft, CategoryId, AudienceId, SeoMeta, SeoScores, InternalLinkSuggestion } from '../types';
import { CATEGORIES, AUDIENCES } from '../constants';
import { chatJSON } from './nvidiaLlmService';
import { MODELS } from './modelRouter';

interface SeoLlmJson {
  metaTitle: string;
  metaDescription: string;
  slug: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  longTailKeywords: string[];
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  internalLinkSuggestions: InternalLinkSuggestion[];
}

// Per-category schema-type mapping. Search engines treat HowTo and TechArticle
// schemas differently from generic BlogPosting — HowTo posts get rich snippets
// with step previews, TechArticle gets developer/engineer audience targeting.
const SCHEMA_BY_CATEGORY: Record<CategoryId, SeoMeta['schemaType']> = {
  'pillar-guide': 'Article',
  'case-study': 'Article',
  'comparison-decision': 'Article',
  'cost-of-inaction': 'BlogPosting',
  'facility-behind-scenes': 'Article',
  'technical-deep-dive': 'TechArticle',
  'how-to': 'HowTo',
  'industry-trends': 'BlogPosting'
};

function buildSeoSystemPrompt(category: CategoryId, audience: AudienceId): string {
  const cat = CATEGORIES.find((c) => c.id === category)!;
  const aud = AUDIENCES.find((a) => a.id === audience)!;

  return `You are a senior B2B SEO strategist for OptiFinish, an Indian industrial powder coating equipment company. You analyse one blog post and produce production-grade SEO metadata.

YOUR REMIT
- Rank the post for B2B industrial searches that ${aud.label}s actually run.
- Optimise for BOTH Google AND modern AI-search engines (ChatGPT, Perplexity, Claude). Specifically: clear factual structure, concrete named entities, dates, INR-denominated specifics where possible.
- Indian search intent specifically — the Indian B2B coating content space is empty. Target queries Indian plant managers / procurement leads / engineers actually type, not US/EU search patterns.

CHARACTER-LIMIT RULES (these are hard rules — exceeding hurts ranking):
- metaTitle: 50-60 characters EXACTLY. Must include the primary keyword. End with " | OptiFinish" (12 chars). So your headline portion has ~38-48 chars to work with.
- metaDescription: 150-160 characters EXACTLY. Must include the primary keyword and a concrete value prop or specificity hook (named system, dated trigger, INR figure if mentioned in body).
- slug: 3-7 words, hyphen-separated, includes the primary keyword. ASCII only, lowercase, no stop words ("the", "a", "of", etc.).

KEYWORD STRATEGY:
- focusKeyword: ONE primary keyword, 2-4 words, the term most central to the post. Should be a real B2B search query an Indian buyer would type.
- secondaryKeywords: 5-8 related terms that DIFFER from the focus keyword. These are the LSI/semantic terms that help ranking. Mix product terms, process terms, and India-context modifiers.
- longTailKeywords: 2-3 long-tail variants (4-7 words each) — the kinds of specific queries low-volume but high-intent.

GOOD KEYWORD EXAMPLES (for reference):
- "powder coating transfer efficiency" (focus, 4 words)
- "GEMA OptiSpray pump India" (long-tail, 4 words)
- "powder coating plant capex India" (long-tail with INR-context modifier)
- "monsoon humidity outgassing fix" (long-tail, defect-specific)

BAD KEYWORD EXAMPLES (don't do this):
- "industrial coatings" (too broad, too competitive, no buyer intent)
- "best powder coating" (subjective, no traction)
- "things to know" (no commercial intent)

OPEN GRAPH vs META TITLE:
The metaTitle is for Google search results (utilitarian, keyword-loaded).
The ogTitle is for social previews (LinkedIn, WhatsApp share, Twitter) — can be more emotional, click-driven, less keyword-stuffed. Make them DIFFERENT.

INTERNAL LINK SUGGESTIONS (advisory, 3-5 entries):
Suggest 3-5 anchor texts the editor could link to other posts on optifinish.com. Each should name an OptiFinish content category (one of: pillar-guide, case-study, comparison-decision, cost-of-inaction, facility-behind-scenes, technical-deep-dive, how-to, industry-trends) as the targetCategory. The rationale should explain WHY this internal link strengthens the cluster.

OUTPUT: Strict JSON only. No prose, no markdown, no code fences.

{
  "metaTitle": "string — 50-60 chars including ' | OptiFinish'",
  "metaDescription": "string — 150-160 chars",
  "slug": "string — 3-7 hyphen-separated lowercase words including focus keyword",
  "focusKeyword": "string — 2-4 words",
  "secondaryKeywords": ["string", "string", ...] (5-8 entries),
  "longTailKeywords": ["string", "string", ...] (2-3 entries, 4-7 words each),
  "ogTitle": "string — punchier than metaTitle, can be 60-90 chars",
  "ogDescription": "string — 150-200 chars, can be more emotional than metaDescription",
  "twitterTitle": "string — ≤70 chars",
  "twitterDescription": "string — ≤200 chars",
  "internalLinkSuggestions": [
    { "anchor": "string", "targetCategory": "category-id", "rationale": "string" }
  ]
}

POST CONTEXT:
- Category: ${cat.label} — ${cat.blurb}
- Audience: ${aud.label} (${aud.role}) — cares about: ${aud.cares}`;
}

// Escape HTML special chars in JSON-LD content. JSON.stringify handles
// the JSON encoding; we then escape the </script> sequence which would
// otherwise close the inline <script type="application/ld+json"> early.
function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj, null, 2).replace(/</g, '\\u003c');
}

function buildSchemaJsonLd(
  draft: BlogDraft,
  category: CategoryId,
  audience: AudienceId,
  seo: Pick<SeoMeta, 'metaTitle' | 'metaDescription' | 'slug' | 'focusKeyword' | 'secondaryKeywords' | 'schemaType' | 'ogImage'>
): string {
  const cat = CATEGORIES.find((c) => c.id === category)!;
  const today = new Date().toISOString().slice(0, 10);
  const url = `https://optifinish.com/blog/${seo.slug}`;
  const allKeywords = [seo.focusKeyword, ...seo.secondaryKeywords];

  // Main article schema (type varies by archetype)
  const article: Record<string, unknown> = {
    '@type': seo.schemaType,
    headline: draft.title,
    description: seo.metaDescription,
    keywords: allKeywords.join(', '),
    author: {
      '@type': 'Organization',
      name: 'OptiFinish',
      url: 'https://optifinish.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Value Added Coating Solutions Pvt. Ltd.',
      logo: {
        '@type': 'ImageObject',
        url: 'https://optifinish.com/logo.png'
      }
    },
    datePublished: today,
    dateModified: today,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    inLanguage: 'en-IN'
  };

  if (seo.ogImage) {
    article.image = {
      '@type': 'ImageObject',
      url: seo.ogImage,
      width: 1024,
      height: 1024
    };
  }

  // HowTo schema gets enriched with steps extracted from H2s
  if (seo.schemaType === 'HowTo') {
    const h2Matches = Array.from(draft.bodyHtml.matchAll(/<h2[^>]*>([^<]+)<\/h2>/gi));
    const steps = h2Matches.map((m, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: m[1].trim()
    }));
    if (steps.length > 0) article.step = steps;
  }

  // TechArticle gets a proficiency level and audience
  if (seo.schemaType === 'TechArticle') {
    article.proficiencyLevel = 'Expert';
    article.audience = {
      '@type': 'Audience',
      audienceType: AUDIENCES.find((a) => a.id === audience)?.label ?? 'Industrial professional'
    };
  }

  // BreadcrumbList helps Google show the path in search results
  const breadcrumbs = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://optifinish.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://optifinish.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: cat.label,
        item: `https://optifinish.com/blog/category/${category}`
      },
      { '@type': 'ListItem', position: 4, name: draft.title }
    ]
  };

  // Organization schema with Greater Noida geo — boosts local-business signals
  const organization = {
    '@type': 'Organization',
    name: 'OptiFinish',
    legalName: 'Value Added Coating Solutions Pvt. Ltd.',
    url: 'https://optifinish.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Greater Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201306',
      addressCountry: 'IN'
    },
    sameAs: [
      'https://www.linkedin.com/company/optifinish',
      'https://www.youtube.com/@optifinish'
    ]
  };

  // Multiple @graph nodes is the modern, validator-friendly pattern
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [article, breadcrumbs, organization]
  };

  return safeJsonLd(graph);
}

// SEO health scoring — computed in code, instant feedback for the editor.
function computeScores(
  draft: BlogDraft,
  seo: Pick<SeoMeta, 'metaTitle' | 'metaDescription' | 'slug' | 'focusKeyword'>
): SeoScores {
  const titleLen = seo.metaTitle.length;
  const descLen = seo.metaDescription.length;
  const titleScore = titleLen >= 50 && titleLen <= 60 ? 100 : Math.max(0, 100 - Math.abs(55 - titleLen) * 4);
  const descScore = descLen >= 150 && descLen <= 160 ? 100 : Math.max(0, 100 - Math.abs(155 - descLen) * 2);

  const keywordLower = seo.focusKeyword.toLowerCase();
  const titleLower = seo.metaTitle.toLowerCase();
  const slugLower = seo.slug.toLowerCase();
  const bodyText = draft.bodyHtml.replace(/<[^>]+>/g, ' ').toLowerCase();
  const firstParaMatch = draft.bodyHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  const firstPara = (firstParaMatch?.[1] ?? '').replace(/<[^>]+>/g, ' ').toLowerCase();

  const keywordInTitle = titleLower.includes(keywordLower);
  const keywordInFirstParagraph = firstPara.includes(keywordLower);
  const keywordInUrl = slugLower.includes(keywordLower.replace(/\s+/g, '-')) || slugLower.includes(keywordLower.split(' ')[0]);

  // Density: how many times keyword appears / total body words
  const totalWords = bodyText.split(/\s+/).filter(Boolean).length;
  const keywordOccurrences = (bodyText.match(new RegExp(escapeRegex(keywordLower), 'g')) || []).length;
  const keywordDensityPct = totalWords > 0 ? (keywordOccurrences / totalWords) * 100 : 0;

  const hasH2s = /<h2[^>]*>/i.test(draft.bodyHtml);
  const hasPullQuote = /<blockquote[^>]*>/i.test(draft.bodyHtml);

  // Overall: weighted
  const overall = Math.round(
    titleScore * 0.15 +
      descScore * 0.15 +
      (keywordInTitle ? 100 : 0) * 0.2 +
      (keywordInFirstParagraph ? 100 : 0) * 0.15 +
      (keywordInUrl ? 100 : 0) * 0.1 +
      // density 0.5-2.5% is healthy; under 0.3 or over 3 is penalised
      Math.max(0, 100 - Math.abs(1.5 - Math.min(keywordDensityPct, 3)) * 30) * 0.15 +
      (hasH2s ? 100 : 0) * 0.05 +
      (hasPullQuote ? 100 : 0) * 0.05
  );

  return {
    titleLength: Math.round(titleScore),
    descLength: Math.round(descScore),
    keywordInTitle,
    keywordInFirstParagraph,
    keywordInUrl,
    keywordDensityPct: Math.round(keywordDensityPct * 100) / 100,
    hasH2s,
    hasPullQuote,
    overall
  };
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ─────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────
export async function generateSeoLLM(
  draft: BlogDraft,
  category: CategoryId,
  audience: AudienceId
): Promise<SeoMeta> {
  // Use Llama 3.3 (fast, reliable JSON mode). One short call.
  const llmModel = MODELS.find((m) => m.supportsJsonMode) ?? MODELS[0];

  // Trim the body excerpt — full body would burn context. First 1000 chars
  // + last 400 chars usually has the key entities/concepts.
  const bodyText = draft.bodyHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const bodyExcerpt =
    bodyText.length > 1500
      ? `${bodyText.slice(0, 1000)} ... ${bodyText.slice(-400)}`
      : bodyText;

  const userPrompt = `Generate SEO metadata for this post.

TITLE: "${draft.title}"
SUBTITLE: "${draft.subtitle}"

SNAPSHOT FIELDS:
- Decision Friction: ${draft.snapshot?.decisionFriction ?? '-'}
- Dominant Anxiety: ${draft.snapshot?.dominantAnxiety ?? '-'}
- Core Insight: ${draft.snapshot?.coreInsight ?? '-'}
- Lever: ${draft.snapshot?.lever ?? '-'}

BODY EXCERPT (first 1000 + last 400 chars):
${bodyExcerpt}

Apply ALL the rules: character limits, keyword strategy, India-first intent, AEO-friendly structure. Return strict JSON only.`;

  const llm = await chatJSON<SeoLlmJson>({
    model: llmModel.id,
    messages: [
      { role: 'system', content: buildSeoSystemPrompt(category, audience) },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.5,
    topP: 0.9,
    maxTokens: 1500
  });

  // Pick hero image for OG: prefer the first generated image if any
  const ogImage = draft.imagePlacements?.find((p) => p.generatedUrl)?.generatedUrl;
  const schemaType = SCHEMA_BY_CATEGORY[category];

  // Sanitize slug (in case the LLM returns weird chars)
  const slug = (llm.slug || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 70) || 'optifinish-post';

  // Trim/pad meta to enforce character limits even if the LLM drifted
  const metaTitle = enforceLength(llm.metaTitle, 50, 60, ' | OptiFinish');
  const metaDescription = enforceLength(llm.metaDescription, 150, 160);

  const baseSeo: Pick<SeoMeta, 'metaTitle' | 'metaDescription' | 'slug' | 'focusKeyword' | 'secondaryKeywords' | 'schemaType' | 'ogImage'> = {
    metaTitle,
    metaDescription,
    slug,
    focusKeyword: llm.focusKeyword?.trim() || draft.title.split(' ').slice(0, 3).join(' ').toLowerCase(),
    secondaryKeywords: (llm.secondaryKeywords ?? []).slice(0, 8),
    schemaType,
    ogImage
  };

  const schemaJsonLd = buildSchemaJsonLd(draft, category, audience, baseSeo);
  const scores = computeScores(draft, baseSeo);

  return {
    ...baseSeo,
    longTailKeywords: (llm.longTailKeywords ?? []).slice(0, 3),
    ogTitle: llm.ogTitle || baseSeo.metaTitle,
    ogDescription: llm.ogDescription || baseSeo.metaDescription,
    ogType: 'article',
    ogLocale: 'en_IN',
    twitterCard: 'summary_large_image',
    twitterTitle: llm.twitterTitle || baseSeo.metaTitle,
    twitterDescription: llm.twitterDescription || baseSeo.metaDescription,
    twitterImage: ogImage,
    schemaJsonLd,
    geoRegion: 'IN-UP',
    geoPlacename: 'Greater Noida',
    internalLinkSuggestions: (llm.internalLinkSuggestions ?? []).slice(0, 5),
    scores
  };
}

// Defensive: if the LLM violates the character-length rule, trim or pad to
// stay in the search-engine-friendly window.
function enforceLength(text: string, min: number, max: number, suffix?: string): string {
  let t = (text || '').trim();
  if (t.length > max) {
    // Trim at last word boundary before max
    const cut = t.slice(0, max);
    const lastSpace = cut.lastIndexOf(' ');
    t = lastSpace > min ? cut.slice(0, lastSpace) : cut;
  } else if (suffix && !t.toLowerCase().includes(suffix.trim().toLowerCase()) && t.length + suffix.length <= max) {
    t = t + suffix;
  }
  return t;
}
