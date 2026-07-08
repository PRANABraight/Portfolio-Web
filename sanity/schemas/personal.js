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
      description: 'Songs for the Spotify-style player on the Personal page. Playback happens via Spotify embed — paste the track link from Spotify (Share → Copy Song Link).',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Song title', type: 'string', validation: R => R.required() },
            { name: 'artist', title: 'Artist', type: 'string', validation: R => R.required() },
            { name: 'albumArt', title: 'Album art', type: 'image' },
            {
              name: 'spotifyUrl',
              title: 'Spotify link',
              description: 'e.g. https://open.spotify.com/track/…',
              type: 'url',
              validation: R => R.required().uri({ scheme: ['https'] }),
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
