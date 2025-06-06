import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link as RouterLink, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Box, CircularProgress } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import ProtectedAdminRoute from './components/ProtectedAdminRoute';

// Pages
import HomePage from './pages/HomePage';
import DestinationsPage from './pages/DestinationsPage';
import TourPackagesPage from './pages/TourPackagesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminDestinationsPage from './pages/admin/AdminDestinationsPage';
// Placeholder for AdminTourPackagesPage
const AdminTourPackagesPage = () => <Container><Typography variant="h5" sx={{mt:2}}>Admin - Manage Tour Packages (Placeholder)</Typography></Container>;


const UserProfilePage = () => {
  const { currentUser } = useAuth();
  return (
    <Container>
      <Typography variant="h4" sx={{mt:2}}>User Profile</Typography>
      {currentUser ? <Typography>Welcome, {currentUser.username || currentUser.name || 'User'}!</Typography> : <Typography>Not logged in.</Typography>}
       {/* Display more user details if available, e.g., currentUser.email, currentUser.roles */}
      {currentUser && currentUser.roles && <Typography>Roles: {currentUser.roles.join(', ')}</Typography>}
    </Container>
  );
};

const AppContent = () => {
  const { currentUser, logout, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress /> <Typography sx={{ml:2}}>Loading application...</Typography>
      </Box>
    );
  }

  const isAdmin = currentUser && currentUser.roles && currentUser.roles.includes('ROLE_ADMIN');

  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>DssTours</RouterLink>
            </Typography>
            <Button color="inherit" component={RouterLink} to="/destinations">Destinations</Button>
            <Button color="inherit" component={RouterLink} to="/packages">Packages</Button>
            {isAdmin && (
              <Button color="inherit" component={RouterLink} to="/admin">Admin</Button>
            )}
            {currentUser ? (
              <>
                <Button color="inherit" component={RouterLink} to="/profile">Profile</Button>
                <Button color="inherit" onClick={logout}>Logout</Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={RouterLink} to="/login">Login</Button>
                <Button color="inherit" component={RouterLink} to="/register">Register</Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Container component="main" sx={{ marginTop: 3, flexGrow: 1, width: '100%' }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/packages" element={<TourPackagesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<UserProfilePage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedAdminRoute />}>
              <Route index element={<AdminDashboardPage />} /> {/* Default admin page */}
              <Route path="destinations" element={<AdminDestinationsPage />} />
              <Route path="packages" element={<AdminTourPackagesPage />} /> {/* Placeholder */}
            </Route>

            {/* Fallback for unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
        <Box component="footer" sx={{ p: 2, mt: 'auto', backgroundColor: 'primary.main', color: 'white', textAlign: 'center' }}>
          <Typography variant="body2">© {new Date().getFullYear()} DssTours Sri Lanka. All rights reserved.</Typography>
        </Box>
      </Box>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
