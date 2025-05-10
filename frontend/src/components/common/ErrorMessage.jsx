import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

const ErrorMessage = ({ 
  message = 'Something went wrong', 
  onRetry 
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        width: '100%',
        textAlign: 'center'
      }}
    >
      <ErrorIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
      <Typography variant="h6" color="error" gutterBottom>
        Error
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {message}
      </Typography>
      {onRetry && (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </Box>
  );
};

export default ErrorMessage; 