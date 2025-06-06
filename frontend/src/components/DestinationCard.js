import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import { Link } from 'react-router-dom'; // If we want a details page later

const DestinationCard = ({ destination }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={destination.imageUrl || 'https://via.placeholder.com/345x140?text=Destination'} // Placeholder if no image
        alt={destination.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {destination.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {destination.description ? destination.description.substring(0, 100) + '...' : 'No description available.'}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
          Location: {destination.location || 'N/A'}
        </Typography>
      </CardContent>
      <CardActions>
        {/* Example for future navigation to a details page */}
        {/* <Button size="small" component={Link} to={}>Learn More</Button> */}
        <Button size="small">View Packages</Button> {/* Placeholder */}
      </CardActions>
    </Card>
  );
};

export default DestinationCard;
