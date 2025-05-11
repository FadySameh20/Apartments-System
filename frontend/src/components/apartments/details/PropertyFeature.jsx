import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

/**
 * A reusable component to display a property feature with an icon
 */
const PropertyFeature = ({ icon: Icon, value, label }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Icon sx={{ mr: 1, color: theme.palette.primary.main, fontSize: 20 }} />
      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
        {value} {label}
      </Typography>
    </Box>
  );
};

export default PropertyFeature; 