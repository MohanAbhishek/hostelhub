// src/components/DashboardNavbar.jsx

import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function DashboardNavbar() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Role-based nav links
  const navLinks = {
    STUDENT: [
      { label: "Dashboard", to: "/student/dashboard" },
      { label: "Explore Hostels", to: "/hostels" },
      { label: "My Bookings", to: "/student/bookings" },
    ],
    LANDLORD: [
      { label: "Dashboard", to: "/landlord/dashboard" },
      { label: "My Hostels", to: "/landlord/hostels" },
      { label: "Add Hostel", to: "/landlord/create-hostel" },
    ],
    ADMIN: [
      { label: "Dashboard", to: "/admin/dashboard" },
      { label: "Pending Hostels", to: "/admin/pending-hostels" },
    ],
  };

  const role = user?.role || "";
  const links = navLinks[role] || [];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-black text-sm">H</span>
          </div>
          <span className="text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
            HostelHub
          </span>
        </Link>

        {/* NAV LINKS — desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* USER BADGE */}
          {user?.fullName && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {user.fullName.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-slate-700 text-sm font-medium">
                {user.fullName.split(" ")[0]}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {role}
              </span>
            </div>
          )}

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 text-sm font-medium hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            Sign Out
          </button>

        </div>
      </div>
    </nav>
  );
}

export default DashboardNavbar;