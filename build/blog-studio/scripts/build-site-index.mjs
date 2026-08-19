#!/usr/bin/env node
// Crawls the OptiFinish live site (optifinish.in), builds a JSON index
// of every page with URL + title + description + first meaningful heading.
// Output: public/site-index.json — consumed by src/services/siteIndex.ts
// during SEO generation for VERIFIED internal-link suggestions (replaces
// the LLM's invented URL patterns that don't resolve).
//
// SOURCE: sitemap.xml (respects robots.txt disallow list)
// RUNTIME: ~1 minute for a ~50-page site (200ms polite pause between pages)
// COST: zero — no paid APIs, just HTTP
//
// USAGE
//   node scripts/build-site-index.mjs
//   → writes public/site-index.json
//
// Re-run whenever the live site adds significant new pages. Weekly cron
// is overkill; monthly is fine.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.join(ROOT, 'public', 'site-index.json');

// Sitemap uses www.optifinish.in but bare optifinish.in also resolves
// (200 OK, same content). Both hostnames accepted; canonical stored as-emitted.
const SITE_HOSTS = ['https://optifinish.in', 'https://www.optifinish.in'];
const SITEMAP_URL = 'https://optifinish.in/sitemap.xml';
const POLITE_DELAY_MS = 200; // stay well under rate limits + be a good citizen

// URL patterns to skip (matches robots.txt disallow + noise)
const SKIP_PATTERNS = [
  /\/sandbox\//,
  /\/wireframe\//,
  /\/studio\//,
  /\/api\//,
  /\.xml$/,
  /\.json$/,
  /\.png$/i,
  /\.jpg$/i,
  /\.jpeg$/i,
  /\.svg$/i,
  /\.ico$/i,
  /\.webmanifest$/i,
  /\.pdf$/i
];

function shouldSkip(url) {
  return SKIP_PATTERNS.some((re) => re.test(url));
}

// ─────────────────────────────────────────────────────────────
// Sitemap parsing (regex — sitemaps are simple XML)
// ─────────────────────────────────────────────────────────────
async function fetchSitemap() {
  const res = await fetch(SITEMAP_URL, {
    headers: { 'User-Agent': 'OptiFinishBlogStudio/1.0 (+site-index)' }
  });
  if (!res.ok) throw new Error(`sitemap fetch ${res.status}`);
  const xml = await res.text();
  const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1].trim());
  return urls.filter(
    (u) => SITE_HOSTS.some((host) => u.startsWith(host)) && !shouldSkip(u)
  );
}

// ─────────────────────────────────────────────────────────────
// Page extraction — pull title, meta description, first H1/H2,
// and up to ~200 chars of body text for semantic search matching.
// Regex-based (no cheerio dep). Defensive — returns null on fail.
// ─────────────────────────────────────────────────────────────
async function extractPage(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'OptiFinishBlogStudio/1.0 (+site-index)',
        Accept: 'text/html'
      }
    });
    if (!res.ok) return { url, error: `HTTP ${res.status}` };
    const html = await res.text();

    // Prefer og:title, then <title>
    const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i);
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = (ogTitleMatch?.[1] || titleMatch?.[1] || '').trim().replace(/\s+/g, ' ');

    // Prefer og:description, then meta description
    const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
    const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    const description = (ogDescMatch?.[1] || metaDescMatch?.[1] || '').trim().replace(/\s+/g, ' ');

    // First H1 / H2
    const h1Match = html.match(/<h1[^>]*>([\s\S]{1,300}?)<\/h1>/i);
    const h2Match = html.match(/<h2[^>]*>([\s\S]{1,300}?)<\/h2>/i);
    const firstHeading = (h1Match?.[1] || h2Match?.[1] || '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // First 300 chars of visible body text (strip tags, scripts, styles)
    const bodyText = html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();
    const bodySnippet = bodyText.slice(0, 300);

    // Derive a category from the URL path (used by SEO engine to route
    // internal-link suggestions to the right cluster)
    const pathname = new URL(url).pathname;
    const pathSegments = pathname.split('/').filter(Boolean);
    const section = pathSegments[0] ?? 'home';

    return {
      url,
      pathname,
      section,
      title,
      description,
      firstHeading,
      bodySnippet
    };
  } catch (err) {
    return { url, error: String(err?.message ?? err) };
  }
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────
async function main() {
  console.log(`[build-site-index] fetching sitemap: ${SITEMAP_URL}`);
  const urls = await fetchSitemap();
  console.log(`[build-site-index] ${urls.length} eligible URLs (after skip filters)`);

  const pages = [];
  const errors = [];
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    // Show pathname only for readable logs regardless of hostname variant
    const shortPath = new URL(url).pathname || '/';
    process.stdout.write(`  ${i + 1}/${urls.length}  ${shortPath}  `);
    const page = await extractPage(url);
    if (page.error) {
      console.log(`✗ ${page.error}`);
      errors.push(page);
    } else {
      console.log(`✓ ${(page.title || '(no title)').slice(0, 60)}`);
      pages.push(page);
    }
    await new Promise((r) => setTimeout(r, POLITE_DELAY_MS));
  }

  const index = {
    generated: new Date().toISOString(),
    source: SITE_HOSTS[0],
    pageCount: pages.length,
    errorCount: errors.length,
    pages,
    errors: errors.length > 0 ? errors : undefined
  };

  await fs.mkdir(path.dirname(OUTPUT), { recursive: true });
  await fs.writeFile(OUTPUT, JSON.stringify(index, null, 2));
  console.log(``);
  console.log(`[build-site-index] wrote ${pages.length} pages (${errors.length} errors) → ${path.relative(ROOT, OUTPUT)}`);
  console.log(`[build-site-index] SEO engine will now suggest verified internal links.`);
}

main().catch((e) => {
  console.error('FAILED:', e);
  process.exit(1);
});
