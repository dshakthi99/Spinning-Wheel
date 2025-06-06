import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, CircularProgress, Alert, Box } from '@mui/material';
import TourPackageCard from '../components/TourPackageCard';
import { getAllTourPackages } from '../services/api';

const TourPackagesPage = () => {
  const [tourPackages, setTourPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllTourPackages()
      .then(data => {
        setTourPackages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching tour packages:", err);
        setError('Failed to load tour packages. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', py: 5 }}>
        <CircularProgress />
        <Typography>Loading tour packages...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Our Tour Packages
      </Typography>
      {tourPackages.length === 0 ? (
        <Typography>No tour packages available at the moment.</Typography>
      ) : (
        <Grid container spacing={3}>
          {tourPackages.map(pkg => (
            <Grid item key={pkg.id} xs={12} sm={6} md={4}>
              <Box sx={{ height: '100%' }}> {/* Ensure cards in a row take same height if desired */}
                <TourPackageCard tourPackage={pkg} />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default TourPackagesPage;
