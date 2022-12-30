import React from 'react';
import './HomeTracks.styles.css';
import TopArtist from './TopArtist/TopArtist';
import TopTracks from './TopTracks/TopTracks';
const HomeTracks = ({ topArtists, topTracks }) => {
  return (
    <div className="hometracks_main">
      <TopArtist topArtists={topArtists}/>
      <TopTracks topTracks={topTracks} />
    </div>
  );
};

export default HomeTracks;
