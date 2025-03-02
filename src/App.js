import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Form from "./scenes/form";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider, CircularProgress, Box } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import AllStudents from "./scenes/allstudents";
import AttendancePage from "./scenes/AttendancePage";
import PlanExpireStudents from "./scenes/planexpireStudents";
import Auth from "./scenes/auth";
import NotFound from "./scenes/NotFound"; // Create a NotFound component if needed
import ErrorBoundary from "./components/ErrorBoundary"; // Create an ErrorBoundary component

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated")
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check (replace with actual logic, e.g., token validation)
    const checkAuth = () => {
      const auth = localStorage.getItem("isAuthenticated");
      setIsAuthenticated(!!auth);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <CircularProgress />
    </Box>
  );
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  return children;
};

const Layout = ({ children }) => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            {children}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/allstudents"
          element={
            <ProtectedRoute>
              <Layout>
                <AllStudents />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/form"
          element={
            <ProtectedRoute>
              <Layout>
                <Form />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/faq"
          element={
            <ProtectedRoute>
              <Layout>
                <FAQ />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance/:status"
          element={
            <ProtectedRoute>
              <Layout>
                <AttendancePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/planexpire"
          element={
            <ProtectedRoute>
              <Layout>
                <PlanExpireStudents />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Layout>
                <NotFound />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;