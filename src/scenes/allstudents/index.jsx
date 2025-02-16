import { Box, useTheme, Dialog, DialogTitle, DialogContent, Button, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { mockDataTeam } from "../../data/mockData";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

const AllStudents = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleNameClick = (params) => {
    setSelectedMember(params.row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMember(null);
  };

  const handleFormSubmit = (values) => {
    console.log(values);
    handleClose();
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
    { field: "contact", headerName: "Phone Number", flex: 1 },
    { field: "membershipType", headerName: "Membership Type", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "booksIssued", headerName: "Books Issued", flex: 1 },
  ];

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup.string().required("required"),
    membershipType: yup.string().required("required"),
    status: yup.string().required("required"),
    booksIssued: yup.number().required("required"),
  });

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
        <DataGrid rows={mockDataTeam} columns={columns} />
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Member Details</DialogTitle>
        <DialogContent>
          {selectedMember && (
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={selectedMember}
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
                      label="Contact Number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.contact}
                      name="contact"
                      error={!!touched.contact && !!errors.contact}
                      helperText={touched.contact && errors.contact}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Membership Type"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.membershipType}
                      name="membershipType"
                      error={!!touched.membershipType && !!errors.membershipType}
                      helperText={touched.membershipType && errors.membershipType}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Status"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.status}
                      name="status"
                      error={!!touched.status && !!errors.status}
                      helperText={touched.status && errors.status}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Books Issued"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.booksIssued}
                      name="booksIssued"
                      error={!!touched.booksIssued && !!errors.booksIssued}
                      helperText={touched.booksIssued && errors.booksIssued}
                      sx={{ gridColumn: "span 4" }}
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
    </Box>
  );
};

export default AllStudents;