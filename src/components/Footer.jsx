import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [cookiesAccepted, setCookiesAccepted] = useState(() => {
    try {
      return localStorage.getItem('cookiesAccepted') === 'true';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      const accepted = localStorage.getItem('cookiesAccepted') === 'true';
      setCookiesAccepted(accepted);
    } catch (e) {
      // ignore
    }
  }, []);

  const handleAcceptCookies = () => {
    try {
      localStorage.setItem('cookiesAccepted', 'true');
    } catch (e) {}
    setCookiesAccepted(true);
  };

  return (
    <footer className="mt-12">
      {/* Top purple stripe */}
      <div className="bg-purple-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-[#0b0b10] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-pink-500 rounded flex items-center justify-center">🎾</div>
                <div className="text-lg font-bold">Padel Finder</div>
              </div>
              <p className="text-white/70 text-sm">Find the best padel courts across Morocco's major cities. Book and invite friends.</p>
            </div>

            <div>
              <h4 className="uppercase text-white/90 font-bold mb-4">Products</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><Link to="/" className="hover:text-white">Discover Courts</Link></li>
                <li><Link to="/match-history" className="hover:text-white">Match History</Link></li>
                <li><Link to="/friends" className="hover:text-white">Friends</Link></li>
                <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="uppercase text-white/90 font-bold mb-4">Useful Links</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Help</a></li>
              </ul>
            </div>

            <div>
              <h4 className="uppercase text-white/90 font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>📍 Fes, Morocco</li>
                <li>✉️ anaselm83@gmail.com</li>
                <li>📞 +212 6 63 29 18 61</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="bg-[#0a0a0f] border-t border-white/5 py-4 text-white/60 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>© {new Date().getFullYear()} Padel Finder</div>
         
        </div>
      </div>

      {/* Cookies Notice (fixed at bottom) */}
      {!cookiesAccepted && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-3xl w-full px-4">
          <div className="glass-card rounded-xl p-5 border-2 border-yellow-500/50 bg-yellow-500/20 shadow-lg animate-fade-in-up">
            <div className="flex items-start space-x-3">
              <span className="text-2xl mt-0">🍪</span>
              <div className="flex-1">
                <p className="text-base text-white font-bold mb-2">Cookies & Privacy Policy</p>
                <p className="text-sm text-white/80 mb-3 leading-relaxed">
                  Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre{' '}
                  <a href="#" className="text-yellow-300 hover:text-yellow-200 underline font-semibold">Politique de Confidentialité</a>{' '}
                  et nos <a href="#" className="text-yellow-300 hover:text-yellow-200 underline font-semibold">Conditions d'Utilisation</a>.
                </p>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={handleAcceptCookies}
                    className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-bold border-2 border-yellow-400 transition-all transform hover:scale-105 shadow-md"
                  >
                    ✓ J'accepte les cookies
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
