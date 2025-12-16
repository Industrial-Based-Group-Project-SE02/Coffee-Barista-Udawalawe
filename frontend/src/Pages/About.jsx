import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Coffee, Heart, Star, Award, Users, Clock, Sparkles, TrendingUp, Target, CheckCircle, ArrowRight, Quote, MapPin, ChevronLeft, ChevronRight, Play, Shield, Zap, ThumbsUp } from 'lucide-react'

function About() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState({})
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [counters, setCounters] = useState({ years: 0, customers: 0, varieties: 0, rating: 0 })
  const [hasAnimated, setHasAnimated] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
            
            // Trigger counter animation
            if (entry.target.id === 'animate-hero' && !hasAnimated) {
              animateCounters()
              setHasAnimated(true)
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('[id^="animate-"]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [hasAnimated])

  const animateCounters = () => {
    const duration = 2000
    const steps = 60
    const yearTarget = 6
    const customerTarget = 1000
    const varietyTarget = 15
    const ratingTarget = 4.9

    let step = 0
    const interval = setInterval(() => {
      step++
      const progress = step / steps

      setCounters({
        years: Math.floor(yearTarget * progress),
        customers: Math.floor(customerTarget * progress),
        varieties: Math.floor(varietyTarget * progress),
        rating: (ratingTarget * progress).toFixed(1)
      })

      if (step >= steps) {
        clearInterval(interval)
        setCounters({
          years: yearTarget,
          customers: customerTarget,
          varieties: varietyTarget,
          rating: ratingTarget
        })
      }
    }, duration / steps)
  }

  const testimonials = [
    {
      name: "Dilini Perera",
      role: "Regular Customer",
      rating: 5,
      text: "The best coffee in Udawalawe! I come here every morning and the quality is always perfect. The staff remembers my order and makes me feel like family.",
      avatar: "D"
    },
    {
      name: "Kamal Fernando",
      role: "Local Business Owner",
      rating: 5,
      text: "Coffee Barista is my go-to spot for client meetings. The ambiance is perfect, the coffee is exceptional, and it always impresses my guests.",
      avatar: "K"
    },
    {
      name: "Priya Silva",
      role: "Coffee Enthusiast",
      rating: 5,
      text: "As someone who's passionate about coffee, I can confidently say this is the real deal. Their knowledge of beans and brewing methods is outstanding!",
      avatar: "P"
    }
  ]

  const teamMembers = [
    {
      name: "Kasun Perera",
      role: "Head Barista",
      image: "/images/team1.jpg",
      description: "15+ years of coffee expertise",
      specialty: "Latte Art Master",
      achievements: ["National Barista Champion 2022", "Certified Q Grader"]
    },
    {
      name: "Nimali Silva",
      role: "Coffee Roaster",
      image: "/images/team2.jpg",
      description: "Expert in bean selection",
      specialty: "Roasting Specialist",
      achievements: ["Roasting Certification", "10+ Years Experience"]
    },
    {
      name: "Ravi Fernando",
      role: "Store Manager",
      image: "/images/team3.jpg",
      description: "Ensuring perfect service",
      specialty: "Customer Experience",
      achievements: ["Hospitality Excellence Award", "5 Star Service Rating"]
    },
    {
      name: "Priya Dias",
      role: "Pastry Chef",
      image: "/images/team4.jpg",
      description: "Creating delicious pairings",
      specialty: "Artisan Baking",
      achievements: ["Culinary Institute Graduate", "Specialty Coffee Pairing Expert"]
    }
  ]

  const values = [
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Quality First",
      description: "We source only the finest beans and ingredients, never compromising on quality for our customers.",
      gradient: "from-amber-500 to-orange-600",
      stats: "100% Premium Beans"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Community Love",
      description: "Building relationships with our customers and supporting local farmers in Sri Lanka.",
      gradient: "from-orange-500 to-red-600",
      stats: "Supporting 50+ Farmers"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Innovation",
      description: "Constantly experimenting with new blends and brewing methods to delight your taste buds.",
      gradient: "from-yellow-500 to-amber-600",
      stats: "20+ Unique Blends"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description: "Every cup is crafted with precision and passion, maintaining the highest standards.",
      gradient: "from-amber-600 to-orange-700",
      stats: "5 Star Rated"
    }
  ]

  const milestones = [
    { year: "2018", event: "Coffee Barista Opens", description: "Started our journey in Udawalawe", icon: <Coffee /> },
    { year: "2019", event: "Best Local Coffee Shop", description: "Awarded by Udawalawe Business Association", icon: <Award /> },
    { year: "2020", event: "Expanded Our Menu", description: "Added 10+ new specialty drinks", icon: <Sparkles /> },
    { year: "2022", event: "1000+ Regular Customers", description: "Milestone achievement", icon: <Users /> },
    { year: "2024", event: "Community Champion", description: "Supporting local farmers program launched", icon: <Heart /> }
  ]

  const achievements = [
    { icon: <Award />, title: "Best Coffee Shop", subtitle: "Udawalawe 2023", color: "from-amber-500 to-orange-600" },
    { icon: <Star />, title: "5-Star Rated", subtitle: "Customer Reviews", color: "from-yellow-500 to-amber-600" },
    { icon: <ThumbsUp />, title: "1000+ Happy", subtitle: "Regular Customers", color: "from-orange-500 to-red-600" },
    { icon: <Shield />, title: "Quality Certified", subtitle: "Premium Standards", color: "from-amber-600 to-orange-700" }
  ]

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="w-full min-h-screen overflow-hidden bg-stone-950 relative">
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
        @keyframes glow {
          0%, 100% { opacity: 0.5; filter: blur(20px); }
          50% { opacity: 1; filter: blur(30px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes rotate {
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
        .animate-glow {
          animation: glow 4s ease-in-out infinite;
        }
        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.3), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .animate-rotate {
          animation: rotate 20s linear infinite;
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
          transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
        }
        .parallax {
          transform: translateY(calc(var(--scroll) * 0.5px));
        }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }
        
        /* Particle system */
        .particle {
          position: absolute;
          pointer-events: none;
          animation: particle-float 20s infinite;
        }
        @keyframes particle-float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(100px, -1000px) rotate(360deg); opacity: 0; }
        }
      `}</style>

      {/* Cursor follower effect */}
      <div 
        className="fixed w-8 h-8 rounded-full border-2 border-amber-400/30 pointer-events-none z-50 transition-transform duration-200"
        style={{ 
          left: mousePosition.x - 16, 
          top: mousePosition.y - 16,
          transform: 'translate(-50%, -50%)'
        }}
      ></div>

      {/* Hero Section */}
      <section id="animate-hero" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0" style={{ '--scroll': scrollY }}>
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-r from-amber-500/30 to-yellow-500/30 rounded-full blur-3xl animate-glow parallax"></div>
          <div className="absolute top-1/4 -right-48 w-[500px] h-[500px] bg-gradient-to-l from-orange-500/25 to-amber-400/25 rounded-full blur-3xl animate-glow parallax" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-48 left-1/4 w-[450px] h-[450px] bg-gradient-to-t from-yellow-600/35 to-amber-500/35 rounded-full blur-3xl animate-glow parallax" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            <Coffee size={20 + Math.random() * 20} className="text-amber-400/20" />
          </div>
        ))}

        {/* Rotating decorative rings */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-amber-500/10 rounded-full animate-rotate"></div>
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 border border-orange-500/10 rounded-full animate-rotate" style={{ animationDirection: 'reverse' }}></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Text */}
            <div className="space-y-8">
              <div className="inline-block animate-slide-left">
                <div className="flex items-center gap-2 text-amber-400 mb-4">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-400 animate-shimmer"></div>
                  <Sparkles className="w-6 h-6" />
                  <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-400 animate-shimmer"></div>
                </div>
              </div>

              <h1 className="text-5xl lg:text-7xl font-black text-amber-50 leading-tight animate-slide-left stagger-1">
                About{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    Coffee Barista
                  </span>
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-orange-500 opacity-20 blur-2xl -z-10"></div>
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-amber-200/90 leading-relaxed animate-slide-left stagger-2">
                Where passion meets perfection in every cup. Since 2018, we've been serving the finest 
                handcrafted coffee in the heart of Udawalawe.
              </p>

              {/* Animated Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-slide-left stagger-3">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative glass-strong px-6 py-4 rounded-2xl border border-amber-500/30 hover:border-amber-400/50 transition-all">
                    <div className="text-4xl font-black text-amber-400">{counters.years}+</div>
                    <div className="text-amber-200 text-sm">Years</div>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative glass-strong px-6 py-4 rounded-2xl border border-orange-500/30 hover:border-orange-400/50 transition-all">
                    <div className="text-4xl font-black text-orange-400">{counters.customers}+</div>
                    <div className="text-amber-200 text-sm">Customers</div>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative glass-strong px-6 py-4 rounded-2xl border border-yellow-500/30 hover:border-yellow-400/50 transition-all">
                    <div className="text-4xl font-black text-yellow-400">{counters.varieties}+</div>
                    <div className="text-amber-200 text-sm">Varieties</div>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative glass-strong px-6 py-4 rounded-2xl border border-amber-500/30 hover:border-amber-400/50 transition-all">
                    <div className="text-4xl font-black text-amber-400 flex items-center gap-1">
                      {counters.rating}<Star size={20} fill="currentColor" className="text-yellow-400" />
                    </div>
                    <div className="text-amber-200 text-sm">Rating</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 animate-slide-left stagger-4">
                <Link to="/menu" className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity"></div>
                  <button className="relative bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold px-8 py-4 rounded-2xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 overflow-hidden">
                    <span className="relative z-10 flex items-center gap-3">
                      <Coffee className="w-5 h-5" />
                      Explore Our Menu
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                </Link>

                <button className="group relative glass-strong text-amber-300 font-bold px-8 py-4 rounded-2xl hover:bg-amber-500/20 transition-all duration-300 transform hover:scale-105 border-2 border-amber-500/50 hover:border-amber-400">
                  <span className="flex items-center gap-3">
                    <Play className="w-5 h-5" />
                    Watch Story
                  </span>
                </button>
              </div>
            </div>

            {/* Right Side - Image with advanced effects */}
            <div className="hidden lg:flex justify-center items-center animate-slide-right">
              <div className="relative w-full max-w-lg">
                {/* Pulse rings */}
                <div className="absolute inset-0 rounded-full">
                  <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-pulse-ring"></div>
                  <div className="absolute inset-0 rounded-full bg-orange-500/20 animate-pulse-ring" style={{ animationDelay: '1s' }}></div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/40 to-orange-500/40 rounded-full blur-3xl animate-glow"></div>
                
                <div className="relative card-3d">
                  <img
                    src="/images/about-coffee.jpg"
                    alt="Coffee Barista"
                    className="relative w-full h-96 object-cover rounded-3xl shadow-2xl"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23292524" width="800" height="600"/%3E%3Ctext fill="%23f59e0b" font-family="Arial" font-size="60" x="50%25" y="45%25" text-anchor="middle" dominant-baseline="middle"%3ECoffee Barista%3C/text%3E%3Ctext fill="%23fbbf24" font-family="Arial" font-size="30" x="50%25" y="55%25" text-anchor="middle" dominant-baseline="middle"%3EUdawalawe%3C/text%3E%3C/svg%3E'
                    }}
                  />
                  
                  {/* Floating badges */}
                  <div className="absolute -top-6 -right-6 glass-strong p-6 rounded-2xl shadow-xl border border-amber-400/50 animate-float">
                    <div className="flex items-center gap-3">
                      <Star className="w-8 h-8 text-yellow-400" fill="currentColor" />
                      <div>
                        <div className="text-2xl font-bold text-amber-100">4.9/5</div>
                        <div className="text-amber-300 text-sm">Customer Rating</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-6 -left-6 glass-strong p-6 rounded-2xl shadow-xl border border-orange-400/50 animate-float" style={{ animationDelay: '1s' }}>
                    <div className="flex items-center gap-3">
                      <Award className="w-8 h-8 text-orange-400" />
                      <div>
                        <div className="text-lg font-bold text-amber-100">Award</div>
                        <div className="text-amber-300 text-sm">Winner 2023</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Banner */}
      <section className="py-12 bg-gradient-to-r from-amber-500 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 animate-shimmer opacity-30"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, i) => (
              <div key={i} className="flex flex-col items-center text-center group cursor-pointer">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {achievement.icon}
                  </div>
                </div>
                <div className="text-white font-bold text-lg">{achievement.title}</div>
                <div className="text-amber-100 text-sm">{achievement.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section with parallax */}
      <section id="animate-story" className={`py-24 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 relative ${isVisible['animate-story'] ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0" style={{ '--scroll': scrollY }}>
          <div className="absolute top-20 right-20 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl parallax"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className={`max-w-4xl mx-auto ${isVisible['animate-story'] ? 'animate-slide-up' : ''}`}>
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <Quote className="w-16 h-16 text-amber-400 animate-pulse" />
              </div>
              <h2 className="text-5xl lg:text-6xl font-bold text-amber-50 mb-6">
                Our{' '}
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Story
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 -top-8 text-amber-500/10 text-9xl font-serif">"</div>
              <div className="glass-strong p-12 rounded-3xl border border-amber-500/20 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-full blur-3xl"></div>
                
                <div className="space-y-6 text-amber-200/90 text-lg leading-relaxed relative z-10">
                  <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-amber-400 first-letter:float-left first-letter:mr-3">
                    Coffee Barista was born from a simple dream: to bring exceptional coffee culture to Udawalawe. 
                    In 2018, we opened our doors with a mission to serve not just coffee, but an experience that 
                    brings people together.
                  </p>
                  <p>
                    What started as a small café with a handful of regular customers has grown into the community's 
                    favorite coffee destination. We've stayed true to our roots—sourcing premium beans from local 
                    Sri Lankan estates, roasting them to perfection, and crafting each cup with genuine care.
                  </p>
                  <p>
                    Today, we're proud to be more than just a coffee shop. We're a gathering place where friends meet, 
                    ideas flow, and memories are made over the perfect cup of coffee. Our commitment to quality, 
                    community, and sustainability drives everything we do.
                  </p>
                </div>
              </div>
              <div className="absolute -right-8 -bottom-8 text-amber-500/10 text-9xl font-serif rotate-180">"</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section with enhanced effects */}
      <section id="animate-values" className={`py-24 bg-gradient-to-b from-stone-950 to-stone-900 relative ${isVisible['animate-values'] ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-6">
          <div className={`text-center mb-16 ${isVisible['animate-values'] ? 'animate-slide-up' : ''}`}>
            <h2 className="text-5xl lg:text-6xl font-bold text-amber-50 mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Values
              </span>
            </h2>
            <p className="text-xl text-amber-200/80 max-w-3xl mx-auto">
              The principles that guide us in serving you the perfect cup every single day
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div
                key={i}
                className={`group relative ${isVisible['animate-values'] ? `animate-scale stagger-${i + 1}` : ''}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-20 rounded-3xl blur-2xl transition-opacity duration-500`}></div>
                
                <div className="card-3d relative glass-strong p-8 rounded-3xl border border-amber-500/20 group-hover:border-amber-400/40 transition-all duration-500 h-full overflow-hidden">
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative mb-6 inline-block">
                    <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity`}></div>
                    <div className={`relative bg-gradient-to-br ${value.gradient} w-20 h-20 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl`}>
                      {value.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-amber-50 mb-3 group-hover:text-amber-300 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-amber-200/80 leading-relaxed mb-4">
                    {value.description}
                  </p>
                  
                  {/* Stats badge */}
                  <div className={`inline-block bg-gradient-to-r ${value.gradient} px-4 py-2 rounded-full text-white text-sm font-semibold`}>
                    {value.stats}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section with enhanced animations */}
      <section id="animate-timeline" className={`py-24 bg-gradient-to-b from-stone-900 to-stone-950 relative overflow-hidden ${isVisible['animate-timeline'] ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className={`text-center mb-16 ${isVisible['animate-timeline'] ? 'animate-slide-up' : ''}`}>
            <h2 className="text-5xl lg:text-6xl font-bold text-amber-50 mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
            <p className="text-xl text-amber-200/80">
              Key milestones in our coffee story
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative">
            {/* Glowing timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2 hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-400 via-orange-500 to-amber-400"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-amber-400 via-orange-500 to-amber-400 blur-md"></div>
            </div>

            {milestones.map((milestone, i) => (
              <div
                key={i}
                className={`relative mb-16 ${isVisible['animate-timeline'] ? `animate-slide-${i % 2 === 0 ? 'left' : 'right'} stagger-${i + 1}` : ''}`}
              >
                <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:ml-auto'}`}>
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="relative glass-strong p-8 rounded-3xl border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300">
                      <div className={`flex items-center gap-4 mb-4 ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex items-center gap-4 ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full blur-lg"></div>
                            <div className="relative w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                              <div className="text-white">
                                {milestone.icon}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="text-3xl font-black text-amber-400">{milestone.year}</div>
                            <div className="text-xl font-bold text-amber-100">{milestone.event}</div>
                          </div>
                        </div>
                      </div>
                      <p className="text-amber-200/80 text-lg">{milestone.description}</p>
                    </div>
                  </div>
                </div>

                {/* Center Dot with pulse */}
                <div className="absolute left-1/2 top-8 transform -translate-x-1/2 hidden md:block">
                  <div className="relative">
                    <div className="w-6 h-6 bg-amber-400 rounded-full border-4 border-stone-950"></div>
                    <div className="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-75"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with hover effects */}
      <section id="animate-team" className={`py-24 bg-gradient-to-b from-stone-950 to-stone-900 relative ${isVisible['animate-team'] ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-6">
          <div className={`text-center mb-16 ${isVisible['animate-team'] ? 'animate-slide-up' : ''}`}>
            <h2 className="text-5xl lg:text-6xl font-bold text-amber-50 mb-6">
              Meet Our{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Expert Team
              </span>
            </h2>
            <p className="text-xl text-amber-200/80 max-w-3xl mx-auto">
              The passionate people behind every perfect cup
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className={`group ${isVisible['animate-team'] ? `animate-scale stagger-${i + 1}` : ''}`}
              >
                <div className="card-3d relative overflow-hidden rounded-3xl border border-amber-500/20 hover:border-amber-400/40 transition-all duration-500">
                  {/* Image with overlay */}
                  <div className="relative h-80 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-transparent z-10"></div>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23d97706" width="400" height="400"/%3E%3Ctext fill="%23fff" font-family="Arial" font-size="60" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E' + member.name[0] + '%3C/text%3E%3C/svg%3E'
                      }}
                    />
                    
                    {/* Role badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <div className="glass-strong px-4 py-2 rounded-full border border-amber-400/50">
                        <span className="text-amber-100 text-sm font-semibold">{member.role}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="glass-strong p-6 relative z-10">
                    <h3 className="text-2xl font-bold text-amber-100 mb-2">{member.name}</h3>
                    <p className="text-amber-200/70 text-sm mb-4">{member.description}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-5 h-5 text-orange-400" fill="currentColor" />
                      <span className="text-orange-400 font-semibold text-sm">{member.specialty}</span>
                    </div>

                    {/* Achievements */}
                    <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {member.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-amber-400" />
                          <span className="text-amber-200/70 text-xs">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section id="animate-testimonials" className={`py-24 bg-gradient-to-b from-stone-900 to-stone-950 relative ${isVisible['animate-testimonials'] ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-6">
          <div className={`text-center mb-16 ${isVisible['animate-testimonials'] ? 'animate-slide-up' : ''}`}>
            <h2 className="text-5xl lg:text-6xl font-bold text-amber-50 mb-6">
              What Our{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Customers Say
              </span>
            </h2>
            <p className="text-xl text-amber-200/80">
              Real reviews from real coffee lovers
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Carousel */}
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-4">
                    <div className="glass-strong p-12 rounded-3xl border border-amber-500/20">
                      <div className="flex gap-2 mb-6 justify-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" />
                        ))}
                      </div>
                      
                      <p className="text-amber-200/90 text-xl leading-relaxed mb-8 text-center italic">
                        "{testimonial.text}"
                      </p>
                      
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-2xl shadow-xl">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <div className="text-amber-100 font-bold text-lg">{testimonial.name}</div>
                          <div className="text-amber-300/70 text-sm">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicators */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === activeTestimonial 
                      ? 'bg-amber-400 w-8' 
                      : 'bg-amber-400/30 hover:bg-amber-400/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="animate-why" className={`py-24 bg-gradient-to-b from-stone-950 to-stone-900 relative ${isVisible['animate-why'] ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-6">
          <div className={`text-center mb-16 ${isVisible['animate-why'] ? 'animate-slide-up' : ''}`}>
            <h2 className="text-5xl lg:text-6xl font-bold text-amber-50 mb-6">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Us
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Coffee />, title: "Premium Beans", text: "Sourced from the finest Sri Lankan coffee estates", gradient: "from-amber-500 to-orange-600" },
              { icon: <Users />, title: "Expert Baristas", text: "Trained professionals with 10+ years experience", gradient: "from-orange-500 to-red-600" },
              { icon: <Heart />, title: "Community Focus", text: "Supporting local farmers and sustainable practices", gradient: "from-yellow-500 to-amber-600" },
              { icon: <Clock />, title: "Consistent Quality", text: "Same great taste in every single cup", gradient: "from-amber-600 to-orange-700" },
              { icon: <Target />, title: "Customer First", text: "Your satisfaction is our top priority", gradient: "from-amber-500 to-yellow-600" },
              { icon: <Award />, title: "Award Winning", text: "Recognized as Udawalawe's best coffee shop", gradient: "from-orange-500 to-amber-600" }
            ].map((item, i) => (
              <div
                key={i}
                className={`group relative ${isVisible['animate-why'] ? `animate-slide-up stagger-${i + 1}` : ''}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 rounded-3xl blur-2xl transition-opacity duration-500`}></div>
                
                <div className="relative glass-strong p-8 rounded-3xl border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 h-full">
                  <div className="relative mb-6 inline-block">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity`}></div>
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl`}>
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-amber-100 mb-3">{item.title}</h3>
                  <p className="text-amber-200/80 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us CTA */}
      <section className="py-24 bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-block relative">
              <MapPin className="w-16 h-16 text-amber-400 mx-auto animate-bounce" />
              <div className="absolute inset-0 animate-ping">
                <MapPin className="w-16 h-16 text-amber-400 opacity-75" />
              </div>
            </div>

            <h2 className="text-5xl lg:text-7xl font-bold text-amber-50 leading-tight">
              Visit Us{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Today
              </span>
            </h2>

            <p className="text-xl lg:text-2xl text-amber-200/80 max-w-3xl mx-auto leading-relaxed">
              Experience the warmth and flavor that makes Coffee Barista Udawalawe special.
              <br />
              <span className="text-amber-400 font-semibold">We're open daily from 7:00 AM to 9:00 PM</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link to="/contact" className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <button className="relative bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold px-12 py-6 rounded-2xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-3">
                    <MapPin className="w-6 h-6" />
                    Get Directions
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </Link>

              <Link to="/menu" className="group relative">
                <div className="absolute inset-0 bg-amber-500/20 rounded-2xl blur-xl group-hover:bg-amber-500/40 transition-all"></div>
                <button className="relative glass-strong text-amber-300 font-bold px-12 py-6 rounded-2xl hover:bg-amber-500/20 transition-all duration-300 transform hover:scale-105 border-2 border-amber-500/50 hover:border-amber-400">
                  <span className="flex items-center gap-3">
                    <Coffee className="w-6 h-6" />
                    View Menu
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About