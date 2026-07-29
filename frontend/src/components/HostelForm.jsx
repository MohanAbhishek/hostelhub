// src/components/HostelForm.jsx

import { useState } from "react";
import { Building2, MapPin, BedDouble, IndianRupee, Wifi, UtensilsCrossed, WashingMachine, Car } from "lucide-react";

const inputClass = "w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-sm";
const selectClass = "w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-sm cursor-pointer";
const labelClass = "block text-slate-700 mb-1.5 text-sm font-medium";

const facilities = [
  { name: "wifi",     icon: <Wifi size={16} />,             label: "WiFi"     },
  { name: "food",     icon: <UtensilsCrossed size={16} />,  label: "Food"     },
  { name: "laundry",  icon: <WashingMachine size={16} />,   label: "Laundry"  },
  { name: "parking",  icon: <Car size={16} />,              label: "Parking"  },
];

function HostelForm({ onCreate, loading }) {
  const [formData, setFormData] = useState({
    hostelName: "",
    description: "",
    address: "",
    city: "",
    state: "",
    pricePerMonth: "",
    totalRooms: "",
    availableRooms: "",
    roomType: "SINGLE",
    accommodationType: "BOYS",
    wifi: false,
    food: false,
    laundry: false,
    parking: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* SECTION 1 — BASIC INFO */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <Building2 size={16} className="text-blue-600" />
          </div>
          <h3 className="text-base font-bold text-slate-800">Basic Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className={labelClass}>Hostel Name</label>
            <input
              type="text"
              name="hostelName"
              placeholder="e.g. Green Valley Boys Hostel"
              value={formData.hostelName}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Room Type</label>
            <select name="roomType" value={formData.roomType} onChange={handleChange} className={selectClass}>
              <option value="SINGLE">Single</option>
              <option value="DOUBLE">Double</option>
              <option value="TRIPLE">Triple</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Accommodation Type</label>
            <select name="accommodationType" value={formData.accommodationType} onChange={handleChange} className={selectClass}>
              <option value="BOYS">Boys</option>
              <option value="GIRLS">Girls</option>
              <option value="BOTH">Co-ed (Both)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Description</label>
            <textarea
              name="description"
              placeholder="Describe your hostel — facilities, rules, nearby landmarks..."
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* SECTION 2 — LOCATION */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <MapPin size={16} className="text-blue-600" />
          </div>
          <h3 className="text-base font-bold text-slate-800">Location Details</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className={labelClass}>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Street address"
              value={formData.address}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>City</label>
            <input
              type="text"
              name="city"
              placeholder="e.g. Vijayawada"
              value={formData.city}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>State</label>
            <input
              type="text"
              name="state"
              placeholder="e.g. Andhra Pradesh"
              value={formData.state}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* SECTION 3 — PRICING & ROOMS */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <IndianRupee size={16} className="text-blue-600" />
          </div>
          <h3 className="text-base font-bold text-slate-800">Pricing & Rooms</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className={labelClass}>Price Per Month (₹)</label>
            <input
              type="number"
              name="pricePerMonth"
              placeholder="e.g. 5000"
              value={formData.pricePerMonth}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Total Rooms</label>
            <input
              type="number"
              name="totalRooms"
              placeholder="e.g. 20"
              value={formData.totalRooms}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Available Rooms</label>
            <input
              type="number"
              name="availableRooms"
              placeholder="e.g. 15"
              value={formData.availableRooms}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* SECTION 4 — FACILITIES */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <BedDouble size={16} className="text-blue-600" />
          </div>
          <h3 className="text-base font-bold text-slate-800">Facilities</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {facilities.map((facility) => (
            <label
              key={facility.name}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                formData[facility.name]
                  ? "bg-blue-50 border-blue-400 text-blue-700"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:border-blue-300"
              }`}
            >
              <input
                type="checkbox"
                name={facility.name}
                checked={formData[facility.name]}
                onChange={handleChange}
                className="hidden"
              />
              <span className={formData[facility.name] ? "text-blue-600" : "text-slate-400"}>
                {facility.icon}
              </span>
              <span className="text-sm font-medium">{facility.label}</span>
              {formData[facility.name] && (
                <span className="ml-auto text-blue-600 text-xs font-bold">✓</span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* SUBMIT */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-sm disabled:opacity-60"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating Hostel...
            </span>
          ) : (
            "Create Hostel →"
          )}
        </button>
      </div>

    </form>
  );
}

export default HostelForm;