import { Category, Audience, Stage } from './types';

export const BRAND = {
  name: 'OptiFinish Blog Studio',
  tagline: 'Industrial content engine',
  parent: 'Value Added Coating Solutions Pvt. Ltd.'
};

// 8 categories, ordered roughly by conversion priority for an early-stage
// content programme. Pillar Guide / Case Study / Facility ship first;
// Cost of Inaction and Comparison layer in once authority compounds.
export const CATEGORIES: Category[] = [
  {
    id: 'pillar-guide',
    label: 'Pillar Guide',
    blurb: 'Long-form authority anchor — one per product group',
    examples: [
      'The complete powder coating plant reference',
      'Curing oven buyer\'s bible',
      'Z-TAP automation: a 12,000-hour reference'
    ]
  },
  {
    id: 'case-study',
    label: 'Case Study / Installation',
    blurb: 'Real customer outcome with quantified proof',
    examples: [
      'Auto OEM line upgrade',
      'Architectural extrusion plant',
      'Whitegoods retrofit'
    ]
  },
  {
    id: 'comparison-decision',
    label: 'Comparison & Decision Frame',
    blurb: 'X vs Y, decision matrix, 5-year TCO',
    examples: [
      'Manual vs automatic line',
      'Batch oven vs conveyor',
      'GEMA vs Wagner vs Nordson guns'
    ]
  },
  {
    id: 'cost-of-inaction',
    label: 'Cost of Inaction',
    blurb: 'Loss-aversion frame on what status-quo costs',
    examples: [
      'What an unupgraded curing oven costs you per year',
      'The hidden P&L cost of manual coating',
      'Three signs your line is silently burning margin'
    ]
  },
  {
    id: 'facility-behind-scenes',
    label: 'Facility / Behind the Scenes',
    blurb: 'Greater Noida manufacturing & R&D credibility',
    examples: [
      'Inside the test bay',
      'How a powder coating plant is built to spec',
      'The Z-TAP commissioning floor'
    ]
  },
  {
    id: 'technical-deep-dive',
    label: 'Technical Deep Dive',
    blurb: 'Mechanism-level. Engineer-grade depth.',
    examples: [
      'Powder transfer efficiency',
      'Cure window control',
      'Pretreatment chemistry'
    ]
  },
  {
    id: 'how-to',
    label: 'How-To / Troubleshooting',
    blurb: 'Operator-grade defect diagnosis',
    examples: [
      'Orange peel root causes',
      'Faraday cage fixes',
      'Monsoon outgassing playbook'
    ]
  },
  {
    id: 'industry-trends',
    label: 'Industry Trends & News',
    blurb: 'Tied to a real dated trigger',
    examples: [
      'CBAM impact on Indian exporters',
      'BEE Jan-2026 mandate consequences',
      'GEMA OptiSpray launch breakdown'
    ]
  }
];

export const AUDIENCES: Audience[] = [
  {
    id: 'plant-manager',
    label: 'Plant Manager',
    role: 'Owns daily output and uptime',
    cares: 'Throughput, rejection rate, OEE, operator effort'
  },
  {
    id: 'procurement',
    label: 'Procurement Lead',
    role: 'Owns vendor selection and TCO',
    cares: 'Lifecycle cost, payback, warranty, after-sales SLA'
  },
  {
    id: 'oem-engineer',
    label: 'OEM Engineer',
    role: 'Specifies coating systems for end customers',
    cares: 'Spec compliance, integration, repeatability'
  },
  {
    id: 'rd-process',
    label: 'R&D / Process Engineer',
    role: 'Optimises finish quality and chemistry',
    cares: 'Cure profile, film build, adhesion, defect physics'
  },
  {
    id: 'c-level',
    label: 'C-Level / Decision Maker',
    role: 'Capex sign-off and strategy',
    cares: 'ROI, capacity expansion, brand-finish quality'
  },
  {
    id: 'existing-customer',
    label: 'Existing Customer',
    role: 'Already operates an OptiFinish system',
    cares: 'Upgrades, AMC value, productivity tips'
  },
  {
    id: 'architect-specifier',
    label: 'Architect / Facade Specifier',
    role: 'Specifies architectural coatings on aluminium extrusion',
    cares: 'Qualicoat Class 2, super-durables, 25-year warranty, non-chromate pretreatment'
  },
  {
    id: 'consulting-engineer',
    label: 'Consulting Engineer',
    role: 'External advisor recommending systems to plants',
    cares: 'Verifiable references, spec compliance, technical proofs, neutral comparisons'
  }
];

export const STAGES: { id: Stage; label: string; short: string }[] = [
  { id: 'category', label: 'Category', short: '01' },
  { id: 'audience', label: 'Audience', short: '02' },
  { id: 'topic', label: 'Topic Ideation', short: '03' },
  { id: 'draft', label: 'Draft', short: '04' },
  { id: 'seo', label: 'SEO Layer', short: '05' },
  { id: 'edit', label: 'Edit', short: '06' },
  { id: 'images', label: 'Images', short: '07' },
  { id: 'export', label: 'Export', short: '08' }
];
