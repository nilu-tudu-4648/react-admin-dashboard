import { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  Link,
  Breadcrumbs,
} from "@mui/material";
import { tokens } from "../../theme";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SearchIcon from "@mui/icons-material/Search";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link as RouterLink } from "react-router-dom";

// Mock data for media items
const mockMediaData = [
  {
    id: 1,
    title: "About Image",
    type: "Image",
    media: "/assets/about-image.jpg",
    lastUpdated: "2025-10-08 06:16:55",
  },
  {
    id: 2,
    title: "Hero Image",
    type: "Image",
    media: "/assets/hero-image.jpg",
    lastUpdated: "2025-11-11 04:47:43",
  },
  {
    id: 3,
    title: "Hero Video",
    type: "Links",
    media: "https://www.youtube.com/embed/r44RKWyfcFw?controls=0&modestbranding=1&rel=0",
    lastUpdated: "2025-10-06 05:58:26",
  },
  {
    id: 4,
    title: "Slider 1",
    type: "Image",
    media: "/assets/slider-1.jpg",
    lastUpdated: "2025-11-13 05:28:39",
  },
  {
    id: 5,
    title: "Slider 2",
    type: "Image",
    media: "/assets/slider-2.jpg",
    lastUpdated: "2025-12-02 00:52:21",
  },
  {
    id: 6,
    title: "Slider 3",
    type: "Image",
    media: "/assets/slider-3.jpg",
    lastUpdated: "2025-11-10 02:03:25",
  },
  {
    id: 7,
    title: "Slider 4",
    type: "Image",
    media: "/assets/slider-4.jpg",
    lastUpdated: "2025-11-10 02:26:52",
  },
  {
    id: 8,
    title: "Course Banner",
    type: "Image",
    media: "/assets/course-banner.jpg",
    lastUpdated: "2025-10-15 10:30:00",
  },
  {
    id: 9,
    title: "Promo Video",
    type: "Links",
    media: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    lastUpdated: "2025-09-20 14:45:00",
  },
  {
    id: 10,
    title: "Footer Logo",
    type: "Image",
    media: "/assets/footer-logo.png",
    lastUpdated: "2025-08-10 08:00:00",
  },
];

const Media = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = mockMediaData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
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
      {/* Header with Breadcrumb */}
      <Box mb={3}>
        <Typography
          variant="h3"
          sx={{
            color:
              theme.palette.mode === "dark" ? colors.grey[100] : colors.grey[100],
            fontWeight: 600,
            mb: 1,
          }}
        >
          Media
        </Typography>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{
            "& .MuiBreadcrumbs-separator": {
              color:
                theme.palette.mode === "dark"
                  ? colors.grey[500]
                  : colors.grey[500],
            },
          }}
        >
          <Link
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              color:
                theme.palette.mode === "dark"
                  ? colors.grey[400]
                  : colors.grey[500],
              textDecoration: "none",
              "&:hover": {
                color: "#1565c0",
              },
            }}
          >
            Home
          </Link>
          <Typography
            sx={{
              color: "#1565c0",
              fontWeight: 500,
            }}
          >
            Media
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Media List Card */}
      <Paper
        elevation={0}
        sx={{
          backgroundColor:
            theme.palette.mode === "dark" ? colors.primary[400] : "#ffffff",
          borderRadius: "16px",
          border:
            theme.palette.mode === "dark"
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid #e8ecf0",
          overflow: "hidden",
        }}
      >
        {/* Card Header */}
        <Box
          sx={{
            p: 3,
            borderBottom:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid #e8ecf0",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? colors.grey[100]
                  : colors.grey[100],
              fontWeight: 600,
            }}
          >
            Media List
          </Typography>
        </Box>

        {/* Filters Row */}
        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {/* Rows per page selector */}
          <FormControl size="small">
            <Select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              sx={{
                minWidth: 80,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? colors.primary[500]
                    : "#f8fafc",
                borderRadius: "8px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.2)"
                      : "#e2e8f0",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1565c0",
                },
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>

          {/* Search */}
          <TextField
            placeholder="Search..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: 250,
              "& .MuiOutlinedInput-root": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? colors.primary[500]
                    : "#f8fafc",
                borderRadius: "8px",
                "& fieldset": {
                  borderColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.2)"
                      : "#e2e8f0",
                },
                "&:hover fieldset": {
                  borderColor: "#1565c0",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1565c0",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon
                    sx={{
                      color:
                        theme.palette.mode === "dark"
                          ? colors.grey[500]
                          : colors.grey[600],
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? colors.primary[500]
                      : "#f8fafc",
                }}
              >
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color:
                      theme.palette.mode === "dark"
                        ? colors.grey[200]
                        : colors.grey[200],
                    borderBottom:
                      theme.palette.mode === "dark"
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "1px solid #e8ecf0",
                  }}
                >
                  #
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color:
                      theme.palette.mode === "dark"
                        ? colors.grey[200]
                        : colors.grey[200],
                    borderBottom:
                      theme.palette.mode === "dark"
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "1px solid #e8ecf0",
                  }}
                >
                  Action
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color:
                      theme.palette.mode === "dark"
                        ? colors.grey[200]
                        : colors.grey[200],
                    borderBottom:
                      theme.palette.mode === "dark"
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "1px solid #e8ecf0",
                  }}
                >
                  Title
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color:
                      theme.palette.mode === "dark"
                        ? colors.grey[200]
                        : colors.grey[200],
                    borderBottom:
                      theme.palette.mode === "dark"
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "1px solid #e8ecf0",
                  }}
                >
                  Type
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color:
                      theme.palette.mode === "dark"
                        ? colors.grey[200]
                        : colors.grey[200],
                    borderBottom:
                      theme.palette.mode === "dark"
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "1px solid #e8ecf0",
                  }}
                >
                  Media
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color:
                      theme.palette.mode === "dark"
                        ? colors.grey[200]
                        : colors.grey[200],
                    borderBottom:
                      theme.palette.mode === "dark"
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "1px solid #e8ecf0",
                  }}
                >
                  Last Updated
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.05)"
                          : "#f8fafc",
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      color:
                        theme.palette.mode === "dark"
                          ? colors.grey[300]
                          : colors.grey[300],
                      borderBottom:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "1px solid #f1f5f9",
                    }}
                  >
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "1px solid #f1f5f9",
                    }}
                  >
                    <IconButton
                      size="small"
                      sx={{
                        backgroundColor: "#ffc107",
                        color: "#fff",
                        width: 32,
                        height: 32,
                        "&:hover": {
                          backgroundColor: "#ffb300",
                        },
                      }}
                    >
                      <EditOutlinedIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </TableCell>
                  <TableCell
                    sx={{
                      color:
                        theme.palette.mode === "dark"
                          ? colors.grey[200]
                          : colors.grey[200],
                      fontWeight: 500,
                      borderBottom:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "1px solid #f1f5f9",
                    }}
                  >
                    {row.title}
                  </TableCell>
                  <TableCell
                    sx={{
                      color:
                        theme.palette.mode === "dark"
                          ? colors.grey[300]
                          : colors.grey[300],
                      borderBottom:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "1px solid #f1f5f9",
                    }}
                  >
                    {row.type}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "1px solid #f1f5f9",
                    }}
                  >
                    {row.type === "Image" ? (
                      <Box
                        sx={{
                          width: 80,
                          height: 50,
                          borderRadius: "8px",
                          overflow: "hidden",
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? colors.primary[500]
                              : "#f1f5f9",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Box
                          component="img"
                          src={`https://picsum.photos/seed/${row.id}/80/50`}
                          alt={row.title}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                    ) : (
                      <Link
                        href={row.media}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: "#1565c0",
                          fontSize: "13px",
                          wordBreak: "break-all",
                          maxWidth: 300,
                          display: "block",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {row.media}
                      </Link>
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      color:
                        theme.palette.mode === "dark"
                          ? colors.grey[300]
                          : colors.grey[300],
                      borderBottom:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "1px solid #f1f5f9",
                    }}
                  >
                    {row.lastUpdated}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          sx={{
            borderTop:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid #e8ecf0",
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
              color:
                theme.palette.mode === "dark"
                  ? colors.grey[400]
                  : colors.grey[400],
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default Media;

