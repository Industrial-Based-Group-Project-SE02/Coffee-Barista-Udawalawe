import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Coffee, Heart, Sparkles } from 'lucide-react';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    if (isSubmitting) return;

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });

      toast.success("Login successful");

      const { token, role, email: apiEmail, firstname } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);

      // ✅ set the key your EditProfile uses
      localStorage.setItem("userEmail", apiEmail || email);

      // optional: keep this too (some pages may use it)
      localStorage.setItem("email", apiEmail || email);


      // ✅ navbar uses username
      localStorage.setItem("username", firstname || "");

      if (rememberMe) {
        localStorage.setItem("rememberEmail", email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      setTimeout(() => {
        setIsSubmitting(false);

        if (role === "admin") {
          navigate("/admin-dashboard");
        } else if (role === "cashier") {
          navigate("/cashier-dashboard");
        } else if (role === "crew") {
          navigate("/crew-dashboard");
        } else if (role === "customer") {
          navigate("/customer-dashboard");
        } else {
          toast.error("Unknown user role");
        }
      }, 1200);

    } catch (error) {
      setIsSubmitting(false);
      toast.error(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-stone-950 flex items-center justify-center py-12 px-4">

      {/* ALL STYLES UNCHANGED */}
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
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-glow { animation: glow 4s ease-in-out infinite; }
        .animate-slide-up { animation: slideInUp 0.6s ease-out forwards; }
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

      <div className="relative z-10 w-full max-w-md animate-slide-up">
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

        <div className="glass-strong rounded-3xl p-8 border border-amber-500/20 shadow-2xl">
          <h2 className="text-2xl font-bold text-amber-50 mb-6 text-center">Sign In</h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block mb-2 text-amber-200 font-semibold text-sm">Email Address</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full glass border-2 border-amber-500/20 pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 text-amber-100"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-amber-200 font-semibold text-sm">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full glass border-2 border-amber-500/20 pl-12 pr-12 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 text-amber-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="text-amber-200 text-sm">Remember me</span>
              </label>

              <Link to="/forgot-password" className="text-amber-400 text-sm font-semibold">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-4 rounded-xl transition-all"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-amber-200/80">
              Don't have an account?{" "}
              <Link to="/register" className="text-amber-400 font-bold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-amber-300">
            <Heart className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
