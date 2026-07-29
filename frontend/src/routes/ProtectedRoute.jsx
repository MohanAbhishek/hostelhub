// src/routes/ProtectedRoute.jsx

import {
  useContext,
} from "react";

import {
  Navigate,
} from "react-router-dom";

import {
  AuthContext,
} from "../context/AuthContext";

function ProtectedRoute({
  children,
  allowedRoles,
}) {

  const {
    user,
    isAuthenticated,
    authLoading,
  } = useContext(AuthContext);

  // WAIT FOR AUTH RESTORATION

  if (authLoading) {

    return (

      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center text-3xl">

        Loading...

      </div>
    );
  }

  // NOT LOGGED IN

  if (!isAuthenticated) {

    return <Navigate to="/login" />;
  }

  // ROLE CHECK

  const role =
    user?.role ||
    user?.authorities?.[0] ||
    "";

  const normalizedRole =
    role.replace("ROLE_", "");

  if (
    allowedRoles &&
    !allowedRoles.includes(normalizedRole)
  ) {

    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;