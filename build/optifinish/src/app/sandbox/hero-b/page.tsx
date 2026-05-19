import type { Metadata } from 'next';
import HeroDark from '@/components/sections/home/HeroDark';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function HeroBSandbox() {
  return <HeroDark />;
}
