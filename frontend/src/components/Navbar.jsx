// src/components/Navbar.jsx

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-black text-sm">H</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
            HostelHub
          </h1>
        </Link>

        {/* NAV BUTTONS */}
        <div className="flex items-center gap-3">

          <Link
            to="/login"
            className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 text-sm"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 text-sm shadow-sm"
          >
            Get Started
          </Link>

        </div>

      </div>
    </motion.nav>
  );
}

export default Navbar;