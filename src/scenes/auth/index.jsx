import { Box, Typography, TextField, Button, useTheme, Divider } from "@mui/material";
import { useState } from "react";
import { tokens } from "../../theme";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

const Auth = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!isLogin) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email.trim(),
          formData.password
        );

        const userDoc = {
          uid: userCredential.user.uid,
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          userType: "admin",
          isActive: true,
          isLoggedIn: true,
          visits: 1,
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
        await setDoc(doc(db, "users", userCredential.user.uid), userDoc);
        localStorage.setItem("isAuthenticated", "true");
        window.location.href = "/";
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email.trim(),
          formData.password
        );
        
        const userRef = doc(db, "users", userCredential.user.uid);
        const userDoc = await getDoc(userRef);
        await setDoc(userRef, {
          isLoggedIn: true,
          lastLoginAt: serverTimestamp(),
        }, { merge: true });
        localStorage.setItem("user", JSON.stringify(userDoc.data()));
        localStorage.setItem("isAuthenticated", "true");
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
    });
    setError("");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{
        background: `linear-gradient(135deg, ${colors.primary[400]}, ${colors.primary[600]})`,
        padding: "2rem 1rem",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: "white",
          padding: "2.5rem",
          borderRadius: "15px",
          width: "100%",
          maxWidth: "450px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          variant="h2"
          textAlign="center"
          mb={4}
          sx={{
            color: colors.grey[100],
            fontSize: "2.5rem",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
          }}
        >
          {isLogin ? "Login" : "Sign Up"}
        </Typography>

        {error && (
          <Box
            sx={{
              backgroundColor: colors.redAccent[500],
              color: colors.grey[100],
              p: 1.5,
              borderRadius: "5px",
              mb: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="body2">{error}</Typography>
          </Box>
        )}

        {!isLogin && (
          <>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              InputLabelProps={{ style: { color: colors.grey[100] } }}
              InputProps={{ style: { color: colors.grey[100] } }}
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              InputLabelProps={{ style: { color: colors.grey[100] } }}
              InputProps={{ style: { color: colors.grey[100] } }}
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              InputLabelProps={{ style: { color: colors.grey[100] } }}
              InputProps={{ style: { color: colors.grey[100] } }}
            />
            <Divider sx={{ my: 2, borderColor: colors.grey[300] }} />
          </>
        )}

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          InputLabelProps={{ style: { color: colors.grey[100] } }}
          InputProps={{ style: { color: colors.grey[100] } }}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          InputLabelProps={{ style: { color: colors.grey[100] } }}
          InputProps={{ style: { color: colors.grey[100] } }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            padding: "0.8rem",
            background: `linear-gradient(90deg, ${colors.greenAccent[600]}, ${colors.greenAccent[700]})`,
            "&:hover": {
              background: `linear-gradient(90deg, ${colors.greenAccent[700]}, ${colors.greenAccent[800]})`,
            },
            color: colors.grey[100],
            textTransform: "none",
            fontSize: "1.1rem",
          }}
        >
          {isLogin ? "Login" : "Sign Up"}
        </Button>

        <Button
          fullWidth
          onClick={toggleMode}
          sx={{
            color: colors.blueAccent[500],
            "&:hover": {
              color: colors.blueAccent[600],
              backgroundColor: "transparent",
            },
            textTransform: "none",
            padding: "0.5rem 0",
          }}
        >
          {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
        </Button>
      </Box>
    </Box>
  );
};

export default Auth;