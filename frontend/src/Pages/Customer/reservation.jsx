import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Calendar,
  Users,
  Coffee,
  CheckCircle2,
  ArrowRight,
  Info,
  Phone,
  User as UserIcon,
  Mail,
  StickyNote,
  LogOut,
  LogIn,
  Sparkles,
} from "lucide-react";

function Reservation() {
  const API_BASE = "http://localhost:3000";

  const [isBooked, setIsBooked] = useState(false);
  const [generatedReservation, setGeneratedReservation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    tableId: "",
    date: getTodayDate(),
    inTime: "08:00 AM",
    outTime: "10:00 AM",
    guests: 2,
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const tables = [
    { id: "T1", name: "Window Nook", seats: 2 },
    { id: "T2", name: "Garden View", seats: 4 },
    { id: "T3", name: "Barista Bar", seats: 1 },
    { id: "T4", name: "The Lounge", seats: 6 },
    { id: "T5", name: "Quiet Corner", seats: 2 },
    { id: "T6", name: "Terrace Spot", seats: 4 },
  ];

  const timeSlots = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
  ];

  const selectedTableObj = tables.find((t) => t.id === formData.tableId) || null;

  // Auto-fill from localStorage (optional)
  useEffect(() => {
    const savedEmail =
      localStorage.getItem("email") ||
      localStorage.getItem("userEmail") ||
      localStorage.getItem("customerEmail") ||
      "";

    const savedName =
      localStorage.getItem("username") ||
      localStorage.getItem("name") ||
      localStorage.getItem("firstname") ||
      localStorage.getItem("userName") ||
      "";

    const savedPhone =
      localStorage.getItem("phone") || localStorage.getItem("userPhone") || "";

    if (savedEmail || savedName || savedPhone) {
      setFormData((prev) => ({
        ...prev,
        email: savedEmail || prev.email,
        name: savedName || prev.name,
        phone: savedPhone || prev.phone,
      }));
    }
  }, []);

  const handleChange = (key) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken") ||
      "";

    if (!token) {
      toast.error("Please log in first to book a reservation.");
      return;
    }

    if (selectedTableObj && Number(formData.guests) > selectedTableObj.seats) {
      toast.error(`This table has only ${selectedTableObj.seats} seats.`);
      return;
    }

    const payload = {
      table_id: formData.tableId,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      date: formData.date,
      In_time: formData.inTime,
      Out_time: formData.outTime,
      guests: Number(formData.guests),
      note: formData.notes,
    };

    const toastId = toast.loading("Creating reservation...");
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${API_BASE}/api/reservations/addreservation`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.dismiss(toastId);
      toast.success("Reservation created successfully!");
      setGeneratedReservation(response.data.reservation);
      setIsBooked(true);
    } catch (error) {
      console.error(error);
      toast.dismiss(toastId);
      toast.error(error.response?.data?.message || "Booking failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsBooked(false);
    setGeneratedReservation(null);
    setFormData({
      tableId: "",
      date: getTodayDate(),
      inTime: "08:00 AM",
      outTime: "10:00 AM",
      guests: 2,
      name: "",
      phone: "",
      email: "",
      notes: "",
    });
  };

  const today = getTodayDate();

  return (
    <div className="w-full min-h-screen bg-stone-950 pt-20 pb-20 px-6 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[150px] animate-pulse -z-10"></div>
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[150px] animate-pulse -z-10"
        style={{ animationDelay: "1s" }}
      ></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-500/10 rounded-full blur-[200px] -z-10"></div>

      {/* Floating Icons */}
      <div className="absolute top-20 left-10 animate-float">
        <Coffee className="text-amber-500/30" size={40} />
      </div>
      <div
        className="absolute top-40 right-20 animate-float"
        style={{ animationDelay: "2s" }}
      >
        <Coffee className="text-orange-500/30" size={30} />
      </div>
      <div
        className="absolute bottom-20 left-20 animate-float"
        style={{ animationDelay: "4s" }}
      >
        <Coffee className="text-amber-400/30" size={35} />
      </div>
      <div
        className="absolute bottom-40 right-10 animate-float"
        style={{ animationDelay: "3s" }}
      >
        <Sparkles className="text-yellow-500/30" size={25} />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.03)_1px,transparent_1px)] bg-[size:100px_100px] -z-10"></div>

      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12 animate-slide-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Coffee className="text-amber-400 animate-bounce" size={40} />
            <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Book Your Table
            </h1>
            <Coffee
              className="text-amber-400 animate-bounce"
              size={40}
              style={{ animationDelay: "0.2s" }}
            />
          </div>
          <p className="text-amber-200/80 text-lg flex items-center justify-center gap-2">
            <Sparkles size={16} className="text-yellow-400" />
            Reserve your favorite spot at Coffee Barista Udawalawe
            <Sparkles size={16} className="text-yellow-400" />
          </p>
        </div>

        {!isBooked ? (
          <div className="glass-strong p-10 rounded-[2.5rem] border border-amber-500/30 shadow-[0_0_50px_rgba(251,191,36,0.15)] animate-scale backdrop-blur-xl">
            <form onSubmit={handleBooking} className="space-y-6">
              {/* Table */}
              <div className="space-y-2">
                <label className="text-amber-100 font-semibold flex items-center gap-2">
                  <Coffee size={18} className="text-amber-400" /> Select Table *
                </label>
                <select
                  value={formData.tableId}
                  onChange={handleChange("tableId")}
                  required
                  className="w-full bg-stone-900/80 border border-amber-500/20 rounded-xl px-4 py-3 text-amber-50 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all"
                >
                  <option value="">Choose a table...</option>
                  {tables.map((table) => (
                    <option key={table.id} value={table.id}>
                      {table.name} - {table.seats} seats
                    </option>
                  ))}
                </select>

                {selectedTableObj && (
                  <p className="text-amber-400 text-sm flex items-center gap-2 mt-2">
                    <Users size={14} />
                    Selected: {selectedTableObj.name} ({selectedTableObj.seats}{" "}
                    seats)
                  </p>
                )}
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label className="text-amber-100 font-semibold flex items-center gap-2">
                  <UserIcon size={18} className="text-amber-400" /> Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange("name")}
                  className="w-full bg-stone-900/80 border border-amber-500/20 rounded-xl px-4 py-3 text-amber-50 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all"
                  placeholder="Enter your name"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-amber-100 font-semibold flex items-center gap-2">
                  <Phone size={18} className="text-amber-400" /> Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange("phone")}
                  className="w-full bg-stone-900/80 border border-amber-500/20 rounded-xl px-4 py-3 text-amber-50 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all"
                  placeholder="07XXXXXXXX"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-amber-100 font-semibold flex items-center gap-2">
                  <Mail size={18} className="text-amber-400" /> Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange("email")}
                  className="w-full bg-stone-900/80 border border-amber-500/20 rounded-xl px-4 py-3 text-amber-50 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all"
                  placeholder="you@email.com"
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="text-amber-100 font-semibold flex items-center gap-2">
                  <Calendar size={18} className="text-amber-400" /> Select Date *
                </label>
                <input
                  type="date"
                  required
                  min={today}
                  value={formData.date}
                  onChange={handleChange("date")}
                  className="w-full bg-stone-900/80 border border-amber-500/20 rounded-xl px-4 py-3 text-amber-50 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all"
                />
              </div>

              {/* Time */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-amber-100 font-semibold flex items-center gap-2">
                    <LogIn size={18} className="text-amber-400" /> Check-In *
                  </label>
                  <select
                    value={formData.inTime}
                    onChange={handleChange("inTime")}
                    className="w-full bg-stone-900/80 border border-amber-500/20 rounded-xl px-4 py-3 text-amber-50 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all"
                  >
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-amber-100 font-semibold flex items-center gap-2">
                    <LogOut size={18} className="text-amber-400" /> Check-Out *
                  </label>
                  <select
                    value={formData.outTime}
                    onChange={handleChange("outTime")}
                    className="w-full bg-stone-900/80 border border-amber-500/20 rounded-xl px-4 py-3 text-amber-50 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all"
                  >
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <label className="text-amber-100 font-semibold flex items-center gap-2">
                  <Users size={18} className="text-amber-400" /> Number of Guests *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.guests}
                  onChange={handleChange("guests")}
                  className="w-full bg-stone-900/80 border border-amber-500/20 rounded-xl px-4 py-3 text-amber-50 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all"
                />
                {selectedTableObj && Number(formData.guests) > selectedTableObj.seats && (
                  <p className="text-red-400 text-sm flex items-center gap-1 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    <Info size={14} />
                    This table has only {selectedTableObj.seats} seats.
                  </p>
                )}
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="text-amber-100 font-semibold flex items-center gap-2">
                  <StickyNote size={18} className="text-amber-400" /> Special Requests (optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={handleChange("notes")}
                  rows={3}
                  className="w-full bg-stone-900/80 border border-amber-500/20 rounded-xl px-4 py-3 text-amber-50 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all resize-none"
                  placeholder="Any special request or dietary requirements?"
                />
              </div>

              <div className="pt-4">
                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl mb-6">
                  <p className="text-amber-200 text-sm flex items-center gap-2">
                    <Info size={16} className="text-amber-400" />
                    You must be logged in. Your reservation ID will be generated automatically.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={!formData.tableId || isSubmitting}
                  className="w-full relative group overflow-hidden bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-600 text-white font-bold py-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_40px_rgba(251,191,36,0.5)] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Sparkles size={20} />
                    {isSubmitting ? "Booking..." : "Confirm Reservation"}
                    <ArrowRight size={20} />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="glass-strong p-12 rounded-[3rem] border border-amber-400/50 text-center animate-scale shadow-[0_0_60px_rgba(251,191,36,0.2)]">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl animate-bounce">
                <CheckCircle2 size={48} className="text-white" />
              </div>
              <Sparkles
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-yellow-400 animate-pulse"
                size={24}
              />
            </div>

            <h2 className="text-4xl font-bold text-amber-50 mb-6">
              Reservation Confirmed!
            </h2>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 mb-8 space-y-3">
              <p className="text-amber-200 text-lg">
                <span className="text-amber-400 font-bold">Reservation ID:</span>{" "}
                {generatedReservation?.reserve_id}
              </p>
              <p className="text-amber-200 text-lg">
                <span className="text-amber-400 font-bold">Table:</span>{" "}
                {selectedTableObj?.name}
              </p>
              <p className="text-amber-200 text-lg">
                <span className="text-amber-400 font-bold">Date:</span>{" "}
                {generatedReservation?.date
                  ? String(generatedReservation.date).split("T")[0]
                  : formData.date}
              </p>
              <p className="text-amber-200 text-lg">
                <span className="text-amber-400 font-bold">Time:</span>{" "}
                {generatedReservation?.In_time} - {generatedReservation?.Out_time}
              </p>
              <p className="text-amber-200 text-lg">
                <span className="text-amber-400 font-bold">Guests:</span>{" "}
                {generatedReservation?.guests}
              </p>
            </div>

            <button
              onClick={resetForm}
              className="glass border border-amber-500/50 text-amber-400 px-8 py-3 rounded-xl hover:bg-amber-500/10 transition-all font-semibold transform hover:scale-105 active:scale-95"
            >
              Make Another Booking
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Reservation;
