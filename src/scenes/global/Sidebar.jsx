import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from '@mui/icons-material/Logout';

const Item = ({ title, to, icon, selected, setSelected, onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
        margin: "10px 0",
        borderRadius: "4px",
      }}
      onClick={() => {
        setSelected(title);
        if (onClick) onClick();
      }}
      icon={icon}
    >
      <Typography variant="body1" fontWeight={selected === title ? "600" : "normal"}>
        {title}
      </Typography>
      {to && <Link to={to} />}
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    window.location.href = "/auth";
  };

  return (
    <Box
      sx={{
        height: "100vh",
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          boxShadow: "0 4px 12px 0 rgba(0,0,0,0.05)",
          height: "100%"
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
          padding: "0 8px",
          marginRight: "10px"
        },
        "& .pro-inner-item": {
          padding: "8px 35px 8px 20px !important",
          transition: "all 0.2s ease-in-out",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
          backgroundColor: colors.primary[300],
          transform: "translateX(5px)",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
          backgroundColor: colors.primary[300],
          fontWeight: "bold"
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* Organization Logo and Menu Toggle */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
              borderBottom: `1px solid ${colors.primary[300]}`
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography 
                  variant="h3" 
                  color={colors.grey[100]}
                  sx={{ 
                    fontWeight: "600",
                    letterSpacing: "0.5px"
                  }}
                >
                  Gyan Sarovar
                </Typography>
                <IconButton 
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  sx={{ 
                    "&:hover": { 
                      backgroundColor: colors.primary[300],
                    }
                  }}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box 
                display="flex" 
                justifyContent="center" 
                alignItems="center"
                sx={{
                  "& img": {
                    border: `2px solid ${colors.greenAccent[500]}`,
                    padding: "4px"
                  }
                }}
              >
                <img
                  alt="User Profile"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ 
                    cursor: "pointer", 
                    borderRadius: "50%",
                    objectFit: "cover"
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="600"
                  sx={{ 
                    m: "10px 0 0 0",
                    fontSize: "1.2rem"
                  }}
                >
                  {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
                </Typography>
                <Typography 
                  variant="h5" 
                  color={colors.greenAccent[500]}
                  sx={{ 
                    fontSize: "0.9rem",
                    opacity: 0.9
                  }}
                >
                  {user?.userType || 'Administrator'}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Student Management"
              to="/allstudents"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ 
                m: "15px 0 5px 20px",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                fontWeight: "600"
              }}
            >
              Administration
            </Typography>
            <Item
              title="Student Registration"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Help Center"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Box 
              position="absolute" 
              bottom="20px" 
              width="100%" 
              paddingRight="10%"
              sx={{
                borderTop: `1px solid ${colors.primary[300]}`,
                paddingTop: "15px",
                marginTop: "20px"
              }}
            >
              <Item
                title="Sign Out"
                icon={<LogoutIcon />}
                selected={selected}
                setSelected={setSelected}
                onClick={handleLogout}
              />
            </Box>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;