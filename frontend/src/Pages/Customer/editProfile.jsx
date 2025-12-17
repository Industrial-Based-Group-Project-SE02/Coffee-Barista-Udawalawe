import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Coffee, ArrowRight } from "lucide-react";

export default function EditProfile() {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // ✅ load profile
  async function viewDetails() {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      toast.error("User not logged in");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:3000/api/users/getProfile/${encodeURIComponent(userEmail)}`
      );

      console.log("✅ Profile loaded:", res.data);
      
      setEmail(res.data.email || "");
      setFirstname(res.data.firstname || "");
      setLastname(res.data.lastname || "");
    } catch (error) {
      console.error("❌ Error fetching profile:", error);
      console.error("Error details:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to fetch profile details");
      
      if (error.response?.status === 401 || error.response?.status === 404) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  }

  // ✅ password validation (empty = allowed)
  function isPasswordValid(pass) {
    return (
      pass.length === 0 ||
      (pass.length >= 6 && /\d/.test(pass) && /[^A-Za-z0-9]/.test(pass))
    );
  }

  // ✅ update profile with detailed logging
  async function updateProfile() {
    const userEmail = localStorage.getItem("userEmail");

    console.log("🔄 Starting profile update...");
    console.log("User Email from localStorage:", userEmail);

    if (!userEmail) {
      toast.error("User not logged in");
      navigate("/login");
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

    if (!isPasswordValid(password.trim())) {
      toast.error("Password must be 6+ chars and include a number + symbol");
      return;
    }

    setLoading(true);

    try {
      const updateData = {
        firstname: firstname.trim(),
        lastname: lastname.trim(),
      };

      // Only include password if user entered one
      if (password.trim()) {
        updateData.password = password.trim();
      }

      console.log("📤 Sending update data:", { ...updateData, password: updateData.password ? "***" : undefined });
      console.log("📍 URL:", `http://localhost:3000/api/users/updateProfile/${encodeURIComponent(userEmail)}`);

      const response = await axios.put(
        `http://localhost:3000/api/users/updateProfile/${encodeURIComponent(userEmail)}`,
        updateData
      );

      console.log("✅ Update successful:", response.data);

      localStorage.setItem("username", firstname.trim());
      
      toast.success("Profile updated successfully ☕");
      setPassword("");
      
      setTimeout(() => {
        navigate("/customer-dashboard");
      }, 1000);
      
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      console.error("❌ Error response:", error.response?.data);
      console.error("❌ Error status:", error.response?.status);
      console.error("❌ Full error:", error.message);
      
      // Show detailed error message
      const errorMsg = error.response?.data?.message 
        || error.response?.data?.error 
        || error.message 
        || "Failed to update profile";
      
      toast.error(errorMsg);
      
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        setTimeout(() => navigate("/login"), 1500);
      }
    } finally {
      setLoading(false);
    }
  }

  // Handle form submit with Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      updateProfile();
    }
  };

  useEffect(() => {
    viewDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-stone-950">
        <div className="text-center">
          <Coffee className="w-10 h-10 text-amber-400 animate-spin mx-auto mb-3" />
          <p className="text-amber-300">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-stone-900/80 backdrop-blur-xl rounded-3xl p-8 border border-amber-500/20 shadow-2xl">
          {/* Header */}
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

          {/* Form */}
          <div className="space-y-5" onKeyPress={handleKeyPress}>
            {/* Email (disabled) */}
            <div>
              <label className="block mb-2 text-amber-200 text-sm font-semibold">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" />
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full bg-stone-800/50 backdrop-blur border border-amber-500/10 pl-12 pr-4 py-3 rounded-xl text-amber-300/60 cursor-not-allowed"
                />
              </div>
              <p className="text-amber-200/50 text-xs mt-1">Email cannot be changed</p>
            </div>

            {/* First Name */}
            <div>
              <label className="block mb-2 text-amber-200 text-sm font-semibold">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" />
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="Enter your first name"
                  disabled={loading}
                  className="w-full bg-stone-800/50 backdrop-blur border border-amber-500/20 pl-12 pr-4 py-3 rounded-xl text-amber-100 placeholder:text-amber-300/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label className="block mb-2 text-amber-200 text-sm font-semibold">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" />
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Enter your last name"
                  disabled={loading}
                  className="w-full bg-stone-800/50 backdrop-blur border border-amber-500/20 pl-12 pr-4 py-3 rounded-xl text-amber-100 placeholder:text-amber-300/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-amber-200 text-sm font-semibold">
                New Password (Optional)
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave empty to keep current password"
                  disabled={loading}
                  className="w-full bg-stone-800/50 backdrop-blur border border-amber-500/20 pl-12 pr-12 py-3 rounded-xl text-amber-100 placeholder:text-amber-300/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={loading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-300 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50 rounded p-1 disabled:opacity-50"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {password && (
                <p className="text-amber-200/50 text-xs mt-1">
                  Must be 6+ characters with a number and symbol
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={updateProfile}
              disabled={loading}
              className="group relative w-full mt-6 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-stone-950"
            >
              {loading ? (
                <>
                  <Coffee className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  Save Changes
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}