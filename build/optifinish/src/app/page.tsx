import Hero               from '@/components/sections/home/Hero';
import PortfolioMap       from '@/components/sections/home/PortfolioMap';
import AutomationHighlight from '@/components/sections/home/AutomationHighlight';
import FacilityTeaser     from '@/components/sections/home/FacilityTeaser';
import PartnersBar        from '@/components/sections/home/PartnersBar';
import HomeCTA            from '@/components/sections/home/HomeCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <PortfolioMap />
      <AutomationHighlight />
      <FacilityTeaser />
      <PartnersBar />
      <HomeCTA />
    </>
  );
}
