import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Coffee, User } from "lucide-react";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Validators (same as AgroConnect)
  function isNameValid(name) {
    return /^[A-Za-z\s]+$/.test((name || "").trim());
  }

  function isEmailValid(mail) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((mail || "").trim());
  }

  function isPasswordValid(pass) {
    return (pass || "").length >= 6 && /\d/.test(pass) && /[^A-Za-z0-9]/.test(pass);
  }

  async function handleSignup() {
    if (isSubmitting) return;

    if (!firstname || !lastname || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!isNameValid(firstname)) {
      toast.error("First name can contain only letters");
      return;
    }

    if (!isNameValid(lastname)) {
      toast.error("Last name can contain only letters");
      return;
    }

    if (!isEmailValid(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (!isPasswordValid(password)) {
      toast.error("Password must be at least 6 characters and include a number and a symbol");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post("http://localhost:3000/api/users/register", {
        firstname,
        lastname,
        email,
        password,
        role: "customer",
      });

      toast.success("Account created successfully. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
        setIsSubmitting(false);
      }, 1500);
    } catch (error) {
      setIsSubmitting(false);
      toast.error(error.response?.data?.message || "Registration failed");
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-stone-900 rounded-3xl p-8 shadow-2xl border border-amber-500/20">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Coffee className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-amber-400">Coffee Barista</h1>
          <p className="text-amber-200/70 text-sm">Create your account</p>
        </div>

        <div className="space-y-4">
          {/* First Name */}
          <div>
            <label className="text-sm text-amber-200 font-semibold">First Name</label>
            <div className="relative mt-1">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" size={18} />
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-stone-800 border border-amber-500/20 text-amber-100 focus:outline-none focus:border-amber-400"
                placeholder="John"
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm text-amber-200 font-semibold">Last Name</label>
            <div className="relative mt-1">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" size={18} />
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-stone-800 border border-amber-500/20 text-amber-100 focus:outline-none focus:border-amber-400"
                placeholder="Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-amber-200 font-semibold">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-stone-800 border border-amber-500/20 text-amber-100 focus:outline-none focus:border-amber-400"
                placeholder="you@email.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-amber-200 font-semibold">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 rounded-xl bg-stone-800 border border-amber-500/20 text-amber-100 focus:outline-none focus:border-amber-400"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            onClick={handleSignup}
            disabled={isSubmitting}
            className={`w-full mt-4 py-3 rounded-xl font-bold transition ${
              isSubmitting
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            } text-white`}
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-center text-amber-200/70 text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-amber-400 font-semibold hover:text-amber-300">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
