export default {
  name: 'journey',
  title: 'Journey Timeline',
  type: 'document',
  fields: [
    {
      name: 'entries',
      title: 'Timeline Entries',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'year', title: 'Year / Period (e.g. 2024 – 2025)', type: 'string' },
          { name: 'title', title: 'Entry Title', type: 'string' },
          { name: 'desc', title: 'Description', type: 'text' },
          {
            name: 'type',
            title: 'Entry Type',
            type: 'string',
            options: {
              list: [
                { title: 'Milestone', value: 'milestone' },
                { title: 'Achievement', value: 'achievement' },
                { title: 'Publication', value: 'publication' },
                { title: 'Certification', value: 'certification' },
                { title: 'Leadership', value: 'leadership' },
              ],
            },
          },
        ],
        preview: { select: { title: 'year', subtitle: 'title' } },
      }],
    },
  ],
};
