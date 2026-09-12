// src/pages/auth/ForgotPassword.jsx

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { KeyRound, ArrowLeft } from "lucide-react";

function ForgotPassword() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8"
      >

        {/* ICON */}
        <div className="flex justify-center mb-6">

          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">

            <KeyRound
              size={24}
              className="text-blue-600"
            />

          </div>

        </div>

        {/* HEADING */}
        <div className="text-center mb-8">

          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Password Recovery
          </h1>

          <p className="text-gray-500 text-sm leading-relaxed">
            Password recovery through email OTP is currently unavailable.
            Please contact the HostelHub administrator to reset your password.
          </p>

        </div>

        {/* INFORMATION BOX */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">

          <p className="text-blue-800 text-sm font-medium mb-1">
            Need help?
          </p>

          <p className="text-blue-700 text-sm leading-relaxed">
            Contact the HostelHub administrator and provide the email
            address associated with your account.
          </p>

        </div>

        {/* BACK TO LOGIN */}
        <Link
          to="/login"
          className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
        >

          <ArrowLeft size={16} />

          Back to Login

        </Link>

      </motion.div>

    </div>
  );
}

export default ForgotPassword;