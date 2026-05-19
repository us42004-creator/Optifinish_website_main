import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'OptiFinish — Coating Automation',
    short_name: 'OptiFinish',
    description: 'OptiFinish (Value Added Coating Solutions Pvt. Ltd.) — powder coating plants, curing ovens, spray booths, and industrial coating automation systems.',
    start_url: '/',
    display: 'standalone',
    background_color: '#070809',
    theme_color: '#FECE00',
    icons: [
      {
        src: '/images/logos/optifinish-logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/logos/optifinish-logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['business', 'productivity'],
    lang: 'en-IN',
    dir: 'ltr',
  };
}
