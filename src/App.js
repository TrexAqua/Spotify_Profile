import React from 'react';

const App = () => {
  const cliendId = '87c71027cead452a905fe9bca6e35a6b';
  const REDIRECT_URI = 'http://localhost:3000';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';

  return (
    <div>
      <h1>Spotify</h1>
      <a
        target="_blank"
        href={`${AUTH_ENDPOINT}?client_id=${cliendId}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        rel="noreferrer"
      >
        Login To Spotify
      </a>
    </div>
  );
};

export default App;
