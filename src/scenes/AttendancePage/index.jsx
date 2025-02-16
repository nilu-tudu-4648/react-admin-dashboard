import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";

const AttendancePage = () => {
  const { status } = useParams();
  console.log({status});
  const isPresent = status === "present";

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Student Name", flex: 1 },
    { field: "seatNumber", headerName: "Seat Number", flex: 0.7 },
    { field: "checkInTime", headerName: isPresent ? "Check In Time" : "Last Seen", flex: 1 },
    { field: "shiftName", headerName: "Shift Name", flex: 1 },
    { field: "shiftTime", headerName: "Shift Time", flex: 1 },
  ];

  const presentRows = [
    {
      id: 1,
      name: "Jon Snow",
      seatNumber: "A101", 
      checkInTime: "09:00 AM",
      shiftName: "Morning",
      shiftTime: "08:00 AM - 02:00 PM"
    },
    {
      id: 2,
      name: "Arya Stark",
      seatNumber: "B205",
      checkInTime: "02:30 PM", 
      shiftName: "Afternoon",
      shiftTime: "02:00 PM - 08:00 PM"
    },
    {
      id: 3,
      name: "Samwell Tarly",
      seatNumber: "C309",
      checkInTime: "09:15 AM",
      shiftName: "Morning", 
      shiftTime: "08:00 AM - 02:00 PM"
    }
  ];

  const absentRows = [
    {
      id: 4,
      name: "Sansa Stark",
      seatNumber: "D401",
      checkInTime: "Yesterday 4:00 PM",
      shiftName: "Morning",
      shiftTime: "08:00 AM - 02:00 PM"
    },
    {
      id: 5,
      name: "Tyrion Lannister",
      seatNumber: "E502",
      checkInTime: "Yesterday 1:30 PM",
      shiftName: "Morning",
      shiftTime: "08:00 AM - 02:00 PM"
    }
  ];

  const rows = isPresent ? presentRows : absentRows;

  return (
    <Box m="20px">
      <Header 
        title={isPresent ? "PRESENT STUDENTS" : "ABSENT STUDENTS"} 
        subtitle={isPresent ? "List of Currently Present Students" : "List of Currently Absent Students"} 
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
            color: "#94e2cd",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#3e4396",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#1F2A40",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#3e4396",
          },
        }}
      >
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default AttendancePage;
