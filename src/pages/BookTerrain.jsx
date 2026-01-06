import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { getTerrainById } from '../data/terrains';
import Input from '../components/Input';
import Button from '../components/Button';
import { apiFetch } from '../utils/api';

const BookTerrain = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const terrain = getTerrainById(id);
  const inviteFriend = location.state?.inviteFriend;

  const storedUser = JSON.parse(localStorage.getItem('user'));

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    duration: 1,
    players: [{ name: 'You', email: '' }],
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    cardName: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (terrain) {
      setTotalPrice(terrain.price * formData.duration);
    }
  }, [formData.duration, terrain]);

  useEffect(() => {
    if (inviteFriend) {
      setFormData(prev => ({
        ...prev,
        players: [...prev.players, { name: 'Friend', email: '' }],
      }));
    }
  }, [inviteFriend]);

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

  const validate = () => {
    const newErrors = {};

    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Date cannot be in the past';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'Valid card number is required';
      }
      if (!formData.cardExpiry || !/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        newErrors.cardExpiry = 'Valid expiry date (MM/YY) is required';
      }
      if (!formData.cardCVC || formData.cardCVC.length !== 3) {
        newErrors.cardCVC = 'Valid CVC is required';
      }
      if (!formData.cardName) {
        newErrors.cardName = 'Cardholder name is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const payload = {
      user: storedUser?._id || null,
      terrainId: terrain.id || null,
      terrainName: terrain.name,
      terrainAddress: terrain.address,
      terrainCity: terrain.city,
      pricePerHour: terrain.price,
      date: formData.date,
      time: formData.time,
      duration: Number(formData.duration),
      players: formData.players,
      paymentMethod: formData.paymentMethod,
      totalPrice
    };

    try {
      const res = await apiFetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Booking failed');
      }

      const successMessage = formData.paymentMethod === 'cash' 
        ? `Réservation confirmée ! Vous paierez ${totalPrice} MAD sur place.`
        : 'Réservation confirmée !';
      alert(successMessage);
      navigate('/match-history');
    } catch (err) {
      console.error('Booking error', err);
      let errorMessage = err.message || 'unknown';
      
      // Gérer les erreurs de parsing JSON
      if (err.message.includes('JSON') || err.message.includes('<!DOCTYPE')) {
        errorMessage = 'Cannot connect to server. Please check your backend configuration or contact support.';
      }
      
      alert('Erreur lors de la réservation : ' + errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const addPlayer = () => {
    if (formData.players.length < 4) {
      setFormData(prev => ({
        ...prev,
        players: [...prev.players, { name: '', email: '' }],
      }));
    }
  };

  const removePlayer = (index) => {
    if (formData.players.length > 1) {
      setFormData(prev => ({
        ...prev,
        players: prev.players.filter((_, i) => i !== index),
      }));
    }
  };

  const updatePlayer = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      players: prev.players.map((player, i) =>
        i === index ? { ...player, [field]: value } : player
      ),
    }));
  };

  return (
    <div className="min-h-screen py-12 dark-gradient-bg particle-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <button
          onClick={() => navigate(`/terrain/${id}`)}
          className="flex items-center text-purple-400 hover:text-purple-300 mb-6 font-semibold transition-all duration-300 animate-fade-in-up"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Terrain
        </button>

        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-5xl font-extrabold text-white mb-3 gradient-text">Book {terrain.name}</h1>
          <p className="text-xl text-white/70">{terrain.city} • {terrain.address}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-3">📅</span>
                Booking Details
              </h2>
              { !storedUser ? (
                <div className="py-12 text-center">
                  <p className="text-lg text-white/80 mb-6">You must be logged in to book this terrain.</p>
                  <div className="flex items-center justify-center space-x-4">
                    <Link to="/login" className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold">Login</Link>
                    <Link to="/register" className="px-6 py-3 bg-transparent border-2 border-white/20 hover:border-white/40 text-white rounded-lg font-semibold">Register</Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <label className="block text-sm font-semibold text-white/90 mb-2">
                      Date <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-5 py-4 glass-card border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 text-white ${
                        errors.date ? 'border-red-500 focus:ring-red-500/20 animate-shake' : 'border-white/20 hover:border-purple-300/50 focus:border-purple-500'
                      }`}
                      required
                    />
                    {errors.date && (
                      <p className="mt-2 text-sm text-red-400 animate-fade-in">{errors.date}</p>
                    )}
                  </div>
                  <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <label className="block text-sm font-semibold text-white/90 mb-2">
                      Time <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 glass-card border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 text-white ${
                        errors.time ? 'border-red-500 focus:ring-red-500/20 animate-shake' : 'border-white/20 hover:border-purple-300/50 focus:border-purple-500'
                      }`}
                      required
                    />
                    {errors.time && (
                      <p className="mt-2 text-sm text-red-400 animate-fade-in">{errors.time}</p>
                    )}
                  </div>
                </div>

                {/* Duration */}
                <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Duration (hours)
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-5 py-4 glass-card border-2 border-white/20 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 text-white"
                  >
                    <option value={1}>1 hour</option>
                    <option value={1.5}>1.5 hours</option>
                    <option value={2}>2 hours</option>
                    <option value={3}>3 hours</option>
                  </select>
                </div>

                {/* Players */}
                <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-semibold text-white/90">
                      Players (1-4)
                    </label>
                    {formData.players.length < 4 && (
                      <button
                        type="button"
                        onClick={addPlayer}
                        className="text-purple-400 hover:text-purple-300 font-semibold text-sm transition-colors"
                      >
                        + Add Player
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {formData.players.map((player, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Name"
                            value={player.name}
                            onChange={(e) => updatePlayer(index, 'name', e.target.value)}
                            className="px-4 py-3 glass-card border-2 border-white/20 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 text-white placeholder:text-white/40"
                            required
                          />
                          <input
                            type="email"
                            placeholder="Email"
                            value={player.email}
                            onChange={(e) => updatePlayer(index, 'email', e.target.value)}
                            className="px-4 py-3 glass-card border-2 border-white/20 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 text-white placeholder:text-white/40"
                            required
                          />
                        </div>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => removePlayer(index)}
                            className="px-4 py-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 border border-red-500/30 transition-all"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Method */}
                <div className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                  <label className="block text-sm font-semibold text-white/90 mb-4">
                    Méthode de Paiement
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                      className={`p-4 border-2 rounded-xl font-semibold transition-all duration-300 ${
                        formData.paymentMethod === 'card'
                          ? 'border-purple-500 bg-purple-500/20 text-white'
                          : 'border-white/20 glass-card text-white/70 hover:border-purple-300/50'
                      }`}
                    >
                      💳 Carte Bancaire
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cash' }))}
                      className={`p-4 border-2 rounded-xl font-semibold transition-all duration-300 ${
                        formData.paymentMethod === 'cash'
                          ? 'border-green-500 bg-green-500/20 text-white'
                          : 'border-white/20 glass-card text-white/70 hover:border-green-300/50'
                      }`}
                    >
                      💵 Paiement sur Place
                    </button>
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-4 p-6 glass-card rounded-2xl border border-white/10">
                      <Input
                        label="Numéro de Carte"
                        name="cardNumber"
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\s/g, '').replace(/\D/g, '').slice(0, 16);
                          const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                          setFormData(prev => ({ ...prev, cardNumber: formatted }));
                        }}
                        error={errors.cardNumber}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Expiration (MM/AA)"
                          name="cardExpiry"
                          type="text"
                          value={formData.cardExpiry}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                            const formatted = value.length >= 2
                              ? `${value.slice(0, 2)}/${value.slice(2)}`
                              : value;
                            setFormData(prev => ({ ...prev, cardExpiry: formatted }));
                          }}
                          error={errors.cardExpiry}
                          placeholder="12/25"
                          maxLength={5}
                        />
                        <Input
                          label="CVC"
                          name="cardCVC"
                          type="text"
                          value={formData.cardCVC}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                            setFormData(prev => ({ ...prev, cardCVC: value }));
                          }}
                          error={errors.cardCVC}
                          placeholder="123"
                          maxLength={3}
                        />
                      </div>
                      <Input
                        label="Nom sur la Carte"
                        name="cardName"
                        type="text"
                        value={formData.cardName}
                        onChange={handleChange}
                        error={errors.cardName}
                        placeholder="Cardholder Name"
                      />
                    </div>
                  )}

                  {formData.paymentMethod === 'cash' && (
                    <div className="p-6 glass-card rounded-2xl border-2 border-green-500/50 bg-green-500/10">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl">💰</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-2">Paiement sur Place</h3>
                          <p className="text-white/80 text-sm leading-relaxed mb-3">
                            Vous réglerez directement sur place lors de votre arrivée au terrain. 
                            La réservation sera confirmée immédiatement et vous pourrez payer en espèces ou par carte sur place.
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-green-300">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Réservation immédiate sans paiement en ligne</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                <div className="animate-fade-in-up pt-2" style={{ animationDelay: '0.8s' }}>
                  <Button
                    type="submit"
                    className="w-full text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {formData.paymentMethod === 'cash' ? 'Confirmation de la réservation...' : 'Traitement du paiement...'}
                      </span>
                    ) : formData.paymentMethod === 'cash' ? (
                      `✅ Réserver (${totalPrice} MAD à payer sur place)`
                    ) : (
                      `💳 Payer ${totalPrice} MAD & Confirmer la Réservation`
                    )}
                  </Button>
                </div>
              </form>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-3xl p-6 shadow-2xl border border-white/10 sticky top-24 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-2xl font-bold text-white mb-6">Booking Summary</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-white/60">Terrain</p>
                  <p className="font-semibold text-white">{terrain.name}</p>
                </div>
                {formData.date && (
                  <div>
                    <p className="text-sm text-white/60">Date</p>
                    <p className="font-semibold text-white">
                      {new Date(formData.date).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {formData.time && (
                  <div>
                    <p className="text-sm text-white/60">Time</p>
                    <p className="font-semibold text-white">{formData.time}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-white/60">Duration</p>
                  <p className="font-semibold text-white">
                    {formData.duration} {formData.duration === 1 ? 'hour' : 'hours'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-white/60">Price per hour</p>
                  <p className="font-semibold text-white">{terrain.price} MAD</p>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-white">Total</p>
                    <p className="text-3xl font-bold gradient-text">{totalPrice} MAD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTerrain;
