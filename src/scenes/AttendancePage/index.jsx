import {
  Box,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  doc,
  updateDoc,
  Timestamp,
  serverTimestamp,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Formik } from "formik";
import * as yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  shiftName: yup.string().required("Shift name is required"),
  shiftTime: yup.string().required("Shift time is required"),
});

const AttendancePage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { status } = useParams();
  const isPresent = status === "present";
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedStudent(null);
  };

  useEffect(() => {
    if (!selectedStudent?.id) return;

    const bookingsQuery = query(
      collection(db, "bookings"),
      where("userId", "==", selectedStudent.id),
      where("status", "==", "active")
    );

    const unsubscribe = onSnapshot(
      bookingsQuery,
      (snapshot) => {
        if (!snapshot.empty) {
          // Get the active booking with its document ID
          const activeBookings = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          const latestBooking = activeBookings.reduce((latest, current) => {
            return latest.createdAt > current.createdAt ? latest : current;
          });
          setCurrentBooking(latestBooking);
          setIsLoggedIn(true);
        } else {
          setCurrentBooking(null);
          setIsLoggedIn(false);
        }
      },
      (error) => {
        console.error("Realtime update error:", error);
      }
    );

    return () => unsubscribe();
  }, [selectedStudent?.id]);

  const handleLogout = async (currentBooking, loggedUser) => {
    try {
      const now = new Date();
      const duration =
        (now.getTime() - currentBooking.startTime.toDate().getTime()) /
        (1000 * 60);

      // Update the existing document
      const bookingRef = doc(db, "bookings", currentBooking.id);
      await updateDoc(bookingRef, {
        endTime: Timestamp.fromDate(now),
        status: "completed",
        duration: duration,
        updatedAt: serverTimestamp(),
      });
      await updateDoc(doc(db, "users", loggedUser.user.id), {
        isLoggedIn: false,
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      const studentRef = doc(db, "users", selectedStudent.id);
      await updateDoc(studentRef, {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        shiftName: values.shiftName,
        shiftTime: values.shiftTime,
      });

      setStudents(
        students.map((student) =>
          student.id === selectedStudent.id
            ? { ...student, ...values }
            : student
        )
      );
      handleClose();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setOpenDialog(true);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Student Name",
      flex: 1,
      renderCell: (params) => `${params.row.firstName} ${params.row.lastName}`,
    },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    {
      field: "updatedAt",
      headerName: isPresent ? "Login Time" : "Logout Time",
      flex: 1,
      valueFormatter: (params) => {
        if (params.value && params.value.seconds) {
          const date = new Date(params.value.seconds * 1000);
          return date.toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          });
        }
        return "";
      },
    },
    { field: "shiftName", headerName: "Shift Name", flex: 1 },
    { field: "shiftTime", headerName: "Shift Time", flex: 1 },
    {
      field: "timeLeft",
      headerName: "Time Left",
      flex: 1,
      valueGetter: (params) => {
        const shiftTime = params.row.shiftTime;
        if (!shiftTime) return "N/A";

        try {
          const [startStr, endStr] = shiftTime.split(" - ");

          let [startTimeStr, startAmPm] = startStr.split(" ");
          let [startHour, startMin] = startTimeStr.split(":").map(Number);
          if (startAmPm.toLowerCase() === "pm" && startHour !== 12)
            startHour += 12;
          if (startAmPm.toLowerCase() === "am" && startHour === 12)
            startHour = 0;

          let [endTimeStr, endAmPm] = endStr.split(" ");
          let [endHour, endMin] = endTimeStr.split(":").map(Number);
          if (endAmPm.toLowerCase() === "pm" && endHour !== 12) endHour += 12;
          if (endAmPm.toLowerCase() === "am" && endHour === 12) endHour = 0;

          const now = new Date();
          const currentHour = now.getHours();
          const currentMin = now.getMinutes();

          const currentTimeInMins = currentHour * 60 + currentMin;
          const endTimeInMins = endHour * 60 + endMin;
          const startTimeInMins = startHour * 60 + startMin;

          if (
            currentTimeInMins >= startTimeInMins &&
            currentTimeInMins <= endTimeInMins
          ) {
            const minutesLeft = endTimeInMins - currentTimeInMins;
            return `${minutesLeft}m`;
          }

          return "Shift not active";
        } catch (error) {
          console.error("Error calculating time left:", error);
          return "Invalid time";
        }
      },
      renderCell: (params) => {
        const value = params.value;
        return (
          <div
            style={{
              color:
                value === "Shift not active"
                  ? "#999"
                  : value === "Invalid time"
                  ? "#f44336"
                  : "#ff0000",
            }}
          >
            {value}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex">
          <IconButton onClick={() => handleEdit(params.row)} color="primary">
            <EditIcon />
          </IconButton>
          {isPresent && (
            <IconButton
              onClick={() =>
                handleLogout(params.row.currentBooking, params.row)
              }
              color="primary"
            >
              <LogoutIcon />
            </IconButton>
          )}
        </Box>
      ),
    },
  ];

  useEffect(() => {
    const studentsRef = collection(db, "users");
    const q = query(studentsRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedStudents = [];
      querySnapshot.forEach((doc) => {
        const student = { id: doc.id, ...doc.data() };
        if (isPresent === student.isLoggedIn) {
          if (student.userType !== "admin") {
            fetchedStudents.push({ id: doc.id, ...student });
          }
        }
      });
      setStudents(fetchedStudents);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching students:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isPresent]);

  return (
    <Box m="20px">
      <Header
        title={isPresent ? "PRESENT STUDENTS" : "ABSENT STUDENTS"}
        subtitle={
          isPresent
            ? "List of Currently Present Students"
            : "List of Currently Absent Students"
        }
      />
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
        <DataGrid rows={students} columns={columns} loading={loading} />
      </Box>

      <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Student Details</DialogTitle>
        <DialogContent>
          {selectedStudent && (
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={selectedStudent}
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

export default AttendancePage;
