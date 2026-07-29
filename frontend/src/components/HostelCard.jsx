// src/components/HostelCard.jsx

import { motion } from "framer-motion";
import { MapPin, BedDouble, IndianRupee, Users } from "lucide-react";
import { Link } from "react-router-dom";

function HostelCard({ hostel }) {
  const accommodationColors = {
    BOYS: "bg-blue-50 text-blue-700 border-blue-200",
    GIRLS: "bg-pink-50 text-pink-700 border-pink-200",
    BOTH: "bg-green-50 text-green-700 border-green-200",
  };

  const roomTypeColors = {
    SINGLE: "bg-slate-50 text-slate-600 border-slate-200",
    DOUBLE: "bg-amber-50 text-amber-700 border-amber-200",
    TRIPLE: "bg-purple-50 text-purple-700 border-purple-200",
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-300 shadow-sm flex flex-col"
    >

      {/* IMAGE */}
      <div className="h-48 overflow-hidden relative">
        <img
          src={hostel.imageUrl || "https://images.unsplash.com/photo-1555854877-bab0e564b8d5"}
          alt={hostel.hostelName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* BADGES OVERLAY */}
        <div className="absolute top-3 left-3 flex gap-2">
          {hostel.accommodationType && (
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${accommodationColors[hostel.accommodationType] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
              {hostel.accommodationType}
            </span>
          )}
          {hostel.roomType && (
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${roomTypeColors[hostel.roomType] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
              {hostel.roomType}
            </span>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col flex-1">

        {/* TITLE */}
        <h2 className="text-lg font-bold text-slate-800 mb-1 leading-snug">
          {hostel.hostelName}
        </h2>

        {/* LOCATION */}
        <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4">
          <MapPin size={14} />
          <span>{hostel.city}, {hostel.state}</span>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 flex items-center gap-2">
            <BedDouble size={14} className="text-slate-400" />
            <div>
              <div className="text-xs text-slate-400">Rooms</div>
              <div className="text-sm font-bold text-slate-700">{hostel.totalRooms}</div>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 flex items-center gap-2">
            <Users size={14} className="text-slate-400" />
            <div>
              <div className="text-xs text-slate-400">Available</div>
              <div className="text-sm font-bold text-slate-700">
                {hostel.availableBeds ?? "—"} beds
              </div>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        {hostel.description && (
          <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
            {hostel.description}
          </p>
        )}

        {/* FOOTER */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1 text-blue-600">
            <IndianRupee size={16} />
            <span className="text-xl font-black text-slate-800">
              {hostel.pricePerMonth?.toLocaleString("en-IN")}
            </span>
            <span className="text-slate-400 text-xs">/month</span>
          </div>
          <Link
            to={`/hostels/${hostel.id}`}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm"
          >
            View Details →
          </Link>
        </div>

      </div>
    </motion.div>
  );
}

export default HostelCard;