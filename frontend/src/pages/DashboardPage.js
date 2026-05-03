// src/pages/DashboardPage.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import PersonIcon from "@mui/icons-material/Person";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import axiosInstance from "../utils/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AdminCharts from "../components/AdminCharts";
import KanbanBoard from "../components/KanbanBoard";

/* ---------------- MOCK ---------------- */
const mock = {
  totalStudents: 128,
  totalInvites: 250,
  usedInvites: 172,
  activeUsers: 76,
  weeklyRegistrations: [5, 8, 12, 9, 16, 4, 7],
  profile: {
    name: "Admin",
    role: "admin",
    totalStudents: 128,
    pendingInvites: 22,
    joinedThisWeek: 16,
  },
  tasks: [
    { title: "Verify new student list", time: "Today • 10:00", done: true },
    { title: "Send invites batch #34", time: "Today • 12:00", done: false },
    { title: "Review registrations", time: "Tomorrow • 11:00", done: false },
  ],
  todaysWorkMinutes: 155,
};

/* ---------------- STYLES ---------------- */

const PageWrapper = styled("div")({
  display: "flex",
  width: "100%",
});

const ContentWrapper = styled("div")({
  width: "100%",
  marginLeft: "70px", // collapsed sidebar width
  transition: "0.25s ease",
});

const Background = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(4),
  background: "linear-gradient(135deg, #f3f6ff 0%, #fff6e6 60%)",
}));

const Container = styled("div")({
  maxWidth: 1200,
  margin: "0 auto",
});

const Glass = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(2.5),
  background: "rgba(255,255,255,0.65)",
  backdropFilter: "blur(8px)",
  boxShadow: "0 8px 30px rgba(10,10,20,0.08)",
  border: "1px solid rgba(255,255,255,0.6)",
}));



/* ---------------- COMPONENTS ---------------- */

const StatCard = ({ label, value, icon }) => (
  <Glass elevation={0} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    <Avatar sx={{ bgcolor: "#5A45FF", width: 54, height: 54 }}>{icon}</Avatar>
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
  </Glass>
);

const ProfileCard = ({ user }) => (
  <Glass elevation={0} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Avatar sx={{ width: 80, height: 80 }} />
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.role}
        </Typography>
      </Box>
    </Box>

    <Divider />

    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
      <Chip icon={<PersonIcon />} label={`Students: ${user.totalStudents}`} />
      <Chip icon={<MailOutlineIcon />} label={`Pending: ${user.pendingInvites}`} />
      <Chip label={`Joined: ${user.joinedThisWeek}`} />
    </Box>

    <Button variant="contained" sx={{ mt: 1, backgroundColor: "#5A45FF" }}>
      View students
    </Button>
  </Glass>
);

function CircleTimer({ percent, timeLabel }) {
  const r = 40;
  const c = 2 * Math.PI * r;
  const dash = (percent / 100) * c;

  return (
    <Box sx={{ textAlign: "center" }}>
      <svg width="110" height="110" viewBox="0 0 110 110">
        <g transform="translate(55,55)">
          <circle r={r} stroke="#eee" strokeWidth="10" fill="none" />
          <circle
            r={r}
            stroke="#f8c84b"
            strokeWidth="10"
            fill="none"
            strokeDasharray={`${dash} ${c - dash}`}
            strokeLinecap="round"
            transform="rotate(-90)"
          />
        </g>
      </svg>
      <Typography variant="h6" sx={{ mt: -2, fontWeight: 700 }}>
        {timeLabel}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Work Time
      </Typography>
    </Box>
  );
}

const TaskItem = ({ task }) => (
  <ListItem sx={{ py: 0.5 }}>
    <ListItemIcon>
      {task.done ? (
        <CheckCircleOutlineIcon color="success" />
      ) : (
        <FiberManualRecordIcon sx={{ fontSize: 12, color: "#999" }} />
      )}
    </ListItemIcon>
    <ListItemText
      primary={<Typography sx={{ fontWeight: 600 }}>{task.title}</Typography>}
      secondary={<Typography variant="caption">{task.time}</Typography>}
    />
  </ListItem>
);

/* ---------------- MAIN ---------------- */

export default function DashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get("/api/admin/dashboard");
        setStats(res.data);
      } catch (e) {
        setStats(mock);
      }
    })();
  }, []);

  const data = stats || mock;
  const workPercent = Math.round(
    (data.todaysWorkMinutes / (8 * 60)) * 100
  );

  const timeLabel = `${Math.floor(data.todaysWorkMinutes / 60)}h ${
    data.todaysWorkMinutes % 60
  }m`;

  return (
    <PageWrapper>
      <Sidebar />

      <ContentWrapper>
        <Navbar />

        <Background sx={{ mt: "80px" }}>
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 900, mb: 2, color: "#222" }}
                >
                  Welcome back, {data.profile.name}
                </Typography>
              </Grid>

              <Grid item xs={12} md={8}>
                {data.profile.role === "student" ? (
                  <Glass sx={{ height: '100%' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                      My Project Status
                    </Typography>
                    <KanbanBoard />
                  </Glass>
                ) : (
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={3}>
                      <StatCard
                        label="Total Students"
                        value={data.totalStudents}
                        icon={<PersonIcon />}
                      />
                    </Grid>

                    <Grid item xs={6} md={3}>
                      <StatCard
                        label="Invites"
                        value={data.totalInvites}
                        icon={<MailOutlineIcon />}
                      />
                    </Grid>

                    <Grid item xs={6} md={3}>
                      <StatCard
                        label="Used Invites"
                        value={data.usedInvites}
                        icon={<CheckCircleOutlineIcon />}
                      />
                    </Grid>

                    <Grid item xs={6} md={3}>
                      <StatCard
                        label="Active Users"
                        value={data.activeUsers}
                        icon={<PersonIcon />}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Glass>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                          Weekly registrations
                        </Typography>

                        <AdminCharts data={data.weeklyRegistrations} />
                      </Glass>
                    </Grid>
                  </Grid>
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <ProfileCard user={data.profile} />
                  </Grid>

                  <Grid item xs={12}>
                    <Glass sx={{ textAlign: "center" }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        Work time today
                      </Typography>

                      <CircleTimer percent={workPercent} timeLabel={timeLabel} />
                    </Glass>
                  </Grid>

                  <Grid item xs={12}>
                    <Glass>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        Onboarding tasks
                      </Typography>

                      <List dense>
                        {data.tasks.map((t, i) => (
                          <TaskItem key={i} task={t} />
                        ))}
                      </List>

                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, backgroundColor: "#5A45FF" }}
                      >
                        Open tasks
                      </Button>
                    </Glass>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Background>
      </ContentWrapper>
    </PageWrapper>
  );
}
