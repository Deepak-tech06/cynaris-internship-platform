// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // If token missing → go to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
