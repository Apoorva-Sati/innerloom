import { MetadataRoute } from 'next'
import { getAllPostSlugs } from '@/sanity/lib/queries'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://innerloom.in'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllPostSlugs()

  const staticRoutes = [
    { url: '/',          priority: 1.0 },
    { url: '/about',     priority: 0.8 },
    { url: '/approach',  priority: 0.8 },
    { url: '/resources', priority: 0.8 },
    { url: '/blog',      priority: 0.8 },
    { url: '/faq',       priority: 0.8 },
    { url: '/contact',   priority: 0.9 },
    { url: '/book',      priority: 0.9 },
  ]

  return [
    ...staticRoutes.map(({ url, priority }) => ({
      url: `${BASE_URL}${url}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority,
    })),
    ...slugs.map(({ slug }: { slug: string }) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ]
}