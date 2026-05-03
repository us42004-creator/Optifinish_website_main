import { Suspense } from 'react';
import HeroDark                  from '@/components/sections/home/HeroDark';
import ProprietaryAutomation     from '@/components/sections/home/ProprietaryAutomation';
import WhatWeOffer               from '@/components/sections/home/WhatWeOffer';
import FacilityTeaserFilmstrip   from '@/components/sections/home/FacilityTeaserFilmstrip';
import OurTeam               from '@/components/sections/home/OurTeam';
import ClientsTestimonials   from '@/components/sections/home/ClientsTestimonials';
import OurWorkPreview        from '@/components/sections/home/OurWorkPreview';
import HomeCTA               from '@/components/sections/home/HomeCTA';

export default function Home() {
  return (
    <>
      {/* S1 — Dark */}
      <HeroDark />
      {/* S2 — Light */}
      <ProprietaryAutomation />
      {/* S3 — Dark */}
      <Suspense fallback={null}>
        <WhatWeOffer />
      </Suspense>
      {/* S4 — Light */}
      <FacilityTeaserFilmstrip />
      {/* S5 — Dark */}
      <OurWorkPreview />
      {/* S6 — Light */}
      <ClientsTestimonials />
      {/* S7 — Dark */}
      <OurTeam />
      {/* S8 — Light */}
      <HomeCTA />
    </>
  );
}
