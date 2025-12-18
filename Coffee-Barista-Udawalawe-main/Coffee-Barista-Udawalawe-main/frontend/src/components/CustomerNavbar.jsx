import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Coffee,
  LogOut,
  User,
  LayoutDashboard,
  ShoppingCart,
  Package,
  Heart,
  Star,
  Award,
  Sparkles,
} from "lucide-react";

const CustomerNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // read real user name if available
  const firstname =
    localStorage.getItem("username") ||
    localStorage.getItem("firstname") ||
    "Coffee Lover";

  const navItems = [
    {
      name: "Dashboard",
      path: "/customer-dashboard",
      icon: <LayoutDashboard size={22} />,
      gradient: "from-amber-500 to-orange-600",
    },
    {
      name: "My Cart",
      path: "/cart",
      icon: <ShoppingCart size={22} />,
      gradient: "from-orange-500 to-red-600",
    },
    {
      name: "My Orders",
      path: "/my-orders",
      icon: <Package size={22} />,
      gradient: "from-yellow-500 to-amber-600",
    },
    {
      name: "Edit Profile",
      path: "/edit-profile",
      icon: <User size={22} />,
      gradient: "from-amber-600 to-orange-700",
    },
  ];

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("email");
    localStorage.removeItem("userRole");
    localStorage.removeItem("firstname");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 shadow-2xl flex flex-col justify-between z-50 overflow-y-auto border-r border-amber-500/20">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.3); }
          50% { box-shadow: 0 0 30px rgba(251, 191, 36, 0.5); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.3), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .glass { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); }
        .glass-strong { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(20px); }
      `}</style>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-glow"></div>
        <div
          className="absolute bottom-20 -right-20 w-56 h-56 bg-orange-500/10 rounded-full blur-3xl animate-glow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl animate-glow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Top Section */}
      <div className="relative z-10">
        {/* Header */}
        <div className="p-6 border-b border-amber-500/20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl animate-pulse"></div>

            <div className="relative glass-strong p-4 rounded-2xl border border-amber-500/30">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl blur-md opacity-60"></div>
                  <div className="relative bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-2xl shadow-xl animate-float">
                    <Coffee className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    Customer Panel
                  </h2>
                  <p className="text-sm text-amber-300/80 flex items-center gap-1 font-medium">
                    <Star className="w-3 h-3" fill="currentColor" />
                    Coffee Barista
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-2">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                type="button"
                className={`group relative w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-semibold transition-all duration-300 overflow-hidden ${
                  isActive ? "text-white" : "text-amber-300/70 hover:text-amber-200"
                }`}
              >
                {isActive && (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-90`}></div>
                    <div className="absolute inset-0 bg-white/10"></div>
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} blur-xl opacity-50`}></div>
                  </>
                )}

                {!isActive && (
                  <div className="absolute inset-0 glass opacity-0 group-hover:opacity-100 transition-opacity"></div>
                )}

                <div className="relative z-10 flex items-center gap-4 w-full">
                  <div
                    className={`${
                      isActive ? "text-white" : `bg-gradient-to-br ${item.gradient} bg-clip-text text-transparent`
                    } transition-all duration-300 group-hover:scale-110`}
                  >
                    {item.icon}
                  </div>

                  <span className="text-base">{item.name}</span>

                  {isActive && (
                    <div className="ml-auto">
                      <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                    </div>
                  )}
                </div>

                {isActive && (
                  <div
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b ${item.gradient} rounded-r-full`}
                  ></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Loyalty Card */}
        <div className="px-4 py-3">
          <div className="relative overflow-hidden glass-strong p-4 rounded-2xl border border-amber-500/30 animate-pulse-glow">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-500/20 to-amber-600/20 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-bold text-amber-200">Loyalty Status</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-black bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Gold Member
                </span>
                <span className="text-amber-300 text-sm font-bold">240 pts</span>
              </div>
              <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full"></div>
              </div>
              <p className="text-xs text-amber-300/60 mt-2">60 points to Platinum</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Profile Section */}
      <div className="relative z-10 p-4 border-t border-amber-500/20">
        <div className="relative overflow-hidden glass-strong p-4 rounded-2xl mb-4 border border-amber-500/30">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10"></div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full blur-md opacity-60 animate-pulse"></div>
              <img
                src="https://i.pravatar.cc/100?img=32"
                alt="avatar"
                className="relative w-14 h-14 rounded-full border-2 border-amber-400 shadow-xl"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-stone-900"></div>
            </div>

            <div className="flex-1">
              <p className="text-base font-bold text-amber-100">{firstname}</p>
              <p className="text-sm text-amber-300/70 flex items-center gap-1">
                <Heart className="w-3 h-3" fill="currentColor" />
                <span>Premium Customer</span>
              </p>
            </div>
          </div>
        </div>

        <button onClick={logOut} className="group relative w-full overflow-hidden" type="button">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>

          <div className="relative flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold text-red-400 hover:text-red-300 glass rounded-xl border border-red-500/30 hover:border-red-400/50 transition-all group-hover:scale-105 active:scale-95">
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            Logout
          </div>
        </button>
      </div>
    </aside>
  );
};

export default CustomerNavbar;
