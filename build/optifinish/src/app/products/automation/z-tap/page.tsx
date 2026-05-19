import type { Metadata } from 'next';
import { metadataBase, defaultOpenGraph, defaultTwitter, productSchema, breadcrumbSchema, faqSchema, howToSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'Z-TAP Powder Coating Automation Robot — Mimic Once, Perfect Every Time | OptiFinish',
  description:
    'Z-TAP is OptiFinish\'s proprietary powder coating automation robot. IMU motion capture technology records a skilled operator\'s spray pattern once, then replicates it with perfect consistency — reducing powder waste, labour costs, and reject rates.',
  keywords: [
    'Z-TAP powder coating robot',
    'powder coating automation robot India',
    'automatic powder coating system India',
    'IMU motion capture coating robot',
    'powder coating robot India',
    'coating automation robot manufacturer India',
    'OptiFinish Z-TAP',
    'proprietary coating automation',
    'Z-TAP robot system',
    'powder coating robot price India',
  ],
  alternates: { canonical: `${SITE.url}/products/automation/z-tap` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Z-TAP — Powder Coating Automation Robot | OptiFinish',
    description: 'Mimic once, perfect every time. Z-TAP uses IMU motion capture to replicate expert spray patterns with machine consistency. Proprietary OptiFinish technology.',
    url: `${SITE.url}/products/automation/z-tap`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'Z-TAP Powder Coating Robot | OptiFinish',
    description: 'Mimic once, perfect every time. Z-TAP — proprietary IMU-based powder coating automation robot by OptiFinish.',
  },
};

const productLD = productSchema({
  name: 'Z-TAP Coating Automation System',
  description: 'Proprietary powder coating automation robot by OptiFinish. IMU motion capture records a skilled operator\'s spray pattern once, then replicates it with machine precision — reducing powder waste, reject rates, and labour dependency.',
  url: '/products/automation/z-tap',
  category: 'Industrial Coating Automation',
  keywords: ['Z-TAP', 'powder coating robot', 'coating automation', 'IMU motion capture', 'automatic powder coating'],
});

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'OptiFinish Automation', href: '/products/automation' },
  { name: 'Z-TAP', href: '/products/automation/z-tap' },
]);

const faqLD = faqSchema([
  {
    q: 'What is the Z-TAP powder coating robot?',
    a: 'Z-TAP is a proprietary coating automation system developed by OptiFinish. It uses IMU (Inertial Measurement Unit) motion capture to record a skilled operator\'s spray pattern once, then replays it with machine-level consistency on every part — eliminating human variation in powder coating.',
  },
  {
    q: 'How does Z-TAP reduce powder coating costs?',
    a: 'Z-TAP reduces powder waste through optimised spray paths, lowers labour costs by automating the coating application, and reduces reject rates through consistent film build — resulting in measurable cost savings per production shift.',
  },
  {
    q: 'Is Z-TAP compatible with existing powder coating booths?',
    a: 'Yes. Z-TAP is designed to integrate with existing powder coating booths and is compatible with GEMA and other leading powder coating gun systems. Contact OptiFinish for a compatibility assessment.',
  },
]);

const howToLD = howToSchema({
  name: 'How to Automate Powder Coating with Z-TAP',
  description: 'Z-TAP uses IMU motion capture to record a skilled operator\'s spray pattern and replicate it with machine consistency — eliminating variation and reducing waste.',
  steps: [
    {
      name: 'Set up Z-TAP on your booth',
      text: 'Mount the Z-TAP system on your existing powder coating booth. Z-TAP is designed to integrate with standard booth configurations and is compatible with GEMA and leading gun systems.',
    },
    {
      name: 'Record the spray pattern with IMU motion capture',
      text: 'A skilled operator performs one live spray demonstration. The IMU sensors in Z-TAP capture the exact motion path, gun angle, speed, and distance — recording it as a digital spray programme.',
    },
    {
      name: 'Validate the recorded programme',
      text: 'Run a test cycle on a sample part to verify the captured spray path delivers the correct film build across all surfaces. Adjust parameters such as powder output and speed if required.',
    },
    {
      name: 'Deploy for production',
      text: 'Once validated, Z-TAP replays the recorded pattern on every part — automatically. Consistent film build, reduced powder waste, and no dependence on operator skill level for subsequent production shifts.',
    },
  ],
});

export default function ZTapPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLD) }} />
      <iframe
      src="http://localhost:4000"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        border: 'none',
        zIndex: 9999,
      }}
      title="Z-TAP Robot System"
    />
    </>
  );
}
