import React from 'react';
import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import './BeforeLogin.styles.css';
import { useNavigate } from 'react-router-dom';

const BeforeLogin = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const spotify = new SpotifyWebApi();
  const setTokenTimeStamp = () => {
    window.localStorage.setItem('spotify_token_timestamp', Date.now());
  };
  const authEndpoint = 'https://accounts.spotify.com/authorize';
  const redirectUri =
    'https://spotify-profile-99s5-ejubu77oq-trexaqua.vercel.app/';
  const clientId = '87c71027cead452a905fe9bca6e35a6b';
  const scopes = [
    'user-read-private',
    'user-read-email',
    'user-read-recently-played',
    'user-top-read',
    'user-follow-read',
    'user-follow-modify',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
  ];

  const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    '%20'
  )}&response_type=token&show_dialog=true`;

  const [spotifyToken, setSpotifyToken] = useState('');

  const getTokenFromUrl = () => {
    return window.location.hash
      .substring(1)
      .split('&')
      .reduce((initial, item) => {
        let parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);

        return initial;
      }, {});
  };

  useEffect(() => {
    if (localStorage.getItem('spotify-token')) {
      navigate('/user');
    }

    const _spotifyToken = getTokenFromUrl().access_token;
    window.location.hash = '';
    if (_spotifyToken) {
      setSpotifyToken(_spotifyToken);
      spotify.setAccessToken(_spotifyToken);
      setTokenTimeStamp();
      localStorage.setItem('spotify-token', JSON.stringify(_spotifyToken));
    }
  }, [spotifyToken, navigate, spotify]);
  return (
    <>
      <div className="before_login">
        <h2>Spotify Profile</h2>
        <a href={loginUrl}>LOG IN TO SPOTIFY</a>
      </div>
    </>
  );
};

export default BeforeLogin;
