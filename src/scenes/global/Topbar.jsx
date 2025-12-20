import { Box, IconButton, useTheme, Avatar, Badge, Tooltip } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Topbar = ({ setIsSidebar }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 3,
        py: 1.5,
        backgroundColor:
          theme.palette.mode === "dark" ? colors.primary[400] : "#ffffff",
        borderBottom:
          theme.palette.mode === "dark"
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid #e8ecf0",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Left Section */}
      <Box display="flex" alignItems="center" gap={2}>
        <Tooltip title="Toggle Sidebar">
          <IconButton
            onClick={() => setIsSidebar((prev) => !prev)}
            sx={{
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.08)"
                  : "#f0f4f8",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.12)"
                    : "#e2e8f0",
              },
            }}
          >
            <MenuOutlinedIcon
              sx={{
                color:
                  theme.palette.mode === "dark"
                    ? colors.grey[300]
                    : colors.grey[300],
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Right Section */}
      <Box display="flex" alignItems="center" gap={1}>
        <Tooltip title={theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"}>
          <IconButton
            onClick={colorMode.toggleColorMode}
            sx={{
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.08)"
                  : "#f0f4f8",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.12)"
                    : "#e2e8f0",
              },
            }}
          >
            {theme.palette.mode === "dark" ? (
              <LightModeOutlinedIcon sx={{ color: colors.grey[300] }} />
            ) : (
              <DarkModeOutlinedIcon sx={{ color: colors.grey[300] }} />
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title="Notifications">
          <IconButton
            sx={{
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.08)"
                  : "#f0f4f8",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.12)"
                    : "#e2e8f0",
              },
            }}
          >
            <Badge
              badgeContent={3}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "10px",
                  height: "18px",
                  minWidth: "18px",
                },
              }}
            >
              <NotificationsOutlinedIcon
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? colors.grey[300]
                      : colors.grey[300],
                }}
              />
            </Badge>
          </IconButton>
        </Tooltip>

        <Box sx={{ ml: 1 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: "#1565c0",
              cursor: "pointer",
              border:
                theme.palette.mode === "dark"
                  ? "2px solid rgba(255,255,255,0.2)"
                  : "2px solid #e2e8f0",
              "&:hover": {
                transform: "scale(1.05)",
              },
              transition: "transform 0.2s ease",
            }}
          >
            A
          </Avatar>
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
