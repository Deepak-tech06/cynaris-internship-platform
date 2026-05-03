// src/pages/CreateInvitePage.js
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import bgImage from "../assets/Register-bg.png"; // FIXED CASE SENSITIVE
import axiosInstance from "../utils/api"; // FIXED IMPORT

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
  padding: "28px",
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

const tiers = [
  { value: "foundation", label: "Foundation" },
  { value: "premium", label: "Premium" },
  { value: "enterprise", label: "Enterprise" },
];

export default function CreateInvitePage() {
  const [email, setEmail] = useState("");
  const [tier, setTier] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!tier) {
      setError("Please select a tier.");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/invites/create", {
        email,
        tier,
      });

      setResult(res.data.invite || res.data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to create invite. Check logs."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <GlassCard elevation={3}>
        <Typography variant="h6" sx={{ fontWeight: "700", mb: 1 }}>
          Create Invite
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Generate one-time invite codes for students. Email is optional.
        </Typography>

        <Box component="form" onSubmit={handleCreate}>
          <TextField
            label="Email (optional)"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            select
            label="Allowed Tier"
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            required
          >
            {tiers.map((t) => (
              <MenuItem key={t.value} value={t.value}>
                {t.label}
              </MenuItem>
            ))}
          </TextField>

          {error && <Alert severity="error">{error}</Alert>}

          {result && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Invite created — <strong>{result.code}</strong>
              <Box mt={1} fontSize={13}>
                Email: {result.email || "—"} • Tier:{" "}
                {result.tier}
              </Box>
            </Alert>
          )}

          <CustomButton type="submit" variant="contained" fullWidth disabled={loading}>
            {loading ? "Creating..." : "Create Invite"}
          </CustomButton>
        </Box>
      </GlassCard>
    </Background>
  );
}
