import React from 'react';
import { Paper, Typography, alpha, useTheme } from '@mui/material';

const NoApartmentsFound = () => {
  const theme = useTheme();
  
  return (
    <Paper 
      sx={{ 
        p: 4, 
        textAlign: 'center',
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        background: alpha(theme.palette.error.light, 0.1)
      }}
    >
      <Typography variant="h6" gutterBottom>
        No apartments found
      </Typography>
    </Paper>
  );
};

export default NoApartmentsFound;
