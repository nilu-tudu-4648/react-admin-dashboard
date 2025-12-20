import { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { tokens } from "../../theme";

// Icons
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const SubMenuItem = ({ title, to, selected, setSelected, isCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isActive = selected === title;

  return (
    <ListItemButton
      component={Link}
      to={to}
      selected={isActive}
      onClick={() => setSelected(title)}
      sx={{
        borderRadius: "10px",
        mx: 1,
        mb: 0.3,
        py: 0.8,
        pl: 2,
        backgroundColor: isActive
          ? theme.palette.mode === "dark"
            ? "rgba(255, 193, 7, 0.2)"
            : "#fff3cd"
          : "transparent",
        color: isActive
          ? theme.palette.mode === "dark"
            ? "#ffc107"
            : "#1565c0"
          : theme.palette.mode === "dark"
          ? colors.grey[400]
          : colors.grey[400],
        "&:hover": {
          backgroundColor: isActive
            ? theme.palette.mode === "dark"
              ? "rgba(255, 193, 7, 0.25)"
              : "#fff3cd"
            : theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.05)"
            : "rgba(21, 101, 192, 0.05)",
        },
        transition: "all 0.2s ease",
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 24,
          color: "inherit",
        }}
      >
        <FiberManualRecordIcon sx={{ fontSize: 8 }} />
      </ListItemIcon>
      {!isCollapsed && (
        <ListItemText
          primary={title}
          primaryTypographyProps={{
            fontSize: "13px",
            fontWeight: isActive ? 600 : 400,
          }}
        />
      )}
    </ListItemButton>
  );
};

const MenuItem = ({ title, to, icon, selected, setSelected, isCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isActive = selected === title;

  return (
    <ListItemButton
      component={Link}
      to={to}
      selected={isActive}
      onClick={() => setSelected(title)}
      sx={{
        borderRadius: "10px",
        mx: 1,
        mb: 0.5,
        py: 1.2,
        backgroundColor: isActive
          ? theme.palette.mode === "dark"
            ? "rgba(21, 101, 192, 0.3)"
            : "#1565c0"
          : "transparent",
        color: isActive
          ? "#fff"
          : theme.palette.mode === "dark"
          ? colors.grey[300]
          : colors.grey[200],
        "&:hover": {
          backgroundColor: isActive
            ? theme.palette.mode === "dark"
              ? "rgba(21, 101, 192, 0.4)"
              : "#1565c0"
            : theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.08)"
            : "rgba(21, 101, 192, 0.08)",
        },
        transition: "all 0.2s ease",
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: isCollapsed ? "auto" : 40,
          color: "inherit",
        }}
      >
        {icon}
      </ListItemIcon>
      {!isCollapsed && (
        <ListItemText
          primary={title}
          primaryTypographyProps={{
            fontSize: "14px",
            fontWeight: isActive ? 600 : 500,
          }}
        />
      )}
    </ListItemButton>
  );
};

const MenuItemWithSubmenu = ({
  title,
  icon,
  children,
  isCollapsed,
  openMenus,
  toggleMenu,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isOpen = openMenus[title] || false;

  return (
    <>
      <ListItemButton
        onClick={() => toggleMenu(title)}
        sx={{
          borderRadius: "10px",
          mx: 1,
          mb: 0.5,
          py: 1.2,
          backgroundColor: isOpen
            ? theme.palette.mode === "dark"
              ? "rgba(21, 101, 192, 0.2)"
              : "#1565c0"
            : "transparent",
          color: isOpen
            ? "#fff"
            : theme.palette.mode === "dark"
            ? colors.grey[300]
            : colors.grey[200],
          "&:hover": {
            backgroundColor: isOpen
              ? theme.palette.mode === "dark"
                ? "rgba(21, 101, 192, 0.25)"
                : "#1565c0"
              : theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.08)"
              : "rgba(21, 101, 192, 0.08)",
          },
          transition: "all 0.2s ease",
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: isCollapsed ? "auto" : 40,
            color: "inherit",
          }}
        >
          {icon}
        </ListItemIcon>
        {!isCollapsed && (
          <>
            <ListItemText
              primary={title}
              primaryTypographyProps={{
                fontSize: "14px",
                fontWeight: 500,
              }}
            />
            {isOpen ? (
              <ExpandLess sx={{ fontSize: 20 }} />
            ) : (
              <ExpandMore sx={{ fontSize: 20 }} />
            )}
          </>
        )}
      </ListItemButton>
      {!isCollapsed && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 2 }}>
            {children}
          </List>
        </Collapse>
      )}
    </>
  );
};

const Sidebar = ({ isSidebar }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState(() => {
    const path = location.pathname;
    if (path === "/") return "Dashboard";
    // Website
    if (path.includes("/website/notice")) return "Notice";
    if (path.includes("/website/content")) return "Content";
    if (path.includes("/website/media")) return "Media";
    if (path.includes("/website/services")) return "Services";
    if (path.includes("/website/courses")) return "Courses";
    if (path.includes("/website/gallery")) return "Gallery";
    if (path.includes("/website/testimonials")) return "Testimonials";
    if (path.includes("/website/faq")) return "FAQ";
    // Student Corner
    if (path.includes("/student-corner/library")) return "Student Corner Library";
    if (path.includes("/student-corner/students")) return "Students";
    if (path.includes("/student-corner/users")) return "Users";
    if (path.includes("/student-corner/id-card")) return "Student ID Card";
    if (path.includes("/student-corner/enrolments")) return "Enrolments";
    if (path.includes("/student-corner/attendance")) return "Attendance";
    if (path.includes("/student-corner/fees")) return "Fees";
    if (path.includes("/student-corner/batches")) return "Batches";
    if (path.includes("/student-corner/certificate")) return "Certificate";
    if (path.includes("/student-corner/employee-cards")) return "Employee Cards";
    if (path.includes("/student-corner/enquiry-references")) return "Enquiry References";
    return "Dashboard";
  });
  const [openMenus, setOpenMenus] = useState(() => {
    const path = location.pathname;
    if (path.includes("/website/")) return { Website: true };
    if (path.includes("/student-corner/")) return { "Student Corner": true };
    if (path.includes("/institute/")) return { "Institute Management": true };
    return {};
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  if (!isSidebar) return null;

  return (
    <Box
      sx={{
        width: isCollapsed ? "80px" : "270px",
        minWidth: isCollapsed ? "80px" : "270px",
        height: "100vh",
        backgroundColor:
          theme.palette.mode === "dark" ? colors.primary[400] : "#ffffff",
        borderRight:
          theme.palette.mode === "dark"
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid #e8ecf0",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        overflowY: "auto",
        overflowX: "hidden",
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.2)"
              : "rgba(0,0,0,0.2)",
          borderRadius: "3px",
        },
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "space-between",
          borderBottom:
            theme.palette.mode === "dark"
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid #e8ecf0",
          minHeight: "70px",
        }}
      >
        {!isCollapsed && (
          <Box
            sx={{
              border: "2px solid #1565c0",
              borderRadius: "4px",
              px: 1.5,
              py: 0.5,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#1565c0",
                fontWeight: 700,
                letterSpacing: "-0.5px",
              }}
            >
              Local Institute
            </Typography>
          </Box>
        )}
        <IconButton
          onClick={() => setIsCollapsed(!isCollapsed)}
          sx={{
            color:
              theme.palette.mode === "dark" ? colors.grey[300] : colors.grey[400],
          }}
        >
          <MenuOutlinedIcon />
        </IconButton>
      </Box>

      {/* Navigation Items */}
      <Box sx={{ flex: 1, py: 2 }}>
        <List component="nav" disablePadding>
          <MenuItem
            title="Dashboard"
            to="/"
            icon={<DashboardOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed}
          />

          <MenuItemWithSubmenu
            title="Website"
            icon={<LanguageOutlinedIcon />}
            isCollapsed={isCollapsed}
            openMenus={openMenus}
            toggleMenu={toggleMenu}
          >
            <SubMenuItem
              title="Notice"
              to="/website/notice"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Content"
              to="/website/content"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Media"
              to="/website/media"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Services"
              to="/website/services"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Courses"
              to="/website/courses"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Gallery"
              to="/website/gallery"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Testimonials"
              to="/website/testimonials"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="FAQ"
              to="/website/faq"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          </MenuItemWithSubmenu>

          <MenuItemWithSubmenu
            title="Enquiry"
            icon={<QuestionAnswerOutlinedIcon />}
            isCollapsed={isCollapsed}
            openMenus={openMenus}
            toggleMenu={toggleMenu}
          >
            <SubMenuItem
              title="All Enquiries"
              to="/enquiry/all"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Follow Ups"
              to="/enquiry/followups"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          </MenuItemWithSubmenu>

          <MenuItemWithSubmenu
            title="Student Corner"
            icon={<SchoolOutlinedIcon />}
            isCollapsed={isCollapsed}
            openMenus={openMenus}
            toggleMenu={toggleMenu}
          >
            <SubMenuItem
              title="Student Corner Library"
              to="/student-corner/library"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Students"
              to="/student-corner/students"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Users"
              to="/student-corner/users"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Student ID Card"
              to="/student-corner/id-card"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Enrolments"
              to="/student-corner/enrolments"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Attendance"
              to="/student-corner/attendance"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Fees"
              to="/student-corner/fees"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Batches"
              to="/student-corner/batches"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Certificate"
              to="/student-corner/certificate"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Employee Cards"
              to="/student-corner/employee-cards"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Enquiry References"
              to="/student-corner/enquiry-references"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          </MenuItemWithSubmenu>

          <MenuItemWithSubmenu
            title="Institute Management"
            icon={<BusinessOutlinedIcon />}
            isCollapsed={isCollapsed}
            openMenus={openMenus}
            toggleMenu={toggleMenu}
          >
            <SubMenuItem
              title="Students"
              to="/institute/students"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Student ID Card"
              to="/institute/id-card"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Enrolments"
              to="/institute/enrolments"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Attendance"
              to="/institute/attendance"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Fees"
              to="/institute/fees"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Batches"
              to="/institute/batches"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Certificate"
              to="/institute/certificate"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Employee Cards"
              to="/institute/employee-cards"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Enquiry References"
              to="/institute/enquiry-references"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          </MenuItemWithSubmenu>

          <MenuItem
            title="Expense Register"
            to="/expenses"
            icon={<AccountBalanceWalletOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed}
          />

          <MenuItemWithSubmenu
            title="Blogs"
            icon={<ArticleOutlinedIcon />}
            isCollapsed={isCollapsed}
            openMenus={openMenus}
            toggleMenu={toggleMenu}
          >
            <SubMenuItem
              title="All Posts"
              to="/blogs/posts"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Categories"
              to="/blogs/categories"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          </MenuItemWithSubmenu>

          <MenuItemWithSubmenu
            title="Reports"
            icon={<AssessmentOutlinedIcon />}
            isCollapsed={isCollapsed}
            openMenus={openMenus}
            toggleMenu={toggleMenu}
          >
            <SubMenuItem
              title="Financial"
              to="/reports/financial"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Student Reports"
              to="/reports/students"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          </MenuItemWithSubmenu>

          <MenuItemWithSubmenu
            title="Settings"
            icon={<SettingsOutlinedIcon />}
            isCollapsed={isCollapsed}
            openMenus={openMenus}
            toggleMenu={toggleMenu}
          >
            <SubMenuItem
              title="General Settings"
              to="/settings/general"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Website Settings"
              to="/settings/website"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="SEO Settings"
              to="/settings/seo"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Email Settings"
              to="/settings/email"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Subscription Settings"
              to="/settings/subscription"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="QR Codes"
              to="/settings/qr-codes"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenuItem
              title="Ads Settings"
              to="/settings/ads"
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          </MenuItemWithSubmenu>

          <MenuItem
            title="Newsletter"
            to="/newsletter"
            icon={<EmailOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed}
          />

          <MenuItem
            title="Feedback"
            to="/feedback"
            icon={<FeedbackOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed}
          />
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
