import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// Modern color design tokens
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#1F2A40",
          500: "#141b2d",
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509",
        },
        blue: {
          100: "#e3f2fd",
          200: "#bbdefb",
          300: "#90caf9",
          400: "#42a5f5",
          500: "#2196f3",
          600: "#1976d2",
          700: "#1565c0",
          800: "#0d47a1",
          900: "#0a3d91",
        },
        green: {
          100: "#e8f5e9",
          200: "#c8e6c9",
          300: "#a5d6a7",
          400: "#66bb6a",
          500: "#4caf50",
          600: "#43a047",
          700: "#388e3c",
          800: "#2e7d32",
          900: "#1b5e20",
        },
        red: {
          100: "#ffebee",
          200: "#ffcdd2",
          300: "#ef9a9a",
          400: "#ef5350",
          500: "#f44336",
          600: "#e53935",
          700: "#d32f2f",
          800: "#c62828",
          900: "#b71c1c",
        },
        amber: {
          100: "#fff8e1",
          200: "#ffecb3",
          300: "#ffe082",
          400: "#ffca28",
          500: "#ffc107",
          600: "#ffb300",
          700: "#ffa000",
          800: "#ff8f00",
          900: "#ff6f00",
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#ffffff",
          500: "#f8fafc",
          600: "#f1f5f9",
          700: "#e2e8f0",
          800: "#cbd5e1",
          900: "#94a3b8",
        },
        blue: {
          100: "#0a3d91",
          200: "#0d47a1",
          300: "#1565c0",
          400: "#1976d2",
          500: "#2196f3",
          600: "#42a5f5",
          700: "#64b5f6",
          800: "#90caf9",
          900: "#bbdefb",
        },
        green: {
          100: "#1b5e20",
          200: "#2e7d32",
          300: "#388e3c",
          400: "#43a047",
          500: "#4caf50",
          600: "#66bb6a",
          700: "#81c784",
          800: "#a5d6a7",
          900: "#c8e6c9",
        },
        red: {
          100: "#b71c1c",
          200: "#c62828",
          300: "#d32f2f",
          400: "#e53935",
          500: "#f44336",
          600: "#ef5350",
          700: "#ef9a9a",
          800: "#ffcdd2",
          900: "#ffebee",
        },
        amber: {
          100: "#ff6f00",
          200: "#ff8f00",
          300: "#ffa000",
          400: "#ffb300",
          500: "#ffc107",
          600: "#ffca28",
          700: "#ffe082",
          800: "#ffecb3",
          900: "#fff8e1",
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.blue[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
              paper: colors.primary[400],
            },
          }
        : {
            primary: {
              main: "#1565c0",
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#f0f4f8",
              paper: "#ffffff",
            },
          }),
    },
    typography: {
      fontFamily: ["DM Sans", "Inter", "sans-serif"].join(","),
      fontSize: 13,
      h1: {
        fontFamily: ["DM Sans", "Inter", "sans-serif"].join(","),
        fontSize: 40,
        fontWeight: 700,
      },
      h2: {
        fontFamily: ["DM Sans", "Inter", "sans-serif"].join(","),
        fontSize: 32,
        fontWeight: 600,
      },
      h3: {
        fontFamily: ["DM Sans", "Inter", "sans-serif"].join(","),
        fontSize: 24,
        fontWeight: 600,
      },
      h4: {
        fontFamily: ["DM Sans", "Inter", "sans-serif"].join(","),
        fontSize: 20,
        fontWeight: 600,
      },
      h5: {
        fontFamily: ["DM Sans", "Inter", "sans-serif"].join(","),
        fontSize: 16,
        fontWeight: 500,
      },
      h6: {
        fontFamily: ["DM Sans", "Inter", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: 500,
      },
      body1: {
        fontFamily: ["DM Sans", "Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
      body2: {
        fontFamily: ["DM Sans", "Inter", "sans-serif"].join(","),
        fontSize: 13,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 8,
            fontWeight: 600,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          },
        },
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
