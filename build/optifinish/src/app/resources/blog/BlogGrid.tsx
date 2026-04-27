'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Clock3, Search, X } from 'lucide-react';

type Tone = 'plant' | 'automation' | 'equipment' | 'quality' | 'service' | 'cost' | 'liquid';

type Post = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  readingTime: number;
  coverImage: string | null;
  category: string;
  tone: Tone;
};

const CATEGORIES = ['All', 'Equipment', 'Plant Design', 'Automation', 'Process', 'Liquid Coating'];

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(date));
}

function ArticleMeta({ post }: { post: Post }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-black/38">
      <span>{post.category}</span>
      <span className="h-[3px] w-[3px] rounded-full bg-yellow" />
      <span>{formatDate(post.date)}</span>
      <span className="inline-flex items-center gap-1">
        <Clock3 size={11} /> {post.readingTime} min
      </span>
    </div>
  );
}

/** Individual masonry card */
function MasonryCard({ post, tall }: { post: Post; tall?: boolean }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-black/[0.08] bg-[#faf8f4] shadow-[0_2px_16px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_6px_28px_rgba(0,0,0,0.09)]">
      <Link href={`/resources/blog/${post.slug}`} className="block">

        {/* Cover image or placeholder */}
        {post.coverImage ? (
          <div className={`relative overflow-hidden ${tall ? 'aspect-[4/3]' : 'aspect-[16/9]'}`}>
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <span className="absolute left-3.5 top-3.5 rounded-full border border-yellow/40 bg-black/40 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-yellow backdrop-blur-sm">
              {post.category}
            </span>
          </div>
        ) : (
          <div className="relative flex items-end overflow-hidden bg-[#e9e6de] px-5 pb-5 pt-8">
            {/* subtle grid texture */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(0,0,0,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.12)_1px,transparent_1px)] [background-size:24px_24px]" />
            {/* yellow top bar */}
            <div className="absolute left-0 top-0 h-0.5 w-12 bg-yellow" />
            <span className="relative text-[9px] font-black uppercase tracking-[0.22em] text-black/28">
              {post.category}
            </span>
          </div>
        )}

        {/* Text content */}
        <div className="p-5">
          <ArticleMeta post={post} />
          <h3 className="mt-2.5 font-serif text-[1.45rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink transition-colors duration-200 group-hover:text-yellow-dark sm:text-[1.6rem]">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-[0.8rem] leading-[1.7] text-black/50">
            {post.excerpt}
          </p>
          <div className="mt-4 inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.18em] text-black/30 transition-colors duration-200 group-hover:text-yellow-dark">
            Read <ArrowUpRight size={10} />
          </div>
        </div>

      </Link>
    </article>
  );
}

/** Dark editorial card — dropped into the masonry flow */
function EditorialCard({
  onFilter,
  searchQuery,
  onSearch,
}: {
  onFilter: (cat: string) => void;
  searchQuery: string;
  onSearch: (q: string) => void;
}) {
  return (
    <div className="relative isolate overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] p-6 text-white shadow-[0_4px_28px_rgba(0,0,0,0.2)]">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_10%_50%,rgba(254,206,0,0.13),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.1] [background-image:linear-gradient(rgba(255,255,255,0.28)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute left-0 top-0 h-0.5 w-10 bg-yellow" />

      <p className="card-accent-label card-accent-label-light mt-2">What we cover</p>
      <h3 className="mt-3 font-serif text-2xl font-semibold leading-[1.1] tracking-[-0.035em]">
        Everything from plant design to finish quality.
      </h3>
      <p className="mt-3 text-[0.8rem] leading-[1.7] text-white/46">
        GEMA guns, booth sizing, automation ROI, and CPCB-compliant plant design — written for Indian manufacturers.
      </p>

      {/* Search */}
      <div className="relative mt-5">
        <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search articles…"
          className="w-full rounded-xl border border-white/12 bg-white/[0.06] py-2.5 pl-9 pr-9 text-[0.78rem] font-medium text-white placeholder-white/28 outline-none transition-colors focus:border-yellow/40 focus:bg-white/[0.09]"
        />
        {searchQuery && (
          <button
            onClick={() => onSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/28 transition-colors hover:text-white/60"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Category pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
          <button
            key={cat}
            onClick={() => onFilter(cat)}
            className="inline-flex h-7 items-center rounded-full border border-white/12 bg-white/[0.05] px-3 text-[9px] font-black uppercase tracking-[0.16em] text-white/44 transition-colors hover:border-yellow/50 hover:text-yellow"
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function BlogGrid({ posts, lead }: { posts: Post[]; lead: Post }) {
  const [active, setActive] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = posts
    .filter((p) => p.slug !== lead.slug)
    .filter((p) => active === 'All' || p.category === active)
    .filter((p) => {
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });

  // Build items list with editorial card injected at position 2 (after 2nd post)
  const EDITORIAL_AT = 2;
  type Item = { type: 'post'; post: Post; idx: number } | { type: 'editorial' };
  const items: Item[] = [
    ...filtered.slice(0, EDITORIAL_AT).map((post, i) => ({ type: 'post' as const, post, idx: i })),
    ...(filtered.length > 0 ? [{ type: 'editorial' as const }] : []),
    ...filtered.slice(EDITORIAL_AT).map((post, i) => ({ type: 'post' as const, post, idx: i + EDITORIAL_AT })),
  ];

  return (
    <div>
      {/* ── Header + filter pills ── */}
      <div className="mb-8 flex flex-col gap-5 border-b border-black/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="card-accent-label">Browse Posts</p>
          <h2 className="mt-3 max-w-3xl font-serif text-5xl font-semibold leading-[0.92] tracking-[-0.045em] text-ink sm:text-6xl">
            {posts.length} articles on powder coating in India.
          </h2>
        </div>
        <div className="max-w-xl">
          <p className="text-sm font-medium leading-6 text-black/48">
            Covering GEMA equipment, plant design, automation, process guides, and Dürr liquid coating systems.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const count = cat === 'All' ? posts.length : posts.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`rounded-full border px-3.5 py-2 text-[9px] font-black uppercase tracking-[0.16em] transition-all duration-150 ${
                    active === cat
                      ? 'border-yellow bg-yellow text-ink shadow-[0_8px_20px_rgba(201,165,0,0.22)]'
                      : 'border-black/10 bg-[#f8f6f0]/80 text-black/44 hover:border-yellow/50 hover:text-ink'
                  }`}
                >
                  {cat} <span className="opacity-50">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-sm text-black/35">
            {query ? `No articles found for "${query}".` : 'No posts in this category yet.'}
          </p>
          {query && (
            <button onClick={() => setQuery('')} className="mt-3 text-[10px] font-black uppercase tracking-[0.16em] text-yellow-dark hover:underline">
              Clear search
            </button>
          )}
        </div>
      )}

      {/* ── Masonry columns ── */}
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {items.map((item) =>
          item.type === 'editorial' ? (
            <div key="editorial" className="mb-5 break-inside-avoid">
              <EditorialCard onFilter={setActive} searchQuery={query} onSearch={setQuery} />
            </div>
          ) : (
            <div key={item.post.slug} className="mb-5 break-inside-avoid">
              <MasonryCard post={item.post} tall={item.idx % 5 === 0} />
            </div>
          )
        )}
      </div>
    </div>
  );
}
