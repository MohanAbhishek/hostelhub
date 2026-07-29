// src/pages/auth/ResetPassword.jsx

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { LockKeyhole, Mail, Eye, EyeOff } from "lucide-react";
import { resetPassword } from "../../services/authService";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await resetPassword({ email, otp, newPassword });
      toast.success("Password Reset Successful");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Reset Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Toaster position="top-right" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8"
      >

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <LockKeyhole size={24} className="text-blue-600" />
          </div>
        </div>

        {/* HEADING */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Reset your password</h1>
          <p className="text-gray-500 text-sm">OTP sent to</p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <Mail size={14} className="text-blue-600" />
            <span className="text-blue-600 text-sm font-semibold">{email}</span>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* OTP */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1.5">
              Verification Code
            </label>
            <input
              type="text"
              placeholder="• • • • • •"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-center text-xl tracking-[8px] font-bold transition"
            />
          </div>

          {/* NEW PASSWORD */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1.5">
              New Password
            </label>
            <div className="relative">
              <LockKeyhole size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        {/* BACK TO LOGIN */}
        <p className="text-center text-gray-400 text-xs mt-6">
          Remember your password?{" "}
          <a href="/login" className="text-blue-600 font-medium hover:underline">
            Back to Login
          </a>
        </p>

      </motion.div>
    </div>
  );
}

export default ResetPassword;