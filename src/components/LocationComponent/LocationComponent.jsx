import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => (
  <div style={{
    color: 'white',
    position: 'absolute',
    top: '-20px',
    left: '-10px',
    width: '0',
    height: '0',
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderBottom: '20px solid red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'translate(-50%, -50%)',
  }}>
    <span style={{
      marginTop: '-30px',
      fontSize: '12px',
    }}>{text}</span>
  </div>
);

function LocationComponent({ location, onAddressFetch }) {
  useEffect(() => {
    if (!location.coordinates || location.coordinates.length !== 2 || 
        (location.coordinates[0] === 0 && location.coordinates[1] === 0)) {
      onAddressFetch('Ubicación no geolocalizada');
      return;
    }

    const getAddressFromCoordinates = async () => {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coordinates[1]},${location.coordinates[0]}&key=${apiKey}`
        );
        const data = await response.json();
        if (data.status === 'OK') {
          const fetchedAddress = data.results[0].formatted_address;
          onAddressFetch(fetchedAddress);
        }
      } catch (error) {
        console.error('Error fetching address:', error);
        onAddressFetch('Error al obtener la dirección');
      }
    };

    getAddressFromCoordinates();
  }, [location, onAddressFetch]);

  if (!location.coordinates || location.coordinates.length !== 2 ||
      (location.coordinates[0] === 0 && location.coordinates[1] === 0)) {
    return (
      <div style={{ 
        height: '400px', 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: 'column', 
        fontSize: '24px', 
        color: 'black',
        textAlign: 'center', 
        lineHeight: '1.5' 
      }}>
        {"Ubicación no geolocalizada".split(" ").map((word, index) => (
          <div key={index}>{word}</div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{
          lat: location.coordinates[1],
          lng: location.coordinates[0]
        }}
        defaultZoom={11}
      >
        <Marker
          lat={location.coordinates[1]}
          lng={location.coordinates[0]}
        />
      </GoogleMapReact>
    </div>
  );
}

export default LocationComponent;

