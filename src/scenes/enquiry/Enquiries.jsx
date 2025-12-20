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
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { Link as RouterLink } from "react-router-dom";

const initialEnquiriesData = [
  { id: 1, name: "Rahul Sharma", phone: "9876543210", email: "rahul@email.com", course: "Web Development", source: "Website", status: "new", date: "2025-01-15" },
  { id: 2, name: "Priya Patel", phone: "9876543211", email: "priya@email.com", course: "Data Science", source: "Facebook", status: "contacted", date: "2025-01-14" },
  { id: 3, name: "Amit Kumar", phone: "9876543212", email: "amit@email.com", course: "Mobile App", source: "Referral", status: "interested", date: "2025-01-13" },
  { id: 4, name: "Sneha Gupta", phone: "9876543213", email: "sneha@email.com", course: "UI/UX Design", source: "Google", status: "converted", date: "2025-01-12" },
  { id: 5, name: "Vikram Singh", phone: "9876543214", email: "vikram@email.com", course: "Python", source: "Instagram", status: "lost", date: "2025-01-11" },
];

const courseOptions = ["Web Development", "Data Science", "Mobile App", "UI/UX Design", "Python", "Java", "Digital Marketing"];
const sourceOptions = ["Website", "Facebook", "Google", "Instagram", "Referral", "Walk-in", "Phone"];
const statusOptions = ["new", "contacted", "interested", "converted", "lost"];

const Enquiries = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [enquiries, setEnquiries] = useState(initialEnquiriesData);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingEnquiry, setEditingEnquiry] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", course: "", source: "", notes: "" });

  const filteredData = enquiries.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.phone.includes(searchQuery) ||
    item.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenDialog = (enquiry = null) => {
    if (enquiry) {
      setEditingEnquiry(enquiry);
      setFormData({ name: enquiry.name, phone: enquiry.phone, email: enquiry.email, course: enquiry.course, source: enquiry.source, notes: "" });
    } else {
      setEditingEnquiry(null);
      setFormData({ name: "", phone: "", email: "", course: "", source: "", notes: "" });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => { setOpenDialog(false); setEditingEnquiry(null); };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (editingEnquiry) {
      setEnquiries(prev => prev.map(e => e.id === editingEnquiry.id ? { ...e, ...formData } : e));
    } else {
      setEnquiries(prev => [...prev, { id: Math.max(...prev.map(e => e.id)) + 1, ...formData, status: "new", date: new Date().toISOString().split("T")[0] }]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => { if (window.confirm("Delete this enquiry?")) setEnquiries(prev => prev.filter(e => e.id !== id)); };

  const handleStatusChange = (id, status) => { setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e)); };

  const getStatusChip = (status) => {
    const config = { new: { bg: "#e3f2fd", color: "#1565c0" }, contacted: { bg: "#fff3e0", color: "#e65100" }, interested: { bg: "#e8f5e9", color: "#2e7d32" }, converted: { bg: "#e8f5e9", color: "#1b5e20" }, lost: { bg: "#ffebee", color: "#c62828" } };
    const { bg, color } = config[status] || config.new;
    return <Chip label={status.charAt(0).toUpperCase() + status.slice(1)} size="small" sx={{ backgroundColor: bg, color, fontWeight: 600, fontSize: "12px" }} />;
  };

  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : "#f0f4f8", minHeight: "calc(100vh - 70px)" }}>
      <Box mb={3}>
        <Typography variant="h3" sx={{ color: colors.grey[100], fontWeight: 600, mb: 1 }}>All Enquiries</Typography>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link component={RouterLink} to="/" sx={{ color: colors.grey[500], textDecoration: "none", "&:hover": { color: "#1565c0" } }}>Home</Link>
          <Typography sx={{ color: "#1565c0", fontWeight: 500 }}>All Enquiries</Typography>
        </Breadcrumbs>
      </Box>

      <Box mb={3}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()} sx={{ backgroundColor: "#1976d2", color: "#fff", borderRadius: "8px", px: 3, py: 1, textTransform: "none", fontWeight: 600, "&:hover": { backgroundColor: "#1565c0" } }}>Add New</Button>
      </Box>

      <Paper elevation={0} sx={{ backgroundColor: theme.palette.mode === "dark" ? colors.primary[400] : "#ffffff", borderRadius: "16px", border: theme.palette.mode === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e8ecf0" }}>
        <Box sx={{ p: 3, borderBottom: "1px solid #e8ecf0" }}>
          <Typography variant="h4" sx={{ color: "#1976d2", fontWeight: 600 }}>Enquiry List</Typography>
        </Box>

        <Box sx={{ p: 3, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
          <FormControl size="small">
            <Select value={rowsPerPage} onChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))} sx={{ minWidth: 80, backgroundColor: "#f8fafc", borderRadius: "8px" }}>
              {[5, 10, 25, 50].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField placeholder="Search..." size="small" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ width: 250, "& .MuiOutlinedInput-root": { backgroundColor: "#f8fafc", borderRadius: "8px" } }} InputProps={{ endAdornment: <InputAdornment position="end"><SearchIcon sx={{ color: colors.grey[500] }} /></InputAdornment> }} />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                {["#", "Action", "Name", "Phone", "Email", "Course", "Source", "Status", "Date"].map(h => (
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
                      <IconButton size="small" component="a" href={`tel:${row.phone}`} sx={{ backgroundColor: "#4caf50", color: "#fff", width: 30, height: 30, "&:hover": { backgroundColor: "#43a047" } }}><PhoneOutlinedIcon sx={{ fontSize: 16 }} /></IconButton>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: colors.grey[200], fontWeight: 500, borderBottom: "1px solid #f1f5f9" }}>{row.name}</TableCell>
                  <TableCell sx={{ color: colors.grey[300], borderBottom: "1px solid #f1f5f9" }}>{row.phone}</TableCell>
                  <TableCell sx={{ color: colors.grey[300], borderBottom: "1px solid #f1f5f9" }}>{row.email}</TableCell>
                  <TableCell sx={{ color: colors.grey[300], borderBottom: "1px solid #f1f5f9" }}>{row.course}</TableCell>
                  <TableCell sx={{ color: colors.grey[300], borderBottom: "1px solid #f1f5f9" }}>{row.source}</TableCell>
                  <TableCell sx={{ borderBottom: "1px solid #f1f5f9" }}>
                    <FormControl size="small" sx={{ minWidth: 110 }}>
                      <Select value={row.status} onChange={(e) => handleStatusChange(row.id, e.target.value)} sx={{ fontSize: "12px", borderRadius: "8px" }}>
                        {statusOptions.map(s => <MenuItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell sx={{ color: colors.grey[300], borderBottom: "1px solid #f1f5f9" }}>{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ p: 2, borderTop: "1px solid #e8ecf0" }}>
          <Typography sx={{ color: colors.grey[400], fontSize: "14px" }}>Showing 1 to {Math.min(rowsPerPage, filteredData.length)} of {filteredData.length} entries</Typography>
        </Box>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: "16px" } }}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e8ecf0", pb: 2 }}>
          <Typography variant="h5" fontWeight={600}>{editingEnquiry ? "Edit Enquiry" : "Add New Enquiry"}</Typography>
          <IconButton onClick={handleCloseDialog} size="small"><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12}><TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleFormChange} sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleFormChange} sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleFormChange} sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }} /></Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth><InputLabel>Course</InputLabel><Select label="Course" name="course" value={formData.course} onChange={handleFormChange} sx={{ borderRadius: "10px" }}>{courseOptions.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}</Select></FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth><InputLabel>Source</InputLabel><Select label="Source" name="source" value={formData.source} onChange={handleFormChange} sx={{ borderRadius: "10px" }}>{sourceOptions.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}</Select></FormControl>
            </Grid>
            <Grid item xs={12}><TextField fullWidth label="Notes" name="notes" value={formData.notes} onChange={handleFormChange} multiline rows={3} sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }} /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: "1px solid #e8ecf0" }}>
          <Button onClick={handleCloseDialog} variant="outlined" sx={{ borderRadius: "8px", textTransform: "none", px: 3 }}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={!formData.name || !formData.phone} sx={{ backgroundColor: "#1976d2", borderRadius: "8px", textTransform: "none", px: 3, "&:hover": { backgroundColor: "#1565c0" } }}>{editingEnquiry ? "Update" : "Add Enquiry"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Enquiries;


