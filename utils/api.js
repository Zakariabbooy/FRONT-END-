// API utilities for real-time data and external services

// Google Maps API configuration
export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY';

// Backend URLs (primary and optional alternate)
export const API_URL = import.meta.env.VITE_API_URL || 'https://backend-3-mqvn.onrender.com';
export const API_URL_ALT = import.meta.env.VITE_API_URL_ALT || '';

// Log configuration on load
console.log('🔌 API URL:', API_URL);

export async function apiFetch(path, options = {}, useAlt = false) {
  const base = useAlt && API_URL_ALT ? API_URL_ALT : (API_URL || '');
  const url = base ? `${base}${path}` : path;

  if (!base && path.startsWith('/api')) {
    const err = new Error('Backend API URL not configured');
    console.error('❌ ' + err.message);
    throw err;
  }

  const method = options.method || 'GET';
  console.log(`[API] ${method} ${url}`);

  try {
    const fetchOptions = {
      ...options,
    };

    if (options.body && !options.headers?.['Content-Type']) {
      if (!fetchOptions.headers) fetchOptions.headers = {};
      fetchOptions.headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(url, fetchOptions);
    console.log(`[API] ${method} ${url} -> ${res.status}`);
    return res;
  } catch (error) {
    console.error(`❌ API Error (${method} ${url}):`, error.message);
    throw error;
  }
}

// Real-time price fetching
export const fetchRealTimePrice = async (terrainId) => {
  try {
    // Replace with your actual API endpoint
    const response = await apiFetch(`/api/terrains/${terrainId}/price`);
    const data = await response.json();
    return data.price;
  } catch (error) {
    console.error('Error fetching real-time price:', error);
    return null;
  }
};

// Real-time availability checking
export const checkAvailability = async (terrainId, date, time) => {
  try {
    // Replace with your actual API endpoint
    const response = await apiFetch(`/api/terrains/${terrainId}/availability`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date, time }),
    });
    const data = await response.json();
    return data.available;
  } catch (error) {
    console.error('Error checking availability:', error);
    return false;
  }
};

// Payment processing
export const processPayment = async (bookingData, paymentMethod) => {
  try {
    // Replace with your actual payment API endpoint
    const response = await apiFetch('/api/payments/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...bookingData,
        paymentMethod,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};

// Get terrain location from Google Maps
export const getLocationFromMaps = async (address) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    }
    return null;
  } catch (error) {
    console.error('Error fetching location:', error);
    return null;
  }
};

// WebSocket connection for real-time updates (example)
export const connectWebSocket = (terrainId, onUpdate) => {
  // Replace with your WebSocket server URL
  const ws = new WebSocket(`wss://your-api.com/terrains/${terrainId}/updates`);
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onUpdate(data);
  };
  
  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  return ws;
};

