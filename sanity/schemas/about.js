export default {
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    {
      name: 'codeLines',
      title: 'Terminal Code Lines',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Each item is one line of Python shown in the terminal animation. Use spaces for indentation.',
    },
    {
      name: 'cards',
      title: 'Info Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'text', title: 'Body Text', type: 'text' },
          {
            name: 'iconName',
            title: 'Icon Name',
            type: 'string',
            description: 'FaLaptopCode | FaGraduationCap | FaChartLine | FaBrain',
          },
        ],
        preview: { select: { title: 'title', subtitle: 'text' } },
      }],
    },
  ],
};
