// src/routes/AppRoutes.jsx

import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/Home";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Feedback from "../pages/Feedback";

import MyBookings from "../pages/bookings/MyBookings";

import StudentDashboard from "../pages/dashboard/StudentDashboard";
import LandlordDashboard from "../pages/dashboard/LandlordDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";

import Hostels from "../pages/hostels/Hostels";
import HostelDetails from "../pages/hostels/HostelDetails";

import ProtectedRoute from "./ProtectedRoute";

import ManageHostels from "../pages/landlord/ManageHostels";
import LandlordHostelDetails from "../pages/landlord/LandlordHostelDetails";
import EditHostel from "../pages/landlord/EditHostel";
import CreateHostel from "../pages/landlord/CreateHostel";

import PendingHostels from "../pages/admin/PendingHostels";

function AppRoutes() {

  return (

    <Routes>

      {/* HOME */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* AUTH */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* HOSTELS */}
      <Route
        path="/hostels"
        element={
          <ProtectedRoute
            allowedRoles={[
              "STUDENT",
              "LANDLORD",
              "ADMIN",
            ]}
          >
            <Hostels />
          </ProtectedRoute>
        }
      />

      <Route
        path="/hostels/:id"
        element={
          <ProtectedRoute
            allowedRoles={[
              "STUDENT",
              "LANDLORD",
              "ADMIN",
            ]}
          >
            <HostelDetails />
          </ProtectedRoute>
        }
      />

      {/* STUDENT */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute
            allowedRoles={["STUDENT"]}
          >
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/bookings"
        element={
          <ProtectedRoute
            allowedRoles={["STUDENT"]}
          >
            <MyBookings />
          </ProtectedRoute>
        }
      />

      {/* LANDLORD */}
      <Route
        path="/landlord/dashboard"
        element={
          <ProtectedRoute
            allowedRoles={["LANDLORD"]}
          >
            <LandlordDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/landlord/hostels"
        element={
          <ProtectedRoute
            allowedRoles={["LANDLORD"]}
          >
            <ManageHostels />
          </ProtectedRoute>
        }
      />

      <Route
        path="/landlord/create-hostel"
        element={
          <ProtectedRoute
            allowedRoles={["LANDLORD"]}
          >
            <CreateHostel />
          </ProtectedRoute>
        }
      />

      <Route
        path="/landlord/hostels/:id"
        element={
          <ProtectedRoute
            allowedRoles={["LANDLORD"]}
          >
            <LandlordHostelDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/landlord/hostels/edit/:id"
        element={
          <ProtectedRoute
            allowedRoles={["LANDLORD"]}
          >
            <EditHostel />
          </ProtectedRoute>
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute
            allowedRoles={["ADMIN"]}
          >
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/pending-hostels"
        element={
          <ProtectedRoute
            allowedRoles={["ADMIN"]}
          >
            <PendingHostels />
          </ProtectedRoute>
        }
      />

      {/* FEEDBACK */}
      <Route
        path="/feedback"
        element={<Feedback />}
      />

    </Routes>
  );
}

export default AppRoutes;