import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import './ArtistDetail.styles.css';
import axios from 'axios';
import Loader from '../../Components/Loader';
const ArtistDetail = () => {
  const [artistInfo, setArtistInfo] = useState();
  const artistId = window.location.pathname.split('/')[2];
  const token = JSON.parse(localStorage.getItem('spotify-token'));

  const getArtistDetails = async () => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setArtistInfo(data);
  };
  useEffect(() => {
    getArtistDetails();
  }, []);
  return (
    <>
      {artistInfo ? (
        <div className="artist_detail">
          <Navbar />
          <div className="artist_detail_main">
            <img src={artistInfo.images[0].url} alt={artistInfo.name} />
            <h1>{artistInfo.name}</h1>
            <div className="artist_info">
              <div>
                <h3>{artistInfo.followers.total}</h3>
                <p>FOLLOWERS</p>
              </div>
              <div>
                <h3>{artistInfo.genres[0]}</h3>
                <p>GENRES</p>
              </div>
              <div>
                <h3>{artistInfo.popularity}%</h3>
                <p>POPULARITY</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ArtistDetail;
