import React from 'react';
import { Paper, Typography, Button, alpha } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import Link from 'next/link';

/**
 * Component to display error messages with a back button
 */
const ErrorDisplay = ({ error, theme }) => (
  <Paper 
    elevation={2} 
    sx={{ 
      p: 4, 
      borderRadius: 2,
      textAlign: 'center',
      backgroundColor: alpha(theme.palette.error.light, 0.1)
    }}
  >
    <Typography variant="h6" color="error" gutterBottom>
      {error}
    </Typography>
    <Button 
      variant="contained" 
      component={Link} 
      href="/apartments"
      startIcon={<ArrowBackIcon />}
      sx={{ mt: 2 }}
    >
      Back to Apartments
    </Button>
  </Paper>
);

export default ErrorDisplay; 