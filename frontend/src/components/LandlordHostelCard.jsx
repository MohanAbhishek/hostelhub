// src/components/LandlordHostelCard.jsx

import { Trash2, MapPin, BedDouble, IndianRupee, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function LandlordHostelCard({ hostel, onDelete }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 flex flex-col"
    >

      {/* IMAGE */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={hostel.imageUrl || "https://images.unsplash.com/photo-1555854877-bab0e564b8d5"}
          alt={hostel.name}
          className="w-full h-full object-cover"
        />

        {/* STATUS BADGE */}
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
            hostel.status === "APPROVED"
              ? "bg-green-50 text-green-700 border-green-200"
              : hostel.status === "PENDING"
              ? "bg-amber-50 text-amber-700 border-amber-200"
              : "bg-red-50 text-red-700 border-red-200"
          }`}>
            {hostel.status || "PENDING"}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col flex-1">

        {/* TITLE */}
        <h2 className="text-lg font-bold text-slate-800 mb-1">
          {hostel.hostelName || hostel.name}
        </h2>

        {/* LOCATION */}
        <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4">
          <MapPin size={14} />
          <span>{hostel.city || hostel.location}</span>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 flex items-center gap-2">
            <BedDouble size={13} className="text-slate-400" />
            <div>
              <div className="text-xs text-slate-400">Rooms</div>
              <div className="text-sm font-bold text-slate-700">
                {hostel.totalRooms ?? "—"}
              </div>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 flex items-center gap-2">
            <IndianRupee size={13} className="text-slate-400" />
            <div>
              <div className="text-xs text-slate-400">Price</div>
              <div className="text-sm font-bold text-slate-700">
                ₹{hostel.pricePerMonth?.toLocaleString("en-IN")}/mo
              </div>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        {hostel.description && (
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">
            {hostel.description}
          </p>
        )}

        {/* ACTIONS */}
        <div className="flex gap-2 mt-auto pt-4 border-t border-slate-100">

          {/* VIEW DETAILS */}
          <Link
            to={`/landlord/hostels/${hostel.id}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-300 text-slate-600 text-sm font-semibold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
          >
            <Eye size={15} />
            View
          </Link>

          {/* DELETE */}
          <button
            onClick={() => onDelete(hostel.id)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 hover:border-red-400 transition-all duration-200"
          >
            <Trash2 size={15} />
            Delete
          </button>

        </div>
      </div>

    </motion.div>
  );
}

export default LandlordHostelCard;