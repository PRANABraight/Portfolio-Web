export default {
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    { name: 'name', title: 'Skill Name', type: 'string' },
    { name: 'iconName', title: 'Icon Name (e.g. FaPython)', type: 'string' },
    { name: 'color', title: 'Icon Color (hex)', type: 'string' },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
};
