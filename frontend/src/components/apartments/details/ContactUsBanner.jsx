import React from 'react';
import { Paper, Typography } from '@mui/material';

const ContactUsBanner = () => (
  <Paper 
    elevation={2} 
    sx={{ 
      p: 3, 
      borderRadius: 2,
      background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
      color: 'white',
      textAlign: 'center'
    }}
  >
    <Typography variant="h5" fontWeight="bold" gutterBottom>
      Interested in this property?
    </Typography>
    <Typography variant="body1" paragraph>
      Contact our real estate experts for more information or to schedule a viewing.
    </Typography>
  </Paper>
);

export default ContactUsBanner; 