import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { Construction as ConstructionIcon } from '@mui/icons-material';

/**
 * Component to display developer information
 */
const DeveloperInfo = ({ developer, theme, showTitle = true }) => (
  <>
    {
    showTitle && 
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Developer
      </Typography>
    }
    
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {developer.image ? (
        <Avatar 
          src={developer.image} 
          alt={developer.name}
          sx={{ width: 60, height: 60 }}
        />
      ) : (
        <Avatar sx={{ width: 60, height: 60, bgcolor: theme.palette.primary.main }}>
          <ConstructionIcon fontSize="large" />
        </Avatar>
      )}
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">
          {developer.name}
        </Typography>
      </Box>
    </Box>
  </>
);

export default DeveloperInfo; 