'use client';

import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, LayersControl, LayerGroup, useMap } from 'react-leaflet';
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

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

function MapUpdater({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom());
    }
  }, [position, map]);
  return null;
}

export default function MapPicker({ lat, lng, onChange }) {
  const defaultPosition = { lat: 28.98, lng: 77.68 };
  const position = (lat && lng) ? { lat, lng } : defaultPosition;

  const [searchQuery, setSearchQuery] = useState('');
  const [inputLat, setInputLat] = useState(lat || '');
  const [inputLng, setInputLng] = useState(lng || '');

  useEffect(() => {
    if (lat) setInputLat(lat);
    if (lng) setInputLng(lng);
  }, [lat, lng]);

  const handlePositionChange = (newPos) => {
    onChange(newPos.lat, newPos.lng);
  };

  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data && data.length > 0) {
        onChange(parseFloat(data[0].lat), parseFloat(data[0].lon));
      } else {
        alert("Location not found. Please try a different address.");
      }
    } catch (err) {
      console.error(err);
      alert("Error searching location.");
    }
  };

  const handleLatLngSubmit = () => {
    const nLat = parseFloat(inputLat);
    const nLng = parseFloat(inputLng);
    if (!isNaN(nLat) && !isNaN(nLng)) {
      onChange(nLat, nLng);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text" 
            placeholder="Search address (e.g. Connaught Place, Delhi)" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, padding: '0.6rem', border: '1px solid #ddd', borderRadius: '6px', color: '#333' }}
          />
          <button type="button" onClick={handleSearch} style={{ padding: '0.6rem 1rem', background: '#0b1c2c', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Search
          </button>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input 
            type="number" 
            step="any"
            placeholder="Latitude" 
            value={inputLat}
            onChange={(e) => setInputLat(e.target.value)}
            style={{ flex: 1, padding: '0.6rem', border: '1px solid #ddd', borderRadius: '6px', color: '#333' }}
          />
          <input 
            type="number" 
            step="any"
            placeholder="Longitude" 
            value={inputLng}
            onChange={(e) => setInputLng(e.target.value)}
            style={{ flex: 1, padding: '0.6rem', border: '1px solid #ddd', borderRadius: '6px', color: '#333' }}
          />
          <button type="button" onClick={handleLatLngSubmit} style={{ padding: '0.6rem 1rem', background: '#b98e46', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Go
          </button>
        </div>
      </div>

      <div style={{ height: '350px', width: '100%', borderRadius: '10px', overflow: 'hidden', border: '1px solid #ddd' }}>
      <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Standard View">
            <TileLayer
              attribution='&copy; Google Maps'
              url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite View">
            <TileLayer
              attribution='&copy; Google Maps Satellite'
              url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <LocationMarker position={position} setPosition={handlePositionChange} />
        <MapUpdater position={position} />
      </MapContainer>
      <div style={{ padding: '8px', background: '#f5f5f5', fontSize: '12px', textAlign: 'center', color: '#666' }}>
        Click anywhere on the map to set the exact location for your office. Dragging the map will not change the location.
      </div>
    </div>
  );
}
