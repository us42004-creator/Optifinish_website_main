export type CategoryId =
  | 'pillar-guide'
  | 'case-study'
  | 'comparison-decision'
  | 'cost-of-inaction'
  | 'facility-behind-scenes'
  | 'technical-deep-dive'
  | 'how-to'
  | 'industry-trends';

export type AudienceId =
  | 'plant-manager'
  | 'procurement'
  | 'oem-engineer'
  | 'rd-process'
  | 'c-level'
  | 'existing-customer'
  | 'architect-specifier'
  | 'consulting-engineer';

export interface Category {
  id: CategoryId;
  label: string;
  blurb: string;
  examples: string[];
}

export interface Audience {
  id: AudienceId;
  label: string;
  role: string;
  cares: string;
}

export interface TopicIdea {
  id: string;
  title: string;
  angle: string;
  hook: string;
  estimatedReadTime: string;
}

export interface SeoScores {
  titleLength: number; // 0-100, 100 = 50-60 chars
  descLength: number; // 0-100, 100 = 150-160 chars
  keywordInTitle: boolean;
  keywordInFirstParagraph: boolean;
  keywordInUrl: boolean;
  keywordDensityPct: number; // % of body word count
  hasH2s: boolean;
  hasPullQuote: boolean;
  overall: number; // 0-100 weighted average
}

export interface InternalLinkSuggestion {
  anchor: string;
  targetCategory: string; // category-id of suggested target
  rationale: string;
}

export interface SeoMeta {
  // Primary meta
  metaTitle: string; // 50-60 chars, primary keyword + brand
  metaDescription: string; // 150-160 chars
  slug: string; // includes primary keyword

  // Keywords
  focusKeyword: string; // 1 primary, 2-4 words
  secondaryKeywords: string[]; // 5-8 contextual
  longTailKeywords: string[]; // 2-3 long-tail variants

  // Open Graph (social sharing — LinkedIn, Facebook, WhatsApp previews)
  ogTitle: string;
  ogDescription: string;
  ogImage?: string; // hero image URL or first inline image
  ogType: 'article';
  ogLocale: string; // 'en_IN'

  // Twitter Card
  twitterCard: 'summary_large_image';
  twitterTitle: string;
  twitterDescription: string;
  twitterImage?: string;

  // Schema.org
  schemaType: 'BlogPosting' | 'HowTo' | 'TechArticle' | 'FAQPage' | 'Article';
  schemaJsonLd: string; // serialized JSON-LD (may include multiple @graph entries)

  // Geo (relevant for facility / India-targeted posts)
  geoRegion: string; // 'IN-UP'
  geoPlacename: string; // 'Greater Noida'

  // Advisory — internal linking opportunities (not auto-injected)
  internalLinkSuggestions: InternalLinkSuggestion[];

  // Computed health scores
  scores: SeoScores;
}

export type StructuralShape =
  | 'pillar_guide'
  | 'case_study'
  | 'facility_tour'
  | 'troubleshooting_drilldown'
  | 'comparison_matrix'
  | 'cost_of_inaction'
  | 'immersive_essay';

export interface DossierSnapshot {
  decisionFriction: string;
  dominantAnxiety: string;
  coreInsight: string;
  structuralShape: StructuralShape;
  lever: string; // 1-line specific differentiator/insight
}

export interface EditorialFlags {
  fabricatedNumbers: string[];
  firstPersonLeaks: string[];
  fabricatedYears: string[];
  hasAny: boolean;
}

// AEO (AI Engine Optimization) bundle — data added to every published post so
// GPTs / Perplexity / Claude / Gemini can cite the post reliably.
export interface AeoEntity {
  name: string;            // "GEMA", "CBAM", "BEE"
  url: string;             // authoritative source (Wikipedia, govt page, org URL)
  description: string;     // 1-line context
}

export interface AeoFaqEntry {
  question: string;        // natural-language question a buyer would type into ChatGPT
  answer: string;          // 40-80 words, factually derivable from the post
}

export interface AeoBundle {
  quickAnswer: string;         // 40-60 word direct answer to post's implicit question — LLMs quote this verbatim
  faq: AeoFaqEntry[];          // 3-5 Q&A pairs → emitted as FAQPage schema
  entities: AeoEntity[];       // named entities mentioned in the post → linked in body + schema.mentions
}

export interface BlogDraft {
  title: string;
  subtitle: string;
  bodyHtml: string;
  wordCount: number;
  imagePlacements: ImagePlacement[];
  seo?: SeoMeta;
  snapshot?: DossierSnapshot;
  editorialFlags?: EditorialFlags; // populated by post-gen detector — Step 4 UI shows a red banner if hasAny
  aeo?: AeoBundle;                 // AI Engine Optimization — Quick Answer, FAQ, named entities
}

export interface ImagePlacement {
  id: string;
  position: 'hero' | 'inline' | 'closing';
  anchorHeading?: string;
  prompt: string;
  alt: string;
  generatedUrl?: string;
}

export type Stage =
  | 'category'
  | 'audience'
  | 'topic'
  | 'draft'
  | 'seo'
  | 'edit'
  | 'images'
  | 'export';

export interface PipelineState {
  stage: Stage;
  category: CategoryId | null;
  audience: AudienceId | null;
  topic: TopicIdea | null;
  draft: BlogDraft | null;
}

// ─────────────────────────────────────────────────────────────
// Weekly Editorial Brief — replaces scattered manual 8×8 matrix picking
// with a curated research-driven topic feed. Runs live Tavily queries
// across the industry, cross-references what OptiFinish's own site
// already covers (via siteIndex), then LLM-synthesizes 5-7 topic cards
// the editor can start writing with one click.
// ─────────────────────────────────────────────────────────────

export interface WeeklyBriefCard {
  id: string;                       // stable id for dedupe / caching
  title: string;                    // provisional post title
  whyNow: string;                   // 1-2 sentence trigger (regulation date, launch, market shift)
  searchDemand: string;             // 1 sentence — the buyer query this answers
  optifinishAngle: string;          // 1 sentence — what only OptiFinish can credibly say
  gapInOurContent: string;          // 1 sentence — what the crawled site does NOT yet cover
  suggestedCategory: CategoryId;    // pre-picked pipeline category
  suggestedAudience: AudienceId;    // pre-picked pipeline audience
  evidenceUrls: string[];           // 2-4 Tavily source URLs backing the "why now"
}

export interface WeeklyBrief {
  generatedAt: string;              // ISO timestamp
  cards: WeeklyBriefCard[];
  totalQueriesRun: number;
  totalEvidenceCollected: number;
}
