// src/components/RoomCard.jsx

import { motion } from "framer-motion";
import { BedDouble, IndianRupee, Users } from "lucide-react";

function RoomCard({ room, onBook }) {

  const isAvailable = room.availableBeds > 0;

  const occupancyPercent = room.totalBeds
    ? Math.round(((room.totalBeds - room.availableBeds) / room.totalBeds) * 100)
    : 0;

  const roomTypeColors = {
    SINGLE: "bg-slate-50 text-slate-600 border-slate-200",
    DOUBLE: "bg-amber-50 text-amber-700 border-amber-200",
    TRIPLE: "bg-purple-50 text-purple-700 border-purple-200",
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col ${
        isAvailable ? "border-slate-200 hover:border-blue-200" : "border-slate-200 opacity-75"
      }`}
    >

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-slate-800">
            Room {room.roomNumber}
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            {isAvailable ? "Available for booking" : "Fully occupied"}
          </p>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${roomTypeColors[room.roomType] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
          {room.roomType}
        </span>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-center">
          <BedDouble size={14} className="text-slate-400 mx-auto mb-1" />
          <div className="text-sm font-bold text-slate-800">{room.availableBeds}</div>
          <div className="text-xs text-slate-400">Available</div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-center">
          <Users size={14} className="text-slate-400 mx-auto mb-1" />
          <div className="text-sm font-bold text-slate-800">{room.totalBeds}</div>
          <div className="text-xs text-slate-400">Capacity</div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-center">
          <IndianRupee size={14} className="text-slate-400 mx-auto mb-1" />
          <div className="text-sm font-bold text-slate-800">
            {room.pricePerMonth?.toLocaleString("en-IN")}
          </div>
          <div className="text-xs text-slate-400">/month</div>
        </div>
      </div>

      {/* OCCUPANCY BAR */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-slate-500">Occupancy</span>
          <span className="text-xs font-semibold text-slate-700">{occupancyPercent}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              occupancyPercent >= 100
                ? "bg-red-500"
                : occupancyPercent >= 70
                ? "bg-amber-500"
                : "bg-green-500"
            }`}
            style={{ width: `${occupancyPercent}%` }}
          />
        </div>
      </div>

      {/* BOOK BUTTON */}
      <button
        disabled={!isAvailable}
        onClick={() => onBook(room)}
        className={`mt-auto w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
          isAvailable
            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
            : "bg-slate-100 text-slate-400 cursor-not-allowed"
        }`}
      >
        {isAvailable ? "Book Now →" : "Fully Occupied"}
      </button>

    </motion.div>
  );
}

export default RoomCard;