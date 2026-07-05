'use client';

import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in leaflet with webpack/nextjs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
    dragend(e) {
      setPosition(e.target.getCenter());
    }
  });

  // Also update position when map center changes (panning)
  useMapEvents({
    moveend(e) {
      setPosition(e.target.getCenter());
    }
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

export default function MapPicker({ lat, lng, onChange }) {
  // Default to Meerut if no lat/lng is provided
  const defaultPosition = { lat: 28.98, lng: 77.68 };
  const position = (lat && lng) ? { lat, lng } : defaultPosition;

  const handlePositionChange = (newPos) => {
    onChange(newPos.lat, newPos.lng);
  };

  return (
    <div style={{ height: '350px', width: '100%', borderRadius: '10px', overflow: 'hidden', border: '1px solid #ddd' }}>
      <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={handlePositionChange} />
      </MapContainer>
      <div style={{ padding: '8px', background: '#f5f5f5', fontSize: '12px', textAlign: 'center', color: '#666' }}>
        Drag the map or click to set the exact location for your office.
      </div>
    </div>
  );
}
