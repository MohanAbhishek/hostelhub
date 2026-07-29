// src/components/AboutSection.jsx

import { motion } from "framer-motion";

const workflow = [
  {
    step: "01",
    title: "Register Account",
    desc: "Create your account by selecting your role as Student or Landlord, then verify via OTP.",
  },
  {
    step: "02",
    title: "Login Securely",
    desc: "JWT authentication verifies your identity and grants access to your personalized dashboard.",
  },
  {
    step: "03",
    title: "Search & Book",
    desc: "Students browse verified hostels, compare facilities, and reserve rooms instantly.",
  },
  {
    step: "04",
    title: "Manage Hostels",
    desc: "Landlords manage rooms, occupancy, pricing, and bookings from one central dashboard.",
  },
];

function AboutSection() {
  return (
    <section id="about" className="px-8 py-24 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Simple workflow,{" "}
            <span className="text-blue-600">powerful results</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg leading-relaxed">
            HostelHub follows a simple four-step process so anyone can
            get started without any technical knowledge.
          </p>
        </motion.div>

        {/* TIMELINE STEPS */}
        <div className="relative">

          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-10 left-1/2 -translate-x-1/2 w-px h-full bg-slate-200 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {workflow.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-slate-50 border border-slate-200 rounded-xl p-8 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 group relative"
              >
                {/* STEP NUMBER */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
                    <span className="text-white font-black text-sm">{item.step}</span>
                  </div>
                  <div className="h-px flex-1 bg-slate-200 group-hover:bg-blue-200 transition-colors duration-300" />
                </div>

                {/* CONTENT */}
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.desc}
                </p>

                {/* HOVER ACCENT */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-b-xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* BOTTOM TRUST BAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 bg-blue-600 rounded-2xl px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-white text-2xl font-black mb-1">
              Ready to get started?
            </h3>
            <p className="text-blue-100 text-sm">
              Join thousands of students finding their perfect accommodation today.
            </p>
          </div>
          <a href="/register" className="px-8 py-3.5 rounded-lg bg-white text-blue-600 font-semibold text-sm shadow hover:bg-blue-50 transition-all duration-200 whitespace-nowrap">
            Create Free Account →
          </a>
        </motion.div>

      </div>
    </section>
  );
}

export default AboutSection;