export default {
  name: 'category',
  type: 'document',
  title: 'Category',
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
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 2,
    },
    {
      name: 'color',
      type: 'string',
      title: 'Color',
      options: {
        list: ['sage', 'terracotta', 'teal', 'sand'],
      },
    },
  ],
}