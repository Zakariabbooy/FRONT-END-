import { useParams, useNavigate } from 'react-router-dom';
import { getTerrainsByCity, cities } from '../data/terrains';
import Button from '../components/Button';

const Terrains = () => {
  const { city } = useParams();
  const navigate = useNavigate();
  const terrains = getTerrainsByCity(city);

  if (!cities.includes(city)) {
    return (
      <div className="min-h-screen flex items-center justify-center dark-gradient-bg particle-bg">
        <div className="text-center glass-card p-8 rounded-3xl animate-fade-in-up">
          <h1 className="text-4xl font-bold text-white mb-4">City Not Found</h1>
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
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-purple-400 hover:text-purple-300 mb-4 font-semibold transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
          {terrains.length > 0 && (
            <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl mb-6 glass-card border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <img
                src={terrains[0].cityImage}
                alt={city}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h1 className="text-5xl font-extrabold mb-2 gradient-text">{city}</h1>
                <p className="text-2xl text-white/80">
                  {terrains.length} {terrains.length === 1 ? 'court available' : 'courts available'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Terrains Grid */}
        {terrains.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-3xl animate-fade-in-up">
            <p className="text-xl text-white/70">No courts available in {city} yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {terrains.map((terrain, index) => (
              <div
                key={terrain.id}
                onClick={() => navigate(`/terrain/${terrain.id}`)}
                className="glass-card rounded-3xl overflow-hidden shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer group border border-white/10 hover:border-purple-500/50 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 group-hover:from-black/40 transition-all duration-500"></div>
                  <img
                    src={terrain.image}
                    alt={terrain.name}
                    className="w-full h-full object-cover group-hover:scale-125 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500 z-10"></div>
                  
                  <div className="absolute top-4 right-4 glass-card px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg z-20">
                    <svg className="w-5 h-5 text-yellow-400 fill-current animate-pulse" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span className="text-sm font-bold text-white">{terrain.rating}</span>
                  </div>
                  {terrain.available && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl z-20 badge-pulse">
                      ✓ Available
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {terrain.name}
                  </h3>
                  <p className="text-white/70 mb-4 line-clamp-2">{terrain.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-white/70">
                      <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm">{terrain.address}</span>
                    </div>
                    <div className="flex items-center text-white/70">
                      <svg className="w-5 h-5 mr-2 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-purple-300">{terrain.priceDisplay}</span>
                        {terrain.realTimePrice && (
                          <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full font-semibold border border-green-500/30">
                            Real-time
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {terrain.amenities.slice(0, 3).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
                      >
                        {amenity}
                      </span>
                    ))}
                    {terrain.amenities.length > 3 && (
                      <span className="px-3 py-1 bg-white/10 text-white/70 text-xs rounded-full border border-white/20">
                        +{terrain.amenities.length - 3}
                      </span>
                    )}
                  </div>

                  <Button variant="primary" className="w-full">
                    View Details →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Terrains;
