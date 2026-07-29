// src/pages/hostels/Hostels.jsx

import { useEffect, useState } from "react";
import HostelCard from "../../components/HostelCard";
import { getAllHostels } from "../../services/hostelService";
import { Search, SlidersHorizontal } from "lucide-react";
import DashboardNavbar from "../../components/DashboardNavbar";

function Hostels() {
  const [hostels, setHostels] = useState([]);
  const [filteredHostels, setFilteredHostels] = useState([]);
  const [search, setSearch] = useState("");
  const [roomType, setRoomType] = useState("");
  const [accommodationType, setAccommodationType] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchHostels(); }, []);

  const fetchHostels = async () => {
    try {
      const data = await getAllHostels();
      setHostels(data);
      setFilteredHostels(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!Array.isArray(hostels)) { setFilteredHostels([]); return; }

    let filtered = [...hostels];

    filtered = filtered.filter((hostel) => {
      const hostelName = hostel?.hostelName || "";
      const city = hostel?.city || "";
      return (
        hostelName.toLowerCase().includes(search.toLowerCase()) ||
        city.toLowerCase().includes(search.toLowerCase())
      );
    });

    if (roomType) filtered = filtered.filter((h) => h.roomType === roomType);
    if (accommodationType) filtered = filtered.filter((h) => h.accommodationType === accommodationType);
    if (sortBy === "LOW_TO_HIGH") filtered.sort((a, b) => a.pricePerMonth - b.pricePerMonth);
    if (sortBy === "HIGH_TO_LOW") filtered.sort((a, b) => b.pricePerMonth - a.pricePerMonth);

    setFilteredHostels(filtered);
  }, [search, roomType, accommodationType, sortBy, hostels]);

  const selectClass = "bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition cursor-pointer";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      <DashboardNavbar />

      <div className="max-w-7xl mx-auto px-8 pt-28 pb-20">

        {/* PAGE HEADER */}
        <div className="mb-8 pb-6 border-b border-slate-200">
          <p className="text-sm text-blue-600 font-medium mb-1">Accommodation</p>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-800">Explore Hostels</h1>
              <p className="text-slate-500 mt-1 text-sm max-w-xl">
                Discover verified hostels, compare facilities, and book your accommodation instantly.
              </p>
            </div>
            {!loading && (
              <span className="text-sm text-slate-500 font-medium">
                {filteredHostels.length} hostel{filteredHostels.length !== 1 ? "s" : ""} found
              </span>
            )}
          </div>
        </div>

        {/* SEARCH + FILTERS */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm mb-8">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal size={16} className="text-slate-500" />
            <span className="text-sm font-semibold text-slate-700">Filter & Search</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            {/* SEARCH */}
            <div className="relative md:col-span-2">
              <Search className="absolute top-3 left-3 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search by hostel name or city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg py-2.5 pl-9 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            {/* ROOM TYPE */}
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className={selectClass}
            >
              <option value="">All Room Types</option>
              <option value="SINGLE">Single</option>
              <option value="DOUBLE">Double</option>
              <option value="TRIPLE">Triple</option>
            </select>

            {/* ACCOMMODATION TYPE */}
            <select
              value={accommodationType}
              onChange={(e) => setAccommodationType(e.target.value)}
              className={selectClass}
            >
              <option value="">All Accommodation</option>
              <option value="BOYS">Boys</option>
              <option value="GIRLS">Girls</option>
              <option value="BOTH">Co-ed</option>
            </select>

          </div>
        </div>

        {/* SORT ROW */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500">
            {!loading && `Showing ${filteredHostels.length} result${filteredHostels.length !== 1 ? "s" : ""}`}
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={selectClass}
          >
            <option value="">Sort By: Default</option>
            <option value="LOW_TO_HIGH">Price: Low to High</option>
            <option value="HIGH_TO_LOW">Price: High to Low</option>
          </select>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 text-sm font-medium">Loading hostels...</p>
          </div>

        ) : filteredHostels.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-3xl">
              🏠
            </div>
            <h3 className="text-slate-800 font-bold text-lg">No hostels found</h3>
            <p className="text-slate-500 text-sm">Try adjusting your filters or search term.</p>
            <button
              onClick={() => { setSearch(""); setRoomType(""); setAccommodationType(""); setSortBy(""); }}
              className="mt-2 px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
            >
              Clear Filters
            </button>
          </div>

        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredHostels.map((hostel) => (
              <HostelCard key={hostel.id} hostel={hostel} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Hostels;