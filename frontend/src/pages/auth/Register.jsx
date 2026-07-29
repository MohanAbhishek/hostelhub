// src/pages/auth/Register.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { registerUser } from "../../services/authService";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "STUDENT",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      localStorage.removeItem("token");
      await registerUser(formData);
      toast.success("OTP Sent Successfully");
      setTimeout(() => {
        navigate("/verify-otp", { state: { email: formData.email } });
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">

      <Toaster position="top-right" />

      {/* LEFT BRAND PANEL */}
      <div className="hidden lg:flex flex-col justify-center items-start bg-blue-600 text-white w-1/2 max-w-md h-screen px-12 py-16">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-6 shadow">
          <span className="text-blue-600 font-black text-lg">H</span>
        </div>
        <h1 className="text-4xl font-black tracking-tight mb-4">HostelHub</h1>
        <p className="text-blue-100 text-lg leading-relaxed">
          Join thousands of students and landlords managing accommodations smarter.
        </p>
        <div className="mt-12 space-y-4">
          {[
            "Verified hostel listings",
            "Instant OTP verification",
            "Role-based access control",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-blue-100 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT FORM PANEL */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-10 shadow-lg lg:rounded-l-none lg:rounded-r-2xl"
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-1">Create an account</h2>
          <p className="text-slate-500 text-sm">Fill in your details to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* ROLE SELECTOR — shown first so user picks identity */}
          <div>
            <label className="block text-slate-700 mb-1.5 text-sm font-medium">
              I am a
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["STUDENT", "LANDLORD"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setFormData({ ...formData, role: r })}
                  className={`py-2.5 rounded-lg border text-sm font-semibold transition-all duration-200 ${
                    formData.role === r
                      ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                      : "bg-white border-slate-300 text-slate-600 hover:border-blue-400 hover:text-blue-600"
                  }`}
                >
                  {r === "STUDENT" ? "🎓 Student" : "🏠 Landlord"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-slate-700 mb-1.5 text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-sm"
            />
          </div>

          <div>
            <label className="block text-slate-700 mb-1.5 text-sm font-medium">
              Email address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-sm"
            />
          </div>

          <div>
            <label className="block text-slate-700 mb-1.5 text-sm font-medium">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="+91 98765 43210"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-sm"
            />
          </div>

          <div>
            <label className="block text-slate-700 mb-1.5 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition text-white font-semibold text-sm shadow-sm disabled:opacity-60 mt-2"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

        </form>

        <p className="text-center text-slate-500 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign in
          </Link>
        </p>

      </motion.div>

    </div>
  );
}

export default Register;