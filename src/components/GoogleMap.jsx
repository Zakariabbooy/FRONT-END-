import { useEffect, useRef } from 'react';
import { GOOGLE_MAPS_API_KEY } from '../utils/api';

const loadScript = (url) =>
  new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('No window')); 
    if (window.google && window.google.maps) return resolve();
    const s = document.createElement('script');
    s.src = url;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = (e) => reject(e);
    document.head.appendChild(s);
  });

const GoogleMap = ({ center = { lat: 33.5731, lng: -7.5898 }, zoom = 13, style = { height: '300px', width: '100%' } }) => {
  const ref = useRef(null);

  useEffect(() => {
    const key = GOOGLE_MAPS_API_KEY;
    if (!key || key === 'YOUR_GOOGLE_MAPS_API_KEY') {
      console.warn('Google Maps API key not set. Add VITE_GOOGLE_MAPS_API_KEY to Front/.env');
      return;
    }

    const url = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
    let mounted = true;

    loadScript(url)
      .then(() => {
        if (!mounted) return;
        const map = new window.google.maps.Map(ref.current, {
          center,
          zoom,
        });
        new window.google.maps.Marker({ position: center, map });
      })
      .catch((err) => console.error('Failed to load Google Maps', err));

    return () => {
      mounted = false;
    };
  }, [center, zoom]);

  return <div ref={ref} style={style} />;
};

export default GoogleMap;
