import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/api";
import bgImage from "../assets/Login-bg.jpeg";

/* 🔥 Fullscreen Background With Smooth Overlay */
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
  position: "relative",
});

/* 🔥 Glass Card (Upgraded) */
const GlassCard = styled(Paper)({
  width: 390,
  padding: "40px 36px",
  borderRadius: "20px",
  background: "rgba(255, 255, 255, 0.08)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.25)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
  animation: "fadeIn 0.9s ease-out",
  "@keyframes fadeIn": {
    "0%": { opacity: 0, transform: "scale(0.95)" },
    "100%": { opacity: 1, transform: "scale(1)" },
  },
});

/* 🔥 Inputs */
const CustomInput = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    background: "rgba(255,255,255,0.6)",
    borderRadius: "10px",
  },
  "& .MuiInputLabel-root": {
    color: "#333",
    fontWeight: 500,
  },
});

/* 🔥 Upgraded Button */
const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: "13px",
  marginTop: "16px",
  fontWeight: "bold",
  fontSize: "17px",
  borderRadius: "12px",
  color: "#fff",
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
}));

/* ------------------------------------------------------------- */

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // LOGIN HANDLER
  const handleLogin = async () => {
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setErrorMsg(
        err?.response?.data?.message || "Invalid credentials. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <GlassCard elevation={4}>
        {/* 🔥 Branding */}
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
            mb: 3,
            color: "#eaeaea",
            fontSize: "15px",
            fontWeight: 500,
          }}
        >
          Welcome back — Please sign in
        </Typography>

        {/* 🔥 Error */}
        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}

        {/* 🔥 Inputs */}
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
        />

        {/* Forgot / Remember */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "13px",
            mt: 1,
            mb: 1,
          }}
        >
          <Link sx={{ color: "#e0e0e0", cursor: "pointer" }}>Remember me</Link>
          <Link sx={{ color: "#e0e0e0", cursor: "pointer" }}>
            Forgot password?
          </Link>
        </Box>

        {/* 🔥 Button */}
        <CustomButton fullWidth onClick={handleLogin} disabled={loading}>
          {loading ? "Signing in…" : "SIGN IN"}
        </CustomButton>

        {/* Signup */}
        <Typography mt={3} sx={{ color: "#f0f0f0" }}>
          Don’t have an account?{" "}
          <Link href="/register" sx={{ color: "#fff", fontWeight: 600 }}>
            Sign Up
          </Link>
        </Typography>
      </GlassCard>
    </Background>
  );
}
