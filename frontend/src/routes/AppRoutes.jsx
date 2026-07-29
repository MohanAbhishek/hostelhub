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
import VerifyOtp from "../pages/auth/VerifyOtp";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

function AppRoutes() {

  return (

    <Routes>
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
  path="/student/bookings"
  element={
    <ProtectedRoute
      allowedRoles={["STUDENT"]}
    >
      <MyBookings />
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
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />
<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/reset-password"
  element={<ResetPassword />}
/>
      <Route
        path="/register"
        element={<Register />}
      />
<Route
  path="/verify-otp"
  element={<VerifyOtp />}
/>
      <Route
        path="/feedback"
        element={<Feedback />}
      />

      <Route
path="/landlord/hostels/:id"
element={
<ProtectedRoute allowedRoles={["LANDLORD"]}>
<LandlordHostelDetails />
</ProtectedRoute>
}
/>
<Route
path="/landlord/hostels/edit/:id"
element={
<ProtectedRoute allowedRoles={["LANDLORD"]}>
<EditHostel />
</ProtectedRoute>
}
/>


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
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <PendingHostels />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default AppRoutes;