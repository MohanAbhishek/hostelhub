// src/pages/admin/PendingHostels.jsx

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, IndianRupee, Home, CheckCircle, XCircle, Clock } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { getPendingHostels, approveHostel, rejectHostel } from "../../services/adminService";
import DashboardNavbar from "../../components/DashboardNavbar";

function PendingHostels() {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchHostels = async () => {
    try {
      const data = await getPendingHostels();
      setHostels(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load pending hostels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHostels(); }, []);

  const handleApprove = async (id) => {
    try {
      setActionLoading(id + "_approve");
      await approveHostel(id);
      toast.success("Hostel approved successfully");
      fetchHostels();
    } catch (error) {
      toast.error("Failed to approve hostel");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    try {
      setActionLoading(id + "_reject");
      await rejectHostel(id);
      toast.error("Hostel rejected");
      fetchHostels();
    } catch (error) {
      toast.error("Failed to reject hostel");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <DashboardNavbar />
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto px-8 pt-28 pb-20">

        {/* PAGE HEADER */}
        <div className="mb-10 pb-8 border-b border-slate-200">
          <p className="text-sm text-blue-600 font-medium mb-1">Admin Portal</p>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-800">Pending Hostels</h1>
              <p className="text-slate-500 mt-1 text-sm max-w-xl">
                Review and approve or reject hostel registration requests from landlords.
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-50 border border-amber-200">
              <Clock size={16} className="text-amber-600" />
              <span className="text-amber-700 text-sm font-semibold">
                {hostels.length} pending review{hostels.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 text-sm font-medium">Loading pending hostels...</p>
          </div>

        ) : hostels.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
              <CheckCircle size={32} className="text-green-500" />
            </div>
            <h3 className="text-slate-800 font-bold text-lg">All caught up!</h3>
            <p className="text-slate-500 text-sm">No pending hostel approvals at this time.</p>
          </div>

        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatePresence>
              {hostels.map((hostel, index) => (
                <motion.div
                  key={hostel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
                >

                  {/* HOSTEL IMAGE */}
                  {hostel.imageUrl && (
                    <div className="h-40 overflow-hidden">
                      <img
                        src={hostel.imageUrl}
                        alt={hostel.hostelName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* CARD CONTENT */}
                  <div className="p-6">

                    {/* STATUS BADGE */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
                        ⏳ Pending Review
                      </span>
                      <span className="text-slate-400 text-xs">ID: #{hostel.id}</span>
                    </div>

                    {/* TITLE */}
                    <h2 className="text-lg font-bold text-slate-800 mb-1">
                      {hostel.hostelName}
                    </h2>

                    {/* META */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                        <MapPin size={14} />
                        <span>{hostel.city}, {hostel.state}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                        <Home size={14} />
                        <span>{hostel.accommodationType}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                        <IndianRupee size={14} />
                        <span>₹{hostel.pricePerMonth?.toLocaleString("en-IN")}/month</span>
                      </div>
                    </div>

                    {/* DESCRIPTION */}
                    {hostel.description && (
                      <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                        {hostel.description}
                      </p>
                    )}

                    {/* DIVIDER */}
                    <div className="border-t border-slate-100 pt-4 flex gap-3">

                      {/* APPROVE */}
                      <button
                        onClick={() => handleApprove(hostel.id)}
                        disabled={actionLoading !== null}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-all duration-200 shadow-sm disabled:opacity-60"
                      >
                        {actionLoading === hostel.id + "_approve" ? (
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <CheckCircle size={16} />
                        )}
                        Approve
                      </button>

                      {/* REJECT */}
                      <button
                        onClick={() => handleReject(hostel.id)}
                        disabled={actionLoading !== null}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-red-300 text-red-600 text-sm font-semibold hover:bg-red-50 hover:border-red-400 transition-all duration-200 disabled:opacity-60"
                      >
                        {actionLoading === hostel.id + "_reject" ? (
                          <span className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <XCircle size={16} />
                        )}
                        Reject
                      </button>

                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  );
}

export default PendingHostels;