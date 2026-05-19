import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import { serviceSchema, breadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Upgrades & Retrofits | OptiFinish Services',
  description:
    'Extend the life and capability of your existing coating line — automation integration, GEMA gun upgrades, oven modernisation, and conveyor retrofits with minimal production downtime.',
};

const serviceLD = serviceSchema({
  name: 'Coating Line Upgrades & Retrofits',
  description: 'Extend the life and capability of your existing coating line — automation integration, GEMA gun upgrades, oven modernisation, and conveyor retrofits.',
  url: '/services/upgrades-retrofits',
  serviceType: 'Industrial Equipment Upgrade and Retrofit',
});

const bcLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Upgrades & Retrofits', href: '/services/upgrades-retrofits' },
]);

export default function UpgradesRetrofitsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcLD) }} />
      <ServicePageTemplate
      breadcrumbLabel="Upgrades & Retrofits"
      tag="Line Modernisation"
      eyebrow="OptiFinish Services · Upgrades"
      headline="Upgrade what you have."
      headlineAccent="Don't replace what works."
      subline="Extend the life and capability of your existing coating line with targeted upgrades — from automation add-ons and gun system replacements to oven modernisation and control panel retrofits."
      heroStats={[
        { value: 'No', label: 'Full line replacement needed' },
        { value: 'Minimal', label: 'Production downtime' },
        { value: 'All lines', label: 'Brands covered' },
      ]}
      scopeItems={[
        'GEMA automatic gun system integration into existing booths',
        'Z-TAP robotic system retrofit for manual line automation',
        'ZA01 reciprocator installation into existing line layout',
        'Curing oven heating element and burner upgrades',
        'Conveyor drive and speed control modernisation',
        'Electrical panel upgrades to current standards',
        'PT line tank lining and pump replacement',
        'Powder recovery system efficiency improvements',
      ]}
      scopeHighlight={{
        title: 'Upgrade vs replace',
        desc: 'Replacing a full line costs 10–30x more than a targeted upgrade. Most coating lines have a 15–20 year mechanical life with proper upgrades. We assess what to keep, what to improve, and what ROI each change delivers.',
      }}
      steps={[
        {
          number: '01',
          title: 'Line Audit',
          desc: 'We assess your current line: age, condition, bottlenecks, and automation gaps. We document what is working and what is limiting you.',
        },
        {
          number: '02',
          title: 'Upgrade Proposal',
          desc: 'We present a prioritised list of upgrades with scope, cost, downtime estimate, and expected throughput or quality improvement for each.',
        },
        {
          number: '03',
          title: 'Scope Sign-off',
          desc: 'You select the upgrades that fit your budget and production calendar. We plan installation around your shutdown windows.',
        },
        {
          number: '04',
          title: 'Installation & Commissioning',
          desc: 'Our team installs the upgraded components and validates performance before handing back to production.',
        },
      ]}
      applications={[
        {
          title: 'Manual lines moving to automation',
          desc: 'Adding Z-TAP or ZA01 to an existing booth converts manual application to consistent, documented automated coating.',
        },
        {
          title: 'Lines with ageing equipment',
          desc: '5–10 year old lines typically have components that can be economically upgraded to restore original throughput.',
        },
        {
          title: 'Capacity expansion',
          desc: 'When you need more output but cannot justify a new line, a targeted conveyor or oven upgrade may give you 30–50% more capacity.',
        },
        {
          title: 'Quality improvement projects',
          desc: 'Switching from manual to GEMA automatic guns reduces variation and improves first-pass yield significantly.',
        },
      ]}
      trustPoints={[
        {
          title: 'We know what we are working into',
          desc: 'Having installed and commissioned hundreds of lines, we know where upgrade problems typically occur — and how to avoid them.',
        },
        {
          title: 'GEMA and automation integration',
          desc: 'We are authorised to supply and integrate GEMA automatic guns and our own Z-TAP and ZA01 systems into any line.',
        },
        {
          title: 'Minimal production impact',
          desc: 'We plan upgrades around your shutdown schedule and work fast to minimise line downtime.',
        },
        {
          title: 'Post-upgrade commissioning',
          desc: 'Every upgrade includes commissioning validation — we do not hand over until the line is producing to spec.',
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
          href: '/services/troubleshooting-support',
          label: 'Troubleshooting & Support',
          tag: 'Support',
          desc: 'Remote and on-site diagnosis for coating defects and equipment faults.',
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
