// src/components/FeaturesSection.jsx

import { motion } from "framer-motion";

const features = [
  {
    icon: "🔍",
    title: "Search Hostels",
    desc: "Students can search hostels by location, room availability, and facilities with ease.",
  },
  {
    icon: "📋",
    title: "Online Booking",
    desc: "The booking engine allows students to reserve rooms instantly without manual processes.",
  },
  {
    icon: "📊",
    title: "Occupancy Tracking",
    desc: "Room occupancy updates automatically whenever bookings are confirmed or cancelled.",
  },
  {
    icon: "🔒",
    title: "Secure Authentication",
    desc: "JWT authentication with OTP verification protects every user account on the platform.",
  },
  {
    icon: "🖥️",
    title: "Role-Based Dashboards",
    desc: "Separate dashboards tailored for students, landlords, and administrators.",
  },
  {
    icon: "🏠",
    title: "Hostel Management",
    desc: "Landlords can dynamically manage hostels, rooms, pricing, and occupancy in real time.",
  },
];

function FeaturesSection() {
  return (
    <section className="px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-4">
            Platform Features
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Everything you need,{" "}
            <span className="text-blue-600">in one place</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg leading-relaxed">
            HostelHub provides all essential hostel booking and management
            functionalities for students, landlords, and administrators
            in one integrated platform.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 group"
            >
              {/* ICON */}
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-5 text-2xl group-hover:bg-blue-100 transition-colors duration-200">
                {feature.icon}
              </div>

              {/* CONTENT */}
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <a href="/register" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-blue-600 text-white font-semibold text-sm shadow-md hover:bg-blue-700 transition-all duration-200">
            Start for Free →
          </a>
        </motion.div>

      </div>
    </section>
  );
}

export default FeaturesSection;