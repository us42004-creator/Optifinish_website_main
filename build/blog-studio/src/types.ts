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

export interface BlogDraft {
  title: string;
  subtitle: string;
  bodyHtml: string;
  wordCount: number;
  imagePlacements: ImagePlacement[];
  seo?: SeoMeta;
  snapshot?: DossierSnapshot;
  editorialFlags?: EditorialFlags; // populated by post-gen detector — Step 4 UI shows a red banner if hasAny
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
