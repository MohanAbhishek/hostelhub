// src/pages/hostels/HostelDetails.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { MapPin, BedDouble, IndianRupee, Users, Home, ArrowLeft } from "lucide-react";
import { getHostelById } from "../../services/hostelService";
import { createBooking } from "../../services/bookingService";
import RoomCard from "../../components/RoomCard";
import BookingModal from "../../components/BookingModal";
import DashboardNavbar from "../../components/DashboardNavbar";

function HostelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => { fetchHostel(); }, [id]);

  const fetchHostel = async () => {
    try {
      const data = await getHostelById(id);
      setHostel(data);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to load hostel");
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (room) => {
    setSelectedRoom(room);
    setOpenModal(true);
  };

  const handleBooking = async () => {
    try {
      setBookingLoading(true);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 2);
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      await createBooking(selectedRoom.id, {
        checkInDate: tomorrow,
        checkOutDate: nextMonth,
        totalAmount: selectedRoom.pricePerMonth,
      });

      toast.success("Booking Successful!");
      setOpenModal(false);
      setSelectedRoom(null);
      fetchHostel();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Booking Failed");
    } finally {
      setBookingLoading(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 text-sm font-medium">Loading hostel details...</p>
      </div>
    );
  }

  // NOT FOUND
  if (!hostel) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-3xl">🏠</div>
        <h2 className="text-slate-800 font-bold text-xl">Hostel Not Found</h2>
        <p className="text-slate-500 text-sm">This hostel may have been removed or doesn't exist.</p>
        <button
          onClick={() => navigate("/hostels")}
          className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
        >
          Back to Hostels
        </button>
      </div>
    );
  }

  const infoStats = [
    { icon: <MapPin size={16} />, label: "City", value: hostel?.city },
    { icon: <Home size={16} />, label: "State", value: hostel?.state },
    { icon: <BedDouble size={16} />, label: "Room Type", value: hostel?.roomType },
    { icon: <Users size={16} />, label: "Accommodation", value: hostel?.accommodationType },
    { icon: <IndianRupee size={16} />, label: "Price", value: `₹${hostel?.pricePerMonth?.toLocaleString("en-IN")}/mo` },
    { icon: <BedDouble size={16} />, label: "Total Rooms", value: hostel?.totalRooms },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <DashboardNavbar />
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto px-8 pt-28 pb-20">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/hostels")}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 text-sm font-medium mb-6 transition-colors duration-200"
        >
          <ArrowLeft size={16} />
          Back to Hostels
        </button>

        {/* HERO IMAGE */}
        <div className="relative w-full h-[420px] rounded-2xl overflow-hidden mb-8 shadow-md">
          <img
            src={hostel?.imageUrl || "https://images.unsplash.com/photo-1555854877-bab0e564b8d5"}
            alt={hostel?.hostelName}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {/* Name overlay */}
          <div className="absolute bottom-6 left-8">
            <h1 className="text-4xl font-black text-white drop-shadow-lg">
              {hostel?.hostelName}
            </h1>
            <div className="flex items-center gap-1.5 text-white/80 text-sm mt-1">
              <MapPin size={14} />
              <span>{hostel?.city}, {hostel?.state}</span>
            </div>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT — MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-6">

            {/* DESCRIPTION */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-3">About this Hostel</h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                {hostel?.description || "No description provided."}
              </p>
            </div>

            {/* ROOMS SECTION */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800">Available Rooms</h2>
                <span className="text-sm text-slate-500">
                  {hostel?.rooms?.length || 0} room{hostel?.rooms?.length !== 1 ? "s" : ""}
                </span>
              </div>

              {hostel?.rooms?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hostel.rooms.map((room) => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      onBook={handleBookClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-2xl">🚪</div>
                  <p className="text-slate-500 text-sm">No rooms available at this time.</p>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT — INFO SIDEBAR */}
          <div className="space-y-6">

            {/* STATS CARD */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-800 mb-4">Hostel Details</h3>
              <div className="space-y-3">
                {infoStats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      {stat.icon}
                      <span>{stat.label}</span>
                    </div>
                    <span className="text-slate-800 font-semibold text-sm">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PRICE CTA */}
            <div className="bg-blue-600 rounded-xl p-6 text-white">
              <p className="text-blue-100 text-sm mb-1">Starting from</p>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-3xl font-black">
                  ₹{hostel?.pricePerMonth?.toLocaleString("en-IN")}
                </span>
                <span className="text-blue-200 text-sm mb-1">/month</span>
              </div>
              <p className="text-blue-100 text-xs mb-4">
                Select a room below to proceed with booking.
              </p>
              <div className="w-full py-2.5 rounded-lg bg-white/10 border border-white/20 text-center text-sm font-semibold">
                {hostel?.rooms?.length || 0} room{hostel?.rooms?.length !== 1 ? "s" : ""} available
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* BOOKING MODAL */}
      <BookingModal
        open={openModal}
        onClose={() => { setOpenModal(false); setSelectedRoom(null); }}
        room={selectedRoom}
        onConfirm={handleBooking}
        loading={bookingLoading}
      />

    </div>
  );
}

export default HostelDetails;