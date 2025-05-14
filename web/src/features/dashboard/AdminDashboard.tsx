// src/pages/AdminDashboard.tsx
import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useAuth } from "../../auth/useAuth";

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome, <b>{user?.username}</b>! You are logged in as an <b>admin</b>.
      </Typography>
      <Button variant="contained" color="secondary" onClick={logout}>
        Logout
      </Button>
    </Container>
  );
};

export default AdminDashboard;
