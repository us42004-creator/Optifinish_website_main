import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE = 'https://optifinish.in';

const STATIC_ROUTES: { url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { url: '/',                                                         priority: 1.0,  changeFrequency: 'weekly'  },
  { url: '/products',                                                 priority: 0.95, changeFrequency: 'weekly'  },
  { url: '/products/optifinish-manufactured',                         priority: 0.90, changeFrequency: 'monthly' },
  { url: '/products/optifinish-manufactured/powder-coating-plant',    priority: 0.88, changeFrequency: 'monthly' },
  { url: '/products/optifinish-manufactured/curing-oven',             priority: 0.85, changeFrequency: 'monthly' },
  { url: '/products/optifinish-manufactured/powder-spray-booth',      priority: 0.82, changeFrequency: 'monthly' },
  { url: '/products/optifinish-manufactured/ss-booth-system',         priority: 0.80, changeFrequency: 'monthly' },
  { url: '/products/optifinish-manufactured/liquid-spray-booth',      priority: 0.78, changeFrequency: 'monthly' },
  { url: '/products/optifinish-manufactured/cyclone-dust-collector',  priority: 0.75, changeFrequency: 'monthly' },
  { url: '/products/optifinish-manufactured/pt-line',                 priority: 0.75, changeFrequency: 'monthly' },
  { url: '/products/optifinish-manufactured/wood-finish-oven',        priority: 0.72, changeFrequency: 'monthly' },
  { url: '/products/automation',                                       priority: 0.90, changeFrequency: 'monthly' },
  { url: '/products/automation/z-tap',                                priority: 0.88, changeFrequency: 'monthly' },
  { url: '/products/automation/za01',                                  priority: 0.85, changeFrequency: 'monthly' },
  { url: '/products/automation/sieve-machine',                        priority: 0.78, changeFrequency: 'monthly' },
  { url: '/products/automation/auto-spray-optimisation',              priority: 0.75, changeFrequency: 'monthly' },
  { url: '/products/gema',                                            priority: 0.90, changeFrequency: 'monthly' },
  { url: '/products/gema/manual-gun',                                 priority: 0.88, changeFrequency: 'monthly' },
  { url: '/products/gema/automatic-gun',                              priority: 0.88, changeFrequency: 'monthly' },
  { url: '/products/gema/reciprocators',                              priority: 0.85, changeFrequency: 'monthly' },
  { url: '/products/gema/opticentre',                                 priority: 0.82, changeFrequency: 'monthly' },
  { url: '/products/gema/plastic-pp-booth',                           priority: 0.78, changeFrequency: 'monthly' },
  { url: '/products/durr',                                            priority: 0.88, changeFrequency: 'monthly' },
  { url: '/products/durr/hvlp-gun',                                   priority: 0.80, changeFrequency: 'monthly' },
  { url: '/products/durr/airless-gun',                                priority: 0.78, changeFrequency: 'monthly' },
  { url: '/products/durr/air-assist-gun',                             priority: 0.75, changeFrequency: 'monthly' },
  { url: '/products/durr/electrostatic-gun',                          priority: 0.75, changeFrequency: 'monthly' },
  { url: '/products/durr/bell-atomiser',                              priority: 0.72, changeFrequency: 'monthly' },
  { url: '/products/durr/ecopump',                                    priority: 0.72, changeFrequency: 'monthly' },
  { url: '/products/durr/ecodose-2k',                                 priority: 0.70, changeFrequency: 'monthly' },
  { url: '/products/durr/ecodose-3k',                                 priority: 0.70, changeFrequency: 'monthly' },
  { url: '/products/durr/cup-gun',                                    priority: 0.70, changeFrequency: 'monthly' },
  { url: '/products/vinayak',                                         priority: 0.82, changeFrequency: 'monthly' },
  { url: '/products/vinayak/powder-paints',                           priority: 0.78, changeFrequency: 'monthly' },
  { url: '/products/vinayak/touchup-paints',                          priority: 0.72, changeFrequency: 'monthly' },
  { url: '/products/vinayak/liquid-paint',                            priority: 0.70, changeFrequency: 'monthly' },
  { url: '/products/vinayak/pu-enamel',                               priority: 0.68, changeFrequency: 'monthly' },
  { url: '/products/vinayak/adhesives',                               priority: 0.65, changeFrequency: 'monthly' },
  { url: '/services',                                                  priority: 0.88, changeFrequency: 'monthly' },
  { url: '/services/plant-amc',                                        priority: 0.82, changeFrequency: 'monthly' },
  { url: '/services/testing-commissioning',                            priority: 0.80, changeFrequency: 'monthly' },
  { url: '/services/gema-spare-parts',                                 priority: 0.78, changeFrequency: 'monthly' },
  { url: '/services/troubleshooting-support',                          priority: 0.75, changeFrequency: 'monthly' },
  { url: '/services/upgrades-retrofits',                               priority: 0.72, changeFrequency: 'monthly' },
  { url: '/services/ttr',                                              priority: 0.70, changeFrequency: 'monthly' },
  { url: '/services/dcp-server-based-maintenance',                     priority: 0.68, changeFrequency: 'monthly' },
  { url: '/facility',                                                  priority: 0.80, changeFrequency: 'monthly' },
  { url: '/about',                                                     priority: 0.78, changeFrequency: 'monthly' },
  { url: '/resources/blog',                                            priority: 0.75, changeFrequency: 'weekly'  },
  { url: '/contact',                                                   priority: 0.85, changeFrequency: 'monthly' },
  { url: '/our-work',                                                  priority: 0.78, changeFrequency: 'monthly' },
  { url: '/privacy-policy',                                            priority: 0.30, changeFrequency: 'yearly'  },
  { url: '/terms',                                                     priority: 0.30, changeFrequency: 'yearly'  },
];

type BlogPost = { slug: string; date: string };

function getBlogSlugs(): { slug: string; date: string }[] {
  const results: { slug: string; date: string }[] = [];
  const seen = new Set<string>();

  // 1. HTML posts from public/blog-posts
  try {
    const htmlDir = path.join(process.cwd(), 'public', 'blog-posts');
    if (fs.existsSync(htmlDir)) {
      for (const file of fs.readdirSync(htmlDir)) {
        if (!file.endsWith('.html')) continue;
        const slug = file.replace(/\.html$/, '');
        if (!seen.has(slug)) {
          seen.add(slug);
          // Try to extract date from meta or use today
          const content = fs.readFileSync(path.join(htmlDir, file), 'utf-8');
          const dateMatch = content.match(/<meta[^>]+name=["']date["'][^>]+content=["']([^"']+)["']/i) ||
                            content.match(/data-date=["']([^"']+)["']/i);
          results.push({ slug, date: dateMatch?.[1] ?? new Date().toISOString().split('T')[0] });
        }
      }
    }
  } catch {}

  // 2. MDX posts from content/blog/index.json
  try {
    const indexPath = path.join(process.cwd(), 'src', 'content', 'blog', 'index.json');
    if (fs.existsSync(indexPath)) {
      const posts = JSON.parse(fs.readFileSync(indexPath, 'utf-8')) as BlogPost[];
      for (const post of posts) {
        if (!seen.has(post.slug)) {
          seen.add(post.slug);
          results.push({ slug: post.slug, date: post.date });
        }
      }
    }
  } catch {}

  return results;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries = STATIC_ROUTES.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const blogEntries = getBlogSlugs().map(({ slug, date }) => ({
    url: `${BASE}/resources/blog/${slug}`,
    lastModified: new Date(date),
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }));

  return [...staticEntries, ...blogEntries];
}
