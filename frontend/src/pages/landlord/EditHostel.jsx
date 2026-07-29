// src/pages/landlord/EditHostel.jsx

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import toast, {
  Toaster,
} from "react-hot-toast";

import {
  getHostelById,
  updateHostel,
} from "../../services/hostelService";

function EditHostel() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [updating, setUpdating] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
      address: "",
      city: "",
      state: "",
      totalRooms: 0,
      availableRooms: 0,
      roomType: "DOUBLE",
      accommodationType: "BOYS",
      pricePerMonth: 0,
    });

  useEffect(() => {

    fetchHostel();

  }, [id]);

  const fetchHostel = async () => {

    try {

      const data =
        await getHostelById(id);

      setFormData({
        name: data.hostelName || "",
        description: data.description || "",
        address: data.address || "",
        city: data.city || "",
        state: data.state || "",
        totalRooms: data.totalRooms || 0,
        availableRooms: data.availableRooms || 0,
        roomType: data.roomType || "DOUBLE",
        accommodationType:
          data.accommodationType || "BOYS",
        pricePerMonth:
          data.pricePerMonth || 0,
      });

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load hostel"
      );

    } finally {

      setLoading(false);
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setUpdating(true);

      await updateHostel(
        id,
        formData
      );

      toast.success(
        "Hostel updated successfully"
      );

      setTimeout(() => {

        navigate(
          "/landlord/hostels"
        );

      }, 1500);

    } catch (error) {

      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Update failed"
      );

    } finally {

      setUpdating(false);
    }
  };

  if (loading) {

    return (

      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center text-3xl">

        Loading Hostel...

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#020617] text-white px-8 py-20">

      <Toaster position="top-right" />

      <div className="max-w-4xl mx-auto">

        <div className="mb-14">

          <h1 className="text-5xl font-black">

            Edit Hostel

          </h1>

          <p className="text-slate-400 mt-4 text-lg">

            Update hostel details
            and room information.

          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* NAME */}

          <div>

            <label className="block mb-3 text-slate-300">

              Hostel Name

            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
            />

          </div>

          {/* DESCRIPTION */}

          <div>

            <label className="block mb-3 text-slate-300">

              Description

            </label>

            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
            />

          </div>

          {/* ADDRESS */}

          <div>

            <label className="block mb-3 text-slate-300">

              Address

            </label>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
            />

          </div>

          {/* CITY + STATE */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div>

              <label className="block mb-3 text-slate-300">

                City

              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
              />

            </div>

            <div>

              <label className="block mb-3 text-slate-300">

                State

              </label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
              />

            </div>

          </div>

          {/* ROOMS */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div>

              <label className="block mb-3 text-slate-300">

                Total Rooms

              </label>

              <input
                type="number"
                name="totalRooms"
                value={formData.totalRooms}
                onChange={handleChange}
                required
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
              />

            </div>

            <div>

              <label className="block mb-3 text-slate-300">

                Available Rooms

              </label>

              <input
                type="number"
                name="availableRooms"
                value={formData.availableRooms}
                onChange={handleChange}
                required
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
              />

            </div>

          </div>

          {/* TYPES */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div>

              <label className="block mb-3 text-slate-300">

                Room Type

              </label>

              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
              >

                <option value="SINGLE">
                  SINGLE
                </option>

                <option value="DOUBLE">
                  DOUBLE
                </option>

                <option value="TRIPLE">
                  TRIPLE
                </option>

              </select>

            </div>

            <div>

              <label className="block mb-3 text-slate-300">

                Accommodation Type

              </label>

              <select
                name="accommodationType"
                value={formData.accommodationType}
                onChange={handleChange}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
              >

                <option value="BOYS">
                  BOYS
                </option>

                <option value="GIRLS">
                  GIRLS
                </option>

                <option value="BOTH">
  BOTH
</option>

              </select>

            </div>

          </div>

          {/* PRICE */}

          <div>

            <label className="block mb-3 text-slate-300">

              Price Per Month

            </label>

            <input
              type="number"
              name="pricePerMonth"
              value={formData.pricePerMonth}
              onChange={handleChange}
              required
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={updating}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black py-5 rounded-2xl text-xl transition"
          >

            {updating
              ? "Updating..."
              : "Update Hostel"}

          </button>

        </form>

      </div>

    </div>
  );
}

export default EditHostel;