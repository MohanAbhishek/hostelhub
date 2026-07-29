// src/pages/landlord/ManageHostels.jsx

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast, {
  Toaster,
} from "react-hot-toast";

import {
  Building2,
  MapPin,
  BedDouble,
  Pencil,
  Trash2,
  Eye,
  Plus,
} from "lucide-react";

import {
  getMyHostels,
  deleteHostel,
} from "../../services/hostelService";

function ManageHostels() {

  const navigate = useNavigate();

  const [hostels, setHostels] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchHostels();

  }, []);

  const fetchHostels = async () => {

    try {

      const data =
        await getMyHostels();

      console.log(data);

      setHostels(data);

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load hostels"
      );

    } finally {

      setLoading(false);
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this hostel?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      await deleteHostel(id);

      toast.success(
        "Hostel deleted successfully"
      );

      fetchHostels();

    } catch (error) {

      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Delete failed"
      );
    }
  };

  // LOADING

  if (loading) {

    return (

      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center text-3xl">

        Loading Hostels...

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#020617] text-white px-8 py-20">

      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16">

          <div>

            <h1 className="text-5xl font-black">

              My Hostels

            </h1>

            <p className="text-slate-400 mt-4 text-lg">

              Manage your hostels,
              rooms,
              and occupancy.

            </p>

          </div>

          {/* ACTION BUTTONS */}

          <div className="flex flex-wrap gap-4">

            {/* ADD HOSTEL */}

            <button
  onClick={() =>
    navigate("/landlord/create-hostel")
  }
  className="flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-4 rounded-2xl transition"
>

  <Plus size={20} />

  Add Hostel

</button>

            {/* BACK DASHBOARD */}

            <button
              onClick={() =>
                navigate("/landlord/dashboard")
              }
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-4 rounded-2xl transition"
            >

              Back Dashboard

            </button>

          </div>

        </div>

        {/* EMPTY STATE */}

        {hostels.length === 0 ? (

          <div className="text-center text-slate-400 text-2xl mt-32">

            No hostels created yet.

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

            {hostels.map((hostel) => (

              <div
                key={hostel.id}
                className="bg-white/[0.04] border border-white/10 rounded-3xl overflow-hidden hover:border-cyan-400 transition"
              >

                {/* IMAGE */}

                <img
                  src={
                    hostel.imageUrl ||
                    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5"
                  }
                  alt={hostel.hostelName}
                  className="w-full h-60 object-cover"
                />

                {/* CONTENT */}

                <div className="p-6">

                  {/* TITLE */}

                  <div className="flex items-center gap-3 mb-5">

                    <Building2
                      className="text-cyan-400"
                    />

                    <h2 className="text-2xl font-bold">

                      {hostel.hostelName}

                    </h2>

                  </div>

                  {/* LOCATION */}

                  <div className="flex items-center gap-3 text-slate-300 mb-4">

                    <MapPin size={18} />

                    <span>

                      {hostel.city},
                      {" "}
                      {hostel.state}

                    </span>

                  </div>

                  {/* ROOM INFO */}

                  <div className="flex items-center gap-3 text-slate-300">

                    <BedDouble size={18} />

                    <span>

                      {hostel.availableRooms}
                      {" / "}
                      {hostel.totalRooms}
                      {" "}
                      rooms available

                    </span>

                  </div>

                  {/* ACTIONS */}

                  <div className="mt-8 flex flex-wrap gap-3">

                    {/* VIEW */}

                    <button
                      onClick={() =>
                        navigate(
                          `/landlord/hostels/${hostel.id}`
                        )
                      }
                      className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-3 rounded-xl font-bold transition"
                    >

                      <Eye size={18} />

                      View

                    </button>

                    {/* EDIT */}

                    <button
                      onClick={() =>
                        navigate(
                          `/landlord/hostels/edit/${hostel.id}`
                        )
                      }
                      className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-3 rounded-xl font-bold transition"
                    >

                      <Pencil size={18} />

                      Edit

                    </button>

                    {/* DELETE */}

                    <button
                      onClick={() =>
                        handleDelete(hostel.id)
                      }
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-400 text-white px-4 py-3 rounded-xl font-bold transition"
                    >

                      <Trash2 size={18} />

                      Delete

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default ManageHostels;