import React from 'react';
import { Container, Typography, Button, Grid, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const AdminDashboardPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 2, mb: 3 }}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6">Manage Destinations</Typography>
            <Button variant="contained" component={RouterLink} to="/admin/destinations" sx={{ mt: 2 }}>
              Go to Destinations
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6">Manage Tour Packages</Typography>
            <Button variant="contained" component={RouterLink} to="/admin/packages" sx={{ mt: 2 }}> {/* Placeholder link */}
              Go to Tour Packages
            </Button>
          </Paper>
        </Grid>
        {/* Add more admin sections here */}
      </Grid>
    </Container>
  );
};

export default AdminDashboardPage;
