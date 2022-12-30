import React, { useState, useEffect } from 'react';
import './Playlists.styles.css';
import Navbar from '../../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../Components/Loader';

const Playlists = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('spotify-token'));
  const [playlists, setPlaylists] = useState(null);
  const getPlaylists = async () => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/me/playlists`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setPlaylists(data.items);
  };
  useEffect(() => {
    getPlaylists();
  }, []);
  return (
    <>
      <Navbar />
      {!playlists ? (
        <Loader />
      ) : (
        <div className="playlists_main_display">
          <div className="playlists_main">
            <h3>Your Playlists</h3>
            <div className="playlists_grid">
              {playlists &&
                playlists.map((playlist) => (
                  <div
                    key={playlist.id}
                    onClick={() => {
                      navigate(`/playlist/${playlist.id}`);
                    }}
                    className="playlist_item"
                  >
                    {playlist.images[0] ? (
                      <img alt={playlist.name} src={playlist.images[0].url} />
                    ) : (
                      <img
                        alt={playlist.name}
                        src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8&w=1000&q=80"
                      />
                    )}
                    <h4>{playlist.name}</h4>
                    <h5>{playlist.tracks.total} TRACKS</h5>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Playlists;
