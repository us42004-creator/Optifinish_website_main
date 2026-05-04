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

export interface SeoMeta {
  metaTitle: string;
  metaDescription: string;
  slug: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  schemaJsonLd: string;
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

export interface BlogDraft {
  title: string;
  subtitle: string;
  bodyHtml: string;
  wordCount: number;
  imagePlacements: ImagePlacement[];
  seo?: SeoMeta;
  snapshot?: DossierSnapshot;
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
