import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import { serviceSchema, breadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Trials, Testing & Review | OptiFinish Services',
  description:
    'Coating trials on sample parts at our Greater Noida facility — substrate testing, powder evaluation, colour matching, adhesion testing, and full written process reports.',
};

const serviceLD = serviceSchema({
  name: 'Coating Trials, Testing & Review',
  description: 'Coating trials on sample parts at our Greater Noida facility — substrate testing, powder evaluation, colour matching, adhesion testing, and full written process reports.',
  url: '/services/ttr',
  serviceType: 'Industrial Coating Trial and Testing',
});

const bcLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Trials, Testing & Review', href: '/services/ttr' },
]);

export default function TTRPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcLD) }} />
      <ServicePageTemplate
      breadcrumbLabel="Trials, Testing & Review"
      tag="Coating Trials Service"
      eyebrow="OptiFinish Services · Trials"
      headline="Test before you commit."
      headlineAccent="Validate before you scale."
      subline="Submit sample parts to our Greater Noida facility for powder coating trials — substrate testing, powder performance evaluation, colour matching, and process parameter development before you invest in a full line."
      heroStats={[
        { value: '5–7', label: 'Working days per trial' },
        { value: 'Greater Noida', label: 'Trial facility' },
        { value: 'Full report', label: 'With every trial' },
      ]}
      scopeItems={[
        'Powder coating trial on customer-submitted sample parts',
        'Substrate compatibility testing (steel, aluminium, galvanised, pre-treated)',
        'Powder selection and supplier comparison trials',
        'Colour match trials for critical shade accuracy',
        'Process parameter development (cure profile, film build)',
        'Adhesion testing — cross-hatch, pull-off, bend test',
        'Salt spray or humidity cabinet testing (if required)',
        'Full written trial report with process parameters and photos',
      ]}
      scopeHighlight={{
        title: 'Why trial before you invest',
        desc: 'Discovering that your substrate is difficult, your powder is incompatible, or your colour is hard to match during commissioning of a new line costs time and money. A pre-investment trial removes that uncertainty.',
      }}
      steps={[
        {
          number: '01',
          title: 'Sample Submission',
          desc: 'Send us representative parts and your coating specification: colour, gloss level, film build requirement, and any performance standard.',
        },
        {
          number: '02',
          title: 'Trial Execution',
          desc: 'We pre-treat, coat, and cure your parts at our Greater Noida facility using GEMA equipment and appropriate powders.',
        },
        {
          number: '03',
          title: 'Performance Testing',
          desc: 'Coated samples are tested for adhesion, gloss, film build, and any customer-specified performance criteria.',
        },
        {
          number: '04',
          title: 'Report Delivery',
          desc: 'You receive a written trial report with all process parameters, test results, photos, and our recommendations.',
        },
      ]}
      applications={[
        {
          title: 'Before buying a new line',
          desc: 'Validate your coating requirements at scale before committing to capital expenditure on a new plant.',
        },
        {
          title: 'New substrate qualification',
          desc: 'Testing a new material, alloy, or surface treatment before it enters production.',
        },
        {
          title: 'Powder supplier changes',
          desc: 'Evaluating a new powder brand or product range for compatibility with your line and quality standards.',
        },
        {
          title: 'Colour-critical applications',
          desc: 'RAL matching, brand colours, and effect finishes that require process validation before production.',
        },
      ]}
      trustPoints={[
        {
          title: 'GEMA-equipped trial facility',
          desc: 'Our Greater Noida facility uses GEMA guns, OptiFinish ovens, and a full pretreatment line — the same setup we sell.',
        },
        {
          title: 'Process expertise',
          desc: 'Our team has coated thousands of part types. We know how to get a representative result from a trial.',
        },
        {
          title: 'Objective reporting',
          desc: 'Trial reports document what we did and what we got — not what you hoped for. That is the point.',
        },
        {
          title: 'Actionable recommendations',
          desc: 'The report includes what line parameters, powder choices, and pretreatment steps would work in your production.',
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
