import Link from 'next/link'
import { AdminNav } from '@/components/admin/AdminNav'
import { Client } from '@/sanity/lib/client'
import { requireAdmin } from '@/lib/auth/requireAdmin'

type PostSummary = {
  _id: string
  title: string
  slug: { current: string } | null
  publishedAt: string | null
  categories: { title: string; color: string }[] | null
}

async function getAllPostsAdmin(): Promise<PostSummary[]> {
  return Client.fetch(
    `*[_type == "post"] | order(_createdAt desc) {
       _id, title, slug, publishedAt,
       "categories": categories[]->{ title, color }
     }`,
    {},
    { cache: 'no-store' }
  )
}

export default async function AdminBlogPage() {
  await requireAdmin()

  const posts = await getAllPostsAdmin()

  return (
    <div className="min-h-screen bg-ivory">
      <AdminNav />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-medium tracking-widest text-[#4A7C6F] uppercase">
            All posts ({posts.length})
          </h2>
          <Link
            href="/studio"
            className="text-xs bg-[#4A7C6F] text-white px-4 py-2 rounded-full hover:bg-[#3d6860] transition-colors"
          >
            + New post in Studio
          </Link>
        </div>

        <div className="space-y-2">
          {posts.length === 0 ? (
            <p className="text-sm text-[#9B9590]">No posts yet.</p>
          ) : (
            posts.map((post) => {
              const isDraft = !post.publishedAt
              const editUrl = `/studio/desk/post;${post._id}`

              return (
                <div
                  key={post._id}
                  className="bg-white rounded-2xl border border-[#E8E0D5] px-6 py-4 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm text-[#2C2C2A] truncate">
                        {post.title ?? 'Untitled'}
                      </span>
                      {isDraft && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#FFF3E0] text-[#C77B3A] shrink-0">
                          Draft
                        </span>
                      )}
                      {post.categories?.map((cat) => (
                        <span
                          key={cat.title}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-[#F0F5F4] text-[#4A7C6F] shrink-0"
                        >
                          {cat.title}
                        </span>
                      ))}
                    </div>
                    {post.publishedAt && (
                      <p className="text-xs text-[#9B9590] mt-0.5">
                        {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {post.slug?.current && !isDraft && (
                      <Link
                        href={`/blog/${post.slug.current}`}
                        target="_blank"
                        className="text-xs text-[#4A7C6F] hover:underline"
                      >
                        View
                      </Link>
                    )}
                    <Link
                      href={editUrl}
                      className="text-xs text-[#6B6560] hover:text-[#2C2C2A] hover:underline"
                    >
                      Edit in Studio →
                    </Link>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
