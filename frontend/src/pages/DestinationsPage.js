import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import DestinationCard from '../components/DestinationCard';
import { getAllDestinations } from '../services/api'; // Using the updated api.js

const DestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllDestinations()
      .then(data => {
        setDestinations(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching destinations:", err);
        setError('Failed to load destinations. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress />
        <Typography>Loading destinations...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={{ marginTop: '20px' }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Explore Our Destinations
      </Typography>
      {destinations.length === 0 ? (
        <Typography>No destinations available at the moment.</Typography>
      ) : (
        <Grid container spacing={3}>
          {destinations.map(destination => (
            <Grid item key={destination.id} xs={12} sm={6} md={4}>
              <DestinationCard destination={destination} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default DestinationsPage;
