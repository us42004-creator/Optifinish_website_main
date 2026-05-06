import { Suspense } from 'react';
import HeroDark                  from '@/components/sections/home/HeroDark';
import ProprietaryAutomation     from '@/components/sections/home/ProprietaryAutomation';
import WhatWeOffer               from '@/components/sections/home/WhatWeOffer';
import HomeServices              from '@/components/sections/home/HomeServices';
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
      <HomeServices />
      {/* S5 — Light/warm */}
      <FacilityTeaserFilmstrip />
      {/* S6 — Dark */}
      <OurWorkPreview />
      {/* S7 — Light */}
      <ClientsTestimonials />
      {/* S8 — Dark */}
      <OurTeam />
      {/* S9 — Light */}
      <HomeCTA />
    </>
  );
}
