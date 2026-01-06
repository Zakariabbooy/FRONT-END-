// City images mapping - using local images
export const cityImages = {
  Casablanca: "/images/p1.webp",
  Rabat: "/images/p3.webp",
  Marrakech: "/images/p5.webp",
  Fes: "/images/pp6.jpg",
};

// Padel court images - using local images
const padelImages = {
  // Casablanca terrains
  casa1: "/images/p1.webp",
  casa2: "/images/p2.jpeg",
  // Rabat terrains
  rabat1: "/images/p3.webp",
  rabat2: "/images/pp4.jpg",
  // Marrakech terrain
  marrakech1: "/images/p5.webp",
  // Fes terrain
  fes1: "/images/pp6.jpg",
};

// Mock data for 6 terrains across 4 cities
export const terrains = [
  // Casablanca - 2 terrains
  {
    id: 1,
    name: "Padel Club Casa",
    city: "Casablanca",
    address: "Boulevard Mohammed V, Casablanca",
    phone: "+212 6 63 29 18 61",
    email: "anaselm83@gmail.com",
    price: 200, // Real-time price in MAD
    priceDisplay: "200 MAD/hour",
    rating: 4.8,
    image: padelImages.casa1, // Local padel image
    cityImage: cityImages.Casablanca,
    description: "Modern padel court with excellent lighting and premium facilities",
    amenities: ["Parking", "Changing Rooms", "Café", "WiFi"],
    coordinates: { lat: 33.5731, lng: -7.5898 },
    available: true,
    realTimePrice: true, // Indicates real-time pricing
  },
  {
    id: 2,
    name: "Elite Padel Center",
    city: "Casablanca",
    address: "Ain Diab, Casablanca",
    phone: "+212 6 63 29 18 61",
    email: "anaselm83@gmail.com",
    price: 250,
    priceDisplay: "250 MAD/hour",
    rating: 4.9,
    image: padelImages.casa2, // Local padel image
    cityImage: cityImages.Casablanca,
    description: "Premium padel facility with professional-grade courts",
    amenities: ["Parking", "Pro Shop", "Restaurant", "Air Conditioning"],
    coordinates: { lat: 33.5950, lng: -7.6180 },
    available: true,
    realTimePrice: true,
  },
  // Rabat - 2 terrains
  {
    id: 3,
    name: "Royal Padel Rabat",
    city: "Rabat",
    address: "Agdal, Rabat",
    phone: "+212 6 63 29 18 61",
    email: "anaselm83@gmail.com",
    price: 180,
    priceDisplay: "180 MAD/hour",
    rating: 4.7,
    image: padelImages.rabat1, // Local padel image
    cityImage: cityImages.Rabat,
    description: "Spacious courts in the heart of Rabat with great atmosphere",
    amenities: ["Parking", "Locker Rooms", "Snack Bar", "WiFi"],
    coordinates: { lat: 34.0209, lng: -6.8416 },
    available: true,
    realTimePrice: true,
  },
  {
    id: 4,
    name: "Capital Padel Club",
    city: "Rabat",
    address: "Hay Riad, Rabat",
    phone: "+212 6 63 29 18 61",
    email: "anaselm83@gmail.com",
    price: 220,
    priceDisplay: "220 MAD/hour",
    rating: 4.6,
    image: padelImages.rabat2, // Local padel image
    cityImage: cityImages.Rabat,
    description: "Family-friendly padel club with multiple courts",
    amenities: ["Parking", "Kids Area", "Café", "WiFi", "Showers"],
    coordinates: { lat: 34.0133, lng: -6.8530 },
    available: true,
    realTimePrice: true,
  },
  // Marrakech - 1 terrain
  {
    id: 5,
    name: "Red City Padel",
    city: "Marrakech",
    address: "Gueliz, Marrakech",
    phone: "+212 6 63 29 18 61",
    email: "anaselm83@gmail.com",
    price: 190,
    priceDisplay: "190 MAD/hour",
    rating: 4.8,
    image: padelImages.marrakech1, // Local padel image
    cityImage: cityImages.Marrakech,
    description: "Beautiful padel courts with traditional Moroccan architecture",
    amenities: ["Parking", "Terrace", "Restaurant", "WiFi"],
    coordinates: { lat: 31.6295, lng: -7.9811 },
    available: true,
    realTimePrice: true,
  },
  // Fes - 1 terrain
  {
    id: 6,
    name: "Fes Padel Arena",
    city: "Fes",
    address: "Fes Ville Nouvelle, Fes",
    phone: "+212 6 63 29 18 61",
    email: "anaselm83@gmail.com",
    price: 170,
    priceDisplay: "170 MAD/hour",
    rating: 4.5,
    image: padelImages.fes1, // Local padel image
    cityImage: cityImages.Fes,
    description: "Modern padel facility in the historic city of Fes",
    amenities: ["Parking", "Changing Rooms", "Café", "WiFi"],
    coordinates: { lat: 34.0331, lng: -5.0003 },
    available: true,
    realTimePrice: true,
  },
];

export const cities = ["Casablanca", "Rabat", "Marrakech", "Fes"];

export const getTerrainsByCity = (city) => {
  return terrains.filter(terrain => terrain.city === city);
};

export const getTerrainById = (id) => {
  return terrains.find(terrain => terrain.id === parseInt(id));
};
