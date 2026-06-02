import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import { serviceSchema, breadcrumbSchema, metadataBase, defaultOpenGraph, defaultTwitter, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'Troubleshooting & Support | OptiFinish Services',
  description:
    'Remote and on-site coating line troubleshooting — defect diagnosis, equipment fault-finding, root cause analysis, and corrective recommendations across all makes and models.',
  keywords: [
    'powder coating troubleshooting India',
    'coating line fault diagnosis',
    'coating defect analysis India',
    'powder coating support service India',
    'OptiFinish troubleshooting',
    'coating equipment repair India',
  ],
  alternates: { canonical: `${SITE.url}/services/troubleshooting-support` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Troubleshooting & Support | OptiFinish Services',
    description: 'Remote and on-site coating line troubleshooting — defect diagnosis, fault-finding, root cause analysis across all makes and models.',
    url: `${SITE.url}/services/troubleshooting-support`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'Troubleshooting & Support | OptiFinish',
    description: 'Coating line troubleshooting — remote and on-site defect diagnosis, fault-finding, and corrective recommendations.',
  },
};

const serviceLD = serviceSchema({
  name: 'Coating Line Troubleshooting & Support',
  description: 'Remote and on-site coating line troubleshooting — defect diagnosis, equipment fault-finding, root cause analysis, and corrective recommendations.',
  url: '/services/troubleshooting-support',
  serviceType: 'Industrial Equipment Troubleshooting',
});

const bcLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Troubleshooting & Support', href: '/services/troubleshooting-support' },
]);

export default function TroubleshootingSupportPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcLD) }} />
      <ServicePageTemplate
      breadcrumbLabel="Troubleshooting & Support"
      tag="On-site & Remote Support"
      eyebrow="OptiFinish Services · Technical Support"
      headline="Expert help"
      headlineAccent="when your line needs it."
      subline="When coating defects appear, equipment fails, or output quality drops, OptiFinish provides rapid technical diagnosis — remotely or on-site across India."
      heroStats={[
        { value: 'Remote', label: 'And on-site support' },
        { value: 'All makes', label: 'Equipment covered' },
        { value: '14+ Yrs', label: 'Diagnostic experience' },
      ]}
      scopeItems={[
        'Coating defect diagnosis (fish eyes, orange peel, poor adhesion, colour shift)',
        'Equipment fault diagnosis for booths, ovens, conveyors, and PT lines',
        'GEMA gun and control unit fault diagnosis',
        'Process parameter review and correction',
        'Root cause analysis and written recommendations',
        'Remote phone and video consultation',
        'On-site engineer visit for complex or persistent issues',
        'Follow-up verification after corrective action',
      ]}
      scopeHighlight={{
        title: 'Process vs equipment faults',
        desc: 'Most coating defects have either a process cause or an equipment cause — and the fix is different for each. OptiFinish troubleshooting diagnoses both, so you get the right answer, not a repeat visit.',
      }}
      steps={[
        {
          number: '01',
          title: 'Issue Logging',
          desc: 'Describe the defect or failure. Attach photos or video. Our team reviews and responds with an initial assessment within the same working day.',
        },
        {
          number: '02',
          title: 'Remote Diagnosis',
          desc: 'We work through process parameters, recent changes, and equipment behaviour via call or video — resolving the majority of issues without a site visit.',
        },
        {
          number: '03',
          title: 'On-site Visit',
          desc: 'If remote diagnosis cannot resolve the issue, we dispatch a technician to site for hands-on diagnosis and repair.',
        },
        {
          number: '04',
          title: 'Resolution & Report',
          desc: 'We document the root cause, corrective action taken, and any preventive recommendations to avoid recurrence.',
        },
      ]}
      applications={[
        {
          title: 'Sudden coating defects',
          desc: 'When coatings that were working suddenly show fish eyes, poor adhesion, or colour inconsistency.',
        },
        {
          title: 'Equipment breakdowns',
          desc: 'Oven failures, conveyor stoppages, booth suction issues, gun performance drops.',
        },
        {
          title: 'New powder or substrate problems',
          desc: 'When a change in powder supplier or substrate material creates unexpected coating behaviour.',
        },
        {
          title: 'Production quality drops',
          desc: 'When rejection rates increase and the cause is not obvious to the production team.',
        },
      ]}
      trustPoints={[
        {
          title: 'Process and equipment expertise',
          desc: 'We diagnose both sides — the coating process and the mechanical equipment. Most service teams can only do one.',
        },
        {
          title: 'GEMA-authorised diagnosis',
          desc: 'As an authorised GEMA partner, we diagnose and resolve GEMA gun and control unit issues at OEM level.',
        },
        {
          title: 'No-fault assumption',
          desc: 'We start from what the data tells us, not what is easiest to say. Our reports state the real root cause.',
        },
        {
          title: 'All-India reach',
          desc: 'Remote support for all customers, on-site visits across India — no geographic restriction.',
        },
      ]}
      relatedServices={[
        {
          href: '/services/plant-amc',
          label: 'Plant AMC',
          tag: 'Maintenance',
          desc: 'Scheduled annual maintenance contracts.',
        },
        {
          href: '/services/testing-commissioning',
          label: 'Testing & Commissioning',
          tag: 'Commissioning',
          desc: 'Validation and handover of newly installed or modified coating lines.',
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
