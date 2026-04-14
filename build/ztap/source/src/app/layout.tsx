import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import PreloaderC from '@/components/ui/PreloaderC';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'OptiFinish — Zero-Touch Robotic Coating',
  description:
    'Mimic a coating motion once. OptiFinish records it, perfects it, and replicates it flawlessly, every time. Request early access.',
  keywords: ['robotic coating', 'motion mimic', 'zero touch automation', 'FR5 robot', 'industrial finishing'],
  openGraph: {
    title: 'OptiFinish — Zero-Touch Robotic Coating',
    description: 'One mimic. Infinite perfect replays.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        <PreloaderC />
        {children}
      </body>
    </html>
  );
}
