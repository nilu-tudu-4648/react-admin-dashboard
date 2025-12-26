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
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  InputLabel,
} from "@mui/material";
import { tokens } from "../../theme";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

// Initial mock data for users
const initialUsersData = [
  {
    id: 1,
    profile: "https://i.pravatar.cc/150?img=1",
    role: "Admin",
    name: "Mukesh Kumar",
    email: "admin@demo.com",
    phone: "12345678",
    status: "active",
  },
  {
    id: 2,
    profile: "https://i.pravatar.cc/150?img=5",
    role: "Marketing Executive",
    name: "Riya Tirkey",
    email: "user@demo.com",
    phone: "87654345",
    status: "active",
  },
  {
    id: 3,
    profile: "https://i.pravatar.cc/150?img=3",
    role: "Center Manager",
    name: "Radhika sharma",
    email: "radhika@gmail.com",
    phone: "89691231",
    status: "active",
  },
  {
    id: 4,
    profile: "https://i.pravatar.cc/150?img=4",
    role: "Tele Caller",
    name: "test",
    email: "test@gmail.com",
    phone: "87654345",
    status: "active",
  },
];

const roleOptions = [
  "Admin",
  "Marketing Executive",
  "Center Manager",
  "Tele Caller",
  "Teacher",
  "Accountant",
];

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState(initialUsersData);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const filteredData = users.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenDialog = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        password: "",
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "",
        password: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
      password: "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (editingUser) {
      // Update existing user
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                role: formData.role,
              }
            : user
        )
      );
    } else {
      // Add new user
      const newUser = {
        id: Math.max(...users.map((u) => u.id)) + 1,
        profile: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        status: "active",
      };
      setUsers((prev) => [...prev, newUser]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user
      )
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

      {/* User List Card */}
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
            User List
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
          {/* Rows per page selector */}
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
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1565c0",
                },
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>

          {/* Search */}
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
                "&:hover fieldset": {
                  borderColor: "#1565c0",
                },
                "&.Mui-focused fieldset": {
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
                {["#", "Action", "Profile", "Role", "Name", "Email", "Phone"].map(
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
                          "&:hover": {
                            backgroundColor: "#ffb300",
                          },
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
                          "&:hover": {
                            backgroundColor: "#d32f2f",
                          },
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
                      borderBottom:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "1px solid #f1f5f9",
                    }}
                  >
                    <Avatar
                      src={row.profile}
                      alt={row.name}
                      sx={{
                        width: 50,
                        height: 50,
                        border:
                          theme.palette.mode === "dark"
                            ? "2px solid rgba(255,255,255,0.2)"
                            : "2px solid #e8ecf0",
                      }}
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
                    {row.role}
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
                    {row.name}
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
                    {row.email}
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
                    {row.phone}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer - Showing entries */}
        <Box
          sx={{
            p: 2,
            borderTop:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid #e8ecf0",
          }}
        >
          <Typography
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? colors.grey[400]
                  : colors.grey[400],
              fontSize: "14px",
            }}
          >
            Showing 1 to {Math.min(rowsPerPage, filteredData.length)} of{" "}
            {filteredData.length} entries
          </Typography>
        </Box>
      </Paper>

      {/* Add/Edit User Dialog */}
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
            {editingUser ? "Edit User" : "Add New User"}
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
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleFormChange}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleFormChange}
                  sx={{
                    borderRadius: "10px",
                  }}
                >
                  {roleOptions.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {!editingUser && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                    },
                  }}
                />
              </Grid>
            )}
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
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              px: 3,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.name || !formData.email || !formData.role}
            sx={{
              backgroundColor: "#1976d2",
              borderRadius: "8px",
              textTransform: "none",
              px: 3,
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            {editingUser ? "Update" : "Add User"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;



