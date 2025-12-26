import { useState, useRef } from "react";
import {
  Box,
  Typography,
  useTheme,
  Paper,
  TextField,
  Button,
  Breadcrumbs,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import { tokens } from "../../theme";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Link as RouterLink } from "react-router-dom";

const WebsiteSettings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Form state
  const [formData, setFormData] = useState({
    developer: "eshuzo Global Technologies",
    developerWebsite: "https://www.eshuzo.com",
    contactEmail: "contact@localinstitute.com",
    contactPhone: "+91 9876543210",
  });

  // File states with previews
  const [files, setFiles] = useState({
    logo: { file: null, preview: "https://via.placeholder.com/150x50?text=Smart+Institute" },
    logoLight: { file: null, preview: "https://via.placeholder.com/150x50?text=Smart+Institute" },
    favicon: { file: null, preview: "https://via.placeholder.com/40x40?text=S" },
    loginBackground: { file: null, preview: "https://via.placeholder.com/100x60?text=Background" },
  });

  // File input refs
  const logoRef = useRef(null);
  const logoLightRef = useRef(null);
  const faviconRef = useRef(null);
  const loginBgRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (field, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFiles((prev) => ({
          ...prev,
          [field]: {
            file: file,
            preview: reader.result,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // In real app, this would save to backend
    console.log("Saving settings:", { formData, files });
    setSnackbar({
      open: true,
      message: "Website settings saved successfully!",
      severity: "success",
    });
  };

  const FileUploadField = ({ label, field, fileRef, preview }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        py: 2.5,
        borderBottom:
          theme.palette.mode === "dark"
            ? "1px solid rgba(255,255,255,0.05)"
            : "1px solid #f1f5f9",
      }}
    >
      <Typography
        sx={{
          width: 180,
          flexShrink: 0,
          fontWeight: 500,
          color:
            theme.palette.mode === "dark" ? colors.grey[200] : colors.grey[200],
          pt: 1,
        }}
      >
        {label}
      </Typography>
      <Box sx={{ flex: 1 }}>
        {/* Preview */}
        <Box
          sx={{
            mb: 1.5,
            display: "inline-block",
          }}
        >
          <Box
            component="img"
            src={preview}
            alt={label}
            sx={{
              maxHeight: field === "favicon" ? 40 : 50,
              maxWidth: field === "loginBackground" ? 100 : 150,
              objectFit: "contain",
              borderRadius: "4px",
              border:
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid #e8ecf0",
            }}
          />
        </Box>
        {/* File Input */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.2)"
                : "1px solid #e2e8f0",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor:
              theme.palette.mode === "dark" ? colors.primary[500] : "#f8fafc",
          }}
        >
          <Button
            variant="contained"
            onClick={() => fileRef.current?.click()}
            sx={{
              backgroundColor:
                theme.palette.mode === "dark" ? colors.primary[400] : "#e2e8f0",
              color:
                theme.palette.mode === "dark"
                  ? colors.grey[200]
                  : colors.grey[200],
              borderRadius: 0,
              textTransform: "none",
              fontWeight: 500,
              px: 3,
              py: 1.2,
              boxShadow: "none",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? colors.primary[300]
                    : "#cbd5e1",
                boxShadow: "none",
              },
            }}
          >
            Choose File
          </Button>
          <Typography
            sx={{
              px: 2,
              color:
                theme.palette.mode === "dark"
                  ? colors.grey[400]
                  : colors.grey[500],
              fontSize: "14px",
            }}
          >
            {files[field]?.file?.name || "no file selected"}
          </Typography>
          <input
            type="file"
            ref={fileRef}
            onChange={(e) => handleFileChange(field, e)}
            accept="image/*"
            style={{ display: "none" }}
          />
        </Box>
      </Box>
    </Box>
  );

  const TextInputField = ({ label, name, value, placeholder }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        py: 2.5,
        borderBottom:
          theme.palette.mode === "dark"
            ? "1px solid rgba(255,255,255,0.05)"
            : "1px solid #f1f5f9",
      }}
    >
      <Typography
        sx={{
          width: 180,
          flexShrink: 0,
          fontWeight: 500,
          color:
            theme.palette.mode === "dark" ? colors.grey[200] : colors.grey[200],
        }}
      >
        {label}
      </Typography>
      <TextField
        fullWidth
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor:
              theme.palette.mode === "dark" ? colors.primary[500] : "#f8fafc",
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
      />
    </Box>
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
            textDecoration: "underline",
            textDecorationColor: "#1565c0",
            textUnderlineOffset: "4px",
          }}
        >
          Website Settings
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
            Website Settings
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Settings Card */}
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
        <Box sx={{ p: 3 }}>
          {/* Logo */}
          <FileUploadField
            label="Logo"
            field="logo"
            fileRef={logoRef}
            preview={files.logo.preview}
          />

          {/* Logo Light */}
          <FileUploadField
            label="Logo Light"
            field="logoLight"
            fileRef={logoLightRef}
            preview={files.logoLight.preview}
          />

          {/* Favicon */}
          <FileUploadField
            label="Favicon"
            field="favicon"
            fileRef={faviconRef}
            preview={files.favicon.preview}
          />

          {/* Login Background */}
          <FileUploadField
            label="Login Background"
            field="loginBackground"
            fileRef={loginBgRef}
            preview={files.loginBackground.preview}
          />

          {/* Developer */}
          <TextInputField
            label="Developer"
            name="developer"
            value={formData.developer}
            placeholder="Enter developer name"
          />

          {/* Developer Website */}
          <TextInputField
            label="Developer Website"
            name="developerWebsite"
            value={formData.developerWebsite}
            placeholder="Enter developer website URL"
          />

          {/* Contact Email */}
          <TextInputField
            label="Contact Email"
            name="contactEmail"
            value={formData.contactEmail}
            placeholder="Enter contact email"
          />

          {/* Contact Phone */}
          <TextInputField
            label="Contact Phone"
            name="contactPhone"
            value={formData.contactPhone}
            placeholder="Enter contact phone"
          />

          {/* Save Button */}
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              startIcon={<SaveOutlinedIcon />}
              onClick={handleSave}
              sx={{
                backgroundColor: "#4caf50",
                color: "#fff",
                borderRadius: "10px",
                px: 4,
                py: 1.2,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "15px",
                boxShadow: "0 2px 8px rgba(76, 175, 80, 0.3)",
                "&:hover": {
                  backgroundColor: "#43a047",
                  boxShadow: "0 4px 12px rgba(76, 175, 80, 0.4)",
                },
              }}
            >
              Save Settings
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default WebsiteSettings;



