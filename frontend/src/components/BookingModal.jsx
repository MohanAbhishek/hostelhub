// src/components/BookingModal.jsx

import { motion, AnimatePresence } from "framer-motion";
import { X, BedDouble, IndianRupee, Hash, Users } from "lucide-react";

function BookingModal({ open, onClose, room, onConfirm, loading }) {

  const details = room ? [
    { icon: <Hash size={15} />, label: "Room Number", value: room.roomNumber },
    { icon: <BedDouble size={15} />, label: "Room Type", value: room.roomType },
    { icon: <Users size={15} />, label: "Available Beds", value: room.availableBeds },
    { icon: <IndianRupee size={15} />, label: "Price", value: `₹${room.pricePerMonth?.toLocaleString("en-IN")}/month` },
  ] : [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >

            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Confirm Booking</h2>
                <p className="text-slate-500 text-xs mt-0.5">Review your booking details below</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all duration-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* BODY */}
            <div className="px-6 py-5">

              {/* ROOM DETAILS */}
              {room && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden mb-5">
                  {details.map((item, index) => (
                    <div
                      key={item.label}
                      className={`flex items-center justify-between px-4 py-3 ${
                        index !== details.length - 1 ? "border-b border-slate-200" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      <span className="text-slate-800 font-semibold text-sm">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* NOTICE */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-5">
                <p className="text-blue-700 text-xs font-medium">
                  📋 Your booking will be confirmed immediately. Check-in is available from the next working day.
                </p>
              </div>

              {/* TOTAL */}
              <div className="flex items-center justify-between py-3 border-t border-slate-200">
                <span className="text-slate-600 text-sm font-medium">Total Amount</span>
                <span className="text-2xl font-black text-slate-800">
                  ₹{room?.pricePerMonth?.toLocaleString("en-IN")}
                  <span className="text-slate-400 text-sm font-normal">/month</span>
                </span>
              </div>

            </div>

            {/* FOOTER */}
            <div className="flex gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-lg border border-slate-300 text-slate-600 text-sm font-semibold hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-sm disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Confirm Booking"
                )}
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BookingModal;