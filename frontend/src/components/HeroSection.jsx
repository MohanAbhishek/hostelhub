// src/components/HeroSection.jsx

import { motion } from "framer-motion";

const stats = [
  { label: "Active Students", value: "10,000+" },
  { label: "Verified Hostels", value: "500+" },
  { label: "Cities Covered", value: "25+" },
];

const features = [
  {
    icon: "📅",
    title: "Real-Time Booking",
    desc: "Instantly reserve hostel rooms with live availability updates and instant confirmation.",
  },
  {
    icon: "🏠",
    title: "Smart Management",
    desc: "Landlords manage rooms, occupancy, bookings, and pricing from one dashboard.",
  },
  {
    icon: "🔒",
    title: "Secure & Verified",
    desc: "JWT authentication and OTP verification ensure complete platform security.",
  },
];

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-8 py-24 bg-slate-50 overflow-hidden">

      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 z-0" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/60 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-3xl z-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">

        {/* TOP BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Smart Hostel Booking Platform
          </div>
        </motion.div>

        {/* HEADLINE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-4xl mx-auto mb-6"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-tight">
            Find Your Perfect{" "}
            <span className="text-blue-600">
              Student Hostel
            </span>
          </h1>
        </motion.div>

        {/* SUBHEADING */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          HostelHub simplifies accommodation for students and landlords —
          real-time booking, occupancy tracking, and secure digital management
          all in one place.
        </motion.p>

        {/* CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="/register"
            className="px-8 py-3.5 rounded-lg bg-blue-600 text-white font-semibold text-sm shadow-md hover:bg-blue-700 transition-all duration-200"
          >
            Get Started — It's Free
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="/login"
            className="px-8 py-3.5 rounded-lg border border-slate-300 text-slate-700 font-semibold text-sm hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
          >
            Sign In
          </motion.a>
        </motion.div>

        {/* STATS ROW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-10 mb-20 border-y border-slate-200 py-8"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black text-slate-800">{stat.value}</div>
              <div className="text-slate-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* FEATURE CARDS */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-5 text-2xl">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                {item.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HeroSection;