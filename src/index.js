import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Screens/Home/Home';
import BeforeLogin from './Screens/BeforeLogin/BeforeLogin';
import ArtistDetail from './Screens/ArtistDetail/ArtistDetail';
import TrackDetail from './Screens/TrackDetail/TrackDetail';
import TopArtists from './Screens/TopArtists/TopArtists';
import TopTracksMain from './Screens/TopTracksMain/TopTracksDisplay';
import Recents from './Screens/Recents/Recents';
import Playlists from './Screens/Playlists/Playlists';
import PlaylistDetail from './Screens/PlaylistDetail/PlaylistDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <BeforeLogin />,
  },
  {
    path: '/user',
    element: <Home />,
  },
  {
    path: '/top-artists',
    element: <TopArtists />,
  },
  {
    path: '/top-tracks',
    element: <TopTracksMain />,
  },
  {
    path: '/recent',
    element: <Recents />,
  },
  {
    path: '/playlists',
    element: <Playlists />,
  },
  {
    path: '/artist/:artistId',
    element: <ArtistDetail />,
  },
  {
    path: '/playlist/:playlistId',
    element: <PlaylistDetail />,
  },
  {
    path: '/track/:trackId',
    element: <TrackDetail />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
