import { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  Button,
  Breadcrumbs,
  Link,
  Checkbox,
  Alert,
  Snackbar,
} from "@mui/material";
import { tokens } from "../../theme";
import SearchIcon from "@mui/icons-material/Search";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link as RouterLink } from "react-router-dom";

// Mock data for batches
const batchesData = [
  { id: 1, name: "Batch 1 - Morning (10 AM)" },
  { id: 2, name: "Batch 2 - Afternoon (2 PM)" },
  { id: 3, name: "Batch 3 - Evening (6 PM)" },
  { id: 4, name: "Weekend Batch - Saturday" },
];

// Mock data for students per batch
const studentsData = {
  1: [
    { id: 1, name: "Rahul Sharma", mobile: "9876543210", status: "not_marked" },
    { id: 2, name: "Priya Patel", mobile: "9876543211", status: "not_marked" },
    { id: 3, name: "Amit Kumar", mobile: "9876543212", status: "not_marked" },
    { id: 4, name: "Sneha Gupta", mobile: "9876543213", status: "not_marked" },
    { id: 5, name: "Vikram Singh", mobile: "9876543214", status: "not_marked" },
  ],
  2: [
    { id: 6, name: "Anjali Verma", mobile: "9876543215", status: "not_marked" },
    { id: 7, name: "Rohit Jain", mobile: "9876543216", status: "not_marked" },
    { id: 8, name: "Kavita Rao", mobile: "9876543217", status: "not_marked" },
  ],
  3: [
    { id: 9, name: "Deepak Mishra", mobile: "9876543218", status: "not_marked" },
    { id: 10, name: "Neha Agarwal", mobile: "9876543219", status: "not_marked" },
    { id: 11, name: "Suresh Yadav", mobile: "9876543220", status: "not_marked" },
    { id: 12, name: "Meera Nair", mobile: "9876543221", status: "not_marked" },
  ],
  4: [
    { id: 13, name: "Arjun Reddy", mobile: "9876543222", status: "not_marked" },
    { id: 14, name: "Pooja Sharma", mobile: "9876543223", status: "not_marked" },
  ],
};

const Attendance = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleLoadStudents = () => {
    if (selectedBatch) {
      const batchStudents = studentsData[selectedBatch] || [];
      setStudents(batchStudents.map((s) => ({ ...s, status: "not_marked" })));
      setSelectedStudents([]);
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedStudents(students.map((s) => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleStatusChange = (studentId, newStatus) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, status: newStatus } : student
      )
    );
  };

  const handleMarkNotMarkedAsAbsent = () => {
    setStudents((prev) =>
      prev.map((student) =>
        student.status === "not_marked" ? { ...student, status: "absent" } : student
      )
    );
  };

  const handleSaveAttendance = () => {
    // In real app, this would save to backend
    const attendanceData = {
      batchId: selectedBatch,
      date: attendanceDate,
      attendance: students.map((s) => ({ id: s.id, status: s.status })),
    };
    console.log("Saving attendance:", attendanceData);
    setSnackbar({
      open: true,
      message: "Attendance saved successfully!",
      severity: "success",
    });
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.mobile.includes(searchQuery)
  );

  const getStatusChip = (status, studentId) => {
    const statusConfig = {
      present: { label: "Present", color: "#4caf50", bg: "#e8f5e9" },
      absent: { label: "Absent", color: "#f44336", bg: "#ffebee" },
      late: { label: "Late", color: "#ff9800", bg: "#fff3e0" },
      not_marked: { label: "Not Marked", color: "#9e9e9e", bg: "#f5f5f5" },
    };

    const config = statusConfig[status] || statusConfig.not_marked;

    return (
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <Select
          value={status}
          onChange={(e) => handleStatusChange(studentId, e.target.value)}
          sx={{
            backgroundColor: config.bg,
            color: config.color,
            fontWeight: 600,
            fontSize: "13px",
            borderRadius: "8px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: config.color,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: config.color,
            },
            "& .MuiSelect-select": {
              py: 0.8,
            },
          }}
        >
          <MenuItem value="present">Present</MenuItem>
          <MenuItem value="absent">Absent</MenuItem>
          <MenuItem value="late">Late</MenuItem>
          <MenuItem value="not_marked">Not Marked</MenuItem>
        </Select>
      </FormControl>
    );
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor:
          theme.palette.mode === "dark" ? colors.primary[500] : "#f0f4f8",
        minHeight: "calc(100vh - 70px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header with Breadcrumb */}
      <Box mb={3}>
        <Typography
          variant="h3"
          sx={{
            color:
              theme.palette.mode === "dark" ? colors.grey[100] : colors.grey[100],
            fontWeight: 600,
            mb: 1,
            textDecoration: "underline",
            textDecorationColor: "#1565c0",
            textUnderlineOffset: "4px",
          }}
        >
          Attendance
        </Typography>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{
            "& .MuiBreadcrumbs-separator": {
              color:
                theme.palette.mode === "dark"
                  ? colors.grey[500]
                  : colors.grey[500],
            },
          }}
        >
          <Link
            component={RouterLink}
            to="/"
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? colors.grey[400]
                  : colors.grey[500],
              textDecoration: "none",
              "&:hover": {
                color: "#1565c0",
              },
            }}
          >
            Home
          </Link>
          <Typography
            sx={{
              color: "#1565c0",
              fontWeight: 500,
            }}
          >
            Attendance
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Mark Attendance Card */}
      <Paper
        elevation={0}
        sx={{
          backgroundColor:
            theme.palette.mode === "dark" ? colors.primary[400] : "#ffffff",
          borderRadius: "16px",
          border:
            theme.palette.mode === "dark"
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid #e8ecf0",
          overflow: "hidden",
          flex: 1,
        }}
      >
        {/* Card Header */}
        <Box
          sx={{
            p: 3,
            borderBottom:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid #e8ecf0",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#1976d2",
              fontWeight: 600,
            }}
          >
            Mark Attendance
          </Typography>
        </Box>

        {/* Filters Row */}
        <Box
          sx={{
            p: 3,
            display: "flex",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 3,
            borderBottom:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid #e8ecf0",
          }}
        >
          {/* Select Batch */}
          <Box>
            <Typography
              sx={{
                mb: 1,
                fontWeight: 500,
                color:
                  theme.palette.mode === "dark"
                    ? colors.grey[200]
                    : colors.grey[200],
              }}
            >
              Select Batch
            </Typography>
            <FormControl size="medium" sx={{ minWidth: 280 }}>
              <Select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                displayEmpty
                sx={{
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? colors.primary[500]
                      : "#f8fafc",
                  borderRadius: "10px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.2)"
                        : "#e2e8f0",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1565c0",
                  },
                }}
              >
                <MenuItem value="" disabled>
                  -- Select Batch --
                </MenuItem>
                {batchesData.map((batch) => (
                  <MenuItem key={batch.id} value={batch.id}>
                    {batch.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Attendance Date */}
          <Box>
            <Typography
              sx={{
                mb: 1,
                fontWeight: 500,
                color:
                  theme.palette.mode === "dark"
                    ? colors.grey[200]
                    : colors.grey[200],
              }}
            >
              Attendance Date
            </Typography>
            <TextField
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              sx={{
                minWidth: 200,
                "& .MuiOutlinedInput-root": {
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? colors.primary[500]
                      : "#f8fafc",
                  borderRadius: "10px",
                  "& fieldset": {
                    borderColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.2)"
                        : "#e2e8f0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#1565c0",
                  },
                },
              }}
            />
          </Box>

          {/* Load Students Button */}
          <Button
            variant="contained"
            startIcon={<SearchOutlinedIcon />}
            onClick={handleLoadStudents}
            disabled={!selectedBatch}
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
              borderRadius: "10px",
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "15px",
              boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)",
              "&:hover": {
                backgroundColor: "#1565c0",
                boxShadow: "0 4px 12px rgba(25, 118, 210, 0.4)",
              },
              "&:disabled": {
                backgroundColor: "#90caf9",
                color: "#fff",
              },
            }}
          >
            Load Students
          </Button>
        </Box>

        {/* Students List Section */}
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color:
                  theme.palette.mode === "dark"
                    ? colors.grey[100]
                    : colors.grey[100],
              }}
            >
              Students List
            </Typography>

            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {/* Search */}
              <TextField
                placeholder="Search by name or mobile..."
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  width: 250,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? colors.primary[500]
                        : "#f8fafc",
                    borderRadius: "8px",
                    "& fieldset": {
                      borderColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.2)"
                          : "#e2e8f0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#1565c0",
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? colors.grey[500]
                              : colors.grey[600],
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Not Marked → Absent Button */}
              <Button
                variant="contained"
                onClick={handleMarkNotMarkedAsAbsent}
                disabled={students.length === 0}
                sx={{
                  backgroundColor: "#ffc107",
                  color: "#000",
                  borderRadius: "8px",
                  px: 2,
                  py: 1,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "13px",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "#ffb300",
                  },
                  "&:disabled": {
                    backgroundColor: "#fff3cd",
                    color: "#666",
                  },
                }}
              >
                Not Marked → Absent
              </Button>
            </Box>
          </Box>

          {/* Table */}
          <TableContainer
            sx={{
              border:
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid #e8ecf0",
              borderRadius: "12px",
            }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? colors.primary[500]
                        : "#f8fafc",
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selectedStudents.length > 0 &&
                        selectedStudents.length < students.length
                      }
                      checked={
                        students.length > 0 &&
                        selectedStudents.length === students.length
                      }
                      onChange={handleSelectAll}
                      disabled={students.length === 0}
                    />
                  </TableCell>
                  {["Student Name", "Mobile", "Status"].map((header) => (
                    <TableCell
                      key={header}
                      sx={{
                        fontWeight: 600,
                        color:
                          theme.palette.mode === "dark"
                            ? colors.grey[200]
                            : colors.grey[200],
                        borderBottom:
                          theme.palette.mode === "dark"
                            ? "1px solid rgba(255,255,255,0.1)"
                            : "1px solid #e8ecf0",
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow
                      key={student.id}
                      sx={{
                        "&:hover": {
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? "rgba(255,255,255,0.05)"
                              : "#f8fafc",
                        },
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => handleSelectStudent(student.id)}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? colors.grey[200]
                              : colors.grey[200],
                          fontWeight: 500,
                          borderBottom:
                            theme.palette.mode === "dark"
                              ? "1px solid rgba(255,255,255,0.05)"
                              : "1px solid #f1f5f9",
                        }}
                      >
                        {student.name}
                      </TableCell>
                      <TableCell
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? colors.grey[300]
                              : colors.grey[300],
                          borderBottom:
                            theme.palette.mode === "dark"
                              ? "1px solid rgba(255,255,255,0.05)"
                              : "1px solid #f1f5f9",
                        }}
                      >
                        {student.mobile}
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom:
                            theme.palette.mode === "dark"
                              ? "1px solid rgba(255,255,255,0.05)"
                              : "1px solid #f1f5f9",
                        }}
                      >
                        {getStatusChip(student.status, student.id)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      sx={{
                        textAlign: "center",
                        py: 4,
                        color:
                          theme.palette.mode === "dark"
                            ? colors.grey[400]
                            : colors.grey[500],
                      }}
                    >
                      {students.length === 0
                        ? "Select a batch to view students"
                        : "No students found matching your search"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Footer Actions */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 3,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <InfoOutlinedIcon sx={{ color: "#1976d2", fontSize: 20 }} />
              <Typography
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? colors.grey[300]
                      : colors.grey[400],
                  fontSize: "14px",
                }}
              >
                Make sure to{" "}
                <Typography
                  component="span"
                  sx={{ color: "#f44336", fontWeight: 600 }}
                >
                  save attendance
                </Typography>{" "}
                after every change.
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<CheckCircleOutlineIcon />}
              onClick={handleSaveAttendance}
              disabled={students.length === 0}
              sx={{
                backgroundColor: "#4caf50",
                color: "#fff",
                borderRadius: "10px",
                px: 3,
                py: 1.2,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "15px",
                boxShadow: "0 2px 8px rgba(76, 175, 80, 0.3)",
                "&:hover": {
                  backgroundColor: "#43a047",
                  boxShadow: "0 4px 12px rgba(76, 175, 80, 0.4)",
                },
                "&:disabled": {
                  backgroundColor: "#a5d6a7",
                  color: "#fff",
                },
              }}
            >
              Save Attendance
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Footer */}
      <Box
        sx={{
          mt: 3,
          textAlign: "center",
          py: 2,
        }}
      >
        <Typography
          sx={{
            color:
              theme.palette.mode === "dark" ? colors.grey[400] : colors.grey[500],
            fontSize: "14px",
          }}
        >
          © Copyright - 2025 ,All Rights Reserved - Local Institute
        </Typography>
        <Typography
          sx={{
            color:
              theme.palette.mode === "dark" ? colors.grey[400] : colors.grey[500],
            fontSize: "14px",
          }}
        >
          Designed by{" "}
          <Link
            href="#"
            sx={{
              color: "#1565c0",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            eshuzo
          </Link>
        </Typography>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Attendance;

