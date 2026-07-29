// src/pages/dashboard/StudentDashboard.jsx

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import DashboardNavbar from "../../components/DashboardNavbar";

function StudentDashboard() {
  const { user } = useContext(AuthContext);

  const cards = [
    {
      icon: "🏠",
      title: "Explore Hostels",
      desc: "Browse verified hostels, compare facilities, and book rooms instantly.",
      link: "/hostels",
      label: "View Hostels",
      accent: "blue",
    },
    {
      icon: "📋",
      title: "My Bookings",
      desc: "Track all your active bookings, check-in dates, and booking history.",
      link: "/student/bookings",
      label: "View Bookings",
      accent: "indigo",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      <DashboardNavbar />

      <div className="max-w-7xl mx-auto px-8 pt-28 pb-20">

        {/* PAGE HEADER */}
        <div className="mb-10 pb-8 border-b border-slate-200">
          <p className="text-sm text-blue-600 font-medium mb-1">Student Portal</p>
          <h1 className="text-3xl font-black text-slate-800">
            Welcome back{user?.fullName ? `, ${user.fullName}` : ""}! 👋
          </h1>
          <p className="text-slate-500 mt-2 text-base max-w-xl">
            Explore hostels, book rooms, and manage your accommodations all in one place.
          </p>
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Active Bookings", value: "—", icon: "📋" },
            { label: "Hostels Explored", value: "—", icon: "🔍" },
            { label: "Check-ins", value: "—", icon: "✅" },
            { label: "Member Since", value: "2026", icon: "🗓️" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-xl font-black text-slate-800">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ACTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-2xl mb-5 group-hover:bg-blue-100 transition-colors duration-200">
                {card.icon}
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">
                {card.title}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {card.desc}
              </p>
              <Link
                to={card.link}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm"
              >
                {card.label} →
              </Link>
            </div>
          ))}
        </div>

        {/* INFO BANNER */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-slate-800 font-bold text-base mb-1">
              Looking for the perfect hostel?
            </h3>
            <p className="text-slate-500 text-sm">
              Browse our verified listings and book your accommodation in minutes.
            </p>
          </div>
          <Link
            to="/hostels"
            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all duration-200 whitespace-nowrap shadow-sm"
          >
            Explore Now →
          </Link>
        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;