import React from 'react';
import backgroundImage from '../images/background.jpg'; // Adjust the path according to your folder structure

const BackgroundImageExample = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '500px',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 style={{ color: 'white', textAlign: 'center', paddingTop: '200px' }}>
        This is a div with a local background image
      </h1>
    </div>
  );
};

export default BackgroundImageExample;
