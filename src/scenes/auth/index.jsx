import { Box, Typography, TextField, Button, useTheme } from "@mui/material";
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
    phone: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
          userType: 'admin',
          isActive: true,
          isLoggedIn: true,
          visits: 1,
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
        await setDoc(doc(db, 'users', userCredential.user.uid), userDoc);
        localStorage.setItem("isAuthenticated", "true");
        window.location.href = "/";
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email.trim(),
          formData.password
        );
        
        const userRef = doc(db, 'users', userCredential.user.uid);
        const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
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
      phone: ""
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
      bgcolor={colors.primary[400]}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: colors.primary[500],
          padding: "2rem",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "400px"
        }}
      >
        <Typography variant="h2" textAlign="center" mb={3}>
          {isLogin ? "Login" : "Sign Up"}
        </Typography>

        {error && (
          <Typography color="error" textAlign="center" mb={2}>
            {error}
          </Typography>
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
              required
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              margin="normal"
              required
            />
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
          required
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: colors.greenAccent[600],
            "&:hover": {
              backgroundColor: colors.greenAccent[700]
            }
          }}
        >
          {isLogin ? "Login" : "Sign Up"}
        </Button>

        <Button
          fullWidth
          onClick={toggleMode}
          sx={{ color: colors.grey[100] }}
        >
          {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
        </Button>
      </Box>
    </Box>
  );
};

export default Auth;