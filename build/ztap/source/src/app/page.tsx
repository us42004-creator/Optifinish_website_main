import dynamic from 'next/dynamic';
import SmoothScroll from '@/components/ui/SmoothScroll';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import ScrollGrid from '@/components/ui/ScrollGrid';
import InteractiveCursor from '@/components/ui/InteractiveCursor';
import MobileGyroMagnetic from '@/components/ui/MobileGyroMagnetic';
import Hero from '@/components/sections/Hero';

// Below-fold sections — lazy loaded for faster initial page load
const HmiTabletShowcase = dynamic(() => import('@/components/sections/HmiTabletShowcase'));
const LiveDemo          = dynamic(() => import('@/components/sections/LiveDemo'));
const ZeroTouch         = dynamic(() => import('@/components/sections/ZeroTouch'));
const VisionLayer       = dynamic(() => import('@/components/sections/VisionLayer'));
const EndToEnd          = dynamic(() => import('@/components/sections/EndToEnd'));
const LineImpact        = dynamic(() => import('@/components/sections/LineImpact'));
const Capabilities      = dynamic(() => import('@/components/sections/Capabilities'));
const Waitlist          = dynamic(() => import('@/components/sections/Waitlist'));

export default function Home() {
  return (
    <SmoothScroll>
      <InteractiveCursor />
      <MobileGyroMagnetic />
      <ScrollGrid />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <HmiTabletShowcase />
        <LiveDemo />
        <ZeroTouch />
        <VisionLayer />
        <EndToEnd />
        <LineImpact />
        <Capabilities />
        <Waitlist />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
