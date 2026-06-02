import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import { serviceSchema, breadcrumbSchema, metadataBase, defaultOpenGraph, defaultTwitter, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'Testing & Commissioning | OptiFinish Services',
  description:
    'Commissioning service for newly installed powder coating lines — site readiness inspection, full system validation, trial production run, and operator handover with documentation.',
  keywords: [
    'powder coating line commissioning India',
    'coating plant testing commissioning',
    'coating line installation validation',
    'powder coating startup service India',
    'OptiFinish commissioning',
    'coating equipment startup India',
  ],
  alternates: { canonical: `${SITE.url}/services/testing-commissioning` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Testing & Commissioning | OptiFinish Services',
    description: 'Commissioning service for powder coating lines — site readiness, full system validation, trial production run, and operator handover.',
    url: `${SITE.url}/services/testing-commissioning`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'Testing & Commissioning | OptiFinish',
    description: 'Powder coating line commissioning — site readiness, system validation, trial run, and operator handover documentation.',
  },
};

const serviceLD = serviceSchema({
  name: 'Testing & Commissioning',
  description: 'Commissioning service for newly installed powder coating lines — site readiness inspection, full system validation, trial production run, and operator handover.',
  url: '/services/testing-commissioning',
  serviceType: 'Industrial Plant Commissioning',
});

const bcLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Testing & Commissioning', href: '/services/testing-commissioning' },
]);

export default function TestingCommissioningPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcLD) }} />
      <ServicePageTemplate
      breadcrumbLabel="Testing & Commissioning"
      tag="Commissioning Service"
      eyebrow="OptiFinish Services · Installation"
      headline="From first build"
      headlineAccent="to first production run."
      subline="Our commissioning service takes your newly installed line from mechanical completion to fully validated, documented, and operator-ready production."
      heroStats={[
        { value: 'Turnkey', label: 'Handover process' },
        { value: '100%', label: 'Trial-run validated' },
        { value: 'Included', label: 'Operator training' },
      ]}
      scopeItems={[
        'Pre-commissioning site readiness inspection',
        'Mechanical and electrical check of all equipment',
        'Conveyor speed and tension calibration',
        'Oven temperature profiling and uniformity verification',
        'Booth airflow and recovery system commissioning',
        'PT line concentration and temperature validation',
        'Trial production run with customer parts',
        'Parameter documentation and operator handover pack',
      ]}
      scopeHighlight={{
        title: 'Why commissioning matters',
        desc: 'A line that passes installation inspection is not the same as a line that produces good coatings. OptiFinish commissioning bridges that gap — validating settings, catching alignment issues, and leaving operators with documented parameters before we leave.',
      }}
      steps={[
        {
          number: '01',
          title: 'Site Readiness Check',
          desc: 'We inspect the installation — utility connections, safety provisions, and equipment mounting — before energising anything.',
        },
        {
          number: '02',
          title: 'System Commissioning',
          desc: 'Each line section is commissioned in sequence: PT line, conveyor, booth, oven, guns, and control systems.',
        },
        {
          number: '03',
          title: 'Trial Production Run',
          desc: 'We coat actual customer parts and verify results against the agreed coating specification.',
        },
        {
          number: '04',
          title: 'Handover & Documentation',
          desc: 'All parameters are documented. Operators are walked through the startup, shutdown, and changeover procedures.',
        },
      ]}
      applications={[
        {
          title: 'Newly installed OptiFinish plants',
          desc: 'All OptiFinish-manufactured plant installations include commissioning as a standard part of project delivery.',
        },
        {
          title: 'New line integrations',
          desc: 'When a new oven, booth or conveyor is added to an existing line, commissioning ensures compatibility.',
        },
        {
          title: 'Post-modification validation',
          desc: 'After any significant line modification, commissioning re-validates the full line performance.',
        },
        {
          title: 'Third-party line audits',
          desc: 'Existing lines can be commissioning-audited to document current performance and identify gaps.',
        },
      ]}
      trustPoints={[
        {
          title: 'Manufacturer knowledge',
          desc: 'We know OptiFinish equipment at design level — faster commissioning, fewer surprises.',
        },
        {
          title: 'Process-led approach',
          desc: 'We validate to coating outcome, not just equipment on/off. Parameters are set to produce good parts.',
        },
        {
          title: 'Full documentation',
          desc: 'You receive signed commissioning records, parameter sheets, and operator instruction documents.',
        },
        {
          title: 'Training included',
          desc: 'We train your operators on-site as part of the commissioning process — not as an optional extra.',
        },
      ]}
      relatedServices={[
        {
          href: '/services/plant-amc',
          label: 'Plant AMC',
          tag: 'Maintenance',
          desc: 'Scheduled annual maintenance contracts for installed coating lines.',
        },
        {
          href: '/services/troubleshooting-support',
          label: 'Troubleshooting & Support',
          tag: 'Support',
          desc: 'Remote and on-site diagnosis for coating defects and equipment faults.',
        },
        {
          href: '/services/upgrades-retrofits',
          label: 'Upgrades & Retrofits',
          tag: 'Upgrades',
          desc: 'Targeted line upgrades to add automation, improve throughput, or extend equipment life.',
        },
        {
          href: '/services/ttr',
          label: 'Trials, Testing & Review',
          tag: 'Trials',
          desc: 'Coating trials on sample parts at our Greater Noida facility with full process report.',
        },
        {
          href: '/services/gema-spare-parts',
          label: 'GEMA Spare Parts',
          tag: 'Parts Supply',
          desc: 'Genuine OEM spare parts for all GEMA powder coating equipment models.',
        },
        {
          href: '/services/dcp-server-based-maintenance',
          label: 'DCP Server Maintenance',
          tag: 'Coming Soon',
          desc: 'Remote diagnostics and server-based predictive maintenance for connected lines.',
        },
      ]}
    />
    </>
  );
}
