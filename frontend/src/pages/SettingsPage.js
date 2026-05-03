// src/pages/SettingsPage.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  Divider,
  Alert,
  Chip,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import BadgeIcon from "@mui/icons-material/Badge";
import SaveIcon from "@mui/icons-material/Save";

import axiosInstance from "../utils/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

/* ========================= STYLES ========================= */

const PageWrapper = styled("div")({
  display: "flex",
  width: "100%",
});

const ContentWrapper = styled("div")({
  width: "100%",
  marginLeft: "70px",
  transition: "0.25s ease",
});

const Background = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(4),
  background: "linear-gradient(135deg, #f3f6ff 0%, #fff6e6 60%)",
}));

const Container = styled("div")({
  maxWidth: 800,
  margin: "0 auto",
});

const Glass = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(4),
  background: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(8px)",
  boxShadow: "0 8px 30px rgba(10,10,20,0.08)",
  border: "1px solid rgba(255,255,255,0.6)",
}));

const SectionTitle = styled(Typography)({
  fontWeight: 800,
  fontSize: 18,
  marginBottom: 16,
  display: "flex",
  alignItems: "center",
  gap: 8,
});

const StyledButton = styled(Button)({
  borderRadius: 10,
  padding: "10px 28px",
  fontWeight: 600,
  textTransform: "none",
  fontSize: 15,
});

/* ========================= MAIN ========================= */

export default function SettingsPage() {
  // Profile state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [tier, setTier] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMsg, setProfileMsg] = useState({ type: "", text: "" });

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState({ type: "", text: "" });

  /* --- Load user data --- */
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axiosInstance.get("/api/auth/me");
        const u = res.data.user;
        setName(u.name);
        setEmail(u.email);
        setRole(u.role);
        setTier(u.tier || "");
      } catch {
        // Fallback to localStorage
        try {
          const u = JSON.parse(localStorage.getItem("user"));
          if (u) {
            setName(u.name || "");
            setEmail(u.email || "");
            setRole(u.role || "");
            setTier(u.tier || "");
          }
        } catch {}
      }
    };
    loadUser();
  }, []);

  /* --- Update profile --- */
  const handleProfileSave = async () => {
    setProfileLoading(true);
    setProfileMsg({ type: "", text: "" });
    try {
      const res = await axiosInstance.patch("/api/auth/profile", { name, email });
      // Update localStorage
      const updatedUser = res.data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setProfileMsg({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      setProfileMsg({
        type: "error",
        text: err?.response?.data?.message || err?.response?.data?.errors?.[0] || "Failed to update profile.",
      });
    } finally {
      setProfileLoading(false);
    }
  };

  /* --- Change password --- */
  const handlePasswordChange = async () => {
    setPasswordMsg({ type: "", text: "" });

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMsg({ type: "error", text: "Please fill all password fields." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "New passwords do not match." });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMsg({ type: "error", text: "New password must be at least 6 characters." });
      return;
    }

    setPasswordLoading(true);
    try {
      await axiosInstance.patch("/api/auth/password", {
        currentPassword,
        newPassword,
      });
      setPasswordMsg({ type: "success", text: "Password changed successfully!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordMsg({
        type: "error",
        text: err?.response?.data?.message || err?.response?.data?.errors?.[0] || "Failed to change password.",
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Sidebar />
      <ContentWrapper>
        <Navbar />
        <Background sx={{ mt: "80px" }}>
          <Container>
            {/* Header */}
            <Typography variant="h4" sx={{ fontWeight: 900, color: "#222", mb: 4 }}>
              Settings
            </Typography>

            {/* ===== PROFILE CARD ===== */}
            <Glass sx={{ mb: 3 }}>
              {/* Avatar + Info Header */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
                <Avatar
                  sx={{
                    width: 72,
                    height: 72,
                    bgcolor: "#5A45FF",
                    fontSize: 28,
                    fontWeight: 700,
                  }}
                >
                  {name?.charAt(0)?.toUpperCase() || "U"}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {name || "User"}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
                    <Chip
                      label={role}
                      size="small"
                      sx={{
                        bgcolor: role === "admin" ? "#5A45FF" : "#1565c0",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: 12,
                        textTransform: "capitalize",
                      }}
                    />
                    {tier && (
                      <Chip
                        label={tier}
                        size="small"
                        sx={{ fontWeight: 600, fontSize: 12, textTransform: "capitalize" }}
                      />
                    )}
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <SectionTitle>
                <PersonIcon sx={{ color: "#5A45FF" }} /> Profile Information
              </SectionTitle>

              {profileMsg.text && (
                <Alert severity={profileMsg.type} sx={{ mb: 2 }}>
                  {profileMsg.text}
                </Alert>
              )}

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BadgeIcon sx={{ color: "#999" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: "#999" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 2.5, display: "flex", justifyContent: "flex-end" }}>
                <StyledButton
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleProfileSave}
                  disabled={profileLoading}
                  sx={{ bgcolor: "#5A45FF", "&:hover": { bgcolor: "#4935dd" } }}
                >
                  {profileLoading ? "Saving..." : "Save Changes"}
                </StyledButton>
              </Box>
            </Glass>

            {/* ===== PASSWORD CARD ===== */}
            <Glass>
              <SectionTitle>
                <LockIcon sx={{ color: "#e65100" }} /> Change Password
              </SectionTitle>

              {passwordMsg.text && (
                <Alert severity={passwordMsg.type} sx={{ mb: 2 }}>
                  {passwordMsg.text}
                </Alert>
              )}

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: "#999" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowCurrent(!showCurrent)} edge="end" size="small">
                            {showCurrent ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="New Password"
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: "#999" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowNew(!showNew)} edge="end" size="small">
                            {showNew ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: "#999" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 2.5, display: "flex", justifyContent: "flex-end" }}>
                <StyledButton
                  variant="contained"
                  onClick={handlePasswordChange}
                  disabled={passwordLoading}
                  sx={{ bgcolor: "#e65100", "&:hover": { bgcolor: "#bf360c" } }}
                >
                  {passwordLoading ? "Changing..." : "Change Password"}
                </StyledButton>
              </Box>
            </Glass>
          </Container>
        </Background>
      </ContentWrapper>
    </PageWrapper>
  );
}
