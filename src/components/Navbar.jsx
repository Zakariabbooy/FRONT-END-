import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';

const Navbar = ({ isAuthenticated, onLogout, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };

    const handleKey = (e) => {
      if (e.key === 'Escape') setAccountOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <nav className="glass-card relative border-b border-white/10 animate-fade-in z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with animation */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-purple-500/50">
                <span className="text-white text-2xl font-bold">🎾</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-pink-400 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
            </div>
            <span className="text-3xl font-extrabold gradient-text">
              Padel Finder
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="px-4 py-2 text-white/80 hover:text-white font-semibold transition-all duration-300 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 text-white/80 hover:text-white font-semibold transition-all duration-300 relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-white/80 hover:text-white font-semibold transition-all duration-300 relative group"
                >
                  Dashboard
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                  to="/match-history"
                  className="px-4 py-2 text-white/80 hover:text-white font-semibold transition-all duration-300 relative group"
                >
                  Matches
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                  to="/friends"
                  className="px-4 py-2 text-white/80 hover:text-white font-semibold transition-all duration-300 relative group"
                >
                  Friends
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                {/* Account Icon */}
                <div className="relative ml-6" ref={accountRef}>
                  <button
                    aria-haspopup="true"
                    aria-expanded={accountOpen}
                    onClick={() => setAccountOpen((s) => !s)}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 border border-white/20"
                  >
                    {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                  </button>

                  {/* Account Dropdown */}
                  {accountOpen && (
                    <div className="absolute right-0 mt-2 w-56 glass-card rounded-2xl border border-white/10 shadow-2xl z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-white font-semibold text-sm truncate">
                          {user?.name || user?.email || 'User'}
                        </p>
                        <p className="text-white/60 text-xs truncate">
                          {user?.email || 'No email'}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setAccountOpen(false);
                          navigate('/dashboard');
                        }}
                        className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-all duration-300 text-sm font-semibold"
                      >
                        📊 Dashboard
                      </button>
                      <button
                        onClick={() => {
                          setAccountOpen(false);
                          handleLogout();
                        }}
                        className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/10 transition-all duration-300 text-sm font-semibold border-t border-white/10"
                      >
                        🚪 Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-6 py-2 text-white/80 hover:text-white font-semibold transition-all duration-300 relative group"
                >
                  Login
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link to="/register">
                  <Button variant="primary">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 rounded-xl text-white hover:bg-white/10 transition-all duration-300 relative"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <span
                className={`block h-0.5 w-6 bg-white transform transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transform transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-3 glass-card border-t border-white/10">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block py-3 px-4 text-white hover:bg-white/10 font-semibold rounded-xl transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block py-3 px-4 text-white hover:bg-white/10 font-semibold rounded-xl transition-all duration-300"
          >
            Contact
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 text-white hover:bg-white/10 font-semibold rounded-xl transition-all duration-300"
              >
                Dashboard
              </Link>
              <Link
                to="/match-history"
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 text-white hover:bg-white/10 font-semibold rounded-xl transition-all duration-300"
              >
                Matches
              </Link>
              <Link
                to="/friends"
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 text-white hover:bg-white/10 font-semibold rounded-xl transition-all duration-300"
              >
                Friends
              </Link>
              <Button
                onClick={handleLogout}
                variant="primary"
                className="w-full mt-4"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 text-white hover:bg-white/10 font-semibold rounded-xl transition-all duration-300"
              >
                Login
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                <Button variant="primary" className="w-full mt-2">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
