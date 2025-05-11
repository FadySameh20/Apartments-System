import React from 'react';
import { Box, Typography, alpha, useTheme } from '@mui/material';

/**
 * Component to display the count of results
 */
const ResultsCounter = ({ count, total }) => {
  const theme = useTheme();
  
  return (
    <Box 
      sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        px: 2,
        py: 1.5,
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        borderRadius: 2
      }}
    >
      <Typography 
        variant="subtitle1" 
        sx={{ 
          fontWeight: 'medium',
          color: theme.palette.primary.main
        }}
      >
        Showing {count} of {total} apartments
      </Typography>
    </Box>
  );
};

export default ResultsCounter; 