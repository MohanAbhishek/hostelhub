// src/pages/bookings/MyBookings.jsx

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CalendarDays, BedDouble, IndianRupee, CreditCard, XCircle } from "lucide-react";
import { getMyBookings, cancelBooking } from "../../services/bookingService";

const statusStyles = {
  CONFIRMED: "bg-green-50 text-green-700 border border-green-200",
  CANCELLED: "bg-red-50 text-red-600 border border-red-200",
  PENDING: "bg-yellow-50 text-yellow-700 border border-yellow-200",
};

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(null);

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    try {
      const data = await getMyBookings();
      setBookings(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      setCancelLoading(bookingId);
      await cancelBooking(bookingId);
      toast.success("Booking cancelled successfully");
      fetchBookings();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to cancel booking");
    } finally {
      setCancelLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Loading bookings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <Toaster position="top-right" />

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-500 text-sm mt-1">
            {bookings.length} booking{bookings.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* EMPTY STATE */}
        {bookings.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-16 text-center shadow-sm">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BedDouble size={22} className="text-gray-400" />
            </div>
            <h3 className="text-gray-700 font-semibold text-base mb-1">No bookings yet</h3>
            <p className="text-gray-400 text-sm">Your booking history will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* CARD HEADER */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-base font-bold text-gray-900 leading-tight">
                      {booking.hostelName}
                    </h2>
                    <p className="text-gray-400 text-xs mt-0.5">Booking #{booking.id}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[booking.bookingStatus] || statusStyles.PENDING}`}>
                    {booking.bookingStatus}
                  </span>
                </div>

                <div className="border-t border-gray-100 mb-4" />

                {/* DETAILS */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <BedDouble size={15} className="text-gray-400 shrink-0" />
                    <span className="text-gray-500 text-sm">Room</span>
                    <span className="ml-auto text-gray-800 text-sm font-semibold">{booking.roomNumber}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarDays size={15} className="text-gray-400 shrink-0" />
                    <span className="text-gray-500 text-sm">Check-In</span>
                    <span className="ml-auto text-gray-800 text-sm font-semibold">{booking.checkInDate}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarDays size={15} className="text-gray-400 shrink-0" />
                    <span className="text-gray-500 text-sm">Check-Out</span>
                    <span className="ml-auto text-gray-800 text-sm font-semibold">{booking.checkOutDate}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <IndianRupee size={15} className="text-gray-400 shrink-0" />
                    <span className="text-gray-500 text-sm">Amount</span>
                    <span className="ml-auto text-gray-800 text-sm font-semibold">₹{booking.totalAmount}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard size={15} className="text-gray-400 shrink-0" />
                    <span className="text-gray-500 text-sm">Payment</span>
                    <span className={`ml-auto text-sm font-semibold ${booking.paymentCompleted ? "text-green-600" : "text-yellow-600"}`}>
                      {booking.paymentCompleted ? "Completed" : "Pending"}
                    </span>
                  </div>
                </div>

                {/* CANCEL BUTTON */}
                {booking.bookingStatus === "CONFIRMED" && (
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    disabled={cancelLoading === booking.id}
                    className="mt-5 w-full py-2.5 rounded-lg border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <XCircle size={15} />
                    {cancelLoading === booking.id ? "Cancelling..." : "Cancel Booking"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;