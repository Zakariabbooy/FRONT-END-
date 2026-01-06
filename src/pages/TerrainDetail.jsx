import { useParams, useNavigate } from 'react-router-dom';
import { getTerrainById } from '../data/terrains';
import Button from '../components/Button';
import GoogleMap from '../components/GoogleMap';
import { GOOGLE_MAPS_API_KEY } from '../utils/api';

const TerrainDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const terrain = getTerrainById(id);

  if (!terrain) {
    return (
      <div className="min-h-screen flex items-center justify-center dark-gradient-bg particle-bg">
        <div className="text-center glass-card p-8 rounded-3xl animate-fade-in-up">
          <h1 className="text-4xl font-bold text-white mb-4">Terrain Not Found</h1>
          <Button onClick={() => navigate('/')} variant="primary">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 dark-gradient-bg particle-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(`/terrains/${terrain.city}`)}
          className="flex items-center text-purple-400 hover:text-purple-300 mb-6 font-semibold transition-all duration-300 animate-fade-in-up"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to {terrain.city}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="glass-card rounded-3xl overflow-hidden shadow-2xl group relative animate-fade-in-up">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img
                src={terrain.image}
                alt={terrain.name}
                className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 -left-full group-hover:left-full transition-all duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent z-20"></div>
            </div>

            {/* City Image */}
            <div className="glass-card rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="relative h-64">
                <img
                  src={terrain.cityImage}
                  alt={terrain.city}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-3xl font-bold">{terrain.city}</h3>
                  <p className="text-sm text-white/80">Explore padel courts in this beautiful city</p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-extrabold text-white mb-3">{terrain.name}</h1>
                  <div className="flex items-center space-x-4 text-white/70">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{terrain.city}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="font-semibold">{terrain.rating}</span>
                    </div>
                  </div>
                </div>
                {terrain.available && (
                  <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-bold shadow-lg">
                    Available
                  </span>
                )}
              </div>

              <p className="text-white/80 text-lg mb-8 leading-relaxed">{terrain.description}</p>

              <div className="border-t border-white/10 pt-8">
                <h2 className="text-2xl font-bold text-white mb-4">Address</h2>
                <p className="text-white/70 mb-8">{terrain.address}</p>

                {/* Map Card using GoogleMap component */}
                <div className="glass-card rounded-2xl p-6 mb-8 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4">Location Map</h3>
                  <div className="bg-black/30 rounded-xl overflow-hidden shadow-inner h-64 relative">
                    {GOOGLE_MAPS_API_KEY && GOOGLE_MAPS_API_KEY !== 'YOUR_GOOGLE_MAPS_API_KEY' ? (
                      <GoogleMap
                        center={{ lat: terrain.coordinates.lat, lng: terrain.coordinates.lng }}
                        zoom={15}
                        style={{ height: '100%', width: '100%' }}
                      />
                    ) : (
                      <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps?q=${terrain.coordinates.lat},${terrain.coordinates.lng}&z=15&output=embed`}
                        title={`Map of ${terrain.name}`}
                      ></iframe>
                    )}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {terrain.amenities.map((amenity, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-2 p-4 glass-card rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                      >
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-white font-medium">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="glass-card rounded-3xl p-6 shadow-2xl border border-white/10 sticky top-24 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-purple-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-sm text-white/60">Phone</p>
                    <a href={`tel:${terrain.phone}`} className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                      {terrain.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-purple-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-white/60">Email</p>
                    <a href={`mailto:${terrain.email}`} className="text-purple-400 hover:text-purple-300 font-semibold break-all transition-colors">
                      {terrain.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-pink-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-white/60">Price</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-purple-300 font-bold text-xl">{terrain.priceDisplay}</p>
                      {terrain.realTimePrice && (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-semibold border border-green-500/30">
                          Real-time
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={() => navigate(`/book/${terrain.id}`)}
                  className="w-full"
                >
                  Book Now & Pay Online
                </Button>
                <Button
                  onClick={() => navigate('/contact')}
                  variant="outline"
                  className="w-full"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerrainDetail;
