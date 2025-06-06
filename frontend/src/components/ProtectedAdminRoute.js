import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Typography, Container, CircularProgress, Box } from '@mui/material';

const ProtectedAdminRoute = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
          <Typography sx={{ml:1}}>Verifying access...</Typography>
        </Box>
      </Container>
    );
  }

  // Check for currentUser and then for roles
  const isAdmin = currentUser && currentUser.roles && currentUser.roles.includes('ROLE_ADMIN');

  if (!currentUser) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    // Logged in but not an admin
    return (
      <Container>
        <Typography variant="h5" color="error" sx={{mt:3}}>Access Denied</Typography>
        <Typography sx={{mt:1}}>You do not have permission to view this page.</Typography>
      </Container>
    );
  }

  return <Outlet />; // User is admin, render the child route's element
};

export default ProtectedAdminRoute;
