import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import { serviceSchema, breadcrumbSchema, metadataBase, defaultOpenGraph, defaultTwitter, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'GEMA Spare Parts | OptiFinish Services',
  description:
    'Genuine OEM GEMA spare parts supply — wear parts, consumables, gun components, and complete assemblies for all current and legacy GEMA powder coating equipment models.',
  keywords: [
    'GEMA spare parts India',
    'GEMA powder coating gun parts India',
    'GEMA OEM parts supplier India',
    'GEMA consumables India',
    'OptiFinish GEMA spare parts',
    'GEMA gun wear parts India',
    'GEMA authorised spare parts dealer India',
  ],
  alternates: { canonical: `${SITE.url}/services/gema-spare-parts` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'GEMA Spare Parts | OptiFinish Services',
    description: 'Genuine OEM GEMA spare parts — wear parts, consumables, gun components and assemblies for all GEMA powder coating equipment models.',
    url: `${SITE.url}/services/gema-spare-parts`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'GEMA Spare Parts | OptiFinish India',
    description: 'Genuine OEM GEMA spare parts supply in India — wear parts, consumables, gun components for all GEMA models.',
  },
};

const serviceLD = serviceSchema({
  name: 'GEMA Spare Parts Supply',
  description: 'Genuine OEM GEMA spare parts supply — wear parts, consumables, gun components, and complete assemblies for all GEMA powder coating equipment models.',
  url: '/services/gema-spare-parts',
  serviceType: 'Industrial Equipment Spare Parts Supply',
});

const bcLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'GEMA Spare Parts', href: '/services/gema-spare-parts' },
]);

export default function GEMASparePartsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcLD) }} />
      <ServicePageTemplate
      breadcrumbLabel="GEMA Spare Parts"
      tag="Genuine Parts Supply"
      eyebrow="OptiFinish Services · Parts"
      headline="Keep your GEMA"
      headlineAccent="equipment running."
      subline="Authorised supply of genuine GEMA spare parts — from wear parts and consumables to complete gun assemblies — for all current and legacy GEMA powder coating equipment."
      heroStats={[
        { value: 'Genuine', label: 'OEM GEMA parts' },
        { value: 'All models', label: 'Covered' },
        { value: 'Authorised', label: 'GEMA partner' },
      ]}
      scopeItems={[
        'Powder hoses and hose connectors',
        'Nozzles, deflectors, and electrode assemblies',
        'Injector blocks and injector components',
        'Ground cables and earthing assemblies',
        'OptiFlex, OptiGun, OptiStar, and GM03E gun components',
        'OptiCenter powder management system consumables',
        'Control unit replacement boards and modules',
        'Complete gun assembly and handle replacement',
      ]}
      scopeHighlight={{
        title: 'Why genuine parts matter',
        desc: 'Non-genuine wear parts for GEMA guns affect first-charge efficiency, transfer efficiency, and film build consistency. Genuine parts maintain the performance standard the gun was designed to deliver.',
      }}
      steps={[
        {
          number: '01',
          title: 'Identify the Part',
          desc: 'Share your equipment model and the part you need. Use the part number from your GEMA documentation, or describe the component and we will identify it.',
        },
        {
          number: '02',
          title: 'Quote & Availability',
          desc: 'We confirm availability and provide a quote. Most common wear parts are in stock at our Greater Noida facility.',
        },
        {
          number: '03',
          title: 'Order Placement',
          desc: 'Place your order with confirmed part details and delivery address. Payment terms agreed at order stage.',
        },
        {
          number: '04',
          title: 'Dispatch & Delivery',
          desc: 'Parts are dispatched from Greater Noida. Same-day dispatch available for in-stock items ordered before 12 noon.',
        },
      ]}
      applications={[
        {
          title: 'Scheduled consumable replenishment',
          desc: 'Nozzles, deflectors, and hoses have defined service lives — plan your replenishment to avoid production stoppages.',
        },
        {
          title: 'Emergency breakdown parts',
          desc: 'When a gun fails mid-production, fast spare part access determines how quickly you recover.',
        },
        {
          title: 'Older GEMA equipment',
          desc: 'Legacy models are often still in service — we maintain access to parts for older gun generations.',
        },
        {
          title: 'Multi-gun installation management',
          desc: 'For operations running multiple GEMA guns, maintaining a buffer stock of key wear parts is best practice.',
        },
      ]}
      trustPoints={[
        {
          title: 'Authorised GEMA partner',
          desc: 'We supply genuine OEM parts — not copies, not equivalents. GEMA warranty and performance standards are maintained.',
        },
        {
          title: 'Stock of common wear parts',
          desc: 'Frequently replaced consumables are held in stock at our Greater Noida facility for fast dispatch.',
        },
        {
          title: 'Technical part identification',
          desc: 'If you are not sure what part you need, our team can identify the correct component from your equipment model and description.',
        },
        {
          title: 'Full equipment range coverage',
          desc: 'From current OptiFlex and OptiGun models to older GM series guns — we cover the installed base.',
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
          href: '/services/ttr',
          label: 'Trials, Testing & Review',
          tag: 'Trials',
          desc: 'Coating trials on sample parts at our Greater Noida facility with full process report.',
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
