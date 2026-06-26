export default {
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'desc', title: 'Description', type: 'text' },
    { name: 'iconName', title: 'Icon Name (e.g. FaCode)', type: 'string' },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
};
