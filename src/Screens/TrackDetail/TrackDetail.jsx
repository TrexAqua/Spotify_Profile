import React, { useEffect } from 'react';
import Navbar from '../../Navbar/Navbar';
import styled from 'styled-components/macro';
import './TrackDetail.styles.css';
import FeatureChart from './FeatureChart';
import axios from 'axios';
import { parsePitchClass } from '../../utils';
import { useState } from 'react';
import Loader from '../../Components/Loader';

const TrackDetail = () => {
  const [track, setTrack] = useState(null);
  const [audioAnalysis, setAudioAnalysis] = useState(null);
  const [audioFeatures, setAudioFeatures] = useState(null);
  const trackId = window.location.href.split('/')[4];
  const token = JSON.parse(localStorage.getItem('spotify-token'));

  const getTrackAudioFeatures = async () => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/audio-features/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setAudioFeatures(data);
  };
  const getTrack = async () => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTrack(data);
  };
  const getAudioAnalysis = async () => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/audio-analysis/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setAudioAnalysis(data);
  };
  useEffect(() => {
    getTrack();
    getAudioAnalysis();
    getTrackAudioFeatures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const Feature = styled.div`
    padding: 15px 10px;
    border-bottom: 1px solid #434343;
    border-right: 1px solid #434343;
  `;
  const FeatureText = styled.h4`
    color: #b3b3b3;
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 0;
    font-family: 'Poppins', sans-serif;
  `;
  const FeatureLabel = styled.p`
    color: #b3b3b3;
    font-size: 12px;
    margin-bottom: 0;
    font-family: 'Poppins', sans-serif;
  `;

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  const playHandler = () => {
    window.open(track.external_urls.spotify, '_blank');
  };

  return (
    <>
      <Navbar />
      {track && audioAnalysis && audioFeatures ? (
        <div style={{ width: '100%', backgroundColor: '#181818' }}>
          <div className="track_detail_main">
            <div className="track_name_and_link">
              <div className="track_image">
                <img alt={track.name} src={track.album.images[0].url} />
              </div>
              <div className="track_details">
                <h2>{track.name}</h2>
                <h3>{track.artists[0].name}</h3>
                <h4>
                  {track.album.name} : {track.album.release_date.split('-')[0]}
                </h4>
                <button onClick={playHandler}>PLAY ON SPOTIFY</button>
              </div>
            </div>
            <div className="track_grid">
              <Feature>
                <FeatureText>
                  {millisToMinutesAndSeconds(track.duration_ms)}
                </FeatureText>
                <FeatureLabel>Duration</FeatureLabel>
              </Feature>
              <Feature>
                <FeatureText>{parsePitchClass(audioFeatures.key)}</FeatureText>
                <FeatureLabel>Key</FeatureLabel>
              </Feature>
              <Feature>
                <FeatureText>
                  {audioFeatures.mode === 1 ? 'Major' : 'Minor'}
                </FeatureText>
                <FeatureLabel>Modality</FeatureLabel>
              </Feature>
              <Feature>
                <FeatureText>{audioFeatures.time_signature}</FeatureText>
                <FeatureLabel>Time Signature</FeatureLabel>
              </Feature>
              <Feature>
                <FeatureText>{Math.round(audioFeatures.tempo)}</FeatureText>
                <FeatureLabel>Tempo(BPM)</FeatureLabel>
              </Feature>
              <Feature>
                <FeatureText>{track.popularity}%</FeatureText>
                <FeatureLabel>Popularity</FeatureLabel>
              </Feature>
              <Feature>
                <FeatureText>{audioAnalysis.bars.length}</FeatureText>
                <FeatureLabel>Bars</FeatureLabel>
              </Feature>
              <Feature>
                <FeatureText>{audioAnalysis.beats.length}</FeatureText>
                <FeatureLabel>Beats</FeatureLabel>
              </Feature>
              <Feature>
                <FeatureText>{audioAnalysis.sections.length}</FeatureText>
                <FeatureLabel>Sections</FeatureLabel>
              </Feature>
              <Feature>
                <FeatureText>{audioAnalysis.segments.length}</FeatureText>
                <FeatureLabel>Segments</FeatureLabel>
              </Feature>
            </div>
            <FeatureChart trackFeatures={audioFeatures} />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default TrackDetail;
