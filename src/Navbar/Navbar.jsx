import React from 'react';
import './Navbar.styles.css';
import { useNavigate } from 'react-router-dom';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
const Navbar = () => {
  const navigate = useNavigate();
  const route = window.location.href.split('/')[3];
  return (
    <>
      <div className="navbar_main">
        <div className="navbar_logo">
          <img
            onClick={() => {
              navigate('/user');
            }}
            width={50}
            alt="spotify"
            src="/spotify-logo.png"
          />
        </div>
        <div className="navbar_links">
          <div
            onClick={() => {
              navigate('/user');
            }}
            className="navbar_link"
          >
            <div
              className={route === 'user' ? 'navbar_bar_active' : 'navbar_bar'}
            ></div>
            <div className="navbar_links">
              <i class="fa-solid fa-user"></i>
              <p>Profile</p>
            </div>
          </div>
          <div
            onClick={() => {
              navigate('/top-artists');
            }}
            className="navbar_link"
          >
            <div
              className={
                route === 'top-artists' ? 'navbar_bar_active' : 'navbar_bar'
              }
            ></div>
            <div className="navbar_links">
              <i class="fa-sharp fa-solid fa-microphone-lines"></i>
              <p>Top Artists</p>
            </div>
          </div>
          <div
            onClick={() => {
              navigate('/top-tracks');
            }}
            className="navbar_link"
          >
            <div
              className={
                route === 'top-tracks' ? 'navbar_bar_active' : 'navbar_bar'
              }
            ></div>
            <div className="navbar_links">
              <i class="fa-solid fa-music"></i>
              <p>Top Tracks</p>
            </div>
          </div>
          <div
            onClick={() => {
              navigate('/recent');
            }}
            className="navbar_link"
          >
            <div
              className={
                route === 'recent' ? 'navbar_bar_active' : 'navbar_bar'
              }
            ></div>
            <div className="navbar_links">
              <i class="fa-solid fa-clock-rotate-left"></i>
              <p>Recent</p>
            </div>
          </div>
          <div
            onClick={() => {
              navigate('/playlists');
            }}
            className="navbar_link"
          >
            <div
              className={
                route === 'playlists' ? 'navbar_bar_active' : 'navbar_bar'
              }
            ></div>
            <div className="navbar_links">
              <QueueMusicIcon style={{ color: '#9b9b9b', fontSize: '25px' }} />
              <p>Playlists</p>
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            window.open('https://github.com/TrexAqua', '_blank');
          }}
          className="github_logo"
        >
          <img src="/github.png" alt="github" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
