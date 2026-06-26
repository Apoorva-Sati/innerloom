export default {
  name: 'post',
  type: 'document',
  title: 'Blog Post',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (R: any) => R.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
      validation: (R: any) => R.required(),
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
    },
    {
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      rows: 3,
    },
    {
      name: 'coverImage',
      type: 'image',
      title: 'Cover image',
      options: { hotspot: true },
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    },
    {
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [{ type: 'block' }, { type: 'image' }],
    },
    {
      name: 'seoTitle',
      type: 'string',
      title: 'SEO title',
    },
    {
      name: 'seoDesc',
      type: 'text',
      title: 'SEO description',
      rows: 2,
    },
    {
      name: 'readingTime',
      type: 'number',
      title: 'Reading time (minutes)',
    },
  ],
  orderings: [
    {
      title: 'Published (newest first)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
}