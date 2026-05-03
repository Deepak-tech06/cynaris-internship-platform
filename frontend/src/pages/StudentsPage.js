// src/pages/StudentsPage.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Alert,
  InputAdornment,
  Tooltip,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FeedbackIcon from "@mui/icons-material/RateReview";
import PersonIcon from "@mui/icons-material/Person";

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
  maxWidth: 1200,
  margin: "0 auto",
});

const Glass = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(3),
  background: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(8px)",
  boxShadow: "0 8px 30px rgba(10,10,20,0.08)",
  border: "1px solid rgba(255,255,255,0.6)",
}));

const statusColors = {
  assigned: { bg: "#fff3e0", color: "#e65100", label: "Assigned" },
  in_progress: { bg: "#e3f2fd", color: "#1565c0", label: "In Progress" },
  completed: { bg: "#e8f5e9", color: "#2e7d32", label: "Completed" },
};

/* ========================= MAIN ========================= */

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Assign project dialog
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignStudent, setAssignStudent] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [assignLoading, setAssignLoading] = useState(false);
  const [assignMsg, setAssignMsg] = useState({ type: "", text: "" });

  // Feedback dialog
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackAssignment, setFeedbackAssignment] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState("");
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState({ type: "", text: "" });

  /* --- Fetch students --- */
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/api/admin/students");
      setStudents(res.data.students || []);
      setFiltered(res.data.students || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load students.");
    } finally {
      setLoading(false);
    }
  };

  /* --- Search filter --- */
  useEffect(() => {
    if (!search.trim()) {
      setFiltered(students);
    } else {
      const q = search.toLowerCase();
      setFiltered(
        students.filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.email.toLowerCase().includes(q) ||
            (s.tier && s.tier.toLowerCase().includes(q))
        )
      );
    }
  }, [search, students]);

  /* --- Open assign dialog --- */
  const openAssign = async (student) => {
    setAssignStudent(student);
    setAssignOpen(true);
    setAssignMsg({ type: "", text: "" });
    setSelectedProject("");
    try {
      const res = await axiosInstance.get("/api/admin/projects");
      setProjects(res.data.projects || []);
    } catch {
      setProjects([]);
    }
  };

  /* --- Submit assign --- */
  const handleAssign = async () => {
    if (!selectedProject) return;
    setAssignLoading(true);
    setAssignMsg({ type: "", text: "" });
    try {
      await axiosInstance.post("/api/assignments/assign", {
        userId: assignStudent.id,
        projectId: Number(selectedProject),
      });
      setAssignMsg({ type: "success", text: "Project assigned successfully!" });
      fetchStudents();
    } catch (err) {
      setAssignMsg({
        type: "error",
        text: err?.response?.data?.message || "Assignment failed.",
      });
    } finally {
      setAssignLoading(false);
    }
  };

  /* --- Open feedback dialog --- */
  const openFeedback = (student) => {
    const assignment = student.Assignments?.[0];
    if (!assignment) return;
    setFeedbackAssignment(assignment);
    setFeedbackText(assignment.feedback || "");
    setFeedbackStatus(assignment.status || "");
    setFeedbackMsg({ type: "", text: "" });
    setFeedbackOpen(true);
  };

  /* --- Submit feedback --- */
  const handleFeedback = async () => {
    setFeedbackLoading(true);
    setFeedbackMsg({ type: "", text: "" });
    try {
      await axiosInstance.patch("/api/assignments/admin-feedback", {
        assignmentId: feedbackAssignment.id,
        feedback: feedbackText,
        status: feedbackStatus,
      });
      setFeedbackMsg({ type: "success", text: "Feedback submitted!" });
      fetchStudents();
    } catch (err) {
      setFeedbackMsg({
        type: "error",
        text: err?.response?.data?.message || "Failed to submit feedback.",
      });
    } finally {
      setFeedbackLoading(false);
    }
  };

  /* --- Get status info for a student --- */
  const getStudentStatus = (student) => {
    const asgn = student.Assignments?.[0];
    if (!asgn) return null;
    return statusColors[asgn.status] || statusColors.assigned;
  };

  const getProjectName = (student) => {
    const asgn = student.Assignments?.[0];
    if (!asgn || !asgn.Project) return "—";
    return asgn.Project.title;
  };

  return (
    <PageWrapper>
      <Sidebar />
      <ContentWrapper>
        <Navbar />
        <Background sx={{ mt: "80px" }}>
          <Container>
            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 900, color: "#222" }}>
                Students
              </Typography>
              <Chip
                icon={<PersonIcon />}
                label={`${students.length} total`}
                sx={{ fontWeight: 600, bgcolor: "#5A45FF", color: "#fff" }}
              />
            </Box>

            {/* Search */}
            <Glass sx={{ mb: 3 }}>
              <TextField
                fullWidth
                placeholder="Search by name, email, or tier..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#999" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.9)",
                  },
                }}
              />
            </Glass>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {/* Table */}
            <Glass>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Student</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Tier</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Project</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="center">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading
                      ? Array.from({ length: 5 }).map((_, i) => (
                          <TableRow key={i}>
                            {Array.from({ length: 6 }).map((_, j) => (
                              <TableCell key={j}>
                                <Skeleton variant="text" />
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      : filtered.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} align="center">
                              <Typography color="text.secondary" sx={{ py: 3 }}>
                                {search ? "No students match your search" : "No students registered yet"}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ) : (
                          filtered.map((student) => {
                            const statusInfo = getStudentStatus(student);
                            return (
                              <TableRow
                                key={student.id}
                                hover
                                sx={{ "&:hover": { background: "rgba(90,69,255,0.03)" } }}
                              >
                                <TableCell>
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                    <Avatar
                                      sx={{
                                        width: 36,
                                        height: 36,
                                        bgcolor: "#5A45FF",
                                        fontSize: 14,
                                        fontWeight: 700,
                                      }}
                                    >
                                      {student.name?.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <Typography sx={{ fontWeight: 600 }}>{student.name}</Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  <Typography variant="body2" color="text.secondary">
                                    {student.email}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Chip
                                    label={student.tier || "—"}
                                    size="small"
                                    sx={{
                                      fontSize: 12,
                                      fontWeight: 600,
                                      textTransform: "capitalize",
                                    }}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Typography variant="body2">
                                    {getProjectName(student)}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  {statusInfo ? (
                                    <Chip
                                      label={statusInfo.label}
                                      size="small"
                                      sx={{
                                        bgcolor: statusInfo.bg,
                                        color: statusInfo.color,
                                        fontWeight: 600,
                                        fontSize: 12,
                                      }}
                                    />
                                  ) : (
                                    <Chip label="Unassigned" size="small" sx={{ fontSize: 12 }} />
                                  )}
                                </TableCell>
                                <TableCell align="center">
                                  <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
                                    <Tooltip title="Assign Project">
                                      <IconButton
                                        size="small"
                                        onClick={() => openAssign(student)}
                                        sx={{
                                          color: "#5A45FF",
                                          "&:hover": { bgcolor: "rgba(90,69,255,0.1)" },
                                        }}
                                      >
                                        <AssignmentIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Give Feedback">
                                      <span>
                                        <IconButton
                                          size="small"
                                          onClick={() => openFeedback(student)}
                                          disabled={!student.Assignments?.[0]}
                                          sx={{
                                            color: "#e65100",
                                            "&:hover": { bgcolor: "rgba(230,81,0,0.1)" },
                                          }}
                                        >
                                          <FeedbackIcon fontSize="small" />
                                        </IconButton>
                                      </span>
                                    </Tooltip>
                                  </Box>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Glass>
          </Container>
        </Background>
      </ContentWrapper>

      {/* ========= ASSIGN PROJECT DIALOG ========= */}
      <Dialog
        open={assignOpen}
        onClose={() => setAssignOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          Assign Project to {assignStudent?.name}
        </DialogTitle>
        <DialogContent>
          {assignMsg.text && (
            <Alert severity={assignMsg.type} sx={{ mb: 2 }}>
              {assignMsg.text}
            </Alert>
          )}
          <TextField
            select
            fullWidth
            label="Select Project"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            sx={{ mt: 1 }}
          >
            {projects.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.title} {p.Company ? `(${p.Company.name})` : ""}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setAssignOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAssign}
            disabled={!selectedProject || assignLoading}
            sx={{ bgcolor: "#5A45FF", "&:hover": { bgcolor: "#4935dd" } }}
          >
            {assignLoading ? "Assigning..." : "Assign"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ========= FEEDBACK DIALOG ========= */}
      <Dialog
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Give Feedback</DialogTitle>
        <DialogContent>
          {feedbackMsg.text && (
            <Alert severity={feedbackMsg.type} sx={{ mb: 2 }}>
              {feedbackMsg.text}
            </Alert>
          )}
          <TextField
            select
            fullWidth
            label="Update Status"
            value={feedbackStatus}
            onChange={(e) => setFeedbackStatus(e.target.value)}
            sx={{ mt: 1, mb: 2 }}
          >
            <MenuItem value="in_progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Feedback"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Write your feedback for the student..."
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setFeedbackOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleFeedback}
            disabled={feedbackLoading}
            sx={{ bgcolor: "#e65100", "&:hover": { bgcolor: "#bf360c" } }}
          >
            {feedbackLoading ? "Submitting..." : "Submit Feedback"}
          </Button>
        </DialogActions>
      </Dialog>
    </PageWrapper>
  );
}
