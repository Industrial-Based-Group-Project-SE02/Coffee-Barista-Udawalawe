import { ShoppingCart, Coffee, Menu as MenuIcon, X, BookOpen } from "lucide-react"; // Add BookOpen
import { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const role = localStorage.getItem("userRole");

  function showDashBoard() {
    if (role === "admin") {
      navigate("/adminpage");
    } else if (role === "seller") {
      navigate("/sellerpage");
    } else if (role === "customer") {
      navigate("/customer-dashboard"); // Fixed from "buyer-dashboard" to "customer-dashboard"
    } else if (role === "delivery") {
      navigate("/delivery-dashboard");
    }
  }

  return (
    <header className="w-full h-[90px] bg-gradient-to-r from-stone-900 via-amber-900 to-stone-900 shadow-2xl border-b border-amber-500/20 relative z-50">
      
      <style>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.2), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .glass-nav {
          background: rgba(28, 25, 23, 0.8);
          backdrop-filter: blur(12px);
        }
      `}</style>

      {/* Animated top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-80 animate-shimmer"></div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between relative z-10">
        
        {/* Logo Section (Left) */}
        <div className="flex items-center space-x-3 group">
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-full opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
              
              {/* Coffee icon logo */}
              <div className="relative w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border-2 border-amber-400/50">
                <Coffee className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              
              {/* Pulse ring */}
              <div className="absolute inset-0 rounded-full border-2 border-amber-400/30 animate-ping"></div>
            </div>
            
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Coffee Barista
              </h1>
              <p className="text-xs text-amber-300/80 font-medium flex items-center gap-1">
                <span>✨</span> Udawalawe
              </p>
            </div>
          </Link>
        </div>

        {/* Center Navigation Links - Desktop */}
        <nav className="hidden lg:flex items-center space-x-2">
          <Link
            to="/"
            className="group relative px-4 py-2.5 text-amber-200/90 font-medium text-base transition-all duration-300 hover:text-amber-100 rounded-xl no-underline"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🏠</span>
              <span>Home</span>
            </span>
            
            {/* Improved hover background - more visible, no blur */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Animated underline */}
            <div className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
          </Link>

          <Link
            to="/menu"
            className="group relative px-4 py-2.5 text-amber-200/90 font-medium text-base transition-all duration-300 hover:text-amber-100 rounded-xl no-underline"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">☕</span>
              <span>Menu</span>
            </span>
            
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
          </Link>

          {/* ADD BLOG LINK HERE */}
          <Link
            to="/blog"
            className="group relative px-4 py-2.5 text-amber-200/90 font-medium text-base transition-all duration-300 hover:text-amber-100 rounded-xl no-underline"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-5 h-5" />
              </span>
              <span>Blog</span>
            </span>
            
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
          </Link>

          <Link
            to="/about"
            className="group relative px-4 py-2.5 text-amber-200/90 font-medium text-base transition-all duration-300 hover:text-amber-100 rounded-xl no-underline"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">ℹ️</span>
              <span>About</span>
            </span>
            
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
          </Link>

          <Link
            to="/contact"
            className="group relative px-4 py-2.5 text-amber-200/90 font-medium text-base transition-all duration-300 hover:text-amber-100 rounded-xl no-underline"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📞</span>
              <span>Contact</span>
            </span>
            
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
          </Link>
        </nav>

        {/* Right Section - Actions with better spacing */}
        <div className="flex items-center gap-4">
          
          {/* Login Button */}
          <Link
            to="/login"
            className="group relative bg-gradient-to-r from-amber-500 to-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-amber-500/50 transform hover:scale-105 transition-all duration-300 text-sm no-underline inline-block overflow-hidden"
          >
            <span className="relative z-12 flex items-center space-x-2">
              <span className="text-base">🔐</span>
              <span>Login</span>
            </span>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            {/* Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300 -z-10"></div>
          </Link>

          {/* Cart Button */}
          <Link 
            to="/cart" 
            className="group relative p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 no-underline"
          > 
            <ShoppingCart className="w-5 h-5 text-amber-300 group-hover:text-amber-200 group-hover:scale-110 transition-all duration-300" />
          </Link>
          
          {/* Account Button */}
          <button
            onClick={showDashBoard}
            className="group relative p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 cursor-pointer"
          >
            <VscAccount className="w-5 h-5 text-amber-300 group-hover:text-amber-200 group-hover:scale-110 transition-all duration-300" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-amber-300" />
            ) : (
              <MenuIcon className="w-5 h-5 text-amber-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`lg:hidden absolute top-full left-0 right-0 glass-nav shadow-2xl border-b border-amber-500/20 transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="space-y-2">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="group w-full text-left px-4 py-3 text-amber-200/90 font-medium hover:bg-amber-500/10 rounded-xl transition-all duration-300 flex items-center space-x-3 text-base no-underline border border-transparent hover:border-amber-500/20"
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-300">🏠</span>
              <span>Home</span>
            </Link>

            <Link
              to="/menu"
              onClick={() => setIsMenuOpen(false)}
              className="group w-full text-left px-4 py-3 text-amber-200/90 font-medium hover:bg-amber-500/10 rounded-xl transition-all duration-300 flex items-center space-x-3 text-base no-underline border border-transparent hover:border-amber-500/20"
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-300">☕</span>
              <span>Menu</span>
            </Link>

            {/* ADD BLOG LINK TO MOBILE MENU */}
            <Link
              to="/blog"
              onClick={() => setIsMenuOpen(false)}
              className="group w-full text-left px-4 py-3 text-amber-200/90 font-medium hover:bg-amber-500/10 rounded-xl transition-all duration-300 flex items-center space-x-3 text-base no-underline border border-transparent hover:border-amber-500/20"
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-5 h-5" />
              </span>
              <span>Blog</span>
            </Link>

            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="group w-full text-left px-4 py-3 text-amber-200/90 font-medium hover:bg-amber-500/10 rounded-xl transition-all duration-300 flex items-center space-x-3 text-base no-underline border border-transparent hover:border-amber-500/20"
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-300">ℹ️</span>
              <span>About</span>
            </Link>

            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="group w-full text-left px-4 py-3 text-amber-200/90 font-medium hover:bg-amber-500/10 rounded-xl transition-all duration-300 flex items-center space-x-3 text-base no-underline border border-transparent hover:border-amber-500/20"
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-300">📞</span>
              <span>Contact</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Floating coffee steam particles */}
      <div className="absolute top-4 right-1/4 w-1 h-1 bg-amber-400/40 rounded-full animate-pulse"></div>
      <div className="absolute bottom-4 left-1/3 w-1 h-1 bg-orange-400/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 right-1/3 w-0.5 h-0.5 bg-yellow-400/30 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
    </header>
  );
}