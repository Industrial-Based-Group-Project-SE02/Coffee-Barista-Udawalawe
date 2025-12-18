import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Coffee, ArrowRight } from "lucide-react";

export default function EditProfile() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const API = "http://localhost:3000";

  const getStoredEmail = () =>
    localStorage.getItem("userEmail") ||
    localStorage.getItem("email") ||
    localStorage.getItem("useremail");

  function isPasswordValid(pass) {
    // allow empty (means keep current password)
    if (!pass || pass.trim().length === 0) return true;
    const p = pass.trim();
    return p.length >= 6 && /\d/.test(p) && /[^A-Za-z0-9]/.test(p);
  }

  async function tryRequests(requests) {
    let lastErr = null;

    for (const req of requests) {
      try {
        const res = await req();
        return res;
      } catch (err) {
        lastErr = err;
        // if it's not 404, stop early because it's probably a real backend error
        const status = err?.response?.status;
        if (status && status !== 404) throw err;
      }
    }

    // all attempts failed (likely 404 mismatch)
    throw lastErr || new Error("Request failed");
  }

  async function fetchProfile() {
    const userEmail = getStoredEmail();

    if (!userEmail) {
      toast.error("User not logged in");
      navigate("/");
      return;
    }

    const encoded = encodeURIComponent(userEmail);

    try {
      const res = await tryRequests([
        // path param variants
        () => axios.get(`${API}/api/user/getProfile/${encoded}`),
        () => axios.get(`${API}/api/users/getProfile/${encoded}`),

        // query param variants
        () => axios.get(`${API}/api/user/getProfile`, { params: { email: userEmail } }),
        () => axios.get(`${API}/api/users/getProfile`, { params: { email: userEmail } }),
      ]);

      const data = res?.data || {};
      setFirstname(data.firstname || "");
      setLastname(data.lastname || "");
      setEmail(data.email || userEmail);
    } catch (error) {
      console.log(error);
      const status = error?.response?.status;

      if (status === 404) {
        toast.error("Backend route not found for getProfile. Check your server routes.");
      } else {
        toast.error(error?.response?.data?.message || "Failed to load profile");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function updateProfile() {
    const userEmail = getStoredEmail();

    if (!userEmail) {
      toast.error("User not logged in");
      navigate("/");
      return;
    }

    if (!firstname.trim() || !lastname.trim()) {
      toast.error("First name and last name cannot be empty");
      return;
    }

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(firstname.trim()) || !nameRegex.test(lastname.trim())) {
      toast.error("Names can contain only letters");
      return;
    }

    if (!isPasswordValid(password)) {
      toast.error("Password must be 6+ chars and include a number + symbol");
      return;
    }

    const encoded = encodeURIComponent(userEmail);

    const updateData = {
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email: userEmail,
    };

    if (password.trim()) updateData.password = password.trim();

    setLoading(true);

    try {
      await tryRequests([
        // email in URL
        () => axios.put(`${API}/api/user/updateProfile/${encoded}`, updateData),
        () => axios.put(`${API}/api/users/updateProfile/${encoded}`, updateData),

        // no email in URL
        () => axios.put(`${API}/api/user/updateProfile`, updateData),
        () => axios.put(`${API}/api/users/updateProfile`, updateData),
      ]);

      localStorage.setItem("username", firstname.trim());
      toast.success("Profile updated successfully ☕");

      setTimeout(() => {
        navigate("/customer-dashboard");
      }, 800);
    } catch (error) {
      console.log(error);
      const status = error?.response?.status;

      if (status === 404) {
        toast.error("Backend route not found for updateProfile. Check your server routes.");
      } else {
        toast.error(error?.response?.data?.message || "Failed to update profile");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Coffee className="w-10 h-10 text-amber-400 animate-spin mx-auto mb-3" />
          <p className="text-amber-300">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="glass-strong rounded-3xl p-8 border border-amber-500/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full blur-xl opacity-60"></div>
              <div className="relative w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto">
                <Coffee className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-3xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Edit Profile
            </h1>
            <p className="text-amber-200/70 text-sm mt-2">Update your personal details</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block mb-2 text-amber-200 text-sm font-semibold">First Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" />
                <input
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="w-full glass border border-amber-500/20 pl-12 pr-4 py-3 rounded-xl text-amber-100 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-amber-200 text-sm font-semibold">Last Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" />
                <input
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="w-full glass border border-amber-500/20 pl-12 pr-4 py-3 rounded-xl text-amber-100 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-amber-200 text-sm font-semibold">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" />
                <input
                  value={email}
                  disabled
                  className="w-full glass border border-amber-500/10 pl-12 pr-4 py-3 rounded-xl text-amber-300/60 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-amber-200 text-sm font-semibold">New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave empty to keep current password"
                  className="w-full glass border border-amber-500/20 pl-12 pr-12 py-3 rounded-xl text-amber-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              onClick={updateProfile}
              disabled={loading}
              className="group relative w-full mt-6 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
