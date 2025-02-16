import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PeopleIcon from "@mui/icons-material/People";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  // const { isLogedIn } = useSelector((state) => state.entities.authReducer);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="LIBRARY DASHBOARD"
          subtitle="Welcome to your library management dashboard"
        />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            onClick={() => navigate("/allstudents")}
            title="1,234"
            subtitle="Total Students"
            progress="0.75"
            increase="+14%"
            icon={
              <PeopleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            onClick={() => navigate("/attendance/present")}
            title="892"
            subtitle="Present Today"
            progress="0.72"
            increase="+5%"
            icon={
              <HowToRegIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            onClick={() => navigate("/attendance/absent")}
            title="342"
            subtitle="Absent Today"
            progress="0.28"
            increase="-2%"
            icon={
              <PersonOffIcon
                sx={{ color: colors.redAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            onClick={() => navigate("/planexpire")}
            title="45"
            subtitle="Plan Expiry Alerts"
            progress="0.80"
            increase="+12"
            icon={
              <NotificationsActiveIcon
                sx={{ color: colors.redAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Student Attendance Trends
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                72% Average
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        {/* Notifications Panel */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Notifications
            </Typography>
          </Box>
          {[
            {
              id: 1,
              student: "John Doe",
              message: "Membership expires in 3 days",
              type: "warning",
            },
            {
              id: 2,
              student: "Jane Smith",
              message: "Absent for 3 consecutive days",
              type: "alert",
            },
            {
              id: 3,
              student: "Mike Johnson",
              message: "New membership activated",
              type: "success",
            },
            {
              id: 4,
              student: "Sarah Wilson",
              message: "Payment due reminder",
              type: "warning",
            },
          ].map((notification) => (
            <Box
              key={notification.id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {notification.student}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {notification.message}
                </Typography>
              </Box>
              <Box
                backgroundColor={
                  notification.type === "warning"
                    ? colors.redAccent[500]
                    : notification.type === "alert"
                    ? colors.redAccent[700]
                    : colors.greenAccent[500]
                }
                p="5px 10px"
                borderRadius="4px"
              >
                {notification.type}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Monthly Attendance Statistics
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Active vs Inactive Students
          </Typography>
          <Box height="200px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
