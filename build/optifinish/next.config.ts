import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old WordPress routes → new equivalents
      { source: '/gallery',                     destination: '/our-work',          permanent: true },
      { source: '/gallery/:path*',              destination: '/our-work',          permanent: true },
      { source: '/shop',                        destination: '/products',          permanent: true },
      { source: '/shop/:path*',                 destination: '/products',          permanent: true },
      { source: '/product/:path*',              destination: '/products',          permanent: true },
      { source: '/services-2',                  destination: '/services',          permanent: true },
      { source: '/about-us',                    destination: '/about',             permanent: true },
      { source: '/contact-us',                  destination: '/contact',           permanent: true },
      { source: '/blog',                        destination: '/resources/blog',    permanent: true },
      { source: '/blog/:path*',                 destination: '/resources/blog',    permanent: true },
      { source: '/news',                        destination: '/resources/blog',    permanent: true },
      { source: '/home',                        destination: '/',                  permanent: true },

      // Old WordPress blog posts at root-level → new /resources/blog/[slug]
      { source: '/gema-powder-coating-gun-vs-local-powder-coating-guns',                     destination: '/resources/blog/gema-powder-coating-gun-vs-local-powder-coating-guns',                     permanent: true },
      { source: '/gema-powder-coating-gun-and-machines-the-ultimate-guide',                  destination: '/resources/blog/gema-powder-coating-gun-and-machines-the-ultimate-guide',                  permanent: true },
      { source: '/gema-powder-coating-gun',                                                   destination: '/resources/blog/gema-powder-coating-gun',                                                   permanent: true },
      { source: '/best-powder-coating-plant-manufacturer-in-india',                          destination: '/resources/blog/best-powder-coating-plant-manufacturer-in-india',                          permanent: true },
      { source: '/best-powder-coating-plant-in-india-with-the-latest-opticenter-all-in-one-oc11', destination: '/resources/blog/best-powder-coating-plant-in-india-with-the-latest-opticenter-all-in-one-oc11', permanent: true },
      { source: '/durr-ecodose-2k-3k-revolutionizing-precision-in-liquid-paint-application', destination: '/resources/blog/durr-ecodose-2k-3k-revolutionizing-precision-in-liquid-paint-application', permanent: true },
      { source: '/durr-ecogun-2100-aircombi-high-pressure-spray-gun-for-liquid-paint-application', destination: '/resources/blog/durr-ecogun-2100-aircombi-high-pressure-spray-gun-for-liquid-paint-application', permanent: true },
      { source: '/the-benefits-of-powder-coating-over-liquid-paint-coating',                 destination: '/resources/blog/the-benefits-of-powder-coating-over-liquid-paint-coating',                 permanent: true },
      { source: '/efficiency-of-automatic-powder-coating-machines',                          destination: '/resources/blog/efficiency-of-automatic-powder-coating-machines',                          permanent: true },
      { source: '/what-are-automatic-powder-coating-line-and-how-to-choose',                 destination: '/resources/blog/what-are-automatic-powder-coating-line-and-how-to-choose',                 permanent: true },
      { source: '/powder-coating-equipment-manufacturers',                                    destination: '/resources/blog/powder-coating-equipment-manufacturers',                                    permanent: true },
      { source: '/what-are-powder-coating-process-and-powder-coating-plant',                 destination: '/resources/blog/what-are-powder-coating-process-and-powder-coating-plant',                 permanent: true },
      { source: '/almirah-powder-coating-plant-and-almirah-powder-coating-machine',          destination: '/resources/blog/almirah-powder-coating-plant-and-almirah-powder-coating-machine',          permanent: true },
      { source: '/what-is-powder-coating-process-how-does-it-works-what-are-component-of-powder-coating-line', destination: '/resources/blog/what-is-powder-coating-process-how-does-it-works-what-are-component-of-powder-coating-line', permanent: true },
      { source: '/powder-coating-spray-booth-price-india',                                    destination: '/resources/blog/powder-coating-spray-booth-price-india',                                    permanent: true },
      { source: '/how-much-does-it-powder-coating-plant-setup-cost-in-india',                destination: '/resources/blog/how-much-does-it-powder-coating-plant-setup-cost-in-india',                permanent: true },
      { source: '/pollution-free-powder-coating-booth-zero-wastage-zero-pollution-max-efficiency', destination: '/resources/blog/pollution-free-powder-coating-booth-zero-wastage-zero-pollution-max-efficiency', permanent: true },
      { source: '/check-out-the-powder-coating-process',                                      destination: '/resources/blog/check-out-the-powder-coating-process',                                      permanent: true },
      { source: '/why-you-should-choose-optiflex-pro',                                        destination: '/resources/blog/why-you-should-choose-optiflex-pro',                                        permanent: true },
      { source: '/automatic-booth-systems',                                                    destination: '/resources/blog/automatic-booth-systems',                                                    permanent: true },
      { source: '/manual-equipment-and-guns',                                                  destination: '/resources/blog/manual-equipment-and-guns',                                                  permanent: true },
      { source: '/reciprocators-axis-and-automations',                                        destination: '/resources/blog/reciprocators-axis-and-automations',                                        permanent: true },
      { source: '/want-to-paint-different-colors-on-the-product-dont-worry-we-got-you-covered', destination: '/resources/blog/want-to-paint-different-colors-on-the-product-dont-worry-we-got-you-covered', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/api/portraits/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.durr.com',
        pathname: '/fileadmin/**',
      },
    ],
  },
};

export default nextConfig;
