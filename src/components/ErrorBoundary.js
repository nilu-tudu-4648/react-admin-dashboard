import React, { Component } from "react";
import { Typography } from "@mui/material";
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Typography>Something went wrong. Please try again later.</Typography>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;