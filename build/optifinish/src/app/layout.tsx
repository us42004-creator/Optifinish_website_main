import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

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
  title: 'OptiFinish — Industrial Coating Solutions',
  description:
    'Value Added Coating Solutions Pvt. Ltd. Manufacturer of powder coating plants, proprietary automation systems, and authorised distributor of GEMA and DURR coating equipment.',
  keywords: ['powder coating', 'coating plant', 'GEMA', 'DURR', 'industrial coating', 'Z-TAP', 'coating automation', 'OptiFinish'],
  openGraph: {
    title: 'OptiFinish — Industrial Coating Solutions',
    description: 'Manufactured systems. Proprietary automation. Authorised partner products.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
