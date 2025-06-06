import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions, Chip } from '@mui/material';
import { Link } from 'react-router-dom';

const TourPackageCard = ({ tourPackage }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Placeholder image, replace with tourPackage.imageUrl if available */}
      <CardMedia
        component="img"
        height="140"
        image={tourPackage.imageUrl || 'https://via.placeholder.com/345x140?text=Tour+Package'}
        alt={tourPackage.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {tourPackage.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {tourPackage.description ? tourPackage.description.substring(0, 100) + '...' : 'No description available.'}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
          Price: ${tourPackage.price ? tourPackage.price.toFixed(2) : 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Duration: {tourPackage.durationDays ? tourPackage.durationDays + ' days' : 'N/A'}
        </Typography>
        {tourPackage.destination && (
          <Chip label={tourPackage.destination.name} size="small" sx={{ mt: 1 }} />
        )}
      </CardContent>
      <CardActions>
        {/* <Button size="small" component={Link} to={}>Details</Button> */}
        <Button size="small">Book Now</Button> {/* Placeholder */}
      </CardActions>
    </Card>
  );
};

export default TourPackageCard;
