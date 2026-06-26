export default {
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    { name: 'title', title: 'Degree / Program', type: 'string' },
    { name: 'org', title: 'Institution', type: 'string' },
    { name: 'date', title: 'Start Date (e.g. Sep 2023)', type: 'string' },
    { name: 'dateEnd', title: 'End Date (e.g. Jun 2025 or In Progress)', type: 'string' },
    { name: 'gpa', title: 'GPA / Percentage (e.g. 8.68 CGPA)', type: 'string' },
    { name: 'desc', title: 'Description', type: 'text' },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
};
