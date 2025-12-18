import React from 'react'
import { Coffee, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight, Heart, Sparkles, Clock, Star } from 'lucide-react'

function PublicFooter() {
  return (
    <footer className="bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 text-white relative overflow-hidden">
      
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-amber-600/30 animate-float-slow">
          <Coffee size={100} />
        </div>
        <div className="absolute bottom-10 right-10 text-orange-600/30 animate-float-slow" style={{ animationDelay: '2s' }}>
          <Heart size={120} />
        </div>
        <div className="absolute top-1/2 left-1/4 text-amber-500/20 animate-float-slow" style={{ animationDelay: '1s' }}>
          <Sparkles size={90} />
        </div>
        <div className="absolute bottom-1/3 right-1/3 text-yellow-600/20 animate-float-slow" style={{ animationDelay: '3s' }}>
          <Star size={80} />
        </div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent pointer-events-none"></div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl blur-lg opacity-60"></div>
                <div className="relative bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-2xl shadow-xl">
                  <Coffee className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Coffee Barista
              </h1>
            </div>
            <p className="text-amber-200 mb-6 leading-relaxed">
              ☕ Brewing excellence in every cup. Your neighborhood coffee haven serving premium, 
              handcrafted beverages in the heart of Udawalawe.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="group relative bg-amber-500/10 hover:bg-amber-500/20 p-3 rounded-xl transition-all duration-300 border border-amber-500/20 hover:border-amber-400/40"
              >
                <Facebook size={20} className="text-amber-300 group-hover:text-amber-200 transition-colors" />
              </a>
              <a 
                href="#" 
                className="group relative bg-amber-500/10 hover:bg-amber-500/20 p-3 rounded-xl transition-all duration-300 border border-amber-500/20 hover:border-amber-400/40"
              >
                <Twitter size={20} className="text-amber-300 group-hover:text-amber-200 transition-colors" />
              </a>
              <a 
                href="#" 
                className="group relative bg-amber-500/10 hover:bg-amber-500/20 p-3 rounded-xl transition-all duration-300 border border-amber-500/20 hover:border-amber-400/40"
              >
                <Instagram size={20} className="text-amber-300 group-hover:text-amber-200 transition-colors" />
              </a>
              <a 
                href="#" 
                className="group relative bg-amber-500/10 hover:bg-amber-500/20 p-3 rounded-xl transition-all duration-300 border border-amber-500/20 hover:border-amber-400/40"
              >
                <Linkedin size={20} className="text-amber-300 group-hover:text-amber-200 transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-amber-300 mb-6 flex items-center gap-2">
              <ArrowRight size={20} className="text-orange-400" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="group text-amber-200 hover:text-amber-100 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="/menu" className="group text-amber-200 hover:text-amber-100 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  Our Menu
                </a>
              </li>
              <li>
                <a href="/order" className="group text-amber-200 hover:text-amber-100 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  Order Online
                </a>
              </li>
              <li>
                <a href="/about" className="group text-amber-200 hover:text-amber-100 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="/login" className="group text-amber-200 hover:text-amber-100 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  Sign In
                </a>
              </li>
            </ul>
          </div>

          {/* For Coffee Lovers */}
          <div>
            <h3 className="text-xl font-bold text-amber-300 mb-6 flex items-center gap-2">
              <Coffee size={20} className="text-orange-400" />
              For Coffee Lovers
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/rewards" className="group text-amber-200 hover:text-amber-100 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  Rewards Program
                </a>
              </li>
              <li>
                <a href="/gift-cards" className="group text-amber-200 hover:text-amber-100 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  Gift Cards
                </a>
              </li>
              <li>
                <a href="/coffee-guide" className="group text-amber-200 hover:text-amber-100 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  Coffee Guide
                </a>
              </li>
              <li>
                <a href="/brewing-tips" className="group text-amber-200 hover:text-amber-100 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  Brewing Tips
                </a>
              </li>
              <li>
                <a href="/events" className="group text-amber-200 hover:text-amber-100 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  Events & Workshops
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-xl font-bold text-amber-300 mb-6 flex items-center gap-2">
              <Phone size={20} className="text-orange-400" />
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="group flex items-start gap-3 text-amber-200 hover:text-amber-100 transition-colors">
                <div className="bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 group-hover:border-amber-400/40 transition-colors">
                  <Mail size={16} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-amber-300/80">Email</p>
                  <p className="font-medium">hello@coffeebarista.lk</p>
                </div>
              </div>
              <div className="group flex items-start gap-3 text-amber-200 hover:text-amber-100 transition-colors">
                <div className="bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 group-hover:border-amber-400/40 transition-colors">
                  <Phone size={16} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-amber-300/80">Phone</p>
                  <p className="font-medium">+94 (77) 123-4567</p>
                </div>
              </div>
              <div className="group flex items-start gap-3 text-amber-200 hover:text-amber-100 transition-colors">
                <div className="bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 group-hover:border-amber-400/40 transition-colors">
                  <MapPin size={16} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-amber-300/80">Location</p>
                  <p className="font-medium">Main Street, Udawalawe</p>
                </div>
              </div>
              <div className="group flex items-start gap-3 text-amber-200 hover:text-amber-100 transition-colors">
                <div className="bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 group-hover:border-amber-400/40 transition-colors">
                  <Clock size={16} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-amber-300/80">Hours</p>
                  <p className="font-medium">Daily: 7:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="relative bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-amber-500/20 overflow-hidden group">
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-amber-300 mb-3 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                Stay Caffeinated with Updates
              </h3>
              <p className="text-amber-200">
                Get the latest news on new blends, special offers, and coffee brewing tips delivered straight to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-xl bg-stone-900/50 border border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:outline-none focus:border-amber-400/50 focus:bg-stone-900/70 transition-all"
              />
              <button className="group relative bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-amber-500/50 transform hover:scale-105">
                <span className="relative z-10">Subscribe</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="group text-center bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-6 rounded-2xl border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 hover:transform hover:-translate-y-1">
            <div className="text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">15+</div>
            <div className="text-amber-200 text-sm font-medium">Coffee Varieties</div>
          </div>
          <div className="group text-center bg-gradient-to-br from-orange-500/10 to-red-500/10 p-6 rounded-2xl border border-orange-500/20 hover:border-orange-400/40 transition-all duration-300 hover:transform hover:-translate-y-1">
            <div className="text-4xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-2">1000+</div>
            <div className="text-amber-200 text-sm font-medium">Happy Customers</div>
          </div>
          <div className="group text-center bg-gradient-to-br from-yellow-500/10 to-amber-500/10 p-6 rounded-2xl border border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300 hover:transform hover:-translate-y-1">
            <div className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mb-2">5k+</div>
            <div className="text-amber-200 text-sm font-medium">Cups Served</div>
          </div>
          <div className="group text-center bg-gradient-to-br from-amber-500/10 to-yellow-500/10 p-6 rounded-2xl border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 hover:transform hover:-translate-y-1">
            <div className="text-4xl font-black bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-1">
              4.9<Star size={20} fill="currentColor" />
            </div>
            <div className="text-amber-200 text-sm font-medium">Customer Rating</div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-amber-500/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-amber-200/80 text-sm">
                © {new Date().getFullYear()} Coffee Barista Udawalawe. All rights reserved.
              </p>
              <p className="text-amber-300/70 text-sm mt-1 flex items-center justify-center md:justify-start gap-1">
                Crafted with <Heart size={14} fill="currentColor" className="text-red-400" /> by Coffee Enthusiasts
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="/privacy" className="text-amber-200/80 hover:text-amber-100 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-amber-200/80 hover:text-amber-100 transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="text-amber-200/80 hover:text-amber-100 transition-colors">
                Cookie Policy
              </a>
              <a href="/faq" className="text-amber-200/80 hover:text-amber-100 transition-colors">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom glow accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
    </footer>
  )
}

export default PublicFooter