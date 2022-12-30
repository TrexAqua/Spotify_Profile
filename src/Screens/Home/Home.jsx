import React, { useState } from 'react';
import HomeProfile from './HomeProfile/HomeProfile';
import './Home.styles.css';
import HomeTracks from './HomeTracks/HomeTracks';
import Navbar from '../../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Loader from '../../Components/Loader';
import BelowNavbar from '../../Navbar/BelowNavbar';

const Home = () => {
  const EXPIRATION_TIME = 3600 * 1000;
  const token = JSON.parse(localStorage.getItem('spotify-token'));
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [topArtistsAllTime, setTopArtistsAllTime] = useState(null);
  const [topTracksAllTime, setTopTracksAllTime] = useState(null);
  const [playlists, setPlaylists] = useState({});

  const getTokenTimeStamp = () => {
    return window.localStorage.getItem('spotify_token_timestamp');
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUserDetails = async () => {
    const { data } = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUserData(data);
    localStorage.setItem('user-data', JSON.stringify(data));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getTopArtistsAllTime = async () => {
    const { data } = await axios.get(
      'https://api.spotify.com/v1/me/top/artists?limit=10&time_range=long_term',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTopArtistsAllTime(data);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getTopTracksAllTime = async () => {
    const { data } = await axios.get(
      'https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=long_term',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTopTracksAllTime(data);
  };
  const getPlaylists = async () => {
    const { data } = await axios.get(
      'https://api.spotify.com/v1/me/playlists',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setPlaylists(data);
    localStorage.setItem('Playlists', JSON.stringify(data));
  };
  useEffect(() => {
    if (!localStorage.getItem('spotify-token')) {
      navigate('/');
    }
    if (Date.now() - EXPIRATION_TIME > getTokenTimeStamp()) {
      localStorage.removeItem('spotify-token');
      localStorage.removeItem('user-data');
      localStorage.removeItem('Playlists');
      localStorage.removeItem('spotify_token_timestamp');
      navigate('/');
    }
    getUserDetails();

    getTopArtistsAllTime();

    getTopTracksAllTime();

    getPlaylists();
  }, [EXPIRATION_TIME]);

  return (
    <>
      {topArtistsAllTime && topTracksAllTime ? (
        <div className="nav_home">
          <Navbar />
          <div className="main_home">
            <HomeProfile />
            <HomeTracks
              topArtists={topArtistsAllTime.items}
              topTracks={topTracksAllTime.items}
            />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Home;
