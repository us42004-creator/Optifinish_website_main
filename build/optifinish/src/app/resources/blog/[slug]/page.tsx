import { notFound } from 'next/navigation';
import { Clock3, ArrowLeft, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getHtmlPostBySlug } from '@/lib/blog-html';
import postsData from '@/content/blog/index.json';
import fs from 'fs';
import path from 'path';

// Force dynamic so new HTML files appear without a rebuild
export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

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
    return <PostLayout post={post} body={body} />;
  }

  // 2. Fall back to MDX index.json posts (legacy/polished posts)
  const mdxPost = (postsData as { title: string; slug: string; date: string; excerpt: string; tags: string[]; readingTime: number; coverImage?: string | null }[])
    .find((p) => p.slug === slug);

  if (mdxPost) {
    // Try to read the .mdx file body
    const mdxPath = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`);
    let body = '';
    if (fs.existsSync(mdxPath)) {
      const raw = fs.readFileSync(mdxPath, 'utf-8');
      // Strip frontmatter block
      body = raw.replace(/^---[\s\S]*?---\n?/, '').trim();
    }

    const post = {
      source: 'mdx' as const,
      title: mdxPost.title,
      slug: mdxPost.slug,
      date: mdxPost.date,
      category: (mdxPost.tags?.[0] ?? 'General'),
      excerpt: mdxPost.excerpt,
      readingTime: mdxPost.readingTime,
      coverImage: mdxPost.coverImage ?? null,
    };

    return <PostLayout post={post} body={body} isMdx />;
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
    <div className="min-h-screen bg-[#f1efea] text-ink">

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
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-yellow px-7 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-ink transition-colors hover:bg-white"
        >
          Get in Touch
        </Link>
      </div>

    </div>
  );
}
