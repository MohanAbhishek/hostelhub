// src/pages/auth/Login.jsx

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { loginUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [captchaToken, setCaptchaToken] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptcha = (token) => setCaptchaToken(token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error("Please verify CAPTCHA");
      return;
    }

    try {
      setLoading(true);
      localStorage.removeItem("token");

      const response = await loginUser({ ...formData, captchaToken });
      const token = response.token;
      login(token);

      const decoded = jwtDecode(token);
      let role = "";

      if (decoded.role) {
        role = decoded.role;
      } else if (decoded.authorities?.length > 0) {
        role = decoded.authorities[0];
      }

      role = role.replace("ROLE_", "");
      toast.success("Login successful");

      setTimeout(() => {
        if (role === "STUDENT") navigate("/student/dashboard");
        else if (role === "LANDLORD") navigate("/landlord/dashboard");
        else if (role === "ADMIN") navigate("/admin/dashboard");
        else navigate("/");
      }, 1500);

    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">

      <Toaster position="top-right" />

      {/* LEFT BRAND PANEL — hidden on mobile */}
      <div className="hidden lg:flex flex-col justify-center items-start bg-blue-600 text-white w-1/2 max-w-md h-screen px-12 py-16 rounded-r-none">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-6 shadow">
          <span className="text-blue-600 font-black text-lg">H</span>
        </div>
        <h1 className="text-4xl font-black tracking-tight mb-4">HostelHub</h1>
        <p className="text-blue-100 text-lg leading-relaxed">
          Your trusted platform for finding and managing student accommodations.
        </p>
        <div className="mt-12 space-y-4">
          {["Find verified hostels", "Book in minutes", "Manage with ease"].map((item) => (
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
          <h2 className="text-2xl font-bold text-slate-800 mb-1">Welcome back</h2>
          <p className="text-slate-500 text-sm">Sign in to your HostelHub account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

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
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-sm"
            />
          </div>

          <div className="flex justify-between items-center">
            <span />
            <Link
              to="/forgot-password"
              className="text-blue-600 text-sm hover:text-blue-700 font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey="6Lcy2fUsAAAAAIw5cFZvJ3WXecluLeVChtRRpKlX"
              onChange={handleCaptcha}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition text-white font-semibold text-sm shadow-sm disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        <p className="text-center text-slate-500 text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
            Create one
          </Link>
        </p>

      </motion.div>

    </div>
  );
}

export default Login;