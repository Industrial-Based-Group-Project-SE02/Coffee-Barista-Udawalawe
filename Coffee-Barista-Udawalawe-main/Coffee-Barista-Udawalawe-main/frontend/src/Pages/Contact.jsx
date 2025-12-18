import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Send, MessageCircle, Coffee, Clock, Star, Heart, Sparkles, CheckCircle } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-stone-950">
      
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
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
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
        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
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
        .card-3d {
          transform-style: preserve-3d;
          transition: transform 0.5s ease;
        }
        .card-3d:hover {
          transform: translateY(-10px) rotateX(5deg);
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
        {[...Array(20)].map((_, i) => (
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

      {/* Content */}
      <div className="relative z-10 pt-20 px-4 pb-20">
        
        {/* Header Section */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl blur-lg opacity-60"></div>
              <div className="relative bg-gradient-to-br from-amber-500 to-orange-600 p-4 rounded-2xl shadow-xl">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
              Contact Us
            </h1>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl blur-lg opacity-60"></div>
              <div className="relative bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-2xl shadow-xl">
                <Send className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          
          <div className="glass-strong px-8 py-4 rounded-2xl shadow-xl inline-block border border-amber-500/30">
            <p className="text-lg text-amber-200 font-medium flex items-center gap-2">
              <Coffee className="w-5 h-5 text-amber-400" />
              We'd love to hear from you. Let's brew something great together!
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </p>
          </div>

          {/* Quick Info Cards */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="glass px-6 py-3 rounded-xl border border-amber-500/20 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <span className="text-amber-200">Open Daily: 7AM - 9PM</span>
            </div>
            <div className="glass px-6 py-3 rounded-xl border border-orange-500/20 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
              <span className="text-amber-200">4.9★ Rated</span>
            </div>
            <div className="glass px-6 py-3 rounded-xl border border-yellow-500/20 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400" fill="currentColor" />
              <span className="text-amber-200">1000+ Happy Customers</span>
            </div>
          </div>
        </div>

        {/* Main Contact Section */}
        <div className="max-w-7xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="glass-strong shadow-2xl rounded-3xl overflow-hidden border border-amber-500/20">
            <div className="grid lg:grid-cols-2">
              
              {/* Contact Info Side */}
              <div className="bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 text-white p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
                
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-amber-500/20 rounded-xl">
                      <Coffee className="w-8 h-8 text-amber-400" />
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold">Let's Connect</h2>
                  </div>
                  
                  <p className="text-amber-200 mb-8 text-lg leading-relaxed">
                    Visit us at our cozy café in Udawalawe or reach out through any channel. 
                    We're always ready to serve you the perfect cup!
                  </p>

                  {/* Contact Details */}
                  <div className="space-y-6">
                    <div className="group flex items-start gap-4 cursor-pointer">
                      <div className="relative">
                        <div className="absolute inset-0 bg-amber-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative glass p-3 rounded-xl group-hover:bg-amber-500/20 transition-all border border-amber-500/20">
                          <MapPin size={20} className="text-amber-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-amber-300 text-xs uppercase tracking-wide mb-1">Location</p>
                        <p className="text-white font-semibold text-lg">Main Street, Udawalawe</p>
                        <p className="text-amber-200/70 text-sm">Next to CB Restaurant</p>
                      </div>
                    </div>
                    
                    <div className="group flex items-start gap-4 cursor-pointer">
                      <div className="relative">
                        <div className="absolute inset-0 bg-orange-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative glass p-3 rounded-xl group-hover:bg-orange-500/20 transition-all border border-orange-500/20">
                          <Phone size={20} className="text-orange-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-amber-300 text-xs uppercase tracking-wide mb-1">Phone</p>
                        <p className="text-white font-semibold text-lg">+94 77 123 4567</p>
                        <p className="text-amber-200/70 text-sm">Call us for reservations</p>
                      </div>
                    </div>
                    
                    <div className="group flex items-start gap-4 cursor-pointer">
                      <div className="relative">
                        <div className="absolute inset-0 bg-yellow-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative glass p-3 rounded-xl group-hover:bg-yellow-500/20 transition-all border border-yellow-500/20">
                          <Mail size={20} className="text-yellow-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-amber-300 text-xs uppercase tracking-wide mb-1">Email</p>
                        <p className="text-white font-semibold text-lg">hello@coffeebarista.lk</p>
                        <p className="text-amber-200/70 text-sm">We reply within 24 hours</p>
                      </div>
                    </div>

                    <div className="group flex items-start gap-4 cursor-pointer">
                      <div className="relative">
                        <div className="absolute inset-0 bg-amber-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative glass p-3 rounded-xl group-hover:bg-amber-500/20 transition-all border border-amber-500/20">
                          <Clock size={20} className="text-amber-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-amber-300 text-xs uppercase tracking-wide mb-1">Opening Hours</p>
                        <p className="text-white font-semibold text-lg">Monday - Sunday</p>
                        <p className="text-amber-200/70 text-sm">7:00 AM - 9:00 PM</p>
                      </div>
                    </div>
                  </div>

                  {/* Map */}
                  <div className="mt-8 relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="relative w-full h-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-500/30 group-hover:border-amber-400/50 transition-all">
                      <iframe
                        title="Coffee Barista Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7897663348003!2d80.80973097447992!3d6.421052824346446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae407003a67cf53%3A0xdf8a8890e3fe73d5!2sCB%20restaurant%20and%20coffee%20shop!5e0!3m2!1sen!2slk!4v1765807198425!5m2!1sen!2slk"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-8 pt-8 border-t border-amber-500/20 relative z-10">
                  <p className="text-amber-300 text-sm mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Connect with us on social media
                  </p>
                  <div className="flex gap-3">
                    <a href="#" className="group relative">
                      <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative glass p-3 rounded-xl group-hover:bg-blue-500/20 transition-all border border-amber-500/20 group-hover:border-blue-400/50">
                        <Facebook size={20} className="text-amber-200 group-hover:text-blue-300 transition-colors" />
                      </div>
                    </a>
                    <a href="#" className="group relative">
                      <div className="absolute inset-0 bg-pink-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative glass p-3 rounded-xl group-hover:bg-pink-500/20 transition-all border border-amber-500/20 group-hover:border-pink-400/50">
                        <Instagram size={20} className="text-amber-200 group-hover:text-pink-300 transition-colors" />
                      </div>
                    </a>
                    <a href="#" className="group relative">
                      <div className="absolute inset-0 bg-sky-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative glass p-3 rounded-xl group-hover:bg-sky-500/20 transition-all border border-amber-500/20 group-hover:border-sky-400/50">
                        <Twitter size={20} className="text-amber-200 group-hover:text-sky-300 transition-colors" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form Side */}
              <div className="p-8 lg:p-12 bg-stone-900/50">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-amber-500/20 rounded-xl">
                    <Send className="w-8 h-8 text-amber-400" />
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-amber-50">Send a Message</h2>
                </div>

                {/* Success Message */}
                {submitSuccess && (
                  <div className="mb-6 glass-strong p-4 rounded-xl border border-green-500/50 flex items-center gap-3 animate-slide-up">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <div>
                      <p className="text-green-300 font-semibold">Message sent successfully!</p>
                      <p className="text-green-200/70 text-sm">We'll get back to you soon.</p>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 text-amber-200 font-semibold text-sm">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full glass border-2 border-amber-500/20 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all text-amber-100 placeholder-amber-300/30"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-2 text-amber-200 font-semibold text-sm">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full glass border-2 border-amber-500/20 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all text-amber-100 placeholder-amber-300/30"
                        placeholder="+94 77 123 4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-amber-200 font-semibold text-sm">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full glass border-2 border-amber-500/20 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all text-amber-100 placeholder-amber-300/30"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-amber-200 font-semibold text-sm">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full glass border-2 border-amber-500/20 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all text-amber-100 placeholder-amber-300/30"
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-amber-200 font-semibold text-sm">Your Message *</label>
                    <textarea
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full glass border-2 border-amber-500/20 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all text-amber-100 placeholder-amber-300/30 resize-none"
                      placeholder="Tell us what's on your mind..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-5 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/50 flex items-center justify-center gap-3 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Send Message
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                </form>

                {/* Additional Info */}
                <div className="mt-8 pt-8 border-t border-amber-500/20">
                  <p className="text-amber-200/70 text-sm text-center">
                    We typically respond within 24 hours. For urgent inquiries, please call us directly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="max-w-7xl mx-auto mt-16 grid md:grid-cols-3 gap-8">
          <div className="card-3d glass-strong p-8 rounded-3xl border border-amber-500/20 text-center">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl blur-lg opacity-60"></div>
              <div className="relative w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                <Coffee className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-amber-100 mb-2">Visit Our Café</h3>
            <p className="text-amber-200/70">
              Experience our cozy atmosphere and enjoy freshly brewed coffee in person.
            </p>
          </div>

          <div className="card-3d glass-strong p-8 rounded-3xl border border-orange-500/20 text-center">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl blur-lg opacity-60"></div>
              <div className="relative w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                <Phone className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-amber-100 mb-2">Call Us Anytime</h3>
            <p className="text-amber-200/70">
              Have a question? Our friendly staff is always ready to help you.
            </p>
          </div>

          <div className="card-3d glass-strong p-8 rounded-3xl border border-yellow-500/20 text-center">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl blur-lg opacity-60"></div>
              <div className="relative w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                <Star className="w-8 h-8 text-white" fill="currentColor" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-amber-100 mb-2">Join Our Community</h3>
            <p className="text-amber-200/70">
              Follow us on social media for updates, offers, and coffee inspiration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;