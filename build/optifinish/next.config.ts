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
