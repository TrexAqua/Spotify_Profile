import React from 'react';
import './HomeProfile.styles.css';
import { useNavigate } from 'react-router-dom';
const HomeProfile = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user-data'));
  const playlists = JSON.parse(localStorage.getItem('Playlists'));
  const logoutHandler = () => {
    localStorage.removeItem('user-data');
    localStorage.removeItem('Playlists');
    localStorage.removeItem('spotify-token');
    localStorage.removeItem('spotify-token-timestamp');

    navigate('/');
  };
  return (
    <>
      {userData && playlists && (
        <div className="home_profile_container">
          <div className="home_profile_image">
            <img src={userData.images[0].url} alt={userData.display_name} />
            <h2>
              <a href="/">{userData.display_name}</a>
            </h2>
          </div>
          <div className="home_playlist_container">
            <div className="home_playlist_item">
              <h4>{userData.followers.total}</h4>
              <p>FOLLOWERS</p>
            </div>
            <div className="home_playlist_item">
              <h4>0</h4>
              <p>FOLLOWING</p>
            </div>
            <div className="home_playlist_item">
              <h4>{playlists.total}</h4>
              <p>PLAYLISTS</p>
            </div>
          </div>
          <div className="home_logout">
            <button onClick={logoutHandler}>LOGOUT</button>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeProfile;
