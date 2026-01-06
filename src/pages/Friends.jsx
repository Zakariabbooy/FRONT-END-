import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../utils/api';
import Button from '../components/Button';
import Input from '../components/Input';

const Friends = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [pendingInvites, setPendingInvites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [friendConfirm, setFriendConfirm] = useState({ open: false, id: null });

  // Load user data and fetch friends on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);

    const fetchFriendsData = async () => {
      if (!storedUser?._id) return;

      try {
        setLoading(true);

        // Fetch friends list
        const friendsRes = await apiFetch(`/api/friends/list/${storedUser._id}`);
        if (friendsRes.ok) {
          const friendsData = await friendsRes.json();
          setFriends(friendsData || []);
        }

        // Fetch pending invites
        const invitesRes = await apiFetch(`/api/friends/invites/${storedUser._id}`);
        if (invitesRes.ok) {
          const invitesData = await invitesRes.json();
          setPendingInvites(invitesData || []);
        }
      } catch (err) {
        console.error('Failed to load friends data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFriendsData();
  }, []);

  const filteredFriends = friends.filter(item => {
    const friend = item.friend;
    return (
      friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleInviteFriend = async (e) => {
    e.preventDefault();

    if (!user?._id || !inviteEmail) {
      alert('Please enter an email address');
      return;
    }

    try {
      const res = await apiFetch('/api/friends/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          friendEmail: inviteEmail,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to send invite');
      }

      alert(`Invite sent to ${inviteEmail}`);
      setInviteEmail('');
      setShowInviteModal(false);
    } catch (err) {
      console.error('Invite error:', err);
      const msg = err?.message || 'Unknown error';
      if (msg.includes('Backend API URL not configured')) {
        alert("Impossible d'envoyer l'invitation : backend non configuré. Définissez VITE_API_URL.");
      } else {
        alert('Erreur lors de l\'invitation : ' + msg);
      }
    }
  };

  const handleAcceptInvite = async (inviteId) => {
    try {
      const res = await apiFetch(`/api/friends/invites/${inviteId}/accept`, {
        method: 'PUT',
      });

      if (!res.ok) {
        throw new Error('Failed to accept invite');
      }

      // Remove from pending invites
      setPendingInvites(prev => prev.filter(i => i._id !== inviteId));

      // Refresh friends list
      const friendsRes = await apiFetch(`/api/friends/list/${user._id}`);
      if (friendsRes.ok) {
        const friendsData = await friendsRes.json();
        setFriends(friendsData || []);
      }

      alert('Friend request accepted!');
    } catch (err) {
      console.error('Accept error:', err);
      const msg = err?.message || 'Unknown error';
      if (msg.includes('Backend API URL not configured')) {
        alert("Impossible d'accepter l'invitation : backend non configuré. Définissez VITE_API_URL.");
      } else {
        alert('Erreur : ' + msg);
      }
    }
  };

  const handleDeclineInvite = async (inviteId) => {
    try {
      const res = await apiFetch(`/api/friends/invites/${inviteId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to decline invite');
      }

      setPendingInvites(prev => prev.filter(i => i._id !== inviteId));
      alert('Friend request declined');
    } catch (err) {
      console.error('Decline error:', err);
      const msg = err?.message || 'Unknown error';
      if (msg.includes('Backend API URL not configured')) {
        alert("Impossible de refuser l'invitation : backend non configuré. Définissez VITE_API_URL.");
      } else {
        alert('Erreur : ' + msg);
      }
    }
  };

  const handleRemoveFriend = async (friendRelationId) => {
    // open confirmation modal instead of browser confirm
    setFriendConfirm({ open: true, id: friendRelationId });
  };

  const performRemoveFriend = async () => {
    const id = friendConfirm.id;
    if (!id) return setFriendConfirm({ open: false, id: null });
    try {
      const res = await apiFetch(`/api/friends/${id}?userId=${user._id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to remove friend');
      }

      setFriends(prev => prev.filter(f => f._id !== id));
      setFriendConfirm({ open: false, id: null });
      alert('Friend removed');
    } catch (err) {
      console.error('Remove error:', err);
      setFriendConfirm({ open: false, id: null });
      const msg = err?.message || 'Unknown error';
      if (msg.includes('Backend API URL not configured')) {
        alert("Impossible de supprimer l'ami : backend non configuré. Définissez VITE_API_URL.");
      } else {
        alert('Erreur : ' + msg);
      }
    }
  };

  const handleInviteToMatch = (friendId) => {
    navigate(`/book/1`, { state: { inviteFriend: friendId } });
  };

  return (
    <div className="min-h-screen py-12 dark-gradient-bg particle-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in-up">
          <div>
            <h1 className="text-5xl font-extrabold text-white mb-3 gradient-text">Friends</h1>
            <p className="text-xl text-white/70">Invite friends to play padel together</p>
          </div>
          <Button
            onClick={() => setShowInviteModal(true)}
            variant="primary"
          >
            + Invite Friend
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl text-white/70 animate-pulse">Loading friends...</p>
          </div>
        ) : (
          <>
            {/* Search */}
            <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search friends..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-5 py-4 pl-14 glass-card border-2 border-white/20 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 text-white placeholder:text-white/40 transition-all duration-300"
                />
                <svg
                  className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Pending Invites */}
            {pendingInvites.length > 0 && (
              <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-3xl font-bold text-white mb-6">📬 Pending Invites ({pendingInvites.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingInvites.map((invite, index) => (
                    <div
                      key={invite._id}
                      className="glass-card rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/10 hover:border-purple-500/50 hover-lift animate-fade-in-up"
                      style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold border-2 border-purple-500/50">
                          {invite.userId.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white">{invite.userId.name}</h3>
                          <p className="text-sm text-white/60">{invite.userId.email}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => handleAcceptInvite(invite._id)}
                          variant="primary" 
                          className="flex-1 text-sm"
                        >
                          ✓ Accept
                        </Button>
                        <Button 
                          onClick={() => handleDeclineInvite(invite._id)}
                          variant="danger" 
                          className="flex-1 text-sm"
                        >
                          ✕ Decline
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Friends List */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-3xl font-bold text-white mb-6">
                👥 My Friends ({filteredFriends.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFriends.length === 0 ? (
                  <div className="col-span-full glass-card rounded-3xl p-12 text-center shadow-xl">
                    <p className="text-xl text-white/70">No friends found. Invite someone to get started!</p>
                  </div>
                ) : (
                  filteredFriends.map((item, index) => {
                    const friend = item.friend;
                    return (
                      <div
                        key={item._id}
                        className="glass-card rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/10 hover:border-purple-500/50 hover-lift animate-fade-in-up"
                        style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold border-2 border-purple-500/50">
                              {friend.name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-gray-900 bg-green-500" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-white">{friend.name}</h3>
                            <p className="text-sm text-white/60">{friend.email}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleInviteToMatch(friend._id)}
                            variant="primary"
                            className="flex-1 text-sm"
                          >
                            🎾 Invite Match
                          </Button>
                          <Button 
                            onClick={() => handleRemoveFriend(item._id)}
                            variant="outline" 
                            className="px-4 text-sm"
                          >
                            🗑️
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </>
        )}

        {/* Invite Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="glass-card rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/10 animate-scale-in">
              <h2 className="text-2xl font-bold text-white mb-6">Invite Friend</h2>
              <form onSubmit={handleInviteFriend}>
                <div className="mb-6">
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="friend@domain.com"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    onClick={() => {
                      setShowInviteModal(false);
                      setInviteEmail('');
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                  >
                    Send Invite
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
        {friendConfirm.open && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="glass-card rounded-2xl p-6 max-w-sm w-full">
              <h3 className="text-xl font-bold text-white mb-3">Remove Friend</h3>
              <p className="text-white/80 mb-6">Are you sure you want to remove this friend?</p>
              <div className="flex justify-end space-x-3">
                <button onClick={() => setFriendConfirm({ open: false, id: null })} className="px-4 py-2 bg-white/10 rounded">Cancel</button>
                <button onClick={performRemoveFriend} className="px-4 py-2 bg-red-500 text-white rounded">Remove</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
