export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'image', title: 'Cover Image', type: 'image', options: { hotspot: true } },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['completed', 'ongoing', 'archived'] },
    },
    { name: 'stack', title: 'Tech Stack', type: 'array', of: [{ type: 'string' }] },
    { name: 'github', title: 'GitHub URL', type: 'url' },
    { name: 'deployment', title: 'Live URL', type: 'url' },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
};
