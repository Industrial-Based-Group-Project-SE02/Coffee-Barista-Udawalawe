import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Coffee, Users, ShoppingCart, Clock, Shield, Star, ArrowRight, Heart, Sparkles, Zap, Award, TrendingUp } from 'lucide-react'

function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState({})

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('[id^="animate-"]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="w-full min-h-screen overflow-hidden bg-stone-950">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.5; filter: blur(20px); }
          50% { opacity: 1; filter: blur(30px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-slide-up {
          animation: slideInUp 0.6s ease-out forwards;
        }
        .animate-slide-left {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        .animate-slide-right {
          animation: slideInRight 0.6s ease-out forwards;
        }
        .animate-scale {
          animation: scaleIn 0.6s ease-out forwards;
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.3), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .animate-glow {
          animation: glow 4s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
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
        .text-shadow-glow {
          text-shadow: 0 0 40px rgba(251, 191, 36, 0.5);
        }
        .card-3d {
          transform-style: preserve-3d;
          transition: transform 0.5s ease;
        }
        .card-3d:hover {
          transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
        }
        .gradient-mesh {
          background: 
            radial-gradient(at 0% 0%, rgba(251, 191, 36, 0.2) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(249, 115, 22, 0.2) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(234, 88, 12, 0.2) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(251, 146, 60, 0.2) 0px, transparent 50%);
        }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }
      `}</style>
      
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden">
        
        {/* Animated Background Gradient Mesh */}
        <div className="absolute inset-0 gradient-mesh"></div>
        
        {/* Animated Orbs */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-r from-amber-500/30 to-yellow-500/30 rounded-full blur-3xl animate-glow"></div>
          <div className="absolute top-1/4 -right-48 w-[500px] h-[500px] bg-gradient-to-l from-orange-500/25 to-amber-400/25 rounded-full blur-3xl animate-glow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-48 left-1/4 w-[450px] h-[450px] bg-gradient-to-t from-yellow-600/35 to-amber-500/35 rounded-full blur-3xl animate-glow" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-20 left-1/4 text-amber-400 animate-float">
            <Coffee size={80} strokeWidth={1} />
          </div>
          <div className="absolute top-1/3 right-1/4 text-yellow-400 animate-float" style={{ animationDelay: '1s' }}>
            <Heart size={100} strokeWidth={1} />
          </div>
          <div className="absolute bottom-1/4 left-1/5 text-amber-500 animate-float" style={{ animationDelay: '2s' }}>
            <Sparkles size={90} strokeWidth={1} />
          </div>
          <div className="absolute bottom-1/3 right-1/5 text-orange-400 animate-float" style={{ animationDelay: '1.5s' }}>
            <Star size={70} strokeWidth={1} />
          </div>
          
          {/* Rotating Circle Elements */}
          <div className="absolute top-1/4 right-1/3 w-32 h-32 border-2 border-amber-500/20 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-1/3 left-1/4 w-24 h-24 border-2 border-orange-500/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
        </div>

        {/* Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-6 py-20 min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
            
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left space-y-8">
              
              {/* Logo & Brand */}
              <div className="space-y-6 animate-slide-left">
                <div className="flex items-center justify-center lg:justify-start gap-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl blur-xl opacity-60 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-amber-500 to-orange-600 p-5 rounded-3xl shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                      <Coffee className="w-14 h-14 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <h1 className="text-6xl lg:text-8xl font-black bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent text-shadow-glow">
                      Coffee Barista
                    </h1>
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 opacity-20 blur-2xl -z-10"></div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl blur-xl opacity-60 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="relative bg-gradient-to-br from-orange-500 to-red-600 p-5 rounded-3xl shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-500">
                      <Heart className="w-14 h-14 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <Star className="w-8 h-8 text-yellow-400" fill="currentColor" />
                  <div className="text-3xl font-bold bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
                    Udawalawe
                  </div>
                  <Star className="w-8 h-8 text-yellow-400" fill="currentColor" />
                </div>
                
                <div className="h-1.5 w-64 mx-auto lg:mx-0 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full shadow-lg"></div>
              </div>

              {/* Hero Text */}
              <div className="space-y-6 animate-slide-left stagger-2">
                <h2 className="text-4xl lg:text-6xl font-bold text-amber-50 leading-tight">
                  Brewing{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                      Excellence
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 blur-sm"></span>
                  </span>
                  {' '}in Every Cup
                </h2>
                <p className="text-xl lg:text-2xl text-amber-100 font-medium leading-relaxed">
                  <span className="inline-block animate-shimmer">Premium coffee. Handcrafted with love. Served fresh daily.</span>
                </p>
                <p className="text-lg text-yellow-400 font-semibold">
                  ✨ Experience the perfect blend of flavor and comfort
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start animate-slide-left stagger-3">
                <Link to="/menu" className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity"></div>
                  <button className="relative bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold px-10 py-5 rounded-2xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl text-lg w-full sm:w-auto">
                    <span className="flex items-center justify-center gap-3">
                      <Coffee className="w-6 h-6" />
                      View Menu
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </button>
                </Link>
                
                <Link to="/order" className="group relative">
                  <div className="absolute inset-0 bg-amber-500/20 rounded-2xl blur-lg group-hover:bg-amber-500/40 transition-all"></div>
                  <button className="relative glass-strong text-amber-300 font-bold px-10 py-5 rounded-2xl hover:bg-amber-500/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl border-2 border-amber-500/50 hover:border-amber-400 text-lg w-full sm:w-auto">
                    <span className="flex items-center justify-center gap-3">
                      <ShoppingCart className="w-6 h-6" />
                      Order Now
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </button>
                </Link>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-slide-left stagger-4">
                {[
                  { number: '15+', label: 'Coffee Varieties', icon: <Coffee className="w-6 h-6" />, color: 'amber' },
                  { number: '1000+', label: 'Happy Customers', icon: <Heart className="w-6 h-6" />, color: 'yellow' },
                  { number: '7AM-9PM', label: 'Daily Service', icon: <Clock className="w-6 h-6" />, color: 'orange' }
                ].map((stat, i) => (
                  <div key={i} className={`card-3d glass-strong p-6 rounded-2xl shadow-xl border border-${stat.color}-500/30 hover:border-${stat.color}-400/50 transition-all duration-300 group`}>
                    <div className={`flex items-center gap-3 mb-3 text-${stat.color}-400`}>
                      {stat.icon}
                      <div className="text-3xl font-black">{stat.number}</div>
                    </div>
                    <div className="text-amber-200 font-semibold">{stat.label}</div>
                    <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Hero Image */}
            <div className="hidden lg:flex justify-center items-center animate-slide-right">
              <div className="relative w-full max-w-lg">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/40 to-orange-500/40 rounded-full blur-3xl animate-glow"></div>
                
                {/* Decorative Rings */}
                <div className="absolute inset-0 rounded-full border-4 border-amber-500/20 animate-spin-slow" style={{ margin: '-20px' }}></div>
                <div className="absolute inset-0 rounded-full border-4 border-orange-500/20 animate-spin-slow" style={{ margin: '-40px', animationDirection: 'reverse' }}></div>
                
                {/* Main Image */}
                <div className="relative z-10 card-3d">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-3xl blur-xl"></div>
                  <img
                    src="/images/coffee.jpg"
                    alt="Delicious Coffee"
                    className="relative w-full h-96 object-cover rounded-3xl shadow-2xl animate-float"
                    style={{ animationDuration: '8s' }}
                  />
                  
                  {/* Floating Badge */}
                  <div className="absolute -top-4 -right-4 glass-strong p-4 rounded-2xl shadow-xl border border-amber-400/50 animate-bounce">
                    <div className="flex items-center gap-2">
                      <Star className="w-6 h-6 text-yellow-400" fill="currentColor" />
                      <div className="text-amber-100 font-bold">Premium</div>
                    </div>
                  </div>
                  
                  {/* Floating Price Tag */}
                  <div className="absolute -bottom-4 -left-4 glass-strong p-4 rounded-2xl shadow-xl border border-orange-400/50">
                    <div className="text-orange-400 font-bold text-lg">Fresh Daily</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="animate-features" className={`py-24 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 relative overflow-hidden ${isVisible['animate-features'] ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.05),transparent_70%)]"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className={`text-center mb-20 space-y-4 ${isVisible['animate-features'] ? 'animate-slide-up' : ''}`}>
            <div className="inline-block">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-400"></div>
                <Sparkles className="w-6 h-6" />
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-400"></div>
              </div>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-amber-50 mb-4">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Coffee Barista
              </span>
              ?
            </h2>
            <p className="text-xl text-amber-200/80 max-w-3xl mx-auto">
              Experience the finest coffee in Udawalawe with our premium service and authentic taste
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Coffee className="w-10 h-10" />,
                title: 'Premium Beans',
                desc: 'Sourced from the finest coffee estates in Sri Lanka. Freshly roasted and ground to perfection for an authentic taste experience.',
                gradient: 'from-amber-500 to-orange-600',
                delay: 'stagger-1'
              },
              {
                icon: <Heart className="w-10 h-10" />,
                title: 'Made with Love',
                desc: 'Every cup is handcrafted by our expert baristas who pour their passion into creating the perfect coffee experience just for you.',
                gradient: 'from-orange-500 to-red-600',
                delay: 'stagger-2'
              },
              {
                icon: <Zap className="w-10 h-10" />,
                title: 'Quick Service',
                desc: 'Fast and friendly service without compromising quality. Get your favorite coffee ready in minutes, perfect for busy mornings.',
                gradient: 'from-yellow-500 to-amber-600',
                delay: 'stagger-3'
              }
            ].map((feature, i) => (
              <div
                key={i}
                className={`group relative ${isVisible['animate-features'] ? `animate-slide-up ${feature.delay}` : ''}`}
              >
                {/* Card Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 rounded-3xl blur-2xl transition-opacity duration-500`}></div>
                
                {/* Card Content */}
                <div className="card-3d relative glass-strong p-8 rounded-3xl border border-amber-500/20 group-hover:border-amber-400/40 transition-all duration-500 h-full">
                  {/* Icon Container */}
                  <div className="relative mb-6 inline-block">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity`}></div>
                    <div className={`relative bg-gradient-to-br ${feature.gradient} w-20 h-20 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500 shadow-xl`}>
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-amber-50 mb-4 group-hover:text-amber-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-amber-200/80 leading-relaxed">
                    {feature.desc}
                  </p>
                  
                  {/* Hover Accent */}
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient} rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="animate-how" className={`py-24 bg-gradient-to-b from-stone-950 to-stone-900 relative ${isVisible['animate-how'] ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.08),transparent_50%)]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className={`text-center mb-20 ${isVisible['animate-how'] ? 'animate-slide-up' : ''}`}>
            <h2 className="text-5xl lg:text-6xl font-bold text-amber-50 mb-6">
              How to{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Order
              </span>
            </h2>
            <p className="text-xl text-amber-200/80">
              Simple steps to get your perfect coffee delivered
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <ShoppingCart className="w-12 h-12" />, title: "Browse Menu", desc: "Explore our wide selection of coffees and treats", gradient: "from-amber-500 to-orange-600", number: "01" },
              { icon: <Coffee className="w-12 h-12" />, title: "Select Favorite", desc: "Choose your perfect blend and customize it", gradient: "from-orange-500 to-red-600", number: "02" },
              { icon: <Clock className="w-12 h-12" />, title: "Place Order", desc: "Add to cart and proceed to checkout easily", gradient: "from-yellow-500 to-amber-600", number: "03" },
              { icon: <Sparkles className="w-12 h-12" />, title: "Enjoy", desc: "Pick up or get it delivered fresh and hot", gradient: "from-amber-600 to-orange-700", number: "04" }
            ].map((step, index) => (
              <div
                key={index}
                className={`group relative ${isVisible['animate-how'] ? `animate-scale stagger-${index + 1}` : ''}`}
              >
                {/* Connection Line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/3 left-full w-full h-0.5 bg-gradient-to-r from-amber-500/50 to-transparent -z-10"></div>
                )}
                
                {/* Number Badge */}
                <div className="absolute -top-4 -left-4 z-20">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity`}></div>
                    <div className={`relative bg-gradient-to-br ${step.gradient} w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-xl shadow-xl`}>
                      {step.number}
                    </div>
                  </div>
                </div>
                
                {/* Card */}
                <div className="card-3d glass-strong p-8 pt-12 rounded-3xl border border-amber-500/20 group-hover:border-amber-400/40 transition-all duration-500 h-full">
                  {/* Icon */}
                  <div className={`bg-gradient-to-br ${step.gradient} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    {step.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-amber-50 mb-4 text-center group-hover:text-amber-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-amber-200/80 text-center leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="animate-testimonials" className={`py-24 bg-gradient-to-b from-stone-900 to-stone-950 relative overflow-hidden ${isVisible['animate-testimonials'] ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className={`text-center mb-20 ${isVisible['animate-testimonials'] ? 'animate-slide-up' : ''}`}>
            <h2 className="text-5xl lg:text-6xl font-bold text-amber-50 mb-6">
              What Our{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Customers Say
              </span>
            </h2>
            <p className="text-xl text-amber-200/80">
              Join thousands of happy coffee lovers in Udawalawe
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Priya Fernando", role: "Regular Customer", rating: 5, text: "Best coffee in Udawalawe! The atmosphere is cozy and the baristas really know their craft." },
              { name: "Kamal Silva", role: "Coffee Enthusiast", rating: 5, text: "I visit every morning before work. Their cappuccino is absolutely perfect and service is always friendly." },
              { name: "Dilini Perera", role: "Local Resident", rating: 5, text: "A hidden gem! Premium quality coffee at reasonable prices. Highly recommend the caramel latte." }
            ].map((testimonial, i) => (
              <div
                key={i}
                className={`card-3d glass-strong p-8 rounded-3xl border border-amber-500/20 hover:border-amber-400/40 transition-all duration-500 ${isVisible['animate-testimonials'] ? `animate-slide-up stagger-${i + 1}` : ''}`}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-amber-200/80 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="text-amber-50 font-bold">{testimonial.name}</div>
                    <div className="text-amber-300/60 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-block animate-bounce">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 rounded-3xl shadow-2xl">
                <Coffee className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-bold text-amber-50 leading-tight">
              Ready for Your{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Perfect Cup
              </span>
              ?
            </h2>
            
            <p className="text-xl lg:text-2xl text-amber-200/80 max-w-3xl mx-auto leading-relaxed">
              Visit Coffee Barista Udawalawe today and discover why we're the community's favorite coffee destination.
              <span className="block mt-2 text-yellow-400 font-semibold">✨ Freshness guaranteed with every order!</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link to="/menu" className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <button className="relative bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold px-12 py-6 rounded-2xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl text-lg">
                  <span className="flex items-center gap-3">
                    <Coffee className="w-6 h-6" />
                    Explore Menu
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                </button>
              </Link>
              
              <Link to="/contact" className="group relative">
                <div className="absolute inset-0 bg-amber-500/20 rounded-2xl blur-xl group-hover:bg-amber-500/40 transition-all"></div>
                <button className="relative glass-strong text-amber-300 font-bold px-12 py-6 rounded-2xl hover:bg-amber-500/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl border-2 border-amber-500/50 hover:border-amber-400 text-lg">
                  <span className="flex items-center gap-3">
                    <Star className="w-6 h-6" />
                    Visit Us
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                </button>
              </Link>
            </div>
            
            <div className="pt-8 space-y-3">
              <div className="glass-strong inline-block px-8 py-4 rounded-2xl border border-amber-500/30">
                <p className="flex items-center gap-3 text-amber-200 text-lg">
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                  <span className="font-semibold">Located in the heart of Udawalawe</span>
                </p>
              </div>
              <div className="glass-strong inline-block px-8 py-4 rounded-2xl border border-amber-500/30">
                <p className="flex items-center gap-3 text-amber-200 text-lg">
                  <Clock className="w-6 h-6 text-amber-400" />
                  <span className="font-semibold">Open Daily: 7:00 AM - 9:00 PM</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home