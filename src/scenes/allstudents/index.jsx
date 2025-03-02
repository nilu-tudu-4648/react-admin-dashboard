import { Box, useTheme, Dialog, DialogTitle, DialogContent, Button, TextField, CircularProgress, IconButton, DialogActions, DialogContentText } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { collection, query, getDocs, deleteDoc, doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import DeleteIcon from '@mui/icons-material/Delete';

const AllStudents = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshData, setRefreshData] = useState(false); // Add refresh state

  const fetchUsers = async () => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef);
      const querySnapshot = await getDocs(q);

      const fetchedUsers = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.userType !== "admin") {
          fetchedUsers.push({ id: doc.id, ...userData });
        }
      });

      setUsers(fetchedUsers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refreshData]); // Add refreshData as dependency

  const handleNameClick = (params) => {
    setSelectedMember(params.row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMember(null);
  };

  const handleDeleteClick = (member) => {
    setSelectedMember(member);
    setDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
    setSelectedMember(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteDoc(doc(db, "users", selectedMember.id));
      setDeleteDialogOpen(false);
      setSelectedMember(null);
      setRefreshData(prev => !prev); // Trigger refresh
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      // Convert date string to Timestamp
      const expiryDate = new Date(values.planExpiryDate);
      const expiryTimestamp = Timestamp.fromDate(expiryDate);

      const updatedValues = {
        ...values,
        planExpiryDate: expiryTimestamp,
        isActive: values.isActive === "true" // Convert string to boolean
      };

      await updateDoc(doc(db, "users", selectedMember.id), updatedValues);
      handleClose();
      setRefreshData(prev => !prev); // Trigger refresh
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name", 
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            cursor: 'pointer',
            '&:hover': {
              color: colors.greenAccent[400],
              textDecoration: 'underline'
            }
          }}
          onClick={() => handleNameClick(params)}
        >
          {`${params.row.firstName} ${params.row.lastName}`}
        </Box>
      )
    },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "shiftName", headerName: "Shift Name", flex: 1 },
    { field: "shiftTime", headerName: "Shift Time", flex: 1 },
    { 
      field: "planExpiryDate", 
      headerName: "Plan Expiry Date", 
      flex: 1,
      valueFormatter: (params) => {
        if (params.value && params.value.seconds) {
          const date = new Date(params.value.seconds * 1000);
          return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit', 
            year: 'numeric'
          });
        }
        return '';
      }
    },
    { 
      field: "isActive", 
      headerName: "Status", 
      flex: 1,
      renderCell: (params) => (
        params.row.isActive ? "Active" : "Inactive"
      )
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleDeleteClick(params.row)}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      )
    }
  ];

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    phone: yup.string().required("required"),
    shiftName: yup.string().required("required"),
    shiftTime: yup.string().required("required"),
    isActive: yup.boolean().required("required"),
    planExpiryDate: yup.date().required("required"),
  });

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box m="20px">
      <Header title="LIBRARY MEMBERS" subtitle="Managing Library Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid rows={users} columns={columns} />
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Member Details</DialogTitle>
        <DialogContent>
          {selectedMember && (
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={{
                ...selectedMember,
                planExpiryDate: selectedMember.planExpiryDate ? 
                  new Date(selectedMember.planExpiryDate.seconds * 1000).toISOString().split('T')[0] : 
                  new Date().toISOString().split('T')[0],
                isActive: selectedMember.isActive.toString() // Convert boolean to string
              }}
              validationSchema={checkoutSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{ mt: 2 }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="First Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      name="firstName"
                      error={!!touched.firstName && !!errors.firstName}
                      helperText={touched.firstName && errors.firstName}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Last Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      name="lastName"
                      error={!!touched.lastName && !!errors.lastName}
                      helperText={touched.lastName && errors.lastName}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Phone Number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phone}
                      name="phone"
                      error={!!touched.phone && !!errors.phone}
                      helperText={touched.phone && errors.phone}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Shift Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.shiftName}
                      name="shiftName"
                      error={!!touched.shiftName && !!errors.shiftName}
                      helperText={touched.shiftName && errors.shiftName}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Shift Time"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.shiftTime}
                      name="shiftTime"
                      error={!!touched.shiftTime && !!errors.shiftTime}
                      helperText={touched.shiftTime && errors.shiftTime}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      select
                      label="Status"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.isActive}
                      name="isActive"
                      error={!!touched.isActive && !!errors.isActive}
                      helperText={touched.isActive && errors.isActive}
                      sx={{ gridColumn: "span 2" }}
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value={true}>Active</option>
                      <option value={false}>Inactive</option>
                    </TextField>
                    <TextField
                      // fullWidth
                      variant="filled"
                      type="date"
                      label="Plan Expiry Date"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.planExpiryDate}
                      name="planExpiryDate"
                      error={!!touched.planExpiryDate && !!errors.planExpiryDate}
                      helperText={touched.planExpiryDate && errors.planExpiryDate}
                      sx={{ gridColumn: "span 2" }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button onClick={handleClose} sx={{ mr: 1 }}>
                      Cancel
                    </Button>
                    <Button type="submit" color="secondary" variant="contained">
                      Save Changes
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteClose}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this member? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllStudents;