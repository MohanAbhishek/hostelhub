// src/pages/landlord/LandlordHostelDetails.jsx

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import toast, {
  Toaster,
} from "react-hot-toast";

import {
  Building2,
  MapPin,
  BedDouble,
  IndianRupee,
  Wifi,
  Car,
  Utensils,
  Shirt,
  ArrowLeft,
} from "lucide-react";

import {
  getHostelById,
} from "../../services/hostelService";

function LandlordHostelDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [hostel, setHostel] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchHostel();

  }, [id]);

  const fetchHostel = async () => {

    try {

      const data =
        await getHostelById(id);

      console.log(data);

      setHostel(data);

    } catch (error) {

      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Failed to load hostel"
      );

    } finally {

      setLoading(false);
    }
  };

  // LOADING

  if (loading) {

    return (

      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center text-3xl">

        Loading Hostel Details...

      </div>
    );
  }

  // NOT FOUND

  if (!hostel) {

    return (

      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center text-3xl">

        Hostel Not Found

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#020617] text-white px-8 py-20">

      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto">

        {/* BACK BUTTON */}

        <button
          onClick={() =>
            navigate("/landlord/hostels")
          }
          className="flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-2xl font-bold mb-10 transition"
        >

          <ArrowLeft />

          Back

        </button>

        {/* IMAGE */}

        <img
          src={
            hostel.imageUrl ||
            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5"
          }
          alt={hostel.hostelName}
          className="w-full h-[500px] object-cover rounded-[40px]"
        />

        {/* DETAILS */}

        <div className="mt-14">

          <div className="flex items-center gap-4 mb-6">

            <Building2
              className="text-cyan-400"
              size={40}
            />

            <h1 className="text-6xl font-black">

              {hostel.hostelName}

            </h1>

          </div>

          <p className="text-slate-400 text-xl leading-[2] max-w-5xl">

            {hostel.description}

          </p>

        </div>

        {/* INFO GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-20">

          {/* CITY */}

          <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8">

            <div className="flex items-center gap-3 mb-4">

              <MapPin
                className="text-cyan-400"
              />

              <p className="text-slate-400">

                Location

              </p>

            </div>

            <h2 className="text-3xl font-black">

              {hostel.city}

            </h2>

            <p className="text-slate-500 mt-2">

              {hostel.state}

            </p>

          </div>

          {/* ROOMS */}

          <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8">

            <div className="flex items-center gap-3 mb-4">

              <BedDouble
                className="text-cyan-400"
              />

              <p className="text-slate-400">

                Rooms

              </p>

            </div>

            <h2 className="text-3xl font-black">

              {hostel.availableRooms}
              {" / "}
              {hostel.totalRooms}

            </h2>

            <p className="text-slate-500 mt-2">

              Available / Total

            </p>

          </div>

          {/* PRICE */}

          <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8">

            <div className="flex items-center gap-3 mb-4">

              <IndianRupee
                className="text-cyan-400"
              />

              <p className="text-slate-400">

                Monthly Price

              </p>

            </div>

            <h2 className="text-3xl font-black">

              ₹{hostel.pricePerMonth}

            </h2>

            <p className="text-slate-500 mt-2">

              Per Month

            </p>

          </div>

          {/* TYPE */}

          <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8">

            <div className="flex items-center gap-3 mb-4">

              <Building2
                className="text-cyan-400"
              />

              <p className="text-slate-400">

                Hostel Type

              </p>

            </div>

            <h2 className="text-3xl font-black">

              {hostel.accommodationType}

            </h2>

            <p className="text-slate-500 mt-2">

              {hostel.roomType}

            </p>

          </div>

        </div>

        {/* FACILITIES */}

        <div className="mt-24">

          <h2 className="text-5xl font-black mb-12">

            Facilities

          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            {/* WIFI */}

            <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8 flex flex-col items-center">

              <Wifi
                size={40}
                className="text-cyan-400 mb-5"
              />

              <h3 className="text-2xl font-bold">

                WiFi

              </h3>

              <p className="text-slate-400 mt-3">

                {hostel.wifi
                  ? "Available"
                  : "Not Available"}

              </p>

            </div>

            {/* FOOD */}

            <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8 flex flex-col items-center">

              <Utensils
                size={40}
                className="text-cyan-400 mb-5"
              />

              <h3 className="text-2xl font-bold">

                Food

              </h3>

              <p className="text-slate-400 mt-3">

                {hostel.food
                  ? "Available"
                  : "Not Available"}

              </p>

            </div>

            {/* LAUNDRY */}

            <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8 flex flex-col items-center">

              <Shirt
                size={40}
                className="text-cyan-400 mb-5"
              />

              <h3 className="text-2xl font-bold">

                Laundry

              </h3>

              <p className="text-slate-400 mt-3">

                {hostel.laundry
                  ? "Available"
                  : "Not Available"}

              </p>

            </div>

            {/* PARKING */}

            <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8 flex flex-col items-center">

              <Car
                size={40}
                className="text-cyan-400 mb-5"
              />

              <h3 className="text-2xl font-bold">

                Parking

              </h3>

              <p className="text-slate-400 mt-3">

                {hostel.parking
                  ? "Available"
                  : "Not Available"}

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default LandlordHostelDetails;