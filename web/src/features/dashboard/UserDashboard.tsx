// src/pages/UserDashboard.tsx
import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useAuth } from "../../auth/useAuth";

const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>
      <Typography variant="body1" paragraph>
        Hello, <b>{user?.username}</b>! You are logged in as a{" "}
        <b>standard user</b>.
      </Typography>
      <Button variant="contained" color="secondary" onClick={logout}>
        Logout
      </Button>
    </Container>
  );
};

export default UserDashboard;
