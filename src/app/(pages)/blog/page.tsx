import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, type Post } from '@/sanity/lib/queries'
import { FadeIn } from '@/components/shared/FadeIn'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Mental Health Blog',
  description:
    'Articles on anxiety, burnout, student stress, and relationships from a counselling psychologist in India.',
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group block bg-white rounded-2xl border border-[#E8E0D5] p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex flex-wrap gap-2 mb-3">
        {post.categories?.map((cat) => (
          <span
            key={cat.title}
            className="text-xs px-3 py-1 rounded-full bg-[#F0EBE3] text-[#7C6F5B] font-medium"
          >
            {cat.title}
          </span>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-[#2C2C2A] mb-2 group-hover:text-[#4A7C6F] transition-colors">
        {post.title}
      </h2>

      {post.excerpt && (
        <p className="text-[#6B6560] text-sm leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>
      )}

      <div className="flex items-center gap-3 text-xs text-[#9B9590]">
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
    </Link>
  )
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen bg-ivory">
      <FadeIn direction="up">
      {/* Header */}
      <section className="px-6 py-20 text-center max-w-2xl mx-auto">
        <span className="text-xs font-medium tracking-widest text-[#4A7C6F] uppercase mb-4 block">
          Blog
        </span>
        <h1 className="text-4xl font-serif text-[#2C2C2A] mb-4">
          Thoughts on mental wellbeing
        </h1>
        <p className="text-[#6B6560] leading-relaxed">
          Articles on anxiety, burnout, relationships, and everyday mental
          health — written for young adults and professionals navigating modern
          life.
        </p>
      </section>

      {/* Posts grid */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        {posts.length === 0 ? (
          <p className="text-center text-[#9B9590]">No posts published yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>
      </FadeIn>
    </main>
  )
}