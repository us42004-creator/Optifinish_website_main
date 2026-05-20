/**
 * blog-html.ts
 * Reads all .html posts from src/content/blog-html/ at request time.
 * New files dropped by the backend portal appear immediately — no rebuild needed.
 *
 * HTML template contract (must be in <head>):
 *   <meta name="title"       content="Post Title">
 *   <meta name="slug"        content="my-post-slug">
 *   <meta name="date"        content="2026-04-25">
 *   <meta name="category"    content="Equipment">
 *   <meta name="excerpt"     content="Card summary (max 200 chars)">
 *   <meta name="readingTime" content="6">
 *   <meta name="keywords"    content="powder coating,GEMA,India">
 *   <meta name="faqs"        content='[{"q":"Question?","a":"Answer."}]'>
 *   <meta property="og:image" content="/images/blog/cover.jpg">
 *
 * Body content is everything inside <body>...</body>.
 */

import fs from 'fs';
import path from 'path';

export type HtmlPost = {
  source: 'html';
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  readingTime: number;
  coverImage: string | null;
  tags: string[];
  faqs: { q: string; a: string }[];
};

const HTML_DIR = path.join(process.cwd(), 'src/content/blog-html');

function extractTags(html: string): string[] {
  const raw = extractMeta(html, 'keywords');
  if (!raw) return [];
  return raw.split(',').map((t) => t.trim()).filter(Boolean);
}

function extractFaqs(html: string): { q: string; a: string }[] {
  const raw = extractMeta(html, 'faqs');
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch {}
  return [];
}

function extractMeta(html: string, name: string): string {
  // Matches both name= and property= meta tags
  const re = new RegExp(
    `<meta\\s+(?:name|property)=["']${name}["'][^>]*content=["']([^"']+)["']|` +
    `<meta\\s+content=["']([^"']+)["'][^>]*(?:name|property)=["']${name}["']`,
    'i'
  );
  const m = html.match(re);
  return (m?.[1] ?? m?.[2] ?? '').trim();
}

function extractTitle(html: string): string {
  // Try <meta name="title"> first, then <title>
  const fromMeta = extractMeta(html, 'title');
  if (fromMeta) return fromMeta;
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m?.[1]?.trim() ?? 'Untitled';
}

export function extractBody(html: string): string {
  const m = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return m?.[1]?.trim() ?? html;
}

export function getAllHtmlPosts(): HtmlPost[] {
  if (!fs.existsSync(HTML_DIR)) return [];

  const files = fs.readdirSync(HTML_DIR).filter((f) => f.endsWith('.html'));

  return files
    .map((file): HtmlPost | null => {
      const html = fs.readFileSync(path.join(HTML_DIR, file), 'utf-8');
      const slug = extractMeta(html, 'slug') || file.replace(/\.html$/, '');
      const date = extractMeta(html, 'date') || new Date().toISOString().slice(0, 10);
      const readingTimeRaw = extractMeta(html, 'readingTime');
      const coverImage = extractMeta(html, 'og:image') || null;

      return {
        source: 'html',
        title: extractTitle(html),
        slug,
        date,
        category: extractMeta(html, 'category') || 'General',
        excerpt: extractMeta(html, 'excerpt') || '',
        readingTime: readingTimeRaw ? parseInt(readingTimeRaw, 10) : 5,
        coverImage,
        tags: extractTags(html),
        faqs: extractFaqs(html),
      };
    })
    .filter((p): p is HtmlPost => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getHtmlPostBySlug(slug: string): { post: HtmlPost; body: string } | null {
  if (!fs.existsSync(HTML_DIR)) return null;

  const files = fs.readdirSync(HTML_DIR).filter((f) => f.endsWith('.html'));

  for (const file of files) {
    const html = fs.readFileSync(path.join(HTML_DIR, file), 'utf-8');
    const fileSlug = extractMeta(html, 'slug') || file.replace(/\.html$/, '');
    if (fileSlug !== slug) continue;

    const readingTimeRaw = extractMeta(html, 'readingTime');
    return {
      post: {
        source: 'html',
        title: extractTitle(html),
        slug: fileSlug,
        date: extractMeta(html, 'date') || new Date().toISOString().slice(0, 10),
        category: extractMeta(html, 'category') || 'General',
        excerpt: extractMeta(html, 'excerpt') || '',
        readingTime: readingTimeRaw ? parseInt(readingTimeRaw, 10) : 5,
        coverImage: extractMeta(html, 'og:image') || null,
        tags: extractTags(html),
        faqs: extractFaqs(html),
      },
      body: extractBody(html),
    };
  }

  return null;
}
