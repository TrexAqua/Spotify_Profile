import React, { useState, useEffect } from 'react';
import './Recents.styles.css';
import Navbar from '../../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../Components/Loader';
import { millisToMinutesAndSeconds } from '../../utils';

const Recents = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('spotify-token'));
  const [recentTracks, setRecentTracks] = useState(null);
  const getRecentTracks = async () => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/me/player/recently-played`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setRecentTracks(data.items);
  };
  useEffect(() => {
    getRecentTracks();
  }, []);
  return (
    <>
      <Navbar />
      {!recentTracks ? (
        <Loader />
      ) : (
        <div
          style={{
            backgroundColor: '#181818',
            width: '100%',
            minHeight: '100vh',
          }}
        >
          <div className="top_recents_main_display">
            <div className="top_recents_link_display">
              <h3>Recently Played Tracks</h3>
            </div>
            {recentTracks &&
              recentTracks.map((item) => (
                <div
                  key={Math.floor(Math.random() * 100001)}
                  onClick={() => {
                    navigate(`/track/${item.track.id}`);
                  }}
                  className="top_recent_display_item"
                >
                  <div className="top_recent_display_item_left">
                    <img
                      src={item.track.album.images[2].url}
                      alt={item.track.name}
                    />
                    <div>
                      <h4>{item.track.name}</h4>
                      <h5>
                        {item.track.artists[0].name} : {item.track.album.name}
                      </h5>
                    </div>
                  </div>
                  <div className="top_recent_display_item_right">
                    <h5>{millisToMinutesAndSeconds(item.track.duration_ms)}</h5>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Recents;
