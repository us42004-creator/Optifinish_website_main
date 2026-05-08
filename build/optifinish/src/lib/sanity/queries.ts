import { groq } from 'next-sanity'
import { client, hasSanityConfig } from './client'

export type SanityPost = {
  source: 'sanity'
  title: string
  slug: string
  date: string
  excerpt: string
  category: string
  readingTime: number
  coverImage: string | null
  tags: string[]
}

export type SanityPostWithBody = SanityPost & {
  body: unknown[]
}

const ALL_POSTS_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    "date": publishedAt,
    excerpt,
    category,
    readingTime,
    "coverImage": coverImage.asset->url,
    tags
  }
`

const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    "date": publishedAt,
    excerpt,
    category,
    readingTime,
    "coverImage": coverImage.asset->url,
    tags,
    body
  }
`

export async function getAllSanityPosts(): Promise<SanityPost[]> {
  if (!hasSanityConfig()) return []
  try {
    const posts = await client.fetch<Omit<SanityPost, 'source'>[]>(ALL_POSTS_QUERY)
    return posts.map((p) => ({ ...p, source: 'sanity' as const }))
  } catch {
    return []
  }
}

export async function getSanityPostBySlug(slug: string): Promise<SanityPostWithBody | null> {
  if (!hasSanityConfig()) return null
  try {
    const post = await client.fetch<(Omit<SanityPost, 'source'> & { body: unknown[] }) | null>(
      POST_BY_SLUG_QUERY,
      { slug },
    )
    if (!post) return null
    return { ...post, source: 'sanity' as const }
  } catch {
    return null
  }
}
