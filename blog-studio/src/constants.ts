import { Category, Audience, Stage } from './types';

export const BRAND = {
  name: 'OptiFinish Blog Studio',
  tagline: 'Industrial content engine',
  parent: 'Value Added Coating Solutions Pvt. Ltd.'
};

export const CATEGORIES: Category[] = [
  {
    id: 'product-spotlight',
    label: 'Product Spotlight',
    blurb: 'Deep look at a single product or system',
    examples: ['Z-TAP automation cell', 'GEMA OptiCenter', 'Curing oven series']
  },
  {
    id: 'technical-deep-dive',
    label: 'Technical Deep Dive',
    blurb: 'How and why a process or technology works',
    examples: ['Powder transfer efficiency', 'Cure window control', 'Pretreatment chemistry']
  },
  {
    id: 'case-study',
    label: 'Case Study / Installation',
    blurb: 'Real customer outcome with proof',
    examples: ['Auto OEM line upgrade', 'Architectural extrusion plant', 'Whitegoods retrofit']
  },
  {
    id: 'industry-trends',
    label: 'Industry Trends & News',
    blurb: 'What is shifting in coating + finishing',
    examples: ['Energy efficiency norms', 'Low-cure powders', 'Robotics adoption in MSME plants']
  },
  {
    id: 'how-to',
    label: 'How-To / Troubleshooting',
    blurb: 'Operator-grade problem solving',
    examples: ['Orange peel root causes', 'Fixing Faraday cage issues', 'Quick gun maintenance']
  },
  {
    id: 'facility-behind-scenes',
    label: 'Facility / Behind the Scenes',
    blurb: 'Greater Noida manufacturing & R&D credibility',
    examples: ['How a powder coating plant is tested', 'Inside the R&D booth', 'Build-to-spec workflow']
  },
  {
    id: 'buyers-guide',
    label: 'Buyer’s Guide / Comparison',
    blurb: 'Decision frameworks for prospects',
    examples: ['Manual vs automatic line', 'Batch oven vs conveyor', 'OEM vs partner-supplied guns']
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
