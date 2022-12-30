import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BelowNavbar.styles.css';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';

const BelowNavbar = () => {
  const navigate = useNavigate();
  const route = window.location.href.split('/')[3];
  return (
    <>
      <div className="below_navbar_main_container">
        <div
          onClick={() => {
            navigate('/user');
          }}
          className="below_navbar_link"
        >
          <div
            className={
              route === 'user' ? 'below_navbar_bar_active' : 'below_navbar_bar'
            }
          ></div>
          <div className="below_navbar_links">
            <i class="fa-solid fa-user"></i>
            <p>Profile</p>
          </div>
        </div>
        <div
          onClick={() => {
            navigate('/top-artists');
          }}
          className="below_navbar_link"
        >
          <div
            className={
              route === 'top-artists'
                ? 'below_navbar_bar_active'
                : 'below_navbar_bar'
            }
          ></div>
          <div className="below_navbar_links">
            <i class="fa-sharp fa-solid fa-microphone-lines"></i>

            <p>Top Artists</p>
          </div>
        </div>
        <div
          onClick={() => {
            navigate('/top-tracks');
          }}
          className="below_navbar_link"
        >
          <div
            className={
              route === 'top-tracks'
                ? 'below_navbar_bar_active'
                : 'below_navbar_bar'
            }
          ></div>
          <div className="below_navbar_links">
            <i class="fa-solid fa-music"></i>

            <p>Top Tracks</p>
          </div>
        </div>
        <div
          onClick={() => {
            navigate('/recent');
          }}
          className="below_navbar_link"
        >
          <div
            className={
              route === 'recent'
                ? 'below_navbar_bar_active'
                : 'below_navbar_bar'
            }
          ></div>
          <div className="below_navbar_links">
            <i class="fa-solid fa-clock-rotate-left"></i>
            <p>Recents</p>
          </div>
        </div>
        <div
          onClick={() => {
            navigate('/playlists');
          }}
          className="below_navbar_link"
        >
          <div
            className={
              route === 'playlists'
                ? 'below_navbar_bar_active'
                : 'below_navbar_bar'
            }
          ></div>
          <div className="below_navbar_links">
            <QueueMusicIcon style={{ color: '#9b9b9b', fontSize: '25px' }} />
            <p>Playlists</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BelowNavbar;
