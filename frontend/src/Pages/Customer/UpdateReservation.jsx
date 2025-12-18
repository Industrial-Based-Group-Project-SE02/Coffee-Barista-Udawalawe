import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  Calendar,
  Users,
  Coffee,
  ArrowRight,
  Info,
  StickyNote,
  LogOut,
  LogIn,
  Sparkles,
} from "lucide-react";

export default function UpdateReservation() {
  const { reserve_id } = useParams();
  const navigate = useNavigate();

  const API_BASE = "http://localhost:3000";

  const token = useMemo(
    () => localStorage.getItem("token") || localStorage.getItem("accessToken") || "",
    []
  );

  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Keep same table list and timeSlots as create page for same UI
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

  // Update page fields match backend schema
  const [formData, setFormData] = useState({
    table_id: "",
    date: "",
    In_time: "08:00 AM",
    Out_time: "10:00 AM",
    guests: 2,
    note: "",
    status: "pending",
  });

  const selectedTableObj =
    tables.find((t) => t.id === formData.table_id) || null;

  // ✅ Load reservation
  useEffect(() => {
    if (!reserve_id) return;

    setLoading(true);

    axios
      .get(`${API_BASE}/api/reservations/reserve/${encodeURIComponent(reserve_id)}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then((res) => {
        const r = res.data?.reservation || res.data;

        setFormData({
          table_id: r.table_id || "",
          date: r.date ? String(r.date).split("T")[0] : "",
          In_time: r.In_time || "08:00 AM",
          Out_time: r.Out_time || "10:00 AM",
          guests: r.guests ?? 2,
          note: r.note || "",
          status: r.status || "pending",
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to load reservation");
      })
      .finally(() => setLoading(false));
  }, [API_BASE, reserve_id, token]);

  const handleChange = (key) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [key]: key === "guests" ? Number(value) : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please log in first.");
      return;
    }

    if (selectedTableObj && Number(formData.guests) > selectedTableObj.seats) {
      toast.error(`This table has only ${selectedTableObj.seats} seats.`);
      return;
    }

    const toastId = toast.loading("Updating reservation...");
    setIsSubmitting(true);

    try {
      await axios.put(
        `${API_BASE}/api/reservations/update/${encodeURIComponent(reserve_id)}`,
        {
          table_id: formData.table_id,
          date: formData.date,
          In_time: formData.In_time,
          Out_time: formData.Out_time,
          guests: Number(formData.guests),
          note: formData.note,
          status: formData.status,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.dismiss(toastId);
      toast.success("Reservation updated");
      navigate("/customer-dashboard");
    } catch (err) {
      console.error(err);
      toast.dismiss(toastId);
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async () => {
    if (!token) {
      toast.error("Please log in first.");
      return;
    }

    if (!window.confirm("Cancel this reservation?")) return;

    const toastId = toast.loading("Cancelling reservation...");
    setIsSubmitting(true);

    try {
      await axios.delete(
        `${API_BASE}/api/reservations/delete/${encodeURIComponent(reserve_id)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.dismiss(toastId);
      toast.success("Reservation cancelled");
      navigate("/customer-dashboard");
    } catch (err) {
      console.error(err);
      toast.dismiss(toastId);
      toast.error(err.response?.data?.message || "Cancel failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // For date min
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="w-full min-h-screen bg-stone-950 pt-20 pb-20 px-6 relative overflow-hidden">
      {/* Background Effects (same as create page) */}
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
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: "2s" }}>
        <Coffee className="text-orange-500/30" size={30} />
      </div>
      <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: "4s" }}>
        <Coffee className="text-amber-400/30" size={35} />
      </div>
      <div className="absolute bottom-40 right-10 animate-float" style={{ animationDelay: "3s" }}>
        <Sparkles className="text-yellow-500/30" size={25} />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.03)_1px,transparent_1px)] bg-[size:100px_100px] -z-10"></div>

      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Coffee className="text-amber-400 animate-bounce" size={40} />
            <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Update Reservation
            </h1>
            <Coffee className="text-amber-400 animate-bounce" size={40} style={{ animationDelay: "0.2s" }} />
          </div>
          <p className="text-amber-200/80 text-lg flex items-center justify-center gap-2">
            <Sparkles size={16} className="text-yellow-400" />
            Reservation ID: {reserve_id}
            <Sparkles size={16} className="text-yellow-400" />
          </p>
        </div>

        {/* Card */}
        <div className="glass-strong p-10 rounded-[2.5rem] border border-amber-500/30 shadow-[0_0_50px_rgba(251,191,36,0.15)] animate-scale backdrop-blur-xl">
          {loading ? (
            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl">
              <p className="text-amber-200 flex items-center gap-2">
                <Info size={16} className="text-amber-400" />
                Loading reservation...
              </p>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-6">
              {/* Table */}
              <div className="space-y-2">
                <label className="text-amber-100 font-semibold flex items-center gap-2">
                  <Coffee size={18} className="text-amber-400" /> Select Table *
                </label>

                <select
                  value={formData.table_id}
                  onChange={handleChange("table_id")}
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
                    Selected: {selectedTableObj.name} ({selectedTableObj.seats} seats)
                  </p>
                )}
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
                    value={formData.In_time}
                    onChange={handleChange("In_time")}
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
                    value={formData.Out_time}
                    onChange={handleChange("Out_time")}
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
                  value={formData.note}
                  onChange={handleChange("note")}
                  rows={3}
                  className="w-full bg-stone-900/80 border border-amber-500/20 rounded-xl px-4 py-3 text-amber-50 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all resize-none"
                  placeholder="Any special request or dietary requirements?"
                />
              </div>

              <div className="pt-4">
                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl mb-6">
                  <p className="text-amber-200 text-sm flex items-center gap-2">
                    <Info size={16} className="text-amber-400" />
                    You can update or cancel this booking. Changes need login token.
                  </p>
                </div>

                {/* Update */}
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="w-full relative group overflow-hidden bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-600 text-white font-bold py-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_40px_rgba(251,191,36,0.5)] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Sparkles size={20} />
                    {isSubmitting ? "Updating..." : "Update Reservation"}
                    <ArrowRight size={20} />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>

                {/* Cancel */}
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitting || loading}
                  className="mt-4 w-full glass border border-red-500/50 text-red-300 py-4 rounded-2xl hover:bg-red-500/10 transition-all font-semibold transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel Reservation
                </button>

                {/* Back */}
                <button
                  type="button"
                  onClick={() => navigate("/customer-dashboard")}
                  className="mt-4 w-full glass border border-amber-500/40 text-amber-300 py-4 rounded-2xl hover:bg-amber-500/10 transition-all font-semibold transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Back to Dashboard
                </button>
              </div>
            </form>
          )}
        </div>
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
