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
  Button,
  Breadcrumbs,
  Link,
  Chip,
} from "@mui/material";
import { tokens } from "../../theme";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SearchIcon from "@mui/icons-material/Search";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddIcon from "@mui/icons-material/Add";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link as RouterLink } from "react-router-dom";

// Mock data for library items
const mockLibraryData = [
  {
    id: 1,
    type: "Live",
    title: "Batch 1, Lecture 30 - 10 AM",
    fileLink: "https://example.com/live/batch1",
    linkType: "link",
    access: "Free",
    lastUpdated: "2025-11-15",
  },
  {
    id: 2,
    type: "Quiz",
    title: "This is a demo quiz",
    fileLink: "https://example.com/quiz/demo",
    linkType: "link",
    access: "Restricted",
    lastUpdated: "2025-11-14",
  },
  {
    id: 3,
    type: "Links",
    title: "This is a test link to a website",
    fileLink: "https://example.com/external",
    linkType: "link",
    access: "Restricted",
    lastUpdated: "2025-11-13",
  },
  {
    id: 4,
    type: "Videos",
    title: "This is a test video link",
    fileLink: "https://youtube.com/watch?v=abc123",
    linkType: "link",
    access: "Restricted",
    lastUpdated: "2025-11-12",
  },
  {
    id: 5,
    type: "Downloads",
    title: "This s a Test download file",
    fileLink: "/files/test-download.pdf",
    linkType: "file",
    access: "Free",
    lastUpdated: "2025-11-11",
  },
  {
    id: 6,
    type: "Study Materials",
    title: "This is a test study Material",
    fileLink: "/files/study-material.pdf",
    linkType: "file",
    access: "Free",
    lastUpdated: "2025-11-10",
  },
  {
    id: 7,
    type: "Assignments",
    title: "This is a test Assignment",
    fileLink: "/files/assignment.pdf",
    linkType: "file",
    access: "Free",
    lastUpdated: "2025-11-09",
  },
  {
    id: 8,
    type: "Live",
    title: "Batch 2, Lecture 15 - 2 PM",
    fileLink: "https://example.com/live/batch2",
    linkType: "link",
    access: "Restricted",
    lastUpdated: "2025-11-08",
  },
  {
    id: 9,
    type: "Quiz",
    title: "Chapter 5 Assessment",
    fileLink: "https://example.com/quiz/ch5",
    linkType: "link",
    access: "Free",
    lastUpdated: "2025-11-07",
  },
  {
    id: 10,
    type: "Videos",
    title: "Introduction to React Hooks",
    fileLink: "https://youtube.com/watch?v=xyz789",
    linkType: "link",
    access: "Free",
    lastUpdated: "2025-11-06",
  },
];

const Library = () => {
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

  const filteredData = mockLibraryData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getTypeColor = (type) => {
    const typeColors = {
      Live: { bg: "#e3f2fd", text: "#1565c0" },
      Quiz: { bg: "#fff3e0", text: "#e65100" },
      Links: { bg: "#e8f5e9", text: "#2e7d32" },
      Videos: { bg: "#fce4ec", text: "#c2185b" },
      Downloads: { bg: "#f3e5f5", text: "#7b1fa2" },
      "Study Materials": { bg: "#e0f2f1", text: "#00695c" },
      Assignments: { bg: "#fff8e1", text: "#f9a825" },
    };
    return typeColors[type] || { bg: "#f5f5f5", text: "#616161" };
  };

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
          Student Corner Library
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
            Student Corner Library
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Add New Button */}
      <Box mb={3}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            borderRadius: "8px",
            px: 3,
            py: 1,
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)",
            "&:hover": {
              backgroundColor: "#1565c0",
              boxShadow: "0 4px 12px rgba(25, 118, 210, 0.4)",
            },
          }}
        >
          Add New
        </Button>
      </Box>

      {/* Library List Card */}
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
            Student Corner Library
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
                {["#", "Action", "Type", "Title", "File/Link", "Access", "Last Updated"].map(
                  (header) => (
                    <TableCell
                      key={header}
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
                      {header}
                    </TableCell>
                  )
                )}
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
                    <Box display="flex" gap={0.5}>
                      <IconButton
                        size="small"
                        sx={{
                          backgroundColor: "#ffc107",
                          color: "#fff",
                          width: 30,
                          height: 30,
                          "&:hover": {
                            backgroundColor: "#ffb300",
                          },
                        }}
                      >
                        <EditOutlinedIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{
                          backgroundColor: "#f44336",
                          color: "#fff",
                          width: 30,
                          height: 30,
                          "&:hover": {
                            backgroundColor: "#d32f2f",
                          },
                        }}
                      >
                        <DeleteOutlinedIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          backgroundColor: "#4caf50",
                          color: "#fff",
                          fontSize: "11px",
                          fontWeight: 600,
                          textTransform: "none",
                          minWidth: "auto",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: "6px",
                          "&:hover": {
                            backgroundColor: "#43a047",
                          },
                        }}
                      >
                        Deactivate
                      </Button>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "1px solid #f1f5f9",
                    }}
                  >
                    <Chip
                      label={row.type}
                      size="small"
                      sx={{
                        backgroundColor: getTypeColor(row.type).bg,
                        color: getTypeColor(row.type).text,
                        fontWeight: 500,
                        fontSize: "12px",
                      }}
                    />
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
                      maxWidth: 250,
                    }}
                  >
                    {row.title}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "1px solid #f1f5f9",
                    }}
                  >
                    {row.linkType === "link" ? (
                      <Link
                        href={row.fileLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: "#1565c0",
                          textDecoration: "none",
                          fontWeight: 500,
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        Open Link
                      </Link>
                    ) : (
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<VisibilityOutlinedIcon sx={{ fontSize: 14 }} />}
                        sx={{
                          color: "#1565c0",
                          borderColor: "#1565c0",
                          fontSize: "12px",
                          fontWeight: 500,
                          textTransform: "none",
                          borderRadius: "6px",
                          py: 0.3,
                          "&:hover": {
                            backgroundColor: "rgba(21, 101, 192, 0.08)",
                            borderColor: "#1565c0",
                          },
                        }}
                      >
                        View File
                      </Button>
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "1px solid #f1f5f9",
                    }}
                  >
                    <Typography
                      sx={{
                        color:
                          row.access === "Free"
                            ? theme.palette.mode === "dark"
                              ? "#4caf50"
                              : "#2e7d32"
                            : theme.palette.mode === "dark"
                            ? "#ff9800"
                            : "#e65100",
                        fontWeight: 500,
                        fontSize: "13px",
                      }}
                    >
                      {row.access}
                    </Typography>
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

export default Library;


