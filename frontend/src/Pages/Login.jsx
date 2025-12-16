import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Coffee, Heart, Sparkles, ArrowRight, Facebook, Chrome, Apple, CheckCircle } from 'lucide-react';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    
    // Store user role in localStorage
    localStorage.setItem('userRole', 'customer');
    
    // Navigate to home or dashboard
    navigate('/');
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-stone-950 flex items-center justify-center py-12 px-4">
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.5; filter: blur(20px); }
          50% { opacity: 1; filter: blur(30px); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 4s ease-in-out infinite;
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.3), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .animate-slide-up {
          animation: slideInUp 0.6s ease-out forwards;
        }
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .glass-strong {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-r from-amber-500/30 to-yellow-500/30 rounded-full blur-3xl animate-glow"></div>
        <div className="absolute top-1/4 -right-48 w-[500px] h-[500px] bg-gradient-to-l from-orange-500/25 to-amber-400/25 rounded-full blur-3xl animate-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-48 left-1/4 w-[450px] h-[450px] bg-gradient-to-t from-yellow-600/35 to-amber-500/35 rounded-full blur-3xl animate-glow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating Coffee Icons */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          >
            <Coffee size={30 + Math.random() * 20} className="text-amber-400" />
          </div>
        ))}
      </div>

      {/* Cursor follower */}
      <div 
        className="fixed w-8 h-8 rounded-full border-2 border-amber-400/30 pointer-events-none z-50 transition-transform duration-200"
        style={{ 
          left: mousePosition.x - 16, 
          top: mousePosition.y - 16,
        }}
      ></div>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md animate-slide-up">
        
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full blur-2xl opacity-60 animate-pulse"></div>
            <div className="relative w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <Coffee className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
            Coffee Barista
          </h1>
          <p className="text-amber-200/80 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Welcome back! Ready for your perfect cup?
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-strong rounded-3xl p-8 border border-amber-500/20 shadow-2xl">
          <h2 className="text-2xl font-bold text-amber-50 mb-6 text-center">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block mb-2 text-amber-200 font-semibold text-sm">Email Address</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full glass border-2 ${errors.email ? 'border-red-500/50' : 'border-amber-500/20'} pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all text-amber-100 placeholder-amber-300/30`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-red-400 text-sm flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block mb-2 text-amber-200 font-semibold text-sm">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full glass border-2 ${errors.password ? 'border-red-500/50' : 'border-amber-500/20'} pl-12 pr-12 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all text-amber-100 placeholder-amber-300/30`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-red-400 text-sm flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 transition-all ${rememberMe ? 'bg-amber-500 border-amber-500' : 'border-amber-500/30 bg-transparent'}`}>
                    {rememberMe && <CheckCircle className="w-5 h-5 text-white" fill="currentColor" />}
                  </div>
                </div>
                <span className="text-amber-200 text-sm group-hover:text-amber-100 transition-colors">Remember me</span>
              </label>
              
              <Link to="/forgot-password" className="text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/50 flex items-center justify-center gap-3 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center gap-3">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
              {!isLoading && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
            <span className="text-amber-200/60 text-sm">or continue with</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => handleSocialLogin('Google')}
              className="group glass border border-amber-500/20 hover:border-amber-400/40 p-4 rounded-xl transition-all hover:bg-amber-500/10"
            >
              <Chrome className="w-6 h-6 text-amber-300 group-hover:text-amber-200 mx-auto transition-colors" />
            </button>
            <button
              onClick={() => handleSocialLogin('Facebook')}
              className="group glass border border-amber-500/20 hover:border-amber-400/40 p-4 rounded-xl transition-all hover:bg-amber-500/10"
            >
              <Facebook className="w-6 h-6 text-amber-300 group-hover:text-amber-200 mx-auto transition-colors" />
            </button>
            <button
              onClick={() => handleSocialLogin('Apple')}
              className="group glass border border-amber-500/20 hover:border-amber-400/40 p-4 rounded-xl transition-all hover:bg-amber-500/10"
            >
              <Apple className="w-6 h-6 text-amber-300 group-hover:text-amber-200 mx-auto transition-colors" />
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-amber-200/80">
              Don't have an account?{' '}
              <Link to="/register" className="text-amber-400 hover:text-amber-300 font-bold transition-colors">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 transition-colors group">
            <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;