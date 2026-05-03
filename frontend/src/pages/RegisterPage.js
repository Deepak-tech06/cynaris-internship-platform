// src/pages/RegisterPage.js
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/api";
import bgImage from "../assets/Register-bg.png";

/* 🔥 Background */
const Background = styled(Box)({
  width: "100vw",
  height: "100vh",
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
});

/* 🔥 Premium Glass Card */
const GlassCard = styled(Paper)({
  width: 420,
  padding: "40px 38px",
  borderRadius: "20px",
  background: "rgba(255, 255, 255, 0.10)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.25)",
  boxShadow: "0 12px 45px rgba(0,0,0,0.45)",

  animation: "fadeIn 0.9s ease-out",
  "@keyframes fadeIn": {
    "0%": { opacity: 0, transform: "scale(0.95)" },
    "100%": { opacity: 1, transform: "scale(1)" },
  },
});

/* 🔥 Input Fields */
const CustomInput = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    background: "rgba(255,255,255,0.75)",
    borderRadius: "10px",
  },
  "& .MuiInputLabel-root": {
    color: "#333",
    fontWeight: 500,
  },
});

/* 🔥 Premium Button */
const CustomButton = styled(Button)({
  backgroundColor: "#5A45FF",
  padding: "14px",
  marginTop: "18px",
  fontWeight: "bold",
  fontSize: "16px",
  borderRadius: "12px",
  color: "#fff",
  letterSpacing: "0.5px",
  transition: "0.3s ease",

  "&:hover": {
    backgroundColor: "#000",
    color: "#fff",
    transform: "translateY(-3px)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
  },

  "&:disabled": {
    backgroundColor: "#7c6aff",
    color: "#ddd",
  },
});

export default function RegisterPage() {
  const navigate = useNavigate();

  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("admin");
  const [adminSecret, setAdminSecret] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // register handler
  const handleRegister = async () => {
    setErrorMsg("");

    if (!name || !email || !password || !confirm) {
      setErrorMsg("Please fill all fields.");
      return;
    }

    if (password !== confirm) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (role === "admin" && !adminSecret) {
      setErrorMsg("Admin Secret is required for admin registration.");
      return;
    }

    if (role === "student" && !inviteCode) {
      setErrorMsg("Invite code is required for student registration.");
      return;
    }

    setLoading(true);

    try {
      const payload = { name, email, password, role };

      if (role === "admin") {
        payload.admin_secret = adminSecret;
      } else {
        payload.invite_code = inviteCode;
      }

      await axiosInstance.post("/api/auth/register", payload);

      navigate("/login");
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <GlassCard elevation={4}>
        {/* Branding */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "900",
            letterSpacing: "1px",
            color: "#fff",
            textShadow: "0 2px 4px rgba(0,0,0,0.4)",
            mb: 1,
          }}
        >
          AUTHLOG
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 2,
            color: "#eaeaea",
            fontSize: "15px",
            fontWeight: 500,
          }}
        >
          Create your account
        </Typography>

        {/* Role Toggle */}
        <ToggleButtonGroup
          value={role}
          exclusive
          onChange={(e, newRole) => { if (newRole) setRole(newRole); }}
          sx={{ mb: 2, width: "100%", display: "flex" }}
        >
          <ToggleButton
            value="admin"
            sx={{
              flex: 1,
              color: "#fff",
              borderColor: "rgba(255,255,255,0.3)",
              "&.Mui-selected": { bgcolor: "#5A45FF", color: "#fff" },
              "&.Mui-selected:hover": { bgcolor: "#4935dd" },
            }}
          >
            Admin
          </ToggleButton>
          <ToggleButton
            value="student"
            sx={{
              flex: 1,
              color: "#fff",
              borderColor: "rgba(255,255,255,0.3)",
              "&.Mui-selected": { bgcolor: "#5A45FF", color: "#fff" },
              "&.Mui-selected:hover": { bgcolor: "#4935dd" },
            }}
          >
            Student
          </ToggleButton>
        </ToggleButtonGroup>

        {/* Errors */}
        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}

        {/* Inputs */}
        <CustomInput
          label="Full Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />

        <CustomInput
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />

        <CustomInput
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />

        <CustomInput
          label="Confirm Password"
          type="password"
          fullWidth
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Conditional: Admin Secret or Invite Code */}
        {role === "admin" ? (
          <CustomInput
            label="Admin Secret"
            type="password"
            fullWidth
            value={adminSecret}
            onChange={(e) => setAdminSecret(e.target.value)}
            sx={{ mb: 1 }}
          />
        ) : (
          <CustomInput
            label="Invite Code"
            fullWidth
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            sx={{ mb: 1 }}
          />
        )}

        {/* Buttons */}
        <CustomButton fullWidth onClick={handleRegister} disabled={loading}>
          {loading ? "Registering…" : `Register as ${role === "admin" ? "Admin" : "Student"}`}
        </CustomButton>

        {/* Footer Link */}
        <Typography mt={3} sx={{ color: "#f0f0f0" }}>
          Already have an account?{" "}
          <Link href="/login" sx={{ color: "#fff", fontWeight: 600 }}>
            Sign In
          </Link>
        </Typography>
      </GlassCard>
    </Background>
  );
}
