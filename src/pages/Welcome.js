import React from 'react';
import { useNavigate } from 'react-router-dom';
import ashaImage from '../assets/ashaa.jpg'; // put your ASHA worker image in src/assets

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center'
    }}>
      <img src={ashaImage} alt="ASHA Worker" style={{ width: '350px', marginBottom: '20px' }} />
      
      {/* Main welcome text */}
      <h1 style={{
        fontSize: '48px',       // larger size
        fontWeight: 'bold',     // bold
        color: '#000',          // black
        marginBottom: '10px'
      }}>
        Welcome to SevaaYukti
      </h1>

      {/* Odia version */}
      <h2 style={{
        fontSize: '32px',       // slightly smaller
        fontWeight: 'bold',
        color: '#000',
        marginBottom: '30px'
      }}>
        ସେବାୟୁକ୍ତିକୁ ସ୍ୱାଗତ
      </h2>

      <button
        style={{
          padding: '12px 24px',
          fontSize: '18px',
          cursor: 'pointer',
          borderRadius: '8px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none'
        }}
        onClick={() => navigate('/home')}
      >
        Get Started
      </button>
    </div>
  );
};

export default Welcome;