export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    { name: 'roleLabel', title: 'Role Label (e.g. Data Engineer & ML Engineer)', type: 'string' },
    { name: 'name', title: 'Full Name', type: 'string' },
    { name: 'description', title: 'Short Description', type: 'text' },
    {
      name: 'traits',
      title: 'Rotating Traits',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Shown as rotating text in hero. Include emoji if desired.',
    },
    {
      name: 'profileImage',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'resume',
      title: 'Resume PDF',
      type: 'file',
      options: { accept: '.pdf' },
    },
    {
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Label (e.g. GitHub)', type: 'string' },
          { name: 'url', title: 'URL', type: 'url' },
          {
            name: 'iconName',
            title: 'Icon Name',
            type: 'string',
            description: 'FaGithub | FaLinkedin | FaInstagram | FaEnvelope',
          },
        ],
        preview: { select: { title: 'label', subtitle: 'url' } },
      }],
    },
  ],
};
