// src/pages/VerifyInvitePage.js
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import bgImage from "../assets/Login-bg.jpeg";
import axiosInstance from "../utils/api";

const Background = styled(Box)({
  width: "100vw",
  height: "100vh",
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const GlassCard = styled(Paper)({
  width: 420,
  padding: "26px",
  borderRadius: "12px",
  backdropFilter: "blur(8px)",
  background: "rgba(255,255,255,0.18)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
});

const CustomButton = styled(Button)({
  backgroundColor: "#5A45FF",
  color: "#fff",
  padding: "10px",
  marginTop: "10px",
  fontWeight: 600,
  "&:hover": {
    backgroundColor: "#000",
  },
});

export default function VerifyInvitePage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError("");

    if (!code.trim()) {
      setError("Please enter invite code.");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/invites/verify", {
        code: code.trim(),
      });
      setMessage(res.data.message || "Invite verified successfully");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to verify invite."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <GlassCard elevation={3}>
        <Typography variant="h6" sx={{ fontWeight: "700", mb: 1 }}>
          Verify Invite
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Students can verify their invite code here before registering.
        </Typography>

        <Box component="form" onSubmit={handleVerify}>
          <TextField
            label="Invite Code"
            fullWidth
            value={code}
            onChange={(e) => setCode(e.target.value)}
            sx={{ mb: 2 }}
          />

          {error && <Alert severity="error">{error}</Alert>}

          {message && <Alert severity="success">{message}</Alert>}

          <CustomButton type="submit" fullWidth variant="contained" disabled={loading}>
            {loading ? "Verifying..." : "Verify Code"}
          </CustomButton>
        </Box>
      </GlassCard>
    </Background>
  );
}
