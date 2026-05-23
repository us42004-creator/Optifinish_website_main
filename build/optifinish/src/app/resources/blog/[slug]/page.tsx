import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Clock3, ArrowLeft, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { marked } from 'marked';
import matter from 'gray-matter';
import { getHtmlPostBySlug } from '@/lib/blog-html';
import postsData from '@/content/blog/index.json';
import { metadataBase, defaultOpenGraph, defaultTwitter, articleSchema, breadcrumbSchema, faqSchema, SITE } from '@/lib/seo';
import fs from 'fs';
import path from 'path';

// Configure marked for clean, semantic HTML output
marked.setOptions({ gfm: true, breaks: false });

type MdxFrontmatter = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: number;
  coverImage?: string | null;
  faqs?: { q: string; a: string }[];
  metaTitle?: string;
  metaDescription?: string;
};

// Force dynamic so new HTML files appear without a rebuild
export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

type PostData = { title: string; slug: string; date: string; excerpt: string; tags: string[]; readingTime: number; coverImage?: string | null };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Try HTML posts first
  const htmlResult = getHtmlPostBySlug(slug);
  if (htmlResult) {
    const { post } = htmlResult;
    const ogImage = post.coverImage ?? SITE.ogImage;
    return {
      metadataBase,
      title: post.title,
      description: post.excerpt,
      keywords: post.tags,
      alternates: { canonical: `${SITE.url}/resources/blog/${post.slug}` },
      openGraph: {
        ...defaultOpenGraph,
        title: post.title,
        description: post.excerpt,
        url: `${SITE.url}/resources/blog/${post.slug}`,
        type: 'article',
        images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
        publishedTime: post.date,
      },
      twitter: {
        ...defaultTwitter,
        title: post.title,
        description: post.excerpt,
        images: [ogImage],
      },
    };
  }

  // Try MDX posts — use gray-matter to get richer frontmatter (metaTitle, metaDescription, tags)
  const mdxPost = (postsData as PostData[]).find((p) => p.slug === slug);
  if (mdxPost) {
    // Read frontmatter for metaTitle / metaDescription overrides
    let fm: MdxFrontmatter | null = null;
    try {
      const mdxPath = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`);
      if (fs.existsSync(mdxPath)) {
        fm = matter(fs.readFileSync(mdxPath, 'utf-8')).data as MdxFrontmatter;
      }
    } catch {}

    const title       = fm?.metaTitle ?? fm?.title ?? mdxPost.title;
    const description = fm?.metaDescription ?? fm?.excerpt ?? mdxPost.excerpt;
    const keywords    = fm?.tags ?? mdxPost.tags ?? [];
    const ogImage     = fm?.coverImage ?? mdxPost.coverImage ?? SITE.ogImage;

    return {
      metadataBase,
      title,
      description,
      keywords,
      alternates: { canonical: `${SITE.url}/resources/blog/${mdxPost.slug}` },
      openGraph: {
        ...defaultOpenGraph,
        title,
        description,
        url: `${SITE.url}/resources/blog/${mdxPost.slug}`,
        type: 'article',
        images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
        publishedTime: fm?.date ?? mdxPost.date,
      },
      twitter: {
        ...defaultTwitter,
        title,
        description,
        images: [ogImage],
      },
    };
  }

  return { title: 'Post Not Found | OptiFinish Blog' };
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  // 1. Try HTML posts first (portal-uploaded)
  const htmlResult = getHtmlPostBySlug(slug);
  if (htmlResult) {
    const { post, body } = htmlResult;
    const articleLD = articleSchema({
      title: post.title,
      description: post.excerpt,
      url: `/resources/blog/${post.slug}`,
      image: post.coverImage ?? undefined,
      datePublished: post.date,
    });
    const bcLD = breadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'Blog', href: '/resources/blog' },
      { name: post.title, href: `/resources/blog/${post.slug}` },
    ]);
    const faqLD = post.faqs && post.faqs.length > 0 ? faqSchema(post.faqs) : null;
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLD) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcLD) }} />
        {faqLD && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />}
        <PostLayout post={post} body={body} />
      </>
    );
  }

  // 2. Fall back to MDX index.json posts (legacy/polished posts)
  const mdxPost = (postsData as PostData[]).find((p) => p.slug === slug);

  if (mdxPost) {
    const mdxPath = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`);
    let body = '';
    let fm: MdxFrontmatter | null = null;

    if (fs.existsSync(mdxPath)) {
      const raw = fs.readFileSync(mdxPath, 'utf-8');
      // Parse frontmatter (captures faqs, metaTitle, metaDescription, etc.)
      const parsed = matter(raw);
      fm = parsed.data as MdxFrontmatter;
      // Parse markdown body → HTML
      body = marked(parsed.content.trim()) as string;
    }

    // Prefer richer frontmatter fields if present, fall back to index.json
    const title      = fm?.metaTitle ?? fm?.title ?? mdxPost.title;
    const excerpt    = fm?.metaDescription ?? fm?.excerpt ?? mdxPost.excerpt;
    const coverImage = fm?.coverImage ?? mdxPost.coverImage ?? null;

    const post = {
      source: 'mdx' as const,
      title: fm?.title ?? mdxPost.title,
      slug: mdxPost.slug,
      date: fm?.date ?? mdxPost.date,
      category: (fm?.tags?.[0] ?? mdxPost.tags?.[0] ?? 'General'),
      excerpt,
      readingTime: fm?.readingTime ?? mdxPost.readingTime,
      coverImage,
    };

    const articleLD = articleSchema({
      title,
      description: excerpt,
      url: `/resources/blog/${mdxPost.slug}`,
      image: coverImage ?? undefined,
      datePublished: fm?.date ?? mdxPost.date,
    });
    const bcLD = breadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'Blog', href: '/resources/blog' },
      { name: fm?.title ?? mdxPost.title, href: `/resources/blog/${mdxPost.slug}` },
    ]);
    // Inject FAQ schema if post frontmatter has faqs array
    const faqLD = (fm?.faqs && fm.faqs.length > 0) ? faqSchema(fm.faqs) : null;

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLD) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcLD) }} />
        {faqLD && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />}
        <PostLayout post={post} body={body} isMdx />
      </>
    );
  }

  notFound();
}

function PostLayout({
  post,
  body,
  isMdx = false,
}: {
  post: {
    title: string;
    slug: string;
    date: string;
    category: string;
    excerpt: string;
    readingTime: number;
    coverImage: string | null;
  };
  body: string;
  isMdx?: boolean;
}) {
  return (
    <div className="min-h-svh bg-[#f1efea] text-ink">

      {/* Back nav */}
      <div className="border-b border-black/10 bg-[#f1efea]/80 backdrop-blur">
        <div className="mx-auto max-w-5xl px-5 py-4 md:px-8">
          <Link
            href="/resources/blog"
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/40 transition-colors hover:text-ink"
          >
            <ArrowLeft size={12} /> Back to Blog
          </Link>
        </div>
      </div>

      {/* Cover image */}
      {post.coverImage && (
        <div className="relative h-[340px] w-full overflow-hidden md:h-[480px]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f1efea] via-transparent to-transparent" />
        </div>
      )}

      {/* Header */}
      <div className={`mx-auto max-w-3xl px-5 md:px-8 ${post.coverImage ? '-mt-16 relative' : 'pt-16'}`}>
        <span className="inline-block rounded-full border border-yellow/40 bg-yellow/15 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-ink/70">
          {post.category}
        </span>
        <h1 className="mt-4 font-serif text-[2.4rem] font-semibold leading-[1.0] tracking-[-0.04em] text-ink md:text-[3.6rem]">
          {post.title}
        </h1>
        <p className="mt-4 text-base font-medium leading-7 text-black/55 md:text-lg">
          {post.excerpt}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-black/10 pb-6 text-[10px] font-bold uppercase tracking-[0.18em] text-black/40">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={12} /> {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 size={12} /> {post.readingTime} min read
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-5 py-12 md:px-8">
        {body ? (
          <div
            className="prose prose-lg prose-neutral max-w-none
              prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-[-0.03em] prose-headings:text-ink
              prose-h2:text-[2rem] prose-h3:text-[1.5rem]
              prose-p:text-black/65 prose-p:leading-[1.85]
              prose-a:text-yellow-dark prose-a:no-underline hover:prose-a:underline
              prose-strong:text-ink prose-strong:font-bold
              prose-li:text-black/65
              prose-img:rounded-[1rem] prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        ) : (
          <p className="text-base text-black/40">Post content coming soon.</p>
        )}
      </div>

      {/* CTA */}
      <div className="border-t border-black/10 bg-ink px-5 py-16 text-center text-white md:px-8">
        <p className="text-[0.56rem] font-bold uppercase tracking-[0.26em] text-white/40">
          Ready to upgrade your line?
        </p>
        <h2 className="mx-auto mt-4 max-w-lg font-serif text-3xl font-semibold leading-[1.1] tracking-[-0.03em] md:text-4xl">
          Talk to OptiFinish about your coating requirements.
        </h2>
        <Link
          href="/contact"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-yellow px-7 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-ink transition-colors hover:bg-white sm:w-auto"
        >
          Get in Touch
        </Link>
      </div>

    </div>
  );
}
