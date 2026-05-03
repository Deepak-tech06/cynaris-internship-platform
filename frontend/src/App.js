import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CreateInvitePage from "./pages/CreateInvitePage";
import VerifyInvitePage from "./pages/VerifyInvitePage";
import StudentsPage from "./pages/StudentsPage";
import SettingsPage from "./pages/SettingsPage";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import "./App.css";

// =========================
// Layout Wrapper
// =========================
function AppLayout() {
  const location = useLocation();

  // Hide navbar on specific routes (pages that have their own navbar)
  const hideNavbarRoutes = ["/login", "/register", "/verify-invite", "/dashboard", "/students", "/settings", "/create-invite"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-invite" element={<VerifyInvitePage />} />

        {/* Protected Pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-invite"
          element={
            <ProtectedRoute>
              <CreateInvitePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <StudentsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        {/* If nothing matches → send to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

// =========================
// Main Wrapper
// =========================
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ThemeProvider>
  );
}
