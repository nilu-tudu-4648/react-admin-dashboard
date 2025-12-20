import { Box, Typography, useTheme, Button, IconButton, Paper } from "@mui/material";
import { tokens } from "../../theme";

// Icons
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Large stat card component
  const LargeStatCard = ({ title, subtitle, count, bgColor, icon, iconBgColor }) => (
    <Paper
      elevation={0}
      sx={{
        background: bgColor,
        borderRadius: "16px",
        p: 3,
        height: "160px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          width: "150px",
          height: "150px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "50%",
          transform: "translate(30%, -30%)",
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography
            variant="h5"
            sx={{ color: "#fff", fontWeight: 700, mb: 0.5 }}
          >
            {title}
            <Typography
              component="span"
              sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 400, ml: 1, fontSize: "14px" }}
            >
              | {subtitle}
            </Typography>
          </Typography>
        </Box>
        <IconButton
          size="small"
          sx={{
            color: "rgba(255,255,255,0.8)",
            "&:hover": { color: "#fff" },
          }}
        >
          <MoreHorizIcon />
        </IconButton>
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: iconBgColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="h1"
          sx={{
            color: "#fff",
            fontWeight: 700,
            fontSize: "48px",
          }}
        >
          {count}
        </Typography>
      </Box>
    </Paper>
  );

  // Small stat card component
  const SmallStatCard = ({ title, count, subtitle, icon, iconBgColor }) => (
    <Paper
      elevation={0}
      sx={{
        backgroundColor:
          theme.palette.mode === "dark" ? colors.primary[400] : "#ffffff",
        borderRadius: "16px",
        p: 2.5,
        height: "140px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border:
          theme.palette.mode === "dark"
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid #e8ecf0",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
        },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color:
            theme.palette.mode === "dark" ? colors.grey[100] : colors.grey[100],
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>
      <Box display="flex" alignItems="center" gap={2}>
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: iconBgColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography
            variant="h2"
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? colors.grey[100]
                  : colors.grey[100],
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {count}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? colors.grey[400]
                  : colors.grey[500],
              mt: 0.5,
            }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );

  // Action button component
  const ActionButton = ({ title, icon, bgColor, hoverColor }) => (
    <Button
      variant="contained"
      startIcon={icon}
      sx={{
        backgroundColor: bgColor,
        color: "#fff",
        borderRadius: "12px",
        py: 2.5,
        px: 3,
        fontSize: "16px",
        fontWeight: 600,
        textTransform: "none",
        boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
        flex: 1,
        "&:hover": {
          backgroundColor: hoverColor,
          transform: "translateY(-2px)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
        },
        transition: "all 0.3s ease",
      }}
    >
      {title}
    </Button>
  );

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor:
          theme.palette.mode === "dark" ? colors.primary[500] : "#f0f4f8",
        minHeight: "calc(100vh - 70px)",
      }}
    >
      {/* Large Stats Row */}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
        gap={3}
        mb={3}
      >
        <LargeStatCard
          title="Enquiries"
          subtitle="Today"
          count={0}
          bgColor="linear-gradient(135deg, #2196f3 0%, #1976d2 100%)"
          icon={
            <PhoneInTalkOutlinedIcon
              sx={{ color: "#1565c0", fontSize: "28px" }}
            />
          }
          iconBgColor="#ffffff"
        />
        <LargeStatCard
          title="Follow Ups"
          subtitle="Today"
          count={0}
          bgColor="linear-gradient(135deg, #ffb300 0%, #ff8f00 100%)"
          icon={
            <GroupAddOutlinedIcon sx={{ color: "#e65100", fontSize: "28px" }} />
          }
          iconBgColor="#ffffff"
        />
      </Box>

      {/* Small Stats Row */}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr 1fr" }}
        gap={3}
        mb={3}
      >
        <SmallStatCard
          title="Courses"
          count={6}
          subtitle="Manage Courses"
          icon={<MenuBookOutlinedIcon sx={{ color: "#fff", fontSize: "24px" }} />}
          iconBgColor="#2196f3"
        />
        <SmallStatCard
          title="Batches"
          count={2}
          subtitle="Manage Batches"
          icon={<GroupsOutlinedIcon sx={{ color: "#fff", fontSize: "24px" }} />}
          iconBgColor="#4caf50"
        />
        <SmallStatCard
          title="Students"
          count={15}
          subtitle="Manage Students"
          icon={<PersonOutlinedIcon sx={{ color: "#fff", fontSize: "24px" }} />}
          iconBgColor="#ffc107"
        />
        <SmallStatCard
          title="Enrolments"
          count={4}
          subtitle="Manage Enrolments"
          icon={
            <AssignmentTurnedInOutlinedIcon
              sx={{ color: "#fff", fontSize: "24px" }}
            />
          }
          iconBgColor="#e91e63"
        />
      </Box>

      {/* Action Buttons Row */}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr 1fr" }}
        gap={3}
      >
        <ActionButton
          title="Enroll Student"
          icon={<PersonAddAltOutlinedIcon sx={{ fontSize: "24px" }} />}
          bgColor="#1976d2"
          hoverColor="#1565c0"
        />
        <ActionButton
          title="Add Fees"
          icon={<PaymentsOutlinedIcon sx={{ fontSize: "24px" }} />}
          bgColor="#388e3c"
          hoverColor="#2e7d32"
        />
        <ActionButton
          title="Mark Attendance"
          icon={<EventAvailableOutlinedIcon sx={{ fontSize: "24px" }} />}
          bgColor="#d32f2f"
          hoverColor="#c62828"
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
