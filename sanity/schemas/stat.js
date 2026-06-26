export default {
  name: 'stat',
  title: 'Stat',
  type: 'document',
  fields: [
    { name: 'num', title: 'Number (numeric value)', type: 'number' },
    { name: 'suffix', title: 'Suffix (e.g. + or k+)', type: 'string' },
    { name: 'label', title: 'Label', type: 'string' },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
};
