import { Client } from './client'

export type Post = {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  readingTime?: number
  coverImage?: any
  categories?: { title: string; color: string }[]
  seoTitle?: string
  seoDesc?: string
  body?: any[]
}

export async function getAllPosts(): Promise<Post[]> {
  return Client.fetch(
    `*[_type == "post" && defined(slug.current) && publishedAt <= now()]
     | order(publishedAt desc) {
       _id, title, slug, publishedAt, excerpt, readingTime,
       "categories": categories[]->{ title, color },
       coverImage { asset->, hotspot, crop }
     }`
  )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return Client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
       _id, title, slug, publishedAt, excerpt, readingTime,
       seoTitle, seoDesc, body,
       "categories": categories[]->{ title, color },
       coverImage { asset->, hotspot, crop }
     }`,
    { slug }
  )
}

export async function getAllPostSlugs() {
  return Client.fetch(
    `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`
  )
}