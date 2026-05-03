// src/components/Navbar.js
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box, Badge, IconButton, Popover, List, ListItem, ListItemText, Divider } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { io } from "socket.io-client";

export default function Navbar() {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    let userId = null;
    if(userStr) {
      try { 
        const u = JSON.parse(userStr);
        userId = u.id; 
        setUserName(u.name || "User");
      } catch(e){}
    }

    const socketUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.replace('/api', '') : 'http://localhost:5000';
    const socket = io(socketUrl, {
      withCredentials: true,
    });

    socket.on("connect", () => {
      if(userId) {
        socket.emit("join", userId);
      }
    });

    socket.on("notification_received", (notif) => {
      setNotifications(prev => [notif, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    // Optimistically mark all as read
    setNotifications(prev => prev.map(n => ({...n, isRead: true})));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <AppBar
      position="fixed"
      sx={{
        left: "70px",
        width: "calc(100% - 70px)",
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(12px)",
        color: "#222",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "0.25s ease",
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Dashboard
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton color="inherit" onClick={handleOpen} sx={{ mr: 2 }}>
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <Typography sx={{ fontWeight: 600 }}>{userName}</Typography>
      </Toolbar>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ width: 300, maxHeight: 400, overflowY: 'auto' }}>
          <Typography variant="subtitle1" sx={{ p: 2, fontWeight: 'bold' }}>Notifications</Typography>
          <Divider />
          <List>
            {notifications.length === 0 ? (
              <ListItem><ListItemText primary="No new notifications" /></ListItem>
            ) : (
              notifications.map((n, i) => (
                <ListItem key={i} divider>
                  <ListItemText primary={n.message} />
                </ListItem>
              ))
            )}
          </List>
        </Box>
      </Popover>
    </AppBar>
  );
}
