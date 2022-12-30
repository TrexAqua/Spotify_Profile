import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TopArtist.styles.css';
const TopArtist = ({ topArtists }) => {
  const navigate = useNavigate();
  return (
    <div className="top_artist_main">
      <div className="top_artist_heading">
        <h2>Top Artists Of All Time</h2>
        <button
          onClick={() => {
            navigate('/top-artists');
          }}
        >
          SEE MORE
        </button>
      </div>
      <div className="top_artist_artists">
        {topArtists &&
          topArtists.map((artist) => {
            return (
              <div
                key={artist.id}
                onClick={() => {
                  navigate(`/artist/${artist.id}`);
                }}
                className="artist_top"
              >
                <img alt={artist.name} src={artist.images[2].url} />
                <h5>{artist.name}</h5>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TopArtist;
