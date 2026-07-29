// src/components/FloatingMenu.jsx

import { useState } from "react";
import { Menu, X, Info, MessageSquare, Users, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { icon: <Info size={17} />, label: "About Project", href: "#about" },
  { icon: <MessageSquare size={17} />, label: "Feedback", href: "/feedback" },
  { icon: <Users size={17} />, label: "Developers", href: "#developers" },
  { icon: <Globe size={17} />, label: "GitHub", href: "https://github.com", external: true },
];

function FloatingMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-64 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden"
          >

            {/* HEADER */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-black text-xs">H</span>
              </div>
              <div>
                <h2 className="text-sm font-black text-slate-800">HostelHub</h2>
                <p className="text-slate-400 text-xs">Quick Navigation</p>
              </div>
            </div>

            {/* ITEMS */}
            <div className="p-2">
              {menuItems.map((item) => (
                <a key={item.label} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined} onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group">
                  <span className="text-slate-400 group-hover:text-blue-600 transition-colors duration-200">
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
                </a>
              ))}
            </div>

            {/* FOOTER */}
            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50">
              <p className="text-slate-400 text-xs text-center">
                © 2026 HostelHub — @mohan & @sai charan
              </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* TOGGLE BUTTON */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
          open ? "bg-slate-800 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </motion.button>

    </div>
  );
}

export default FloatingMenu;