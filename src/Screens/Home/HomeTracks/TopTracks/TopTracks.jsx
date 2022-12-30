import React from 'react';
import './TopTracks.styles.css';
import { useNavigate } from 'react-router-dom';
const TopTracks = ({ topTracks }) => {
  const navigate = useNavigate();
  const milisecToMin = (mili) => {
    const minutes = Math.floor(mili / 60000);
    const seconds = ((mili % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };
  return (
    <div className="top_tracks_main">
      <div className="top_tracks_heading">
        <h2>Top Tracks of All Time</h2>
        <button
          onClick={() => {
            navigate('/top-tracks');
          }}
        >
          SEE MORE
        </button>
      </div>
      <div className="top_tracks_tracks">
        {topTracks &&
          topTracks.map((track) => (
            <div
              key={track.id}
              onClick={() => {
                navigate(`/track/${track.id}`);
              }}
              className="track_top"
            >
              <img alt={track.name} src={track.album.images[2].url} />
              <div className="track_top_detail">
                <div>
                  <h5>{track.artists[0].name}</h5>
                  <p>
                    {track.name} : {track.album.name}
                  </p>
                </div>
                <p className="track_top_duration">
                  {milisecToMin(track.duration_ms)}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopTracks;
