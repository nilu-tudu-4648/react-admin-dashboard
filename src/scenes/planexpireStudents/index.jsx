import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";

const PlanExpireStudents = () => {
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Student Name", flex: 1 },
    { field: "seatNumber", headerName: "Seat Number", flex: 0.7 },
    { field: "planName", headerName: "Plan Name", flex: 1 },
    { field: "startDate", headerName: "Start Date", flex: 1 },
    { field: "expiryDate", headerName: "Expiry Date", flex: 1 },
    { field: "daysLeft", headerName: "Days Left", flex: 0.7 }
  ];

  const rows = [
    {
      id: 1,
      name: "Jon Snow",
      seatNumber: "A101",
      planName: "3 Months Plan",
      startDate: "01/01/2024",
      expiryDate: "03/31/2024",
      daysLeft: "5"
    },
    {
      id: 2,
      name: "Arya Stark", 
      seatNumber: "B205",
      planName: "6 Months Plan",
      startDate: "10/01/2023",
      expiryDate: "03/30/2024",
      daysLeft: "4"
    },
    {
      id: 3,
      name: "Tyrion Lannister",
      seatNumber: "C309", 
      planName: "1 Month Plan",
      startDate: "02/15/2024",
      expiryDate: "03/14/2024",
      daysLeft: "2"
    },
    {
      id: 4,
      name: "Daenerys Targaryen",
      seatNumber: "D401",
      planName: "3 Months Plan", 
      startDate: "01/15/2024",
      expiryDate: "04/14/2024",
      daysLeft: "7"
    }
  ];

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
          "& .MuiDataGrid-row": {
            "&:nth-of-type(odd)": {
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            }
          }
        }}
      >
        <DataGrid 
          rows={rows} 
          columns={columns}
          initialState={{
            sorting: {
              sortModel: [{ field: 'daysLeft', sort: 'asc' }],
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default PlanExpireStudents;
