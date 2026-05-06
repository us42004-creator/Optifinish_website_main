import type { Metadata } from 'next';
import AboutContent from '@/components/about/AboutContent';

export const metadata: Metadata = {
  title: 'About | OptiFinish — Value Added Coating Solutions Pvt. Ltd.',
  description:
    'VACSPL — the company behind OptiFinish. Founded in 1999 by two coating engineers, 500+ installations commissioned, Greater Noida manufacturing & R&D facility, authorised GEMA & Dürr partner.',
};

export default function AboutPage() {
  return <AboutContent />;
}
