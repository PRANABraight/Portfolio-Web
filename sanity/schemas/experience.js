export default {
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    { name: 'title', title: 'Job Title', type: 'string' },
    { name: 'company', title: 'Company / Organisation', type: 'string' },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'startDate', title: 'Start Date (e.g. Jan 2026)', type: 'string' },
    { name: 'endDate', title: 'End Date (e.g. Present)', type: 'string' },
    { name: 'bullets', title: 'Bullet Points', type: 'array', of: [{ type: 'string' }] },
    { name: 'desc', title: 'Description (fallback if no bullets)', type: 'text' },
    { name: 'iconName', title: 'Icon Name (e.g. FaCode)', type: 'string' },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
};
