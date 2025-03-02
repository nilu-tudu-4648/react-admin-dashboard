import { Box, CircularProgress, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { tokens } from "../../theme";

const PlanExpireStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handlePhoneClick = (phone, daysLeft, name) => {
    const message = `Hi ${name}, your library membership plan will expire in ${daysLeft} days. Please renew your plan to continue using our services.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
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
    { 
      field: "phone", 
      headerName: "Phone Number", 
      flex: 1,
      renderCell: (params) => {
        let daysLeft = null;
        if (params.row.planExpiryDate && params.row.planExpiryDate.seconds) {
          const expiryDate = new Date(params.row.planExpiryDate.seconds * 1000);
          const today = new Date();
          const diffTime = expiryDate.getTime() - today.getTime();
          daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }
        return (
          <Box
            sx={{
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
            onClick={() => handlePhoneClick(
              params.value,
              daysLeft,
              `${params.row.firstName} ${params.row.lastName}`
            )}
          >
            {params.value}
          </Box>
        );
      }
    },
    { field: "shiftName", headerName: "Shift Name", flex: 1 },
    { field: "shiftTime", headerName: "Shift Time", flex: 1 },
    {
      field: "planExpiryDate",
      headerName: "Plan Expiry Date",
      flex: 1,
      valueFormatter: (params) => {
        if (params.value && params.value.seconds) {
          const date = new Date(params.value.seconds * 1000);
          return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
        }
        return "";
      },
    },
    {
      field: "daysLeft",
      headerName: "Days Left", 
      flex: 0.7,
      valueGetter: (params) => {
        if (params.row.planExpiryDate && params.row.planExpiryDate.seconds) {
          const expiryDate = new Date(params.row.planExpiryDate.seconds * 1000);
          const today = new Date();
          const diffTime = expiryDate.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays;
        }
        return null;
      },
    },
  ];

  const fetchStudents = async () => {
    try {
      const studentsRef = collection(db, "users");
      const q = query(studentsRef);
      const querySnapshot = await getDocs(q);

      const fetchedStudents = [];
      querySnapshot.forEach((doc) => {
        const student = { id: doc.id, ...doc.data() };
        // Only include students whose plans are expiring within next 7 days
        if (student.planExpiryDate) {
          const expiryDate = new Date(student.planExpiryDate.seconds * 1000);
          const today = new Date();
          const diffTime = expiryDate.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays <= 7 && diffDays > 0) {
            fetchedStudents.push(student);
          }
        }
      });

      setStudents(fetchedStudents);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching students:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

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
      <Header
        title="PLAN EXPIRY ALERTS"
        subtitle="List of Students whose Plans are Expiring Soon"
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
        <DataGrid
          rows={students}
          columns={columns}
          initialState={{
            sorting: {
              sortModel: [{ field: "daysLeft", sort: "asc" }],
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default PlanExpireStudents;
