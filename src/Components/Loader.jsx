import React from 'react';
import { Bars } from 'react-loader-spinner';
const Loader = () => {
  return (
    <>
      <div
        style={{
          textAlign: 'center',
          height: '100vh',
          backgroundColor: '#181818',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{
            backgroundColor: '#181818',
          }}
          wrapperClass=""
          visible={true}
        />
      </div>
    </>
  );
};

export default Loader;
