import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Clock3 } from 'lucide-react';
import postsData from '@/content/blog/index.json';
import { getAllHtmlPosts } from '@/lib/blog-html';
import BlogGrid from './BlogGrid';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog | OptiFinish',
  description:
    'Guides, comparisons, and technical resources on powder coating plants, GEMA equipment, automation, and industrial finishing from OptiFinish India.',
};

type RawPost = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: number;
  coverImage?: string | null;
};

type Tone = 'plant' | 'automation' | 'equipment' | 'quality' | 'service' | 'cost' | 'liquid';

function getCategory(tags: string[]): string {
  const t = tags.join(' ').toLowerCase();
  if (t.includes('dürr') || t.includes('durr') || t.includes('liquid')) return 'Liquid Coating';
  if (t.includes('automatic') || t.includes('automation') || t.includes('reciprocator')) return 'Automation';
  if (t.includes('process') || t.includes('what is powder')) return 'Process';
  if (t.includes('plant manufacturer') || t.includes('setup cost') || t.includes('plant price') || t.includes('almirah') || t.includes('booth price')) return 'Plant Design';
  return 'Equipment';
}

function getTone(tags: string[]): Tone {
  const t = tags.join(' ').toLowerCase();
  if (t.includes('dürr') || t.includes('durr') || t.includes('liquid')) return 'liquid';
  if (t.includes('automatic') || t.includes('automation') || t.includes('reciprocator')) return 'automation';
  if (t.includes('cost') || t.includes('price') || t.includes('setup cost')) return 'cost';
  if (t.includes('process') || t.includes('what is')) return 'quality';
  if (t.includes('plant manufacturer') || t.includes('almirah')) return 'plant';
  return 'equipment';
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(date));
}

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

function ArticleMeta({ post, light = false }: { post: Post; light?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] ${light ? 'text-white/58' : 'text-black/42'}`}>
      <span>{post.category}</span>
      <span className="h-1 w-1 rounded-full bg-yellow" />
      <span>{formatDate(post.date)}</span>
      <span className="inline-flex items-center gap-1.5"><Clock3 size={12} /> {post.readingTime} min</span>
    </div>
  );
}

function ArticleVisual({ post, index, dark = false }: { post: Post; index: number; dark?: boolean }) {
  if (post.coverImage) {
    return (
      <div className="relative h-full min-h-[220px] w-full overflow-hidden">
        <Image src={post.coverImage} alt={post.title} fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute left-5 top-5 rounded-full border border-yellow/40 bg-black/40 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-yellow backdrop-blur-sm">
          {post.category}
        </div>
      </div>
    );
  }
  const label: Record<Tone, string> = { plant: 'Plant Design', automation: 'Automation', equipment: 'Equipment', quality: 'Process', service: 'Service', cost: 'Costing', liquid: 'Liquid Coating' };
  return (
    <div className={`relative isolate flex h-full min-h-[220px] overflow-hidden ${dark ? 'bg-[#121212]' : 'bg-[#dedbd1]'}`}>
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,rgba(254,206,0,0.22),transparent_34%),radial-gradient(circle_at_78%_20%,rgba(255,255,255,0.42),transparent_24%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.34] [background-image:linear-gradient(rgba(0,0,0,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.14)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full border border-yellow/35" />
      <div className="flex w-full flex-col justify-between p-6">
        <div className={`flex items-center justify-between text-[10px] font-black uppercase tracking-[0.22em] ${dark ? 'text-white/42' : 'text-black/38'}`}>
          <span>{label[post.tone]}</span><span>{String(index).padStart(2, '0')}</span>
        </div>
        <div>
          <div className={`mb-4 h-2 w-28 rounded-full ${dark ? 'bg-yellow' : 'bg-ink'}`} />
          <p className={`max-w-[11rem] text-[10px] font-black uppercase leading-5 tracking-[0.22em] ${dark ? 'text-white/38' : 'text-black/38'}`}>Cover image coming soon</p>
        </div>
      </div>
    </div>
  );
}

export default function BlogListingPage() {
  const mdxPosts: Post[] = (postsData as RawPost[]).map((p) => ({
    title: p.title, slug: p.slug, date: p.date, excerpt: p.excerpt,
    readingTime: p.readingTime, coverImage: p.coverImage ?? null,
    category: getCategory(p.tags), tone: getTone(p.tags),
  }));

  const htmlPosts: Post[] = getAllHtmlPosts().map((h) => ({
    title: h.title, slug: h.slug, date: h.date, excerpt: h.excerpt,
    readingTime: h.readingTime, coverImage: h.coverImage ?? null,
    category: h.category, tone: getTone([h.category]),
  }));

  const seen = new Set<string>();
  const allPosts = [...htmlPosts, ...mdxPosts]
    .filter((p) => { if (seen.has(p.slug)) return false; seen.add(p.slug); return true; })
    .sort((a, b) => b.date.localeCompare(a.date));

  const lead = htmlPosts.length > 0 ? allPosts[0] : (allPosts.find((p) => p.slug.includes('opticenter')) ?? allPosts[0]);

  return (
    <div className="overflow-hidden bg-[#f1efea] text-ink">

      {/* ── Dark hero ── */}
      <section className="relative isolate overflow-hidden bg-[#080808] px-4 pb-10 pt-24 text-white sm:px-6 md:px-10 lg:px-12 lg:pt-28">
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_16%_18%,rgba(254,206,0,0.18),transparent_27%),linear-gradient(145deg,#151515_0%,#050505_58%,#111_100%)]" />
        <div className="absolute inset-0 -z-20 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.28)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-6 border-b border-white/10 pb-5">
            <p className="text-[10px] font-black uppercase tracking-[0.26em] text-white/44">OptiFinish Resources / Blog</p>
          </div>
          <div className="py-8 text-center lg:py-12">
            <p className="card-accent-label card-accent-label-light justify-center">Industrial Finishing Journal</p>
            <h1 className="mx-auto mt-7 max-w-6xl font-serif text-[4.4rem] font-semibold leading-[0.86] tracking-[-0.055em] text-white sm:text-[7rem] lg:text-[9.2rem]">
              Notes for better coating lines.
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-base font-medium leading-7 text-white/62 sm:text-lg">
              Guides, comparisons, and technical references for teams buying, running, or upgrading powder coating plants in India.
            </p>
            <div className="mx-auto mt-8 grid max-w-xl grid-cols-3 border-y border-white/10 py-5 text-left">
              {[`${allPosts.length} Articles`, 'India-Focused', 'GEMA & Dürr'].map((item, index) => (
                <div key={item} className={index === 0 ? '' : 'border-l border-white/10 pl-4'}>
                  <span className="font-mono text-xs font-bold text-yellow">0{index + 1}</span>
                  <p className="mt-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/42">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Lead article */}
          <article className="mt-4 grid overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] shadow-[0_24px_90px_rgba(0,0,0,0.36)] backdrop-blur lg:grid-cols-[0.72fr_1fr]">
            <div className="min-h-[280px] lg:min-h-[390px]">
              <ArticleVisual post={lead} index={1} dark />
            </div>
            <div className="grid border-t border-white/10 bg-[#101010] lg:grid-cols-[1fr_auto] lg:border-l lg:border-t-0">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="mb-7 inline-flex rounded-full border border-yellow/25 bg-yellow/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-yellow">
                  Featured
                </div>
                <ArticleMeta post={lead} light />
                <h2 className="mt-5 max-w-3xl font-serif text-[2.6rem] font-semibold leading-[0.96] tracking-[-0.04em] text-white sm:text-[3.7rem] lg:text-[4.45rem]">
                  {lead.title}
                </h2>
                <p className="mt-5 max-w-2xl text-sm font-medium leading-6 text-white/58 sm:text-base">{lead.excerpt}</p>
              </div>
              <div className="flex items-end border-t border-white/10 p-6 lg:border-l lg:border-t-0 lg:p-8">
                <Link href={`/resources/blog/${lead.slug}`} className="inline-flex w-fit items-center gap-2 rounded-full bg-yellow px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-ink transition-colors hover:bg-white">
                  Read feature <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ── Browse section — client grid with working filter ── */}
      <section className="relative overflow-hidden bg-[#f1efea] px-4 py-12 sm:px-6 md:px-10 lg:px-12 lg:py-20">
        <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.62] mix-blend-multiply"
          style={{ backgroundImage: `linear-gradient(rgba(201,165,0,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,0,0.22) 1px, transparent 1px)`, backgroundSize: '88px 88px' }} />
        <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.32] mix-blend-multiply"
          style={{ backgroundImage: `linear-gradient(rgba(255,243,163,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,243,163,0.5) 1px, transparent 1px)`, backgroundSize: '264px 264px' }} />
        <div className="relative mx-auto max-w-[1440px]">
          <BlogGrid posts={allPosts} lead={lead} />
        </div>
      </section>

    </div>
  );
}
