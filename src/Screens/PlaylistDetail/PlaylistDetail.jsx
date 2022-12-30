import React, { useState, useEffect } from 'react';
import './PlaylistDetail.styles.css';
import Navbar from '../../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../Components/Loader';
import { millisToMinutesAndSeconds } from '../../utils';
const PlaylistDetail = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('spotify-token'));
  const [playlistTracks, setPlaylistTracks] = useState(null);
  const [playlistInfo, setPlaylistInfo] = useState(null);

  const playlistId = window.location.href.split('/')[4];
  const getPlaylistTrack = async () => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setPlaylistTracks(data);
  };
  const getPlaylistInfo = async () => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setPlaylistInfo(data);
  };
  useEffect(() => {
    getPlaylistTrack();
    getPlaylistInfo();
  }, []);
  return (
    <>
      <div
        style={{
          backgroundColor: '#131313',
          minHeight: '100vh',
        }}
      >
        <Navbar />
        {playlistInfo && playlistTracks ? (
          <div className="playlist_tracks_display_main">
            <div className="playlist_tracks_display_container">
              <div className="playlist_tracks_display_imagery">
                {playlistInfo.images[0] ? (
                  <img
                    alt={playlistInfo.name}
                    src={playlistInfo.images[0].url}
                  />
                ) : (
                  <img
                    alt={playlistInfo.name}
                    src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8&w=1000&q=80"
                  />
                )}
                <h2
                  onClick={() => {
                    window.open(
                      `${playlistInfo.external_urls.spotify}`,
                      '_blank'
                    );
                  }}
                  className="playlist_info_name"
                >
                  {playlistInfo.name}
                </h2>
                <h4>By {playlistInfo.owner.display_name}</h4>
                <h5>{playlistTracks.items.length} Tracks</h5>
              </div>
              <div className="playlist_tracks_display">
                {playlistTracks.items.map((track_item) => (
                  <div
                    onClick={() => {
                      navigate(`/track/${track_item.track.id}`);
                    }}
                    className="playlist_tracks_display_item"
                  >
                    <div className="playlist_tracks_display_left">
                      <img
                        src={track_item.track.album.images[0].url}
                        alt={track_item.track.name}
                      />
                      <div>
                        <h3>{track_item.track.name}</h3>
                        <h4>
                          {track_item.track.artists[0].name} :{' '}
                          {track_item.track.album.name}
                        </h4>
                      </div>
                    </div>
                    <div className="playlist_tracks_display_right">
                      <h4>
                        {millisToMinutesAndSeconds(
                          track_item.track.duration_ms
                        )}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default PlaylistDetail;
