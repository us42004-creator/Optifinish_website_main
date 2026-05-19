import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Sandbox | OptiFinish',
};

export default function SandboxLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
