import { useNavigate } from 'react-router-dom';
import { cities } from '../data/terrains';
import Button from '../components/Button';

const Home = () => {
  const navigate = useNavigate();

  const handleCitySelect = (city) => {
    navigate(`/terrains/${city}`);
  };

  return (
    <div className="min-h-screen dark-gradient-bg particle-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 sm:py-40">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="inline-block mb-4 animate-float">
              <div className="w-24 h-24 mx-auto glass-card rounded-3xl flex items-center justify-center mb-6 shadow-2xl animate-scale-in">
                <span className="text-5xl font-bold">🎾</span>
              </div>
            </div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold leading-tight">
              <span className="block animate-fade-in-up gradient-text" style={{ animationDelay: '0.1s' }}>
                Find Your Perfect
              </span>
              <span className="block mt-2 text-white animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Padel Court
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              Discover the best padel terrains across Morocco's major cities. 
              <span className="block mt-2 text-purple-300 font-semibold">Book instantly • Real-time prices • Premium courts</span>
            </p>
            
            <div className="pt-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button
                onClick={() => document.getElementById('cities').scrollIntoView({ behavior: 'smooth' })}
                variant="primary"
                className="text-lg px-10 py-5"
              >
                🚀 Explore Cities Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section id="cities" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 gradient-text">
              Choose Your City
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Select a city to explore available padel courts with premium facilities
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {cities.map((city, index) => (
              <div
                key={city}
                onClick={() => handleCitySelect(city)}
                className="group relative glass-card rounded-3xl p-8 cursor-pointer hover-lift border border-white/10 hover:border-purple-500/50 shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-in-up"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 rounded-3xl"></div>
                
                <div className="relative z-10 text-center space-y-5">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-purple-500/50">
                    <span className="text-4xl font-bold text-white">
                      {city.charAt(0)}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-extrabold text-white group-hover:text-purple-300 transition-colors duration-300">
                    {city}
                  </h3>
                  
                  <p className="text-white/60 text-sm">
                    Explore premium padel courts
                  </p>
                  
                  <div className="pt-3">
                    <span className="inline-flex items-center text-purple-400 font-bold group-hover:text-purple-300 group-hover:translate-x-2 transition-all duration-300">
                      View Courts
                      <svg className="ml-2 w-5 h-5 transform group-hover:scale-125 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl sm:text-6xl font-extrabold text-white mb-6">
              Why Choose <span className="gradient-text">Padel Finder?</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Everything you need for the perfect padel experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '📍',
                title: 'Best Locations',
                description: 'Find padel courts in prime locations across Morocco',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: '💰',
                title: 'Best Prices',
                description: 'Compare prices and find the best deals with real-time pricing',
                color: 'from-green-500 to-emerald-500',
              },
              {
                icon: '⭐',
                title: 'Top Rated',
                description: 'Only the highest rated courts in each city',
                color: 'from-yellow-500 to-orange-500',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative glass-card rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift border border-white/10 hover:border-purple-500/50 animate-fade-in-up"
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'both'
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
                
                <div className="relative z-10 text-center">
                  <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-4xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
