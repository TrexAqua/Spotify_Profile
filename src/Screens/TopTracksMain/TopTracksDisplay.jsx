/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Navbar from '../../Navbar/Navbar';
import './TopTracksMain.styles.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { millisToMinutesAndSeconds } from '../../utils';
import Loader from '../../Components/Loader';

const TopTracksMain = () => {
  const [whatUserWants, setWhatUserWants] = useState(0);
  const [topTracksLong, setTopTracksLong] = useState(null);
  const [topTracksMid, setTopTracksMid] = useState(null);
  const [topTracksShort, setTopTracksShort] = useState(null);

  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('spotify-token'));

  const getTopTracksForDisplayLong = async () => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTopTracksLong(data.items);
  };
  const getTopTracksForDisplayMid = async () => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTopTracksMid(data.items);
  };
  const getTopTracksForDisplayShort = async () => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTopTracksShort(data.items);
  };
  useEffect(() => {
    getTopTracksForDisplayLong();
    getTopTracksForDisplayMid();
    getTopTracksForDisplayShort();
  }, []);
  return (
    <>
      <Navbar />

      {!topTracksLong && !topTracksMid && !topTracksShort ? (
        <Loader />
      ) : (
        <div
          style={{
            backgroundColor: '#181818',
            width: '100%',
            minHeight: '100vh',
          }}
        >
          <div className="top_tracks_main_display">
            <div className="top_tracks_link_display">
              <h3>Top Tracks</h3>
              <div>
                <h4
                  className={
                    whatUserWants === 0
                      ? 'top_tracks_link_display_active_children'
                      : 'top_tracks_link_display_children'
                  }
                  onClick={() => {
                    setWhatUserWants(0);
                  }}
                >
                  All Time
                </h4>
                <h4
                  className={
                    whatUserWants === 1
                      ? 'top_tracks_link_display_active_children'
                      : 'top_tracks_link_display_children'
                  }
                  onClick={() => {
                    setWhatUserWants(1);
                  }}
                >
                  Last 6 Months
                </h4>
                <h4
                  className={
                    whatUserWants === 2
                      ? 'top_tracks_link_display_active_children'
                      : 'top_tracks_link_display_children'
                  }
                  onClick={() => {
                    setWhatUserWants(2);
                  }}
                >
                  Last 4 Weeks
                </h4>
              </div>
            </div>

            {topTracksLong &&
              topTracksMid &&
              topTracksShort &&
              whatUserWants === 0 &&
              topTracksLong.map((track) => (
                <div
                  key={track.id}
                  onClick={() => {
                    navigate(`/track/${track.id}`);
                  }}
                  className="top_track_display_item"
                >
                  <div className="top_track_display_item_left">
                    <img src={track.album.images[2].url} alt={track.name} />
                    <div>
                      <h4>{track.name}</h4>
                      <h5>
                        {track.artists[0].name} : {track.album.name}
                      </h5>
                    </div>
                  </div>
                  <div className="top_track_display_item_right">
                    <h5>{millisToMinutesAndSeconds(track.duration_ms)}</h5>
                  </div>
                </div>
              ))}
            {topTracksLong &&
              topTracksMid &&
              topTracksShort &&
              whatUserWants === 1 &&
              topTracksMid.map((track) => (
                <div
                  key={track.id}
                  onClick={() => {
                    navigate(`/track/${track.id}`);
                  }}
                  className="top_track_display_item"
                >
                  <div className="top_track_display_item_left">
                    <img src={track.album.images[2].url} alt={track.name} />
                    <div>
                      <h4>{track.name}</h4>
                      <h5>
                        {track.artists[0].name} : {track.album.name}
                      </h5>
                    </div>
                  </div>
                  <div className="top_track_display_item_right">
                    <h5>{millisToMinutesAndSeconds(track.duration_ms)}</h5>
                  </div>
                </div>
              ))}
            {topTracksLong &&
              topTracksMid &&
              topTracksShort &&
              whatUserWants === 2 &&
              topTracksShort.map((track) => (
                <div
                  key={track.id}
                  onClick={() => {
                    navigate(`/track/${track.id}`);
                  }}
                  className="top_track_display_item"
                >
                  <div className="top_track_display_item_left">
                    <img src={track.album.images[2].url} alt={track.name} />
                    <div>
                      <h4>{track.name}</h4>
                      <h5>
                        {track.artists[0].name} : {track.album.name}
                      </h5>
                    </div>
                  </div>
                  <div className="top_track_display_item_right">
                    <h5>{millisToMinutesAndSeconds(track.duration_ms)}</h5>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TopTracksMain;
