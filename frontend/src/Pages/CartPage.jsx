import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Trash, Coffee, ShoppingCart, Sparkles } from "lucide-react";
import { getCart, removeFromCart } from "../utils/cart";


export default function CartPage() {
  const [cart, setCart] = useState(getCart());

  return (
    <div className="min-h-screen relative overflow-hidden bg-stone-950">
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-r from-amber-500/30 to-yellow-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 -right-48 w-[500px] h-[500px] bg-gradient-to-l from-orange-500/25 to-amber-400/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-48 left-1/4 w-[450px] h-[450px] bg-gradient-to-t from-yellow-600/35 to-amber-500/35 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating Coffee Icons */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 text-amber-300/30 animate-bounce delay-500">
            <Coffee size={40} />
          </div>
          <div className="absolute top-40 right-1/4 text-orange-400/30 animate-bounce delay-1000">
            <Coffee size={48} />
          </div>
          <div className="absolute bottom-32 left-1/3 text-amber-300/30 animate-bounce delay-1500">
            <Coffee size={36} />
          </div>
          
          {/* Additional Coffee Icons */}
          <div className="absolute top-32 left-1/6 text-amber-300/25 animate-bounce delay-800">
            <Coffee size={42} />
          </div>
          <div className="absolute top-60 right-1/6 text-orange-400/35 animate-bounce delay-1200">
            <Coffee size={38} />
          </div>
          <div className="absolute bottom-40 right-1/5 text-amber-400/30 animate-bounce delay-1800">
            <Coffee size={45} />
          </div>
          
          {/* More Coffee Icons */}
          <div className="absolute top-16 right-1/3 text-yellow-300/35 animate-bounce delay-300">
            <Coffee size={35} />
          </div>
          <div className="absolute top-1/3 left-1/8 text-amber-400/25 animate-bounce delay-900">
            <Coffee size={32} />
          </div>
          <div className="absolute bottom-20 left-1/5 text-orange-300/30 animate-bounce delay-1600">
            <Coffee size={38} />
          </div>
          
          {/* Even More Coffee Icons */}
          <div className="absolute top-2/3 left-1/6 text-amber-500/25 animate-bounce delay-1100">
            <Coffee size={30} />
          </div>
          <div className="absolute bottom-1/4 right-1/3 text-orange-400/30 animate-bounce delay-1700">
            <Coffee size={32} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-12 px-6 min-h-screen">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-4 rounded-2xl shadow-lg">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
                Your Cart
              </h1>
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-2xl shadow-lg">
                <Coffee className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="bg-stone-900/80 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-lg inline-block border border-amber-500/30">
              <p className="text-lg text-amber-200 font-medium">
                ☕ Handcrafted coffee from expert baristas 🌟
              </p>
            </div>
          </div>

          {/* Cart Items */}
          <div className="w-full flex flex-col items-center space-y-6">
            {cart.map((item) => {
              return (
                <div key={item.product_id} className="w-full max-w-4xl bg-stone-900/80 backdrop-blur-sm rounded-3xl shadow-xl border border-amber-500/30 hover:shadow-2xl hover:border-amber-400/50 transition-all duration-300 overflow-hidden">
                  
                  {/* Product Card */}
                  <div className="p-8 flex flex-col md:flex-row items-center gap-6 relative">
                    
                    {/* Delete Button */}
                    <button 
                      onClick={() => {
                        removeFromCart(item.product_id);
                        setCart(getCart());
                        toast.success("Product removed from cart", {
                          icon: '🗑️',
                          style: {
                            background: '#292524',
                            color: '#fbbf24',
                            border: '1px solid rgba(251, 191, 36, 0.3)'
                          }
                        });
                      }} 
                      className="absolute top-4 right-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 hover:border-red-400/50 p-3 rounded-full transition-all duration-200 hover:scale-110 shadow-lg backdrop-blur-sm"
                    >
                      <Trash className="w-5 h-5" />
                    </button>

                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.productname}
                        className="w-32 h-32 object-cover rounded-2xl shadow-lg border-4 border-amber-500/30 hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Crect fill='%23292524' width='128' height='128'/%3E%3Ctext fill='%23f59e0b' font-family='Arial' font-size='16' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E${item.productname[0]}%3C/text%3E%3C/svg%3E`;
                        }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-6 text-center md:text-left">
                      
                      {/* Product Name */}
                      <div className="md:col-span-2">
                        <h3 className="text-xl font-bold text-amber-100 mb-2">{item.productname}</h3>
                        <div className="flex items-center justify-center md:justify-start gap-2">
                          <Coffee className="w-4 h-4 text-amber-400" />
                          <span className="text-sm text-amber-300 font-medium">☕ Premium Quality</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex flex-col items-center md:items-start">
                        <span className="text-sm text-amber-300/60 mb-1">Price</span>
                        <span className="text-2xl font-bold text-amber-400">LKR {item.price}</span>
                      </div>

                      {/* Labelled Price */}
                      <div className="flex flex-col items-center md:items-start">
                        <span className="text-sm text-amber-300/60 mb-1">Original Price</span>
                        {item.labelledPrice ? (
                          <div className="flex flex-col items-center md:items-start">
                            <span className="text-lg text-amber-200/50 line-through">LKR {item.labelledPrice}</span>
                            <span className="bg-red-500/20 border border-red-400/30 text-red-400 px-2 py-1 rounded-full text-xs font-medium mt-1">
                              SAVE LKR {item.labelledPrice - item.price}
                            </span>
                          </div>
                        ) : (
                          <span className="text-amber-300/40">-</span>
                        )}
                      </div>

                      {/* Quantity & Total */}
                      <div className="flex flex-col items-center md:items-start">
                        <span className="text-sm text-amber-300/60 mb-1">Quantity</span>
                        <div className="bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-xl mb-3">
                          <span className="text-lg font-bold text-amber-300">{item.qty}</span>
                        </div>
                        
                        <div className="text-center md:text-left">
                          <span className="text-sm text-amber-300/60">Total</span>
                          <div className="text-2xl font-bold text-amber-400">
                            LKR {(item.price * item.qty).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Border with Coffee Pattern */}
                  <div className="h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500"></div>
                </div>
              );
            })}
          </div>

          {/* Empty Cart State */}
          {cart.length === 0 && (
            <div className="bg-stone-900/80 backdrop-blur-sm rounded-3xl shadow-xl p-12 border border-amber-500/30 text-center">
              <div className="bg-amber-500/10 border border-amber-500/30 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-12 h-12 text-amber-400" />
              </div>
              <h2 className="text-3xl font-bold text-amber-100 mb-4">Your cart is empty</h2>
              <p className="text-amber-200/70 text-lg mb-8">☕ Start adding delicious coffee from our menu!</p>
              <Link to="/menu">
                <button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-2xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center gap-2">
                  <Coffee className="w-5 h-5" />
                  Browse Menu
                </button>
              </Link>
            </div>
          )}

          {/* Cart Summary */}
          {cart.length > 0 && (
            <div className="mt-12 bg-stone-900/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-amber-500/30">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-amber-100 mb-6 flex items-center justify-center gap-2">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                  Order Summary
                </h3>
                <div className="flex justify-between items-center max-w-md mx-auto">
                  <span className="text-xl text-amber-200">Total Items:</span>
                  <span className="text-xl font-bold text-amber-100">
                    {cart.reduce((total, item) => total + item.qty, 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center max-w-md mx-auto mt-4 text-2xl">
                  <span className="font-bold text-amber-200">Grand Total:</span>
                  <span className="font-bold text-amber-400">
                    LKR {cart.reduce((total, item) => total + (item.price * item.qty), 0).toFixed(2)}
                  </span>
                </div>
              </div>
              <Link 
                to="/checkout" 
                state={{
                  cart: cart,
                }}
                className="block mt-8 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg text-center transition duration-300 ease-in-out transform hover:scale-105"
              >
                Proceed to Checkout
              </Link>
              <Link 
                to="/menu" 
                className="block mt-4 bg-stone-800/50 border-2 border-amber-500/30 hover:border-amber-400/50 hover:bg-stone-800/80 text-amber-300 font-semibold py-3 px-6 rounded-2xl text-center transition duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}