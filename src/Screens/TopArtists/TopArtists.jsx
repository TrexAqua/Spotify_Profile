/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Navbar from '../../Navbar/Navbar';
import './TopArtists.styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loader';

const TopArtists = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('spotify-token'));

  const [artistsAllTime, setArtistsAllTime] = useState(null);
  const [artistsMid, setArtistsMid] = useState(null);
  const [artistsShort, setArtistsShort] = useState(null);
  const [whatUserWants, setWhatUserWants] = useState(0);

  const getArtistsAllTime = async () => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setArtistsAllTime(data.items);
  };
  const getArtistsMid = async () => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setArtistsMid(data.items);
  };
  const getArtistsShort = async () => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setArtistsShort(data.items);
  };
  useEffect(() => {
    getArtistsAllTime();
    getArtistsMid();
    getArtistsShort();
  }, []);

  return (
    <>
      <Navbar />
      {!artistsAllTime && !artistsMid && !artistsShort ? (
        <Loader />
      ) : (
        <div style={{ backgroundColor: '#181818', width: '100%' }}>
          <div className="top_artists_main">
            <div className="top_artists_link">
              <h3>Top Artists</h3>
              <div>
                <h4
                  className={
                    whatUserWants === 0
                      ? 'user_wants_active'
                      : 'top_artists_link_not_active'
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
                      ? 'user_wants_active'
                      : 'top_artists_link_not_active'
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
                      ? 'user_wants_active'
                      : 'top_artists_link_not_active'
                  }
                  onClick={() => {
                    setWhatUserWants(2);
                  }}
                >
                  Last 4 Weeks
                </h4>
              </div>
            </div>
            <div className="top_artists_grid">
              {artistsAllTime &&
                artistsMid &&
                artistsShort &&
                whatUserWants === 0 &&
                artistsAllTime.map((artist) => (
                  <div key={artist.id} className="top_artist_single">
                    <img
                      onClick={() => {
                        navigate(`/artist/${artist.id}`);
                      }}
                      alt={artist.name}
                      src={artist.images[0].url}
                    />
                    <h4
                      onClick={() => {
                        navigate(`/artist/${artist.id}`);
                      }}
                    >
                      {artist.name}
                    </h4>
                  </div>
                ))}
              {artistsAllTime &&
                artistsMid &&
                artistsShort &&
                whatUserWants === 1 &&
                artistsMid.map((artist) => (
                  <div key={artist.id} className="top_artist_single">
                    <img
                      onClick={() => {
                        navigate(`/artist/${artist.id}`);
                      }}
                      alt={artist.name}
                      src={artist.images[0].url}
                    />
                    <h4
                      onClick={() => {
                        navigate(`/artist/${artist.id}`);
                      }}
                    >
                      {artist.name}
                    </h4>
                  </div>
                ))}
              {artistsAllTime &&
                artistsMid &&
                artistsShort &&
                whatUserWants === 2 &&
                artistsShort.map((artist) => (
                  <div key={artist.id} className="top_artist_single">
                    <img
                      onClick={() => {
                        navigate(`/artist/${artist.id}`);
                      }}
                      alt={artist.name}
                      src={artist.images[0].url}
                    />
                    <h4
                      onClick={() => {
                        navigate(`/artist/${artist.id}`);
                      }}
                    >
                      {artist.name}
                    </h4>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopArtists;
