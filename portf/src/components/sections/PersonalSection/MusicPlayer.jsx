import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlay, FaForward, FaBackward, FaMusic } from 'react-icons/fa';
import { urlFor } from '../../../lib/sanity';
import { colors, typography } from '../../../styles/theme';

const MusicCard = styled.div`
  width: 100%;
  max-width: 380px;
  border-radius: 16px;
  background: ${colors.surface1Warm};
  border: 1px solid rgba(255,255,255,0.07);
  padding: 1.25rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: background 0.25s ease;

  &:hover { background: ${colors.surface2}; }
`;

const MusicImg = styled.img`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12px;
  object-fit: cover;
`;

const MusicDisc = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e1e23, #131316);
  color: var(--accent);
  font-size: 3.5rem;
`;

const MusicMeta = styled.div`
  .title {
    font-size: 1.35rem;
    font-weight: 700;
  }
  .artist {
    font-size: 0.95rem;
    color: rgba(255,255,255,0.55);
    margin-top: 0.3rem;
  }
`;

const MusicControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;

  button {
    background: none;
    border: none;
    color: rgba(255,255,255,0.75);
    cursor: pointer;
    font-size: 1.1rem;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.15s ease, transform 0.1s ease;

    &:hover { color: #fff; }
    &:active { transform: scale(0.94); }
  }

  a.play {
    width: 48px; height: 48px;
    border-radius: 50%;
    background: #1db954;
    color: ${colors.bg};
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.15s ease;

    &:hover { transform: scale(1.07); }
  }
`;

const MusicHint = styled.p`
  font-family: ${typography.fontFamily.mono};
  font-size: 0.625rem;
  color: rgba(255,255,255,0.35);
  text-align: center;
  margin: 0;
`;

const FALLBACK_SONG = {
  title: 'Merry-Go-Round of Life',
  artist: "Joe Hisaishi — Howl's Moving Castle",
  albumArt: null,
  spotifyUrl: null,
};

/* songs come from Sanity (personal.songs) */
const MusicPlayer = ({ songs }) => {
  const list = songs?.length ? songs : [FALLBACK_SONG];
  const [idx, setIdx] = useState(0);
  // album art from Spotify's oEmbed endpoint, keyed by song URL (null = fetch failed)
  const [spotifyArt, setSpotifyArt] = useState({});

  const song = list[idx];

  useEffect(() => {
    if (song.albumArt || !song.spotifyUrl) return;
    if (spotifyArt[song.spotifyUrl] !== undefined) return;
    let cancelled = false;
    fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(song.spotifyUrl)}`)
      .then(r => (r.ok ? r.json() : null))
      .then(d => {
        if (!cancelled) {
          setSpotifyArt(m => ({ ...m, [song.spotifyUrl]: d?.thumbnail_url || null }));
        }
      })
      .catch(() => {
        if (!cancelled) setSpotifyArt(m => ({ ...m, [song.spotifyUrl]: null }));
      });
    return () => { cancelled = true; };
  }, [song.albumArt, song.spotifyUrl]); // eslint-disable-line react-hooks/exhaustive-deps

  const artUrl = song.albumArt
    ? urlFor(song.albumArt).width(800).height(800).auto('format').url()
    : spotifyArt[song.spotifyUrl] || null;

  const goTo = (nextIdx) => setIdx(((nextIdx % list.length) + list.length) % list.length);

  return (
    <MusicCard>
      {artUrl
        ? <MusicImg src={artUrl} alt={`${song.title} album art`} />
        : <MusicDisc aria-hidden="true"><FaMusic /></MusicDisc>}

      <MusicMeta>
        <p className="title">{song.title}</p>
        <p className="artist">{song.artist}</p>
      </MusicMeta>

      <MusicControls>
        {list.length > 1 && (
          <button onClick={() => goTo(idx - 1)} aria-label="Previous song">
            <FaBackward />
          </button>
        )}
        {song.spotifyUrl && (
          <a
            className="play"
            href={song.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Play ${song.title} on Spotify`}
          >
            <FaPlay style={{ marginLeft: 3 }} />
          </a>
        )}
        {list.length > 1 && (
          <button onClick={() => goTo(idx + 1)} aria-label="Next song">
            <FaForward />
          </button>
        )}
      </MusicControls>

      {!song.spotifyUrl && <MusicHint>add Spotify links in Sanity Studio to enable playback</MusicHint>}
    </MusicCard>
  );
};

export default MusicPlayer;
