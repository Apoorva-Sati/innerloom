import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { getAllPostSlugs, getPostBySlug } from '@/sanity/lib/queries'
import { NewsletterSignup } from '@/components/shared/NewsletterSignup'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDesc ?? post.excerpt,
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen bg-ivory">
      {/* Header */}
      <section className="max-w-2xl mx-auto px-6 pt-20 pb-10">
        <div className="flex flex-wrap gap-2 mb-6">
          {post.categories?.map((cat) => (
            <span
              key={cat.title}
              className="text-xs px-3 py-1 rounded-full bg-[#F0EBE3] text-[#7C6F5B] font-medium"
            >
              {cat.title}
            </span>
          ))}
        </div>

        <h1 className="text-4xl font-serif text-[#2C2C2A] mb-4 leading-snug">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg text-[#6B6560] leading-relaxed mb-6">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-3 text-sm text-[#9B9590] pb-8 border-b border-[#E8E0D5]">
          <span>Parishkriti Bamrara</span>
          <span>·</span>
          <span>
            {new Date(post.publishedAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
          {post.readingTime && (
            <>
              <span>·</span>
              <span>{post.readingTime} min read</span>
            </>
          )}
        </div>
      </section>

      {/* Body */}
      <section className="max-w-2xl mx-auto px-6 pb-24">
        <div className="prose prose-stone prose-lg max-w-none
          prose-headings:font-serif prose-headings:text-[#2C2C2A]
          prose-p:text-[#4A4540] prose-p:leading-relaxed
          prose-a:text-[#4A7C6F] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-[#2C2C2A]
          prose-ul:text-[#4A4540] prose-li:marker:text-[#4A7C6F]">
          {post.body && <PortableText value={post.body} />}
        </div>

{/* Newsletter */}
<div className="mt-16">
  <NewsletterSignup source="blog" />
</div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-[#E8E0D5]">
          <a href="/blog" className="text-sm text-[#4A7C6F] hover:underline">
            ← Back to all posts
          </a>
        </div>
      </section>
    </main>
  )
}