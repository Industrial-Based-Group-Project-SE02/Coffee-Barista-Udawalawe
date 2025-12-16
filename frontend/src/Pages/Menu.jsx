import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Heart, Star, ShoppingCart, Search, Filter, Plus, Minus, ArrowRight, Sparkles, Award, Clock, ChevronDown } from 'lucide-react';

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState({});
  const [isVisible, setIsVisible] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        })
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id^="item-"]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const categories = [
    { name: 'All', icon: <Coffee />, color: 'from-amber-500 to-orange-600' },
    { name: 'Hot Coffee', icon: <Coffee />, color: 'from-orange-500 to-red-600' },
    { name: 'Iced Coffee', icon: <Coffee />, color: 'from-blue-400 to-cyan-500' },
    { name: 'Special', icon: <Star />, color: 'from-yellow-500 to-amber-600' },
    { name: 'Food', icon: <Award />, color: 'from-amber-600 to-orange-700' }
  ];

  const menuItems = [
    {
      id: 1,
      name: 'Classic Espresso',
      category: 'Hot Coffee',
      price: 450,
      image: '/images/menu/espresso.jpg',
      description: 'Rich, bold shot of pure coffee perfection',
      rating: 4.8,
      popular: true,
      badges: ['Bestseller']
    },
    {
      id: 2,
      name: 'Cappuccino',
      category: 'Hot Coffee',
      price: 550,
      image: '/images/menu/cappuccino.jpg',
      description: 'Creamy espresso with steamed milk and foam',
      rating: 4.9,
      popular: true,
      badges: ['Most Loved']
    },
    {
      id: 3,
      name: 'Caffe Latte',
      category: 'Hot Coffee',
      price: 600,
      image: '/images/menu/latte.jpg',
      description: 'Smooth espresso with velvety steamed milk',
      rating: 4.7,
      popular: true
    },
    {
      id: 4,
      name: 'Mocha',
      category: 'Hot Coffee',
      price: 650,
      image: '/images/menu/mocha.jpg',
      description: 'Chocolate and espresso blend with whipped cream',
      rating: 4.8,
      popular: true,
      badges: ['Sweet Treat']
    },
    {
      id: 5,
      name: 'Americano',
      category: 'Hot Coffee',
      price: 500,
      image: '/images/menu/americano.jpg',
      description: 'Espresso diluted with hot water',
      rating: 4.6,
      popular: false
    },
    {
      id: 6,
      name: 'Iced Latte',
      category: 'Iced Coffee',
      price: 650,
      image: '/images/menu/iced-latte.jpg',
      description: 'Chilled espresso with cold milk over ice',
      rating: 4.9,
      popular: true,
      badges: ['Summer Special']
    },
    {
      id: 7,
      name: 'Iced Mocha',
      category: 'Iced Coffee',
      price: 700,
      image: '/images/menu/iced-mocha.jpg',
      description: 'Cold coffee with chocolate and ice',
      rating: 4.7,
      popular: true
    },
    {
      id: 8,
      name: 'Cold Brew',
      category: 'Iced Coffee',
      price: 750,
      image: '/images/menu/cold-brew.jpg',
      description: 'Smooth, slow-steeped cold coffee',
      rating: 4.8,
      popular: true,
      badges: ['Premium']
    },
    {
      id: 9,
      name: 'Vanilla Frappe',
      category: 'Iced Coffee',
      price: 800,
      image: '/images/menu/frappe.jpg',
      description: 'Blended iced coffee with vanilla',
      rating: 4.6,
      popular: false
    },
    {
      id: 10,
      name: 'Caramel Macchiato',
      category: 'Special',
      price: 850,
      image: '/images/menu/caramel-macchiato.jpg',
      description: 'Layered espresso with caramel drizzle',
      rating: 4.9,
      popular: true,
      badges: ['Signature', 'Premium']
    },
    {
      id: 11,
      name: 'Hazelnut Delight',
      category: 'Special',
      price: 900,
      image: '/images/menu/hazelnut.jpg',
      description: 'Coffee with hazelnut syrup and cream',
      rating: 4.8,
      popular: true,
      badges: ['Chef Special']
    },
    {
      id: 12,
      name: 'White Chocolate Mocha',
      category: 'Special',
      price: 950,
      image: '/images/menu/white-mocha.jpg',
      description: 'Espresso with white chocolate and cream',
      rating: 4.9,
      popular: true,
      badges: ['Premium', 'Sweet']
    },
    {
      id: 13,
      name: 'Croissant',
      category: 'Food',
      price: 350,
      image: '/images/menu/croissant.jpg',
      description: 'Buttery, flaky French pastry',
      rating: 4.7,
      popular: true
    },
    {
      id: 14,
      name: 'Blueberry Muffin',
      category: 'Food',
      price: 400,
      image: '/images/menu/muffin.jpg',
      description: 'Fresh baked muffin with blueberries',
      rating: 4.6,
      popular: false
    },
    {
      id: 15,
      name: 'Chicken Sandwich',
      category: 'Food',
      price: 850,
      image: '/images/menu/sandwich.jpg',
      description: 'Grilled chicken with fresh vegetables',
      rating: 4.8,
      popular: true,
      badges: ['Filling']
    }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'popular') return b.rating - a.rating;
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  const addToCart = (itemId) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [itemId, count]) => {
      const item = menuItems.find(i => i.id === parseInt(itemId));
      return sum + (item ? item.price * count : 0);
    }, 0);
  };

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
        @keyframes glow {
          0%, 100% { opacity: 0.5; filter: blur(20px); }
          50% { opacity: 1; filter: blur(30px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-slide-up {
          animation: slideInUp 0.6s ease-out forwards;
        }
        .animate-glow {
          animation: glow 4s ease-in-out infinite;
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
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
      `}</style>

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-r from-amber-500/30 to-yellow-500/30 rounded-full blur-3xl animate-glow"></div>
        <div className="absolute top-1/4 -right-48 w-[500px] h-[500px] bg-gradient-to-l from-orange-500/25 to-amber-400/25 rounded-full blur-3xl animate-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-slide-up">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-400"></div>
              <Sparkles className="w-6 h-6 text-amber-400" />
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-amber-50 mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Menu
              </span>
            </h1>
            
            <p className="text-xl text-amber-200/80 max-w-2xl mx-auto">
              Discover our handcrafted beverages and fresh food, made with love every day
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="max-w-4xl mx-auto mb-12 animate-slide-up stagger-1">
            <div className="glass-strong rounded-2xl p-6 border border-amber-500/20">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for coffee, food..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full glass border-2 border-amber-500/20 pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 text-amber-100 placeholder-amber-300/30"
                  />
                </div>

                {/* Sort */}
                <div className="relative">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="glass border-2 border-amber-500/20 px-6 py-3 rounded-xl hover:bg-amber-500/10 transition-all flex items-center gap-2 text-amber-200"
                  >
                    <Filter className="w-5 h-5" />
                    <span>Sort</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                  </button>

                  {showFilters && (
                    <div className="absolute top-full right-0 mt-2 glass-strong border border-amber-500/20 rounded-xl p-2 min-w-[200px] z-20">
                      {[
                        { value: 'popular', label: 'Most Popular' },
                        { value: 'price-low', label: 'Price: Low to High' },
                        { value: 'price-high', label: 'Price: High to Low' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setShowFilters(false);
                          }}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                            sortBy === option.value 
                              ? 'bg-amber-500/20 text-amber-300' 
                              : 'text-amber-200 hover:bg-amber-500/10'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-16 animate-slide-up stagger-2">
            {categories.map((category, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(category.name)}
                className={`group relative px-6 py-3 rounded-xl transition-all duration-300 ${
                  selectedCategory === category.name
                    ? 'scale-105'
                    : 'hover:scale-105'
                }`}
              >
                {selectedCategory === category.name && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-xl blur-lg opacity-60`}></div>
                )}
                <div className={`relative flex items-center gap-2 ${
                  selectedCategory === category.name
                    ? `glass-strong border-2 border-amber-400/50`
                    : 'glass border border-amber-500/20 hover:border-amber-400/40'
                } px-6 py-3 rounded-xl`}>
                  <div className={selectedCategory === category.name ? 'text-amber-300' : 'text-amber-400'}>
                    {category.icon}
                  </div>
                  <span className={`font-semibold ${
                    selectedCategory === category.name ? 'text-amber-100' : 'text-amber-200'
                  }`}>
                    {category.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items Grid */}
      <section className="relative py-12">
        <div className="container mx-auto px-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <Coffee className="w-16 h-16 text-amber-400/50 mx-auto mb-4" />
              <p className="text-amber-200/60 text-lg">No items found matching your search.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  id={`item-${item.id}`}
                  className={`card-3d group ${isVisible[`item-${item.id}`] ? 'animate-slide-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative glass-strong rounded-3xl overflow-hidden border border-amber-500/20 hover:border-amber-400/40 transition-all duration-500">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent z-10"></div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23292524' width='400' height='300'/%3E%3Ctext fill='%23f59e0b' font-family='Arial' font-size='20' x='50%25' y='45%25' text-anchor='middle' dominant-baseline='middle'%3E${item.name}%3C/text%3E%3Ctext fill='%23fbbf24' font-family='Arial' font-size='14' x='50%25' y='55%25' text-anchor='middle' dominant-baseline='middle'%3ELKR ${item.price}%3C/text%3E%3C/svg%3E`;
                        }}
                      />
                      
                      {/* Badges */}
                      {item.badges && (
                        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                          {item.badges.map((badge, i) => (
                            <span key={i} className="glass-strong px-3 py-1 rounded-full text-xs font-bold text-amber-300 border border-amber-400/50">
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Favorite Button */}
                      <button className="absolute top-4 right-4 z-20 glass-strong p-2 rounded-full border border-amber-500/30 hover:bg-amber-500/20 transition-all group/fav">
                        <Heart className="w-5 h-5 text-amber-400 group-hover/fav:fill-current transition-all" />
                      </button>

                      {/* Rating */}
                      <div className="absolute bottom-4 left-4 z-20 glass-strong px-3 py-1.5 rounded-full flex items-center gap-1 border border-amber-400/50">
                        <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                        <span className="text-amber-100 font-bold text-sm">{item.rating}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-3">
                        <h3 className="text-xl font-bold text-amber-100 mb-2 group-hover:text-amber-300 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-amber-200/70 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl font-black text-amber-400">
                          LKR {item.price}
                        </div>
                        <div className="text-amber-300/60 text-sm flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>5-10 min</span>
                        </div>
                      </div>

                      {/* Add to Cart */}
                      {cart[item.id] ? (
                        <div className="flex items-center justify-between glass border-2 border-amber-500/30 rounded-xl p-3">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-8 h-8 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 flex items-center justify-center transition-all"
                          >
                            <Minus className="w-4 h-4 text-amber-300" />
                          </button>
                          <span className="text-amber-100 font-bold text-lg">
                            {cart[item.id]}
                          </span>
                          <button
                            onClick={() => addToCart(item.id)}
                            className="w-8 h-8 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 flex items-center justify-center transition-all"
                          >
                            <Plus className="w-4 h-4 text-amber-300" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item.id)}
                          className="group/btn relative w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/50 flex items-center justify-center gap-2 overflow-hidden"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Floating Cart Button */}
      {getTotalItems() > 0 && (
        <Link to="/cart">
          <button className="fixed bottom-8 right-8 z-50 group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 transform group-hover:scale-110 transition-all">
              <ShoppingCart className="w-6 h-6" />
              <div className="flex flex-col items-start">
                <span className="text-xs">Cart</span>
                <span className="text-sm font-black">{getTotalItems()} items • LKR {getTotalPrice()}</span>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </Link>
      )}
    </div>
  );
}

export default Menu;