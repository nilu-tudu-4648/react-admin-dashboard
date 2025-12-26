import { useState } from "react";
import {
  Box, Typography, useTheme, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, TextField, InputAdornment, Select, MenuItem,
  FormControl, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid,
  InputLabel, Breadcrumbs, Link, Chip,
} from "@mui/material";
import { tokens } from "../../theme";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import { Link as RouterLink } from "react-router-dom";

const initialFeesData = [
  { id: 1, student: "Rahul Sharma", course: "Web Development", totalFee: 25000, paidAmount: 25000, pendingAmount: 0, status: "paid", lastPayment: "2025-01-10" },
  { id: 2, student: "Priya Patel", course: "Data Science", totalFee: 30000, paidAmount: 15000, pendingAmount: 15000, status: "partial", lastPayment: "2025-01-05" },
  { id: 3, student: "Amit Kumar", course: "Mobile App", totalFee: 28000, paidAmount: 0, pendingAmount: 28000, status: "pending", lastPayment: "-" },
  { id: 4, student: "Sneha Gupta", course: "UI/UX Design", totalFee: 22000, paidAmount: 22000, pendingAmount: 0, status: "paid", lastPayment: "2025-01-12" },
  { id: 5, student: "Vikram Singh", course: "Python", totalFee: 20000, paidAmount: 10000, pendingAmount: 10000, status: "partial", lastPayment: "2025-01-08" },
];

const Fees = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [fees, setFees] = useState(initialFeesData);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingFee, setEditingFee] = useState(null);
  const [formData, setFormData] = useState({ student: "", course: "", totalFee: "", paidAmount: "", paymentMode: "", remarks: "" });

  const filteredData = fees.filter(item => item.student.toLowerCase().includes(searchQuery.toLowerCase()) || item.course.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleOpenDialog = (fee = null) => {
    if (fee) { setEditingFee(fee); setFormData({ student: fee.student, course: fee.course, totalFee: fee.totalFee, paidAmount: fee.paidAmount, paymentMode: "Cash", remarks: "" }); }
    else { setEditingFee(null); setFormData({ student: "", course: "", totalFee: "", paidAmount: "", paymentMode: "Cash", remarks: "" }); }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => { setOpenDialog(false); setEditingFee(null); };
  const handleFormChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    const total = parseFloat(formData.totalFee) || 0;
    const paid = parseFloat(formData.paidAmount) || 0;
    const pending = total - paid;
    const status = pending <= 0 ? "paid" : paid > 0 ? "partial" : "pending";
    
    if (editingFee) {
      setFees(prev => prev.map(f => f.id === editingFee.id ? { ...f, ...formData, totalFee: total, paidAmount: paid, pendingAmount: pending, status, lastPayment: new Date().toISOString().split("T")[0] } : f));
    } else {
      setFees(prev => [...prev, { id: Math.max(...prev.map(f => f.id)) + 1, ...formData, totalFee: total, paidAmount: paid, pendingAmount: pending, status, lastPayment: paid > 0 ? new Date().toISOString().split("T")[0] : "-" }]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => { if (window.confirm("Delete this fee record?")) setFees(prev => prev.filter(f => f.id !== id)); };

  const getStatusChip = (status) => {
    const config = { paid: { bg: "#e8f5e9", color: "#2e7d32" }, partial: { bg: "#fff3e0", color: "#e65100" }, pending: { bg: "#ffebee", color: "#c62828" } };
    const { bg, color } = config[status] || config.pending;
    return <Chip label={status.charAt(0).toUpperCase() + status.slice(1)} size="small" sx={{ backgroundColor: bg, color, fontWeight: 600, fontSize: "12px" }} />;
  };

  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : "#f0f4f8", minHeight: "calc(100vh - 70px)" }}>
      <Box mb={3}>
        <Typography variant="h3" sx={{ color: colors.grey[100], fontWeight: 600, mb: 1 }}>Fees Management</Typography>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link component={RouterLink} to="/" sx={{ color: colors.grey[500], textDecoration: "none", "&:hover": { color: "#1565c0" } }}>Home</Link>
          <Typography sx={{ color: "#1565c0", fontWeight: 500 }}>Fees</Typography>
        </Breadcrumbs>
      </Box>

      <Box mb={3}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()} sx={{ backgroundColor: "#1976d2", color: "#fff", borderRadius: "8px", px: 3, py: 1, textTransform: "none", fontWeight: 600, "&:hover": { backgroundColor: "#1565c0" } }}>Add Payment</Button>
      </Box>

      <Paper elevation={0} sx={{ backgroundColor: theme.palette.mode === "dark" ? colors.primary[400] : "#ffffff", borderRadius: "16px", border: "1px solid #e8ecf0" }}>
        <Box sx={{ p: 3, borderBottom: "1px solid #e8ecf0" }}><Typography variant="h4" sx={{ color: "#1976d2", fontWeight: 600 }}>Fee Records</Typography></Box>
        <Box sx={{ p: 3, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
          <FormControl size="small"><Select value={rowsPerPage} onChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))} sx={{ minWidth: 80, backgroundColor: "#f8fafc", borderRadius: "8px" }}>{[5, 10, 25, 50].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}</Select></FormControl>
          <TextField placeholder="Search..." size="small" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ width: 250, "& .MuiOutlinedInput-root": { backgroundColor: "#f8fafc", borderRadius: "8px" } }} InputProps={{ endAdornment: <InputAdornment position="end"><SearchIcon sx={{ color: colors.grey[500] }} /></InputAdornment> }} />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                {["#", "Action", "Student", "Course", "Total Fee", "Paid", "Pending", "Status", "Last Payment"].map(h => (
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
                      <IconButton size="small" sx={{ backgroundColor: "#1976d2", color: "#fff", width: 30, height: 30, "&:hover": { backgroundColor: "#1565c0" } }}><ReceiptOutlinedIcon sx={{ fontSize: 16 }} /></IconButton>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: colors.grey[200], fontWeight: 500, borderBottom: "1px solid #f1f5f9" }}>{row.student}</TableCell>
                  <TableCell sx={{ color: colors.grey[300], borderBottom: "1px solid #f1f5f9" }}>{row.course}</TableCell>
                  <TableCell sx={{ color: colors.grey[200], fontWeight: 600, borderBottom: "1px solid #f1f5f9" }}>₹{row.totalFee.toLocaleString()}</TableCell>
                  <TableCell sx={{ color: "#2e7d32", fontWeight: 600, borderBottom: "1px solid #f1f5f9" }}>₹{row.paidAmount.toLocaleString()}</TableCell>
                  <TableCell sx={{ color: row.pendingAmount > 0 ? "#c62828" : colors.grey[300], fontWeight: 600, borderBottom: "1px solid #f1f5f9" }}>₹{row.pendingAmount.toLocaleString()}</TableCell>
                  <TableCell sx={{ borderBottom: "1px solid #f1f5f9" }}>{getStatusChip(row.status)}</TableCell>
                  <TableCell sx={{ color: colors.grey[300], borderBottom: "1px solid #f1f5f9" }}>{row.lastPayment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ p: 2, borderTop: "1px solid #e8ecf0" }}><Typography sx={{ color: colors.grey[400], fontSize: "14px" }}>Showing 1 to {Math.min(rowsPerPage, filteredData.length)} of {filteredData.length} entries</Typography></Box>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: "16px" } }}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e8ecf0", pb: 2 }}>
          <Typography variant="h5" fontWeight={600}>{editingFee ? "Update Payment" : "Add Fee Payment"}</Typography>
          <IconButton onClick={handleCloseDialog} size="small"><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Student Name" name="student" value={formData.student} onChange={handleFormChange} sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Course" name="course" value={formData.course} onChange={handleFormChange} sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Total Fee" name="totalFee" type="number" value={formData.totalFee} onChange={handleFormChange} sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Amount Paying" name="paidAmount" type="number" value={formData.paidAmount} onChange={handleFormChange} sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }} /></Grid>
            <Grid item xs={12}><FormControl fullWidth><InputLabel>Payment Mode</InputLabel><Select label="Payment Mode" name="paymentMode" value={formData.paymentMode} onChange={handleFormChange} sx={{ borderRadius: "10px" }}>{["Cash", "UPI", "Card", "Bank Transfer", "Cheque"].map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}</Select></FormControl></Grid>
            <Grid item xs={12}><TextField fullWidth label="Remarks" name="remarks" value={formData.remarks} onChange={handleFormChange} multiline rows={2} sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }} /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: "1px solid #e8ecf0" }}>
          <Button onClick={handleCloseDialog} variant="outlined" sx={{ borderRadius: "8px", textTransform: "none", px: 3 }}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={!formData.student || !formData.totalFee} sx={{ backgroundColor: "#4caf50", borderRadius: "8px", textTransform: "none", px: 3, "&:hover": { backgroundColor: "#43a047" } }}>{editingFee ? "Update" : "Add Payment"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Fees;



