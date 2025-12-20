import { useState } from "react";
import {
  Box, Typography, useTheme, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, TextField, InputAdornment, Select, MenuItem,
  FormControl, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid,
  InputLabel, Breadcrumbs, Link, Chip, Avatar,
} from "@mui/material";
import { tokens } from "../../theme";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link as RouterLink } from "react-router-dom";

const initialStudentsData = [
  { id: 1, name: "Rahul Sharma", phone: "9876543210", email: "rahul@email.com", course: "Web Development", batch: "Batch 1 - Morning", status: "active", joinDate: "2025-01-01", photo: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Priya Patel", phone: "9876543211", email: "priya@email.com", course: "Data Science", batch: "Batch 2 - Afternoon", status: "active", joinDate: "2025-01-05", photo: "https://i.pravatar.cc/150?img=5" },
  { id: 3, name: "Amit Kumar", phone: "9876543212", email: "amit@email.com", course: "Mobile App", batch: "Batch 1 - Morning", status: "inactive", joinDate: "2024-12-15", photo: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "Sneha Gupta", phone: "9876543213", email: "sneha@email.com", course: "UI/UX Design", batch: "Batch 3 - Evening", status: "active", joinDate: "2025-01-10", photo: "https://i.pravatar.cc/150?img=9" },
  { id: 5, name: "Vikram Singh", phone: "9876543214", email: "vikram@email.com", course: "Python", batch: "Batch 2 - Afternoon", status: "active", joinDate: "2025-01-08", photo: "https://i.pravatar.cc/150?img=12" },
];

const courseOptions = ["Web Development", "Data Science", "Mobile App", "UI/UX Design", "Python", "Java"];
const batchOptions = ["Batch 1 - Morning", "Batch 2 - Afternoon", "Batch 3 - Evening", "Weekend Batch"];

const Students = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [students, setStudents] = useState(initialStudentsData);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", course: "", batch: "", address: "" });

  const filteredData = students.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.phone.includes(searchQuery) ||
    item.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenDialog = (student = null) => {
    if (student) {
      setEditingStudent(student);
      setFormData({ name: student.name, phone: student.phone, email: student.email, course: student.course, batch: student.batch, address: "" });
    } else {
      setEditingStudent(null);
      setFormData({ name: "", phone: "", email: "", course: "", batch: "", address: "" });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => { setOpenDialog(false); setEditingStudent(null); };

  const handleFormChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (editingStudent) {
      setStudents(prev => prev.map(s => s.id === editingStudent.id ? { ...s, ...formData } : s));
    } else {
      setStudents(prev => [...prev, { id: Math.max(...prev.map(s => s.id)) + 1, ...formData, status: "active", joinDate: new Date().toISOString().split("T")[0], photo: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}` }]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => { if (window.confirm("Delete this student?")) setStudents(prev => prev.filter(s => s.id !== id)); };
  const handleToggleStatus = (id) => { setStudents(prev => prev.map(s => s.id === id ? { ...s, status: s.status === "active" ? "inactive" : "active" } : s)); };

  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : "#f0f4f8", minHeight: "calc(100vh - 70px)" }}>
      <Box mb={3}>
        <Typography variant="h3" sx={{ color: colors.grey[100], fontWeight: 600, mb: 1 }}>Students</Typography>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link component={RouterLink} to="/" sx={{ color: colors.grey[500], textDecoration: "none", "&:hover": { color: "#1565c0" } }}>Home</Link>
          <Typography sx={{ color: "#1565c0", fontWeight: 500 }}>Students</Typography>
        </Breadcrumbs>
      </Box>

      <Box mb={3}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()} sx={{ backgroundColor: "#1976d2", color: "#fff", borderRadius: "8px", px: 3, py: 1, textTransform: "none", fontWeight: 600, "&:hover": { backgroundColor: "#1565c0" } }}>Add New</Button>
      </Box>

      <Paper elevation={0} sx={{ backgroundColor: theme.palette.mode === "dark" ? colors.primary[400] : "#ffffff", borderRadius: "16px", border: "1px solid #e8ecf0" }}>
        <Box sx={{ p: 3, borderBottom: "1px solid #e8ecf0" }}><Typography variant="h4" sx={{ color: "#1976d2", fontWeight: 600 }}>Student List</Typography></Box>
        <Box sx={{ p: 3, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
          <FormControl size="small"><Select value={rowsPerPage} onChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))} sx={{ minWidth: 80, backgroundColor: "#f8fafc", borderRadius: "8px" }}>{[5, 10, 25, 50].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}</Select></FormControl>
          <TextField placeholder="Search..." size="small" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ width: 250, "& .MuiOutlinedInput-root": { backgroundColor: "#f8fafc", borderRadius: "8px" } }} InputProps={{ endAdornment: <InputAdornment position="end"><SearchIcon sx={{ color: colors.grey[500] }} /></InputAdornment> }} />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                {["#", "Action", "Photo", "Name", "Phone", "Course", "Batch", "Status", "Join Date"].map(h => (
                  <TableCell key={h} sx={{ fontWeight: 600, color: colors.grey[200], borderBottom: "1px solid #e8ecf0" }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.slice(0, rowsPerPage).map((row, i) => (
                <TableRow key={row.id} sx={{ "&:hover": { backgroundColor: "#f8fafc" } }}>
                  <TableCell sx={{ color: colors.grey[300], borderBottom: "1px solid #f1f5f9" }}>{i + 1}</TableCell>
                  <TableCell sx={{ borderBottom: "1px solid #f1f5f9" }}>
                    <Box display="flex" gap={0.5}>
                      <IconButton size="small" onClick={() => handleOpenDialog(row)} sx={{ backgroundColor: "#ffc107", color: "#fff", width: 30, height: 30, "&:hover": { backgroundColor: "#ffb300" } }}><EditOutlinedIcon sx={{ fontSize: 16 }} /></IconButton>
                      <IconButton size="small" onClick={() => handleDelete(row.id)} sx={{ backgroundColor: "#f44336", color: "#fff", width: 30, height: 30, "&:hover": { backgroundColor: "#d32f2f" } }}><DeleteOutlinedIcon sx={{ fontSize: 16 }} /></IconButton>
                      <Button size="small" variant="contained" onClick={() => handleToggleStatus(row.id)} sx={{ backgroundColor: row.status === "active" ? "#4caf50" : "#ff9800", color: "#fff", fontSize: "11px", fontWeight: 600, textTransform: "none", px: 1.5, py: 0.5, borderRadius: "6px", "&:hover": { backgroundColor: row.status === "active" ? "#43a047" : "#f57c00" } }}>{row.status === "active" ? "Deactivate" : "Activate"}</Button>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ borderBottom: "1px solid #f1f5f9" }}><Avatar src={row.photo} alt={row.name} sx={{ width: 45, height: 45 }} /></TableCell>
                  <TableCell sx={{ color: colors.grey[200], fontWeight: 500, borderBottom: "1px solid #f1f5f9" }}>{row.name}</TableCell>
                  <TableCell sx={{ color: colors.grey[300], borderBottom: "1px solid #f1f5f9" }}>{row.phone}</TableCell>
                  <TableCell sx={{ color: colors.grey[300], borderBottom: "1px solid #f1f5f9" }}>{row.course}</TableCell>
                  <TableCell sx={{ color: colors.grey[300], borderBottom: "1px solid #f1f5f9" }}>{row.batch}</TableCell>
                  <TableCell sx={{ borderBottom: "1px solid #f1f5f9" }}><Chip label={row.status === "active" ? "Active" : "Inactive"} size="small" sx={{ backgroundColor: row.status === "active" ? "#e8f5e9" : "#f5f5f5", color: row.status === "active" ? "#2e7d32" : "#757575", fontWeight: 600 }} /></TableCell>
                  <TableCell sx={{ color: colors.grey[300], borderBottom: "1px solid #f1f5f9" }}>{row.joinDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ p: 2, borderTop: "1px solid #e8ecf0" }}><Typography sx={{ color: colors.grey[400], fontSize: "14px" }}>Showing 1 to {Math.min(rowsPerPage, filteredData.length)} of {filteredData.length} entries</Typography></Box>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: "16px" } }}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e8ecf0", pb: 2 }}>
          <Typography variant="h5" fontWeight={600}>{editingStudent ? "Edit Student" : "Add New Student"}</Typography>
          <IconButton onClick={handleCloseDialog} size="small"><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12}><TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleFormChange} sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleFormChange} sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleFormChange} sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }} /></Grid>
            <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Course</InputLabel><Select label="Course" name="course" value={formData.course} onChange={handleFormChange} sx={{ borderRadius: "10px" }}>{courseOptions.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}</Select></FormControl></Grid>
            <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Batch</InputLabel><Select label="Batch" name="batch" value={formData.batch} onChange={handleFormChange} sx={{ borderRadius: "10px" }}>{batchOptions.map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}</Select></FormControl></Grid>
            <Grid item xs={12}><TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleFormChange} multiline rows={2} sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }} /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: "1px solid #e8ecf0" }}>
          <Button onClick={handleCloseDialog} variant="outlined" sx={{ borderRadius: "8px", textTransform: "none", px: 3 }}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={!formData.name || !formData.phone} sx={{ backgroundColor: "#1976d2", borderRadius: "8px", textTransform: "none", px: 3, "&:hover": { backgroundColor: "#1565c0" } }}>{editingStudent ? "Update" : "Add Student"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Students;


