import React, { useState } from "react";
import { Box, Typography, List, ListItemButton } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MailIcon from "@mui/icons-material/Mail";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { label: "Create Invite", icon: <MailIcon />, path: "/create-invite" },
    { label: "Students", icon: <PeopleIcon />, path: "/students" },
    { label: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      sx={{
        width: open ? 220 : 70,
        transition: "0.25s ease",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        background: "linear-gradient(180deg, #24243e, #302b63, #0f0c29)",
        color: "white",
        paddingTop: 3,
        boxShadow: "4px 0 20px rgba(0,0,0,0.3)",
        overflow: "hidden"
      }}
    >
      {/* LOGO */}
      <Box sx={{ display: "flex", alignItems: "center", px: 2, mb: 4 }}>
        <Typography
          sx={{
            fontSize: open ? 24 : 0,
            opacity: open ? 1 : 0,
            transition: "0.3s",
            fontWeight: "bold",
            color: "#6d9dfc",
          }}
        >
          Cynaris
        </Typography>
      </Box>

      {/* MENU */}
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.label}
            onClick={() => navigate(item.path)}
            sx={{
              color: "white",
              py: 1.5,
              px: 2,
              display: "flex",
              gap: 2,
              "&:hover": {
                background: "rgba(255,255,255,0.12)",
              },
            }}
          >
            {item.icon}
            <Typography
              sx={{
                fontSize: open ? 16 : 0,
                opacity: open ? 1 : 0,
                transition: "0.25s",
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </Typography>
          </ListItemButton>
        ))}
      </List>

      {/* LOGOUT AT BOTTOM */}
      <Box sx={{ position: "absolute", bottom: 20, width: "100%" }}>
        <ListItemButton
          onClick={logoutUser}
          sx={{
            color: "#ff6b6b",
            py: 1.5,
            px: 2,
            display: "flex",
            gap: 2,
            "&:hover": {
              background: "rgba(255,0,0,0.12)",
            },
          }}
        >
          <LogoutIcon />
          <Typography
            sx={{
              fontSize: open ? 16 : 0,
              opacity: open ? 1 : 0,
              transition: "0.25s",
              whiteSpace: "nowrap",
            }}
          >
            Logout
          </Typography>
        </ListItemButton>
      </Box>
    </Box>
  );
}
