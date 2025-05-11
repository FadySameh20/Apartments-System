import React from 'react';
import { Chip, alpha, useTheme } from '@mui/material';

const StatusChip = ({ label, color = 'primary', size = 'medium' }) => {
  const theme = useTheme();
  
  return (
    <Chip
      label={label}
      size={size}
      sx={{
        backgroundColor: alpha(theme.palette[color].main, 0.9),
        color: 'white',
        fontWeight: 'bold',
        '& .MuiChip-label': {
          px: 1,
        },
      }}
    />
  );
};

export default StatusChip; 