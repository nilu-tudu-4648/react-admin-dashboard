import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const AttendancePage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { status } = useParams();
  const isPresent = status === "present";
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
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
          // Convert Firebase timestamp to Date object
          const date = new Date(params.value.seconds * 1000);
          // Format date to Indian timezone
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
          // Parse shift time range
          const [startStr, endStr] = shiftTime.split(' - ');
          
          // Parse start time
          let [startTimeStr, startAmPm] = startStr.split(' ');
          let [startHour, startMin] = startTimeStr.split(':').map(Number);
          if (startAmPm.toLowerCase() === 'pm' && startHour !== 12) startHour += 12;
          if (startAmPm.toLowerCase() === 'am' && startHour === 12) startHour = 0;

          // Parse end time
          let [endTimeStr, endAmPm] = endStr.split(' ');
          let [endHour, endMin] = endTimeStr.split(':').map(Number);
          if (endAmPm.toLowerCase() === 'pm' && endHour !== 12) endHour += 12;
          if (endAmPm.toLowerCase() === 'am' && endHour === 12) endHour = 0;

          // Get current time
          const now = new Date();
          const currentHour = now.getHours();
          const currentMin = now.getMinutes();
    
          // Convert to minutes past midnight
          const currentTimeInMins = currentHour * 60 + currentMin;
          const endTimeInMins = endHour * 60 + endMin;
          const startTimeInMins = startHour * 60 + startMin;
    
          if (currentTimeInMins >= startTimeInMins && currentTimeInMins <= endTimeInMins) {
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
          <div style={{ 
            color: value === "Shift not active" ? '#999' : 
                   value === "Invalid time" ? '#f44336' : '#ff0000'
          }}>
            {value}
          </div>
        );
      }
    }
  ];

  const fetchStudents = async () => {
    try {
      const studentsRef = collection(db, "users");
      const q = query(studentsRef);
      const querySnapshot = await getDocs(q);

      const fetchedStudents = [];
      querySnapshot.forEach((doc) => {
        const student = { id: doc.id, ...doc.data() };
        // Only include students based on their presence status
        if (isPresent === student.isLoggedIn) {
          fetchedStudents.push(student);
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
  }, [status]); // Changed dependency from fetchStudents to status

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
    </Box>
  );
};

export default AttendancePage;
