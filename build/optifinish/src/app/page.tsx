import type { Metadata } from 'next';
import { Suspense } from 'react';
import {
  SITE,
  defaultOpenGraph,
  defaultTwitter,
  defaultKeywords,
  breadcrumbSchema,
  faqSchema,
  metadataBase,
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
} from '@/lib/seo';
import HeroDark                  from '@/components/sections/home/HeroDark';
import ProprietaryAutomation     from '@/components/sections/home/ProprietaryAutomation';
import WhatWeOffer               from '@/components/sections/home/WhatWeOffer';
import HomeServices              from '@/components/sections/home/HomeServices';
import GlobalNarrative           from '@/components/sections/home/GlobalNarrative';
import FacilityTeaserFilmstrip   from '@/components/sections/home/FacilityTeaserFilmstrip';
import OurTeam               from '@/components/sections/home/OurTeam';
import ClientsTestimonials   from '@/components/sections/home/ClientsTestimonials';
import OurWorkPreview        from '@/components/sections/home/OurWorkPreview';
import HomeCTA               from '@/components/sections/home/HomeCTA';

export const metadata: Metadata = {
  metadataBase,
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  keywords: defaultKeywords,
  alternates: { canonical: SITE.url },
  openGraph: {
    ...defaultOpenGraph,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    ...defaultTwitter,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
};

const homeFaqs = faqSchema([
  {
    q: 'What does OptiFinish manufacture?',
    a: 'OptiFinish (Value Added Coating Solutions Pvt. Ltd.) manufactures powder coating plants, curing ovens, powder spray booths, liquid spray booths, SS booth systems, cyclone dust collectors, PT lines, and wood finish ovens at its Greater Noida facility.',
  },
  {
    q: 'Is OptiFinish an authorised GEMA distributor in India?',
    a: 'Yes. OptiFinish is an authorised partner and distributor for GEMA powder coating equipment in India, supplying manual guns, automatic guns, OptiCentre powder management systems, reciprocators, and PP booths.',
  },
  {
    q: 'Does OptiFinish supply DÜRR liquid coating systems?',
    a: 'Yes. OptiFinish is an authorised DÜRR partner in India, supplying HVLP guns, airless guns, air-assist guns, electrostatic guns, bell atomisers, EcoPump units, and EcoDose 2K/3K dosing systems.',
  },
  {
    q: 'What is the Z-TAP coating automation system?',
    a: 'Z-TAP is a proprietary powder coating automation robot developed by OptiFinish. It integrates automatic gun movement, powder management, and process control to deliver consistent coating quality while reducing powder waste and labour costs.',
  },
  {
    q: 'Where is OptiFinish located?',
    a: 'OptiFinish is located at K-288, Q-21 (GF & FF), SITE-V, Surajpur Industrial Area, Greater Noida, Uttar Pradesh — 201306, India.',
  },
  {
    q: 'How can I get a quote for a powder coating plant?',
    a: 'You can contact OptiFinish directly at +91-96434-03374 or info@optifinish.in, or submit an enquiry through the contact form on optifinish.in/contact.',
  },
]);

const homeBC = breadcrumbSchema([{ name: 'Home', href: '/' }]);

export default function Home() {
  return (
    <>
      {/* Homepage JSON-LD: Organization, LocalBusiness, WebSite, FAQ, Breadcrumb */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBC) }} />

      {/* S1 — Dark */}
      <HeroDark />
      {/* S2 — Light */}
      <ProprietaryAutomation />
      {/* S3 — Dark */}
      <div id="products-section">
        <Suspense fallback={null}>
          <WhatWeOffer />
        </Suspense>
      </div>
      {/* S4 — Light/warm */}
      <FacilityTeaserFilmstrip />
      {/* S4b — Dark slim — Global multinational narrative */}
      <GlobalNarrative />
      {/* S5 — Light */}
      <HomeServices />
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
