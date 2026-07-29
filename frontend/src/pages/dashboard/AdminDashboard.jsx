// src/pages/dashboard/AdminDashboard.jsx

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import DashboardNavbar from "../../components/DashboardNavbar";

function AdminDashboard() {
  const { user } = useContext(AuthContext);

  const cards = [
    {
      icon: "👥",
      title: "Users",
      desc: "View and manage all registered students and landlords on the platform.",
      link: null,
      label: null,
      badge: null,
    },
    {
      icon: "⏳",
      title: "Pending Hostels",
      desc: "Review and approve or reject hostel registration requests from landlords.",
      link: "/admin/pending-hostels",
      label: "Review Now",
      badge: "Action Required",
    },
    {
      icon: "💬",
      title: "Feedback",
      desc: "Review platform feedback, complaints, and reports submitted by users.",
      link: null,
      label: null,
      badge: null,
    },
    {
      icon: "📊",
      title: "Analytics",
      desc: "Monitor bookings, occupancy rates, revenue, and overall system activity.",
      link: null,
      label: null,
      badge: null,
    },
  ];

  const stats = [
    { label: "Total Users", value: "—", icon: "👥" },
    { label: "Total Hostels", value: "—", icon: "🏠" },
    { label: "Total Bookings", value: "—", icon: "📋" },
    { label: "Pending Approvals", value: "—", icon: "⏳" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      <DashboardNavbar />

      <div className="max-w-7xl mx-auto px-8 pt-28 pb-20">

        {/* PAGE HEADER */}
        <div className="mb-10 pb-8 border-b border-slate-200">
          <p className="text-sm text-blue-600 font-medium mb-1">Admin Portal</p>
          <h1 className="text-3xl font-black text-slate-800">
            Welcome back{user?.fullName ? `, ${user.fullName}` : ""}! 👋
          </h1>
          <p className="text-slate-500 mt-2 text-base max-w-xl">
            Monitor platform activity, manage users, approve hostels, and review analytics.
          </p>
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-10">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 group relative"
            >
              {/* BADGE */}
              {card.badge && (
                <span className="absolute top-6 right-6 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
                  {card.badge}
                </span>
              )}

              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-2xl mb-5 group-hover:bg-blue-100 transition-colors duration-200">
                {card.icon}
              </div>

              <h2 className="text-xl font-bold text-slate-800 mb-2">
                {card.title}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {card.desc}
              </p>

              {card.link ? (
                <Link
                  to={card.link}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm"
                >
                  {card.label} →
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-100 text-slate-400 text-sm font-semibold cursor-not-allowed">
                  Coming Soon
                </span>
              )}
            </div>
          ))}
        </div>

        {/* PLATFORM HEALTH BANNER */}
        <div className="bg-white border border-slate-200 rounded-xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <div>
              <h3 className="text-slate-800 font-bold text-base">
                Platform Status: Operational
              </h3>
              <p className="text-slate-500 text-sm">
                All systems are running normally.
              </p>
            </div>
          </div>
          <Link
            to="/admin/pending-hostels"
            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all duration-200 whitespace-nowrap shadow-sm"
          >
            Review Pending Hostels →
          </Link>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;