import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import { serviceSchema, breadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Plant AMC — Annual Maintenance Contract | OptiFinish Services',
  description:
    'Annual Maintenance Contracts for installed powder coating lines — scheduled preventive maintenance, 48-hour breakdown response, and full line coverage across India.',
};

const serviceLD = serviceSchema({
  name: 'Plant AMC — Annual Maintenance Contract',
  description: 'Annual Maintenance Contracts for installed powder coating lines — preventive maintenance, 48-hour breakdown response, and full line coverage across India.',
  url: '/services/plant-amc',
  serviceType: 'Powder Coating Plant Annual Maintenance',
});

const bcLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Plant AMC', href: '/services/plant-amc' },
]);

export default function PlantAMCPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcLD) }} />
      <ServicePageTemplate
      breadcrumbLabel="Plant AMC"
      tag="Annual Maintenance Contract"
      eyebrow="OptiFinish Services · After-Sales"
      headline="Scheduled care"
      headlineAccent="for your coating line."
      subline="Comprehensive Annual Maintenance Contracts for installed powder coating plants — covering every major component, every scheduled interval, all year round."
      heroStats={[
        { value: '4×', label: 'PM visits per year' },
        { value: '48hr', label: 'Breakdown response' },
        { value: '14+ Yrs', label: 'Maintenance experience' },
      ]}
      scopeItems={[
        'Scheduled preventive maintenance visits (quarterly)',
        'Full line inspection: booth, oven, conveyor, PT section',
        'Lubrication, calibration and cleaning of all components',
        'Electrical panel checks and safety assessments',
        'Spare parts replacement (consumables at actuals)',
        'Post-visit inspection reports and punch lists',
        'Priority breakdown response within 48 hours',
        'Access to OptiFinish technical team year-round',
      ]}
      scopeHighlight={{
        title: 'What an AMC protects',
        desc: 'Unplanned downtime costs far more than a maintenance contract. An OptiFinish AMC keeps your line running at rated throughput, catches problems before they become failures, and gives you a paper trail for audits and insurance.',
      }}
      steps={[
        {
          number: '01',
          title: 'Line Assessment',
          desc: 'We audit your current line condition, document all equipment specs, and agree on scope coverage before signing the contract.',
        },
        {
          number: '02',
          title: 'Contract Scoping',
          desc: 'AMC terms, visit schedule, response commitments, and consumable billing model are agreed and documented.',
        },
        {
          number: '03',
          title: 'Scheduled PM Visits',
          desc: 'Our technicians visit quarterly to carry out full preventive maintenance across all line sections.',
        },
        {
          number: '04',
          title: 'Reporting & Follow-up',
          desc: 'Each visit concludes with a written report, list of findings, and any recommended corrective actions.',
        },
      ]}
      applications={[
        {
          title: 'High-throughput production lines',
          desc: 'Plants running 2+ shifts need guaranteed uptime — an AMC gives you that commitment.',
        },
        {
          title: 'Limited in-house technical staff',
          desc: 'When your operators run the line but cannot diagnose equipment issues, OptiFinish fills the gap.',
        },
        {
          title: 'Lines past 2 years of operation',
          desc: 'Ageing equipment benefits most from structured preventive care to avoid cascading failure.',
        },
        {
          title: 'Audit-ready operations',
          desc: 'Companies with ISO or customer quality audits benefit from documented maintenance history.',
        },
      ]}
      trustPoints={[
        {
          title: 'We built your line',
          desc: 'For OptiFinish-manufactured plants, we know every component — no learning curve, no guesswork.',
        },
        {
          title: '14+ years of maintenance experience',
          desc: 'We have serviced every configuration from single-booth manual lines to multi-stage conveyorised plants.',
        },
        {
          title: 'Multi-brand capability',
          desc: 'AMC coverage extends to GEMA guns, Dürr liquid systems, and third-party equipment on mixed lines.',
        },
        {
          title: 'All-India service reach',
          desc: 'Our service team covers installations across India — not just Greater Noida.',
        },
      ]}
      relatedServices={[
        {
          href: '/services/testing-commissioning',
          label: 'Testing & Commissioning',
          tag: 'Commissioning',
          desc: 'Validation and handover of newly installed or modified coating lines.',
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
