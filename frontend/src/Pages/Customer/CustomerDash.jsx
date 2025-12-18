import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Coffee,
  ShoppingBag,
  Heart,
  Clock,
  Award,
  TrendingUp,
  Sparkles,
  Zap,
  ArrowRight,
} from "lucide-react";

const CustomerDash = () => {
  const API_BASE = "http://localhost:3000";
  const navigate = useNavigate();

  const [firstname] = useState("Coffee Lover");
  const [reservationCount, setReservationCount] = useState(0);

  const [reservations, setReservations] = useState([]);
  const [resLoading, setResLoading] = useState(false);

  // Get email from localStorage
  const userEmail = useMemo(() => {
    return (
      localStorage.getItem("email") ||
      localStorage.getItem("userEmail") ||
      localStorage.getItem("customerEmail") ||
      ""
    );
  }, []);

  const token = useMemo(() => {
    return localStorage.getItem("token") || localStorage.getItem("accessToken") || "";
  }, []);

  // Fetch reservation count
  useEffect(() => {
    const tokenLS = localStorage.getItem("token");
    const emailLS = localStorage.getItem("email");

    if (!tokenLS || !emailLS) return;

    axios
      .get(`${API_BASE}/api/reservations/count/${encodeURIComponent(emailLS)}`, {
        headers: {
          Authorization: `Bearer ${tokenLS}`,
        },
      })
      .then((res) => {
        setReservationCount(res.data.count || 0);
      })
      .catch((err) => {
        console.error("Failed to fetch reservation count", err);
      });
  }, [API_BASE]);

  // Fetch reservations for logged in user
  useEffect(() => {
    const fetchMyReservations = async () => {
      if (!userEmail) return;

      setResLoading(true);
      try {
        const res = await axios.get(
          `${API_BASE}/api/reservations/byemail/${encodeURIComponent(userEmail)}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );

        const list = Array.isArray(res.data?.data) ? res.data.data : [];
        setReservations(list);
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to load reservations");
        setReservations([]);
      } finally {
        setResLoading(false);
      }
    };

    fetchMyReservations();
  }, [API_BASE, userEmail, token]);

  // Generate particle positions ONCE
  const particles = useMemo(() => {
    return [...Array(15)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${2 + Math.random() * 2}s`,
    }));
  }, []);

  // Helpers
  const formatDate = (d) => {
    if (!d) return "-";
    try {
      return String(d).split("T")[0];
    } catch {
      return "-";
    }
  };

  const statusBadge = (status) => {
    const s = String(status || "").toLowerCase();
    if (s === "approved" || s === "confirmed")
      return "bg-green-500/15 text-green-300 border-green-500/30";
    if (s === "pending")
      return "bg-yellow-500/15 text-yellow-300 border-yellow-500/30";
    if (s === "rejected" || s === "cancelled")
      return "bg-red-500/15 text-red-300 border-red-500/30";
    return "bg-stone-500/15 text-stone-300 border-stone-500/30";
  };

  return (
    <div className="min-h-screen bg-stone-950 overflow-hidden">
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
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.3); }
          50% { box-shadow: 0 0 40px rgba(251, 191, 36, 0.6); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-slide-up { animation: slideInUp 0.6s ease-out forwards; }
        .animate-slide-left { animation: slideInLeft 0.6s ease-out forwards; }
        .animate-slide-right { animation: slideInRight 0.6s ease-out forwards; }
        .animate-scale { animation: scaleIn 0.6s ease-out forwards; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.3), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .animate-glow { animation: glow 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
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

      <div className="relative min-h-screen">
        <div className="absolute inset-0 gradient-mesh"></div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-r from-amber-500/30 to-yellow-500/30 rounded-full blur-3xl animate-glow"></div>
          <div
            className="absolute top-1/4 -right-48 w-[500px] h-[500px] bg-gradient-to-l from-orange-500/25 to-amber-400/25 rounded-full blur-3xl animate-glow"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute -bottom-48 left-1/4 w-[450px] h-[450px] bg-gradient-to-t from-yellow-600/35 to-amber-500/35 rounded-full blur-3xl animate-glow"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute top-20 left-1/4 text-amber-400 animate-float">
            <Coffee size={60} strokeWidth={1} />
          </div>
          <div
            className="absolute top-1/3 right-1/4 text-yellow-400 animate-float"
            style={{ animationDelay: "1s" }}
          >
            <Heart size={70} strokeWidth={1} />
          </div>
          <div
            className="absolute bottom-1/4 left-1/5 text-amber-500 animate-float"
            style={{ animationDelay: "2s" }}
          >
            <Sparkles size={50} strokeWidth={1} />
          </div>
          <div className="absolute top-32 border-2 border-amber-500/20 rounded-full animate-spin-slow w-24 h-24 right-1/3"></div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full animate-pulse"
              style={{
                top: p.top,
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-6 py-12">
          {/* Welcome */}
          <div className="relative overflow-hidden mb-12 animate-slide-up">
            <div className="relative glass-strong rounded-3xl p-8 lg:p-12 border border-amber-400/30 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-600/20 rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>

              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl blur-xl opacity-60 animate-pulse"></div>
                      <div className="relative bg-gradient-to-br from-amber-500 to-orange-600 p-5 rounded-3xl shadow-2xl">
                        <Coffee className="w-12 h-12 text-white animate-pulse" strokeWidth={2.5} />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
                          Welcome back, {firstname}
                        </h1>
                        <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
                      </div>
                      <p className="text-amber-100 text-lg lg:text-xl font-light">
                        Your perfect cup is just a sip away. Let's brew something special today.
                      </p>
                    </div>
                  </div>

                  <div className="glass px-6 py-3 rounded-2xl border border-amber-400/30">
                    <div className="flex items-center gap-2 text-yellow-400">
                      <Award className="w-6 h-6" />
                      <span className="font-bold text-xl">Gold Member</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: <ShoppingBag className="w-8 h-8" />,
                label: "Your Orders",
                value: "12",
                subtext: "This month",
                gradient: "from-amber-500 to-amber-600",
                borderColor: "border-amber-500/20 hover:border-amber-500/40",
                delay: "stagger-1",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                label: "Favorite Drinks",
                value: "5",
                subtext: "Saved items",
                gradient: "from-orange-500 to-orange-600",
                borderColor: "border-orange-500/20 hover:border-orange-500/40",
                delay: "stagger-2",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                label: "My Reservations",
                value: reservationCount,
                subtext: "Total bookings",
                gradient: "from-yellow-500 to-amber-600",
                borderColor: "border-yellow-500/20 hover:border-yellow-500/40",
                delay: "stagger-3",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                label: "Total Spent",
                value: "LKR 4,500",
                subtext: "This year",
                gradient: "from-amber-600 to-orange-700",
                borderColor: "border-amber-600/20 hover:border-amber-600/40",
                delay: "stagger-4",
              },
            ].map((stat, i) => (
              <div key={i} className={`group card-3d animate-slide-up ${stat.delay}`}>
                <div
                  className={`relative glass-strong p-6 rounded-2xl border ${stat.borderColor} shadow-xl transition-all duration-500 h-full overflow-hidden`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`}
                  ></div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`bg-gradient-to-br ${stat.gradient} p-3 rounded-xl shadow-lg transition-all group-hover:scale-110 duration-300`}
                      >
                        <div className="text-white">{stat.icon}</div>
                      </div>
                      <div className="text-right">
                        <p className="text-amber-300/80 text-sm font-medium mb-1">{stat.label}</p>
                        <p className="text-3xl font-black text-white">{stat.value}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-amber-200/60 text-xs">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${stat.gradient}`}></div>
                      {stat.subtext}
                    </div>
                  </div>

                  <div
                    className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl`}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-12 animate-slide-up stagger-5">
            <div className="relative glass-strong rounded-3xl p-8 border border-amber-500/20 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-stone-900/50 to-stone-800/50 rounded-3xl"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-10 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
                  <h2 className="text-3xl font-black text-white">Quick Actions</h2>
                  <Zap className="w-7 h-7 text-yellow-400" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-6 rounded-2xl transition-all shadow-lg hover:shadow-amber-500/50 hover:scale-105 active:scale-95">
                    <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                      <Coffee className="w-6 h-6" />
                      Order Coffee
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </button>

                  <button className="group glass hover:glass-strong text-amber-300 font-bold py-6 rounded-2xl border border-amber-500/20 hover:border-amber-500/40 transition-all hover:scale-105 active:scale-95 shadow-md">
                    <span className="flex items-center justify-center gap-3 text-lg">
                      <ShoppingBag className="w-6 h-6" />
                      View Orders
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </button>

                  <button className="group glass hover:glass-strong text-amber-300 font-bold py-6 rounded-2xl border border-amber-500/20 hover:border-amber-500/40 transition-all hover:scale-105 active:scale-95 shadow-md">
                    <span className="flex items-center justify-center gap-3 text-lg">
                      <Heart className="w-6 h-6" />
                      Favorites
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity & My Reservations */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Recent Orders */}
            <div className="animate-slide-left stagger-6">
              <div className="relative glass-strong rounded-3xl p-8 border border-amber-500/20 shadow-2xl h-full">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-7 h-7 text-amber-400" />
                  <h3 className="text-2xl font-black text-white">Recent Orders</h3>
                </div>

                <div className="space-y-4">
                  {[
                    { name: "Cappuccino", time: "2 hours ago", price: "LKR 350", status: "Delivered" },
                    { name: "Caramel Latte", time: "Yesterday", price: "LKR 420", status: "Delivered" },
                    { name: "Espresso", time: "2 days ago", price: "LKR 280", status: "Delivered" },
                  ].map((order, i) => (
                    <div
                      key={i}
                      className="group glass p-4 rounded-xl border border-amber-500/10 hover:border-amber-500/30 transition-all hover:scale-105 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2 rounded-lg">
                            <Coffee className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-bold">{order.name}</p>
                            <p className="text-amber-300/60 text-sm">{order.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-amber-400 font-bold">{order.price}</p>
                          <p className="text-green-400 text-sm">{order.status}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* My Reservations */}
            <div className="animate-slide-right stagger-6">
              <div className="relative glass-strong rounded-3xl p-8 border border-amber-500/20 shadow-2xl h-full overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-yellow-500/20 to-amber-600/20 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3">
                      <Coffee className="w-7 h-7 text-yellow-400" />
                      <h3 className="text-2xl font-black text-white">My Reservations</h3>
                    </div>

                    <div className="glass px-4 py-2 rounded-xl border border-amber-500/20 text-amber-200/80 text-sm">
                      {userEmail ? userEmail : "Not logged in"}
                    </div>
                  </div>

                  {!userEmail ? (
                    <div className="glass p-5 rounded-2xl border border-amber-500/20">
                      <p className="text-amber-200">Please log in to view your reservations.</p>
                    </div>
                  ) : resLoading ? (
                    <div className="glass p-5 rounded-2xl border border-amber-500/20">
                      <p className="text-amber-200">Loading reservations...</p>
                    </div>
                  ) : reservations.length === 0 ? (
                    <div className="glass p-5 rounded-2xl border border-amber-500/20">
                      <p className="text-amber-200">No reservations found.</p>
                    </div>
                  ) : (
                    <div className="max-h-[320px] overflow-y-auto pr-2">
                      <div className="space-y-4">
                        {reservations
                          .slice()
                          .reverse()
                          .slice(0, 50)
                          .map((r, i) => (
                           <div
                                key={r._id}
                                onClick={() => navigate(`/update-reservation/${r.reserve_id}`)}
                                className="group glass p-4 rounded-xl border border-amber-500/10
                                          hover:border-amber-500/30 transition-all cursor-pointer"
                              >

                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <p className="text-white font-bold">
                                    {r.reserve_id || r.reservation_id || "RES"}
                                  </p>

                                  <p className="text-amber-300/70 text-sm mt-1">
                                    Date:{" "}
                                    <span className="text-amber-200">
                                      {formatDate(r.date)}
                                    </span>
                                  </p>

                                  <p className="text-amber-300/70 text-sm">
                                    Time:{" "}
                                    <span className="text-amber-200">
                                      {r.In_time && r.Out_time
                                        ? `${r.In_time} - ${r.Out_time}`
                                        : r.time || "-"}
                                    </span>
                                  </p>

                                  <p className="text-amber-300/70 text-sm">
                                    Guests:{" "}
                                    <span className="text-amber-200">
                                      {r.guests ?? r.number_of_people ?? "-"}
                                    </span>
                                  </p>

                                  {r.table_id && (
                                    <p className="text-amber-300/70 text-sm">
                                      Table:{" "}
                                      <span className="text-amber-200">
                                        {r.table_id}
                                      </span>
                                    </p>
                                  )}
                                </div>

                                <div className="text-right">
                                  <span
                                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${statusBadge(
                                      r.status
                                    )}`}
                                  >
                                    {String(r.status || "pending").toUpperCase()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-amber-300/70 text-sm animate-slide-up">
            <div className="glass-strong inline-block px-8 py-4 rounded-2xl border border-amber-500/20">
              <p className="flex items-center gap-2 justify-center">
                <Coffee className="w-4 h-4" />
                Brewed with care • Coffee Barista © 2024
                <Heart className="w-4 h-4 text-red-400" fill="currentColor" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDash;
