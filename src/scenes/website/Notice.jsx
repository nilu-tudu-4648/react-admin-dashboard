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
  IconButton,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  InputLabel,
  Breadcrumbs,
  Link,
  Chip,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { tokens } from "../../theme";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link as RouterLink } from "react-router-dom";

// Initial mock data for notices
const initialNoticesData = [
  {
    id: 1,
    title: "Admission Open for 2025 Batch",
    type: "Announcement",
    startDate: "2025-01-01",
    endDate: "2025-03-31",
    status: "active",
    priority: "high",
  },
  {
    id: 2,
    title: "Holiday Notice - Republic Day",
    type: "Holiday",
    startDate: "2025-01-26",
    endDate: "2025-01-26",
    status: "active",
    priority: "medium",
  },
  {
    id: 3,
    title: "Fee Payment Deadline Extended",
    type: "Reminder",
    startDate: "2025-01-15",
    endDate: "2025-02-15",
    status: "active",
    priority: "high",
  },
  {
    id: 4,
    title: "Annual Sports Day",
    type: "Event",
    startDate: "2025-02-20",
    endDate: "2025-02-20",
    status: "inactive",
    priority: "low",
  },
  {
    id: 5,
    title: "Parent-Teacher Meeting",
    type: "Event",
    startDate: "2025-02-10",
    endDate: "2025-02-10",
    status: "active",
    priority: "medium",
  },
];

const typeOptions = ["Announcement", "Holiday", "Reminder", "Event", "Alert", "General"];
const priorityOptions = ["high", "medium", "low"];

const Notice = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [notices, setNotices] = useState(initialNoticesData);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    startDate: "",
    endDate: "",
    priority: "medium",
    content: "",
    showOnWebsite: true,
  });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const filteredData = notices.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenDialog = (notice = null) => {
    if (notice) {
      setEditingNotice(notice);
      setFormData({
        title: notice.title,
        type: notice.type,
        startDate: notice.startDate,
        endDate: notice.endDate,
        priority: notice.priority,
        content: notice.content || "",
        showOnWebsite: notice.status === "active",
      });
    } else {
      setEditingNotice(null);
      setFormData({
        title: "",
        type: "",
        startDate: new Date().toISOString().split("T")[0],
        endDate: "",
        priority: "medium",
        content: "",
        showOnWebsite: true,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingNotice(null);
    setFormData({
      title: "",
      type: "",
      startDate: "",
      endDate: "",
      priority: "medium",
      content: "",
      showOnWebsite: true,
    });
  };

  const handleFormChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    if (editingNotice) {
      setNotices((prev) =>
        prev.map((notice) =>
          notice.id === editingNotice.id
            ? {
                ...notice,
                title: formData.title,
                type: formData.type,
                startDate: formData.startDate,
                endDate: formData.endDate,
                priority: formData.priority,
                content: formData.content,
                status: formData.showOnWebsite ? "active" : "inactive",
              }
            : notice
        )
      );
    } else {
      const newNotice = {
        id: Math.max(...notices.map((n) => n.id)) + 1,
        title: formData.title,
        type: formData.type,
        startDate: formData.startDate,
        endDate: formData.endDate,
        priority: formData.priority,
        content: formData.content,
        status: formData.showOnWebsite ? "active" : "inactive",
      };
      setNotices((prev) => [...prev, newNotice]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      setNotices((prev) => prev.filter((notice) => notice.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setNotices((prev) =>
      prev.map((notice) =>
        notice.id === id
          ? {
              ...notice,
              status: notice.status === "active" ? "inactive" : "active",
            }
          : notice
      )
    );
  };

  const getPriorityChip = (priority) => {
    const config = {
      high: { bg: "#ffebee", color: "#c62828" },
      medium: { bg: "#fff3e0", color: "#e65100" },
      low: { bg: "#e8f5e9", color: "#2e7d32" },
    };
    const { bg, color } = config[priority] || config.medium;
    return (
      <Chip
        label={priority.charAt(0).toUpperCase() + priority.slice(1)}
        size="small"
        sx={{
          backgroundColor: bg,
          color: color,
          fontWeight: 600,
          fontSize: "12px",
        }}
      />
    );
  };

  const getTypeChip = (type) => {
    const config = {
      Announcement: { bg: "#e3f2fd", color: "#1565c0" },
      Holiday: { bg: "#fce4ec", color: "#c2185b" },
      Reminder: { bg: "#fff8e1", color: "#f9a825" },
      Event: { bg: "#e8f5e9", color: "#2e7d32" },
      Alert: { bg: "#ffebee", color: "#c62828" },
      General: { bg: "#f5f5f5", color: "#616161" },
    };
    const { bg, color } = config[type] || config.General;
    return (
      <Chip
        label={type}
        size="small"
        sx={{
          backgroundColor: bg,
          color: color,
          fontWeight: 500,
          fontSize: "12px",
        }}
      />
    );
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor:
          theme.palette.mode === "dark" ? colors.primary[500] : "#f0f4f8",
        minHeight: "calc(100vh - 70px)",
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
          }}
        >
          Notice
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
            Notice
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Add New Button */}
      <Box mb={3}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            borderRadius: "8px",
            px: 3,
            py: 1,
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)",
            "&:hover": {
              backgroundColor: "#1565c0",
              boxShadow: "0 4px 12px rgba(25, 118, 210, 0.4)",
            },
          }}
        >
          Add New
        </Button>
      </Box>

      {/* Notice List Card */}
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
            Notice List
          </Typography>
        </Box>

        {/* Filters Row */}
        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <FormControl size="small">
            <Select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              sx={{
                minWidth: 80,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? colors.primary[500]
                    : "#f8fafc",
                borderRadius: "8px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.2)"
                      : "#e2e8f0",
                },
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>

          <TextField
            placeholder="Search..."
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
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: colors.grey[500] }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Table */}
        <TableContainer>
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
                {["#", "Action", "Title", "Type", "Start Date", "End Date", "Priority", "Status"].map(
                  (header) => (
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
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.slice(0, rowsPerPage).map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.05)"
                          : "#f8fafc",
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      color: colors.grey[300],
                      borderBottom:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "1px solid #f1f5f9",
                    }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "1px solid #f1f5f9",
                    }}
                  >
                    <Box display="flex" gap={0.5}>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(row)}
                        sx={{
                          backgroundColor: "#ffc107",
                          color: "#fff",
                          width: 30,
                          height: 30,
                          "&:hover": { backgroundColor: "#ffb300" },
                        }}
                      >
                        <EditOutlinedIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(row.id)}
                        sx={{
                          backgroundColor: "#f44336",
                          color: "#fff",
                          width: 30,
                          height: 30,
                          "&:hover": { backgroundColor: "#d32f2f" },
                        }}
                      >
                        <DeleteOutlinedIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleToggleStatus(row.id)}
                        sx={{
                          backgroundColor:
                            row.status === "active" ? "#4caf50" : "#ff9800",
                          color: "#fff",
                          fontSize: "11px",
                          fontWeight: 600,
                          textTransform: "none",
                          minWidth: "auto",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: "6px",
                          "&:hover": {
                            backgroundColor:
                              row.status === "active" ? "#43a047" : "#f57c00",
                          },
                        }}
                      >
                        {row.status === "active" ? "Deactivate" : "Activate"}
                      </Button>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      color: colors.grey[200],
                      fontWeight: 500,
                      borderBottom:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "1px solid #f1f5f9",
                      maxWidth: 250,
                    }}
                  >
                    {row.title}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "1px solid #f1f5f9",
                    }}
                  >
                    {getTypeChip(row.type)}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: colors.grey[300],
                      borderBottom:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "1px solid #f1f5f9",
                    }}
                  >
                    {row.startDate}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: colors.grey[300],
                      borderBottom:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "1px solid #f1f5f9",
                    }}
                  >
                    {row.endDate}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "1px solid #f1f5f9",
                    }}
                  >
                    {getPriorityChip(row.priority)}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "1px solid #f1f5f9",
                    }}
                  >
                    <Chip
                      label={row.status === "active" ? "Active" : "Inactive"}
                      size="small"
                      sx={{
                        backgroundColor:
                          row.status === "active" ? "#e8f5e9" : "#f5f5f5",
                        color: row.status === "active" ? "#2e7d32" : "#757575",
                        fontWeight: 600,
                        fontSize: "12px",
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer */}
        <Box
          sx={{
            p: 2,
            borderTop:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid #e8ecf0",
          }}
        >
          <Typography sx={{ color: colors.grey[400], fontSize: "14px" }}>
            Showing 1 to {Math.min(rowsPerPage, filteredData.length)} of{" "}
            {filteredData.length} entries
          </Typography>
        </Box>
      </Paper>

      {/* Add/Edit Notice Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            backgroundColor:
              theme.palette.mode === "dark" ? colors.primary[400] : "#ffffff",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid #e8ecf0",
            pb: 2,
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            {editingNotice ? "Edit Notice" : "Add New Notice"}
          </Typography>
          <IconButton onClick={handleCloseDialog} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notice Title"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  label="Type"
                  name="type"
                  value={formData.type}
                  onChange={handleFormChange}
                  sx={{ borderRadius: "10px" }}
                >
                  {typeOptions.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  label="Priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleFormChange}
                  sx={{ borderRadius: "10px" }}
                >
                  {priorityOptions.map((priority) => (
                    <MenuItem key={priority} value={priority}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleFormChange}
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleFormChange}
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Content"
                name="content"
                value={formData.content}
                onChange={handleFormChange}
                multiline
                rows={4}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.showOnWebsite}
                    onChange={handleFormChange}
                    name="showOnWebsite"
                    color="primary"
                  />
                }
                label="Show on Website"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            p: 3,
            borderTop:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid #e8ecf0",
          }}
        >
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{ borderRadius: "8px", textTransform: "none", px: 3 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.title || !formData.type}
            sx={{
              backgroundColor: "#1976d2",
              borderRadius: "8px",
              textTransform: "none",
              px: 3,
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            {editingNotice ? "Update" : "Add Notice"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Notice;


