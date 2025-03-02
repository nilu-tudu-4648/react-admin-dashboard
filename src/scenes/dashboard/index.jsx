import { 
  Box, 
  Button, 
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton, 
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Chip
} from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PeopleIcon from "@mui/icons-material/People";
import PersonOffIcon from "@mui/icons-material/PersonOff"; 
import HowToRegIcon from "@mui/icons-material/HowToReg";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useState, useEffect } from "react";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [totalStudents, setTotalStudents] = useState(0);
  const [presentStudents, setPresentStudents] = useState(0);
  const [absentStudents, setAbsentStudents] = useState(0);
  const [expiringPlans, setExpiringPlans] = useState(0);
  const [monthlyAttendance, setMonthlyAttendance] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Set up real-time listener for users collection
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userType", "!=", "admin"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let total = 0;
      let present = 0;
      let expiring = 0;
      let recentNotifications = [];

      snapshot.forEach((doc) => {
        const userData = doc.data();
        total++;
        
        if (userData.isLoggedIn) {
          present++;
        }

        // Check for plans expiring in next 7 days
        if (userData.planExpiryDate) {
          const expiryDate = userData.planExpiryDate.toDate();
          const daysUntilExpiry = Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24));
          if (daysUntilExpiry <= 7 && daysUntilExpiry > 0) {
            expiring++;
            recentNotifications.push({
              id: doc.id,
              student: `${userData.firstName} ${userData.lastName}`,
              message: `Membership expires in ${daysUntilExpiry} days`,
              type: "warning"
            });
          }
        }

        // Add notification for inactive users
        if (!userData.isLoggedIn && userData.lastLogin) {
          const lastLogin = userData.lastLogin.toDate();
          const daysSinceLogin = Math.ceil((new Date() - lastLogin) / (1000 * 60 * 60 * 24));
          if (daysSinceLogin >= 3) {
            recentNotifications.push({
              id: doc.id,
              student: `${userData.firstName} ${userData.lastName}`,
              message: `Absent for ${daysSinceLogin} consecutive days`,
              type: "alert"
            });
          }
        }
      });

      setTotalStudents(total);
      setPresentStudents(present);
      setAbsentStudents(total - present);
      setExpiringPlans(expiring);
      setNotifications(recentNotifications.slice(0, 4)); // Keep only 4 most recent notifications

      // Calculate attendance percentages for charts
      const currentDate = new Date();
      const monthlyData = Array(6).fill(0);
      const weeklyData = Array(5).fill(0);

      snapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.attendance) {
          // Process monthly attendance
          Object.entries(userData.attendance).forEach(([date, wasPresent]) => {
            const attendanceDate = new Date(date);
            const monthDiff = currentDate.getMonth() - attendanceDate.getMonth();
            if (monthDiff >= 0 && monthDiff < 6) {
              monthlyData[5 - monthDiff] += wasPresent ? 1 : 0;
            }
          });

          // Process weekly attendance
          Object.entries(userData.attendance).forEach(([date, wasPresent]) => {
            const attendanceDate = new Date(date);
            const dayDiff = Math.floor((currentDate - attendanceDate) / (1000 * 60 * 60 * 24));
            if (dayDiff >= 0 && dayDiff < 5) {
              weeklyData[dayDiff] += wasPresent ? 1 : 0;
            }
          });
        }
      });

      setMonthlyAttendance(monthlyData.map(count => (count / total) * 100));
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Attendance %',
        data: monthlyAttendance,
        borderColor: colors.greenAccent[500],
        tension: 0.3
      }
    ]
  };

  return (
    <Box p={3}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color={colors.grey[100]}>
            LIBRARY DASHBOARD
          </Typography>
          <Typography variant="subtitle1" color={colors.grey[300]}>
            Welcome to your library management dashboard
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<DownloadOutlinedIcon />}
          sx={{
            bgcolor: colors.blueAccent[700],
            '&:hover': { bgcolor: colors.blueAccent[800] }
          }}
        >
          Download Reports
        </Button>
      </Box>

      {/* STATS CARDS */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              bgcolor: colors.primary[400],
              cursor: 'pointer',
              transition: '0.3s',
              '&:hover': { transform: 'translateY(-5px)' }
            }}
            onClick={() => navigate("/allstudents")}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="h5" color={colors.grey[100]}>
                    Total Students
                  </Typography>
                  <Typography variant="h3" color={colors.grey[100]} fontWeight="bold">
                    {totalStudents}
                  </Typography>
                  <Typography variant="subtitle2" color={colors.greenAccent[500]}>
                    Real-time count
                  </Typography>
                </Box>
                <PeopleIcon sx={{ fontSize: 40, color: colors.greenAccent[500] }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              bgcolor: colors.primary[400],
              cursor: 'pointer',
              transition: '0.3s',
              '&:hover': { transform: 'translateY(-5px)' }
            }}
            onClick={() => navigate("/attendance/present")}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="h5" color={colors.grey[100]}>
                    Present Today
                  </Typography>
                  <Typography variant="h3" color={colors.grey[100]} fontWeight="bold">
                    {presentStudents}
                  </Typography>
                  <Typography variant="subtitle2" color={colors.greenAccent[500]}>
                    Currently in library
                  </Typography>
                </Box>
                <HowToRegIcon sx={{ fontSize: 40, color: colors.greenAccent[500] }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              bgcolor: colors.primary[400],
              cursor: 'pointer',
              transition: '0.3s',
              '&:hover': { transform: 'translateY(-5px)' }
            }}
            onClick={() => navigate("/attendance/absent")}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="h5" color={colors.grey[100]}>
                    Absent Today
                  </Typography>
                  <Typography variant="h3" color={colors.grey[100]} fontWeight="bold">
                    {absentStudents}
                  </Typography>
                  <Typography variant="subtitle2" color={colors.redAccent[500]}>
                    Not checked in
                  </Typography>
                </Box>
                <PersonOffIcon sx={{ fontSize: 40, color: colors.redAccent[500] }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              bgcolor: colors.primary[400],
              cursor: 'pointer',
              transition: '0.3s',
              '&:hover': { transform: 'translateY(-5px)' }
            }}
            onClick={() => navigate("/planexpire")}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="h5" color={colors.grey[100]}>
                    Plan Expiry Alerts
                  </Typography>
                  <Typography variant="h3" color={colors.grey[100]} fontWeight="bold">
                    {expiringPlans}
                  </Typography>
                  <Typography variant="subtitle2" color={colors.redAccent[500]}>
                    Expiring in 7 days
                  </Typography>
                </Box>
                <NotificationsActiveIcon sx={{ fontSize: 40, color: colors.redAccent[500] }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* CHARTS & NOTIFICATIONS */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ bgcolor: colors.primary[400], height: '100%' }}>
            <CardHeader
              title={
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h5" color={colors.grey[100]}>
                      Student Attendance Trends
                    </Typography>
                    <Typography variant="h6" color={colors.greenAccent[500]}>
                      {monthlyAttendance.length > 0 
                        ? `${Math.round(monthlyAttendance.reduce((a, b) => a + b) / monthlyAttendance.length)}% Average`
                        : "Loading..."}
                    </Typography>
                  </Box>
                  <IconButton>
                    <DownloadOutlinedIcon sx={{ color: colors.greenAccent[500] }} />
                  </IconButton>
                </Box>
              }
            />
            <Divider />
            <CardContent>
              <Box height={300}>
                <Line 
                  data={lineChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100
                      }
                    }
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: colors.primary[400], height: '100%' }}>
            <CardHeader
              title={
                <Typography variant="h5" color={colors.grey[100]}>
                  Recent Notifications
                </Typography>
              }
            />
            <Divider />
            <List sx={{ p: 0 }}>
              {notifications.map((notification) => (
                <ListItem
                  key={notification.id}
                  divider
                  secondaryAction={
                    <Chip
                      label={notification.type}
                      size="small"
                      sx={{
                        bgcolor: notification.type === "warning"
                          ? colors.redAccent[500]
                          : notification.type === "alert"
                          ? colors.redAccent[700]
                          : colors.greenAccent[500],
                        color: colors.grey[100]
                      }}
                    />
                  }
                >
                  <ListItemText
                    primary={
                      <Typography color={colors.greenAccent[500]}>
                        {notification.student}
                      </Typography>
                    }
                    secondary={
                      <Typography color={colors.grey[100]}>
                        {notification.message}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
