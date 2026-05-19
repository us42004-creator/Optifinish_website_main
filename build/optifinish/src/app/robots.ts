import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/sandbox/', '/wireframe/', '/studio/', '/api/'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/sandbox/', '/wireframe/', '/studio/', '/api/'],
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/sandbox/', '/wireframe/', '/studio/', '/api/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'Meta-ExternalAgent',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
    ],
    sitemap: 'https://optifinish.in/sitemap.xml',
    host: 'https://optifinish.in',
  };
}
