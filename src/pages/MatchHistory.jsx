import { useState, useEffect } from 'react';
import { matchHistory, upcomingMatches } from '../data/matches';
import { apiFetch } from '../utils/api';
import Button from '../components/Button';

const MatchHistory = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [reservations, setReservations] = useState([]);
  const [user, setUser] = useState(null);
  const [confirmCancel, setConfirmCancel] = useState({ open: false, id: null });

  // Map reservations into match-like objects
  const mappedReservations = reservations.map((r) => ({
    id: r._id,
    terrainName: r.terrainName || r.terrain || 'Unknown Terrain',
    city: r.terrainCity || r.city || 'Unknown',
    date: r.date,
    time: r.time || '',
    players: (r.players && r.players.length) ? r.players.map(p => ({ name: p.name || p.email || 'Player' })) : [{ name: 'You' }],
    price: r.totalPrice || r.pricePerHour || 0,
    duration: r.duration || 1,
    status: new Date(r.date) >= new Date() ? 'upcoming' : 'completed',
  }));

  const allMatches = [...matchHistory, ...upcomingMatches, ...mappedReservations];
  const completedMatches = [...matchHistory, ...mappedReservations.filter(m => m.status === 'completed')];
  const upcoming = [...upcomingMatches, ...mappedReservations.filter(m => m.status === 'upcoming')];

  useEffect(() => {
    let mounted = true;
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    
    const fetchReservations = async () => {
      try {
        // Fetch reservations filtered by the current user
        const userId = storedUser?._id;
        const res = await apiFetch(`/api/reservations?user=${userId}`);
        if (!res.ok) return;
        const data = await res.json();
        if (mounted) setReservations(data || []);
      } catch (err) {
        console.error('Failed to load reservations', err);
      }
    };
    fetchReservations();
    return () => { mounted = false; };
  }, []);

  const handleCancel = (reservationId) => {
    if (!reservationId) return;
    setConfirmCancel({ open: true, id: reservationId });
  };

  const performCancel = async () => {
    const reservationId = confirmCancel.id;
    if (!reservationId) return setConfirmCancel({ open: false, id: null });
    try {
      const userId = user?._id;
      const res = await apiFetch(`/api/reservations/${reservationId}?user=${userId}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to cancel reservation');
      }
      setReservations((prev) => prev.filter((r) => r._id !== reservationId));
      setConfirmCancel({ open: false, id: null });
      alert('Reservation cancelled');
    } catch (err) {
      console.error('Cancel error', err);
      setConfirmCancel({ open: false, id: null });
      alert('Could not cancel reservation: ' + (err.message || 'unknown'));
    }
  };

  const getMatches = () => {
    switch (activeTab) {
      case 'completed':
        return completedMatches;
      case 'upcoming':
        return upcoming;
      default:
        return allMatches;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Unknown date';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen py-12 dark-gradient-bg particle-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-5xl font-extrabold text-white mb-3 gradient-text">Match History</h1>
          <p className="text-xl text-white/70">View all your past and upcoming matches</p>
        </div>

        {/* Tabs */}
        <div className="glass-card rounded-2xl p-2 mb-8 shadow-xl inline-flex border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {[
            { id: 'all', label: 'All Matches' },
            { id: 'completed', label: `Completed (${completedMatches.length})` },
            { id: 'upcoming', label: `Upcoming (${upcoming.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Matches List */}
        <div className="space-y-6">
          {getMatches().length === 0 ? (
            <div className="glass-card rounded-3xl p-12 text-center shadow-xl animate-fade-in-up">
              <svg className="w-16 h-16 mx-auto text-white/40 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-xl text-white/70">No matches found</p>
            </div>
          ) : (
            getMatches().map((match, index) => (
              <div
                key={match.id || match._id || index}
                className="glass-card rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/10 hover:border-purple-500/50 animate-fade-in-up hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Left Side */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{match.terrainName}</h3>
                        <div className="flex items-center space-x-4 text-white/70">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{match.city}</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{formatDate(match.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{match.time}</span>
                          </div>
                        </div>
                      </div>
                      {match.status === 'completed' && (
                        <span
                          className={`px-4 py-2 rounded-full font-bold ${
                            match.result === 'Won'
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                              : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                          }`}
                        >
                          {match.result}
                        </span>
                      )}
                      {match.status === 'upcoming' && (
                          <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-bold">
                            Upcoming
                          </span>
                        )}
                    </div>

                    {/* Players */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-white/70 mb-2">Players:</h4>
                      <div className="flex flex-wrap gap-2">
                        {(match.players || []).map((player, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-2 px-3 py-2 glass-card rounded-full border border-white/10"
                          >
                            {player.name === 'You' ? (
                              <>
                                <div className="w-6 h-6 bg-gradient-to-br from-indigo-600 to-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                  Y
                                </div>
                                <span className="text-sm font-medium text-white">{player.name}</span>
                              </>
                            ) : (
                              <>
                                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-white/70 text-xs font-bold">
                                  {player.name.charAt(0)}
                                </div>
                                <span className="text-sm text-white/70">{player.name}</span>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Score */}
                    {match.status === 'completed' && match.score && (
                      <div className="mb-2">
                        <span className="text-sm text-white/60">Score: </span>
                        <span className="text-lg font-bold text-white">{match.score}</span>
                      </div>
                    )}
                  </div>

                  {/* Right Side */}
                  <div className="flex flex-col items-end space-y-2">
                    <div className="text-right">
                      <p className="text-sm text-white/60">Total Price</p>
                      <p className="text-3xl font-bold gradient-text">{Number(match.price || 0).toFixed(0)} MAD</p>
                      <p className="text-xs text-white/50 mt-1">
                        {match.duration} {Number(match.duration) === 1 ? 'hour' : 'hours'}
                      </p>
                    </div>
                    {match.status === 'upcoming' && (
                      <Button variant="danger" className="text-sm" onClick={() => handleCancel(match.id || match._id)}>
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {confirmCancel.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="glass-card rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-white mb-4">Cancel Reservation</h3>
              <p className="text-white/80 mb-6">Are you sure you want to cancel this reservation?</p>
              <div className="flex items-center justify-end space-x-3">
                <button onClick={() => setConfirmCancel({ open: false, id: null })} className="px-4 py-2 bg-white/10 rounded">Keep</button>
                <button onClick={performCancel} className="px-4 py-2 bg-red-500 text-white rounded">Cancel Reservation</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchHistory;
