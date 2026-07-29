// src/pages/auth/VerifyOtp.jsx

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { ShieldCheck, Mail } from "lucide-react";
import { verifyOtp } from "../../services/authService";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await verifyOtp({ email, otp });
      toast.success("Email verified successfully");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "OTP Verification Failed");
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
            <ShieldCheck size={24} className="text-blue-600" />
          </div>
        </div>

        {/* HEADING */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Verify your email</h1>
          <p className="text-gray-500 text-sm">We sent a verification code to</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Mail size={14} className="text-blue-600" />
            <span className="text-blue-600 text-sm font-semibold">{email}</span>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleVerify} className="space-y-5">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-gray-400 text-xs mt-6">
          Didn't receive the code?{" "}
          <button className="text-blue-600 font-medium hover:underline">
            Resend OTP
          </button>
        </p>

      </motion.div>
    </div>
  );
}

export default VerifyOtp;