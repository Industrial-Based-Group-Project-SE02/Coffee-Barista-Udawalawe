// Pages/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coffee, Lock, Mail } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Temporary credentials for testing
    const tempCredentials = {
      email: 'admin@coffeebarista.lk',
      password: 'admin123'
    };

    if (email === tempCredentials.email && password === tempCredentials.password) {
      localStorage.setItem('adminToken', 'temp-token-123');
      localStorage.setItem('userRole', 'admin');
      toast.success('Logged in as Admin');
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
    } else {
      toast.error('Invalid credentials. Use admin@coffeebarista.lk / admin123');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 to-stone-900 flex items-center justify-center p-4">
      <div className="glass-strong rounded-3xl p-8 max-w-md w-full border border-amber-500/30">
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl blur-xl opacity-60"></div>
              <div className="relative bg-gradient-to-br from-amber-500 to-orange-600 p-4 rounded-3xl">
                <Coffee className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-black text-white mb-2">Admin Login</h1>
          <p className="text-amber-300/70">Coffee Barista Admin Panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-amber-300 font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@coffeebarista.lk"
                className="w-full pl-12 pr-4 py-3.5 glass rounded-xl border border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:outline-none focus:border-amber-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-amber-300 font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-12 pr-4 py-3.5 glass rounded-xl border border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:outline-none focus:border-amber-400"
                required
              />
            </div>
            <p className="text-amber-400/70 text-sm mt-2">
              Demo: admin@coffeebarista.lk / admin123
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-4 rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login to Admin Panel'}
          </button>

          <div className="text-center">
            <p className="text-amber-300/70 text-sm">
              For testing purposes only
            </p>
            <button
              type="button"
              onClick={() => {
                setEmail('admin@coffeebarista.lk');
                setPassword('admin123');
              }}
              className="text-amber-400 hover:text-amber-300 text-sm mt-2"
            >
              Fill demo credentials
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;