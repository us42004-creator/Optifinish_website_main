import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Wireframe | OptiFinish',
};

export default function WireframeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
