import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingIndicator = ({ 
  message = 'Loading...' 
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        width: '100%'
      }}
    >
      <CircularProgress size={50} thickness={4} />
      <Typography variant="body1" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingIndicator; 