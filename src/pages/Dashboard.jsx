import { useNavigate } from 'react-router-dom';
import { cities } from '../data/terrains';
import Button from '../components/Button';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-12 dark-gradient-bg particle-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 animate-fade-in-up">
          <h1 className="text-5xl font-extrabold text-white mb-3 gradient-text">Dashboard</h1>
          <p className="text-xl text-white/70">Welcome to your Padel Finder dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cities.map((city, index) => (
            <div
              key={city}
              onClick={() => navigate(`/terrains/${city}`)}
              className="glass-card rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer hover-lift border border-white/10 hover:border-purple-500/50 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center transform hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg">
                  <span className="text-white text-2xl font-bold">{city.charAt(0)}</span>
                </div>
                <svg className="w-6 h-6 text-purple-400 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{city}</h3>
              <p className="text-white/60 text-sm">Explore courts</p>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-3xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Browse Cities', desc: 'Explore all courts', path: '/', color: 'from-blue-500 to-cyan-500', icon: '🏙️' },
              { title: 'Match History', desc: 'View your matches', path: '/match-history', color: 'from-green-500 to-emerald-500', icon: '📊' },
              { title: 'Friends', desc: 'Invite & play together', path: '/friends', color: 'from-purple-500 to-pink-500', icon: '👥' },
              { title: 'Contact', desc: 'Get support', path: '/contact', color: 'from-indigo-500 to-purple-500', icon: '💬' },
            ].map((action, index) => (
              <button
                key={index}
                onClick={() => navigate(action.path)}
                className={`p-6 glass-card rounded-2xl hover:shadow-xl transition-all duration-500 text-left border border-white/10 hover:border-purple-500/50 group animate-fade-in-up`}
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center text-2xl mb-3 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  {action.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{action.title}</h3>
                <p className="text-white/60 text-sm">{action.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
