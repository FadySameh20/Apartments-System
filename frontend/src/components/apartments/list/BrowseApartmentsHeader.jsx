import React from 'react';
import { Paper, Typography } from '@mui/material';

/**
 * Header component for the apartments list page
 */
const BrowseApartmentsHeader = () => (
  <Paper 
    elevation={0} 
    sx={{ 
      p: { xs: 2, md: 4 }, 
      mb: 4, 
      borderRadius: 3,
      background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
      color: 'white',
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
    }}
  >
    <Typography 
      variant="h4" 
      component="h1" 
      gutterBottom 
      fontWeight="bold"
      sx={{ 
        fontSize: { xs: '1.75rem', md: '2.5rem' },
        textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
      }}
    >
      Browse Apartments
    </Typography>
    <Typography 
      variant="body1" 
      sx={{ opacity: 0.9 }}
    >
      Discover your perfect home from our selection of apartments
    </Typography>
  </Paper>
);

export default BrowseApartmentsHeader; 