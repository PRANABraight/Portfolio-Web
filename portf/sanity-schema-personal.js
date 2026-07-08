/**
 * Sanity schema for the Personal page — copy this file into your Sanity
 * Studio project's schema folder (e.g. schemas/personal.js) and register it
 * in your schema index, then deploy the Studio.
 *
 * After deploying: create ONE "Personal Page" document, upload hobby images
 * (optional — the site bundles fallbacks) and add songs with audio files
 * (mp3/m4a). The site's music player picks them up automatically.
 */
export default {
  name: 'personal',
  title: 'Personal Page',
  type: 'document',
  fields: [
    {
      name: 'hobbyImages',
      title: 'Hobby Card Images',
      description: 'Optional — overrides the bundled fallback photo per card.',
      type: 'object',
      fields: [
        { name: 'fitness', title: 'Morning Fitness & Volleyball', type: 'image' },
        { name: 'tableTennis', title: 'Table Tennis', type: 'image' },
        { name: 'books', title: 'Books & Research', type: 'image' },
        { name: 'guitar', title: 'Music & Guitar', type: 'image' },
        { name: 'roots', title: 'Cultural History & Roots', type: 'image' },
      ],
    },
    {
      name: 'songs',
      title: 'Playlist',
      description: 'Songs for the Spotify-style player on the Personal page.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Song title', type: 'string', validation: R => R.required() },
            { name: 'artist', title: 'Artist', type: 'string', validation: R => R.required() },
            { name: 'albumArt', title: 'Album art', type: 'image' },
            {
              name: 'audioFile',
              title: 'Audio file',
              type: 'file',
              options: { accept: 'audio/*' },
              validation: R => R.required(),
            },
          ],
          preview: {
            select: { title: 'title', subtitle: 'artist', media: 'albumArt' },
          },
        },
      ],
    },
  ],
}
