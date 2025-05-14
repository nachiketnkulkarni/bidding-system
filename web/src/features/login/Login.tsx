// src/pages/Login.tsx
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useAuth } from "../../auth/useAuth";

const Login: React.FC = () => {
  const { login, isAuthenticated, role } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      // If successful, user will be redirected by useAuth.login logic
    } catch (err) {
      // Display an error message (e.g., invalid credentials)
      setError("Invalid email or password. Please try again.");
    }
  };

  // If the user is already logged in (e.g., came back to /login), redirect them away
  if (isAuthenticated) {
    // Redirect based on role
    const redirectPath =
      role === "admin" ? "/admin/dashboard" : "/user/dashboard";
    window.location.replace(redirectPath);
    return null;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h5" component="h1" textAlign="center">
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">
          Sign In
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
