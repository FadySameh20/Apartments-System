import React from 'react';
import { Box, Typography, alpha } from '@mui/material';
import { LocationOn as LocationIcon } from '@mui/icons-material';

/**
 * Component to display project information
 */
const ProjectInfo = ({ project, theme }) => (
  <>
    <Typography variant="h6" gutterBottom fontWeight="bold">
      Project Information
    </Typography>
    
    <Box 
      sx={{ 
        p: 2, 
        borderRadius: 2, 
        bgcolor: alpha(theme.palette.primary.light, 0.08),
        mb: 3
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold">
        {project.name}
      </Typography>
      
      {project.location && (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <LocationIcon sx={{ mr: 1, color: theme.palette.primary.main, fontSize: 20 }} />
          <Typography variant="body2">
            {project.location}
          </Typography>
        </Box>
      )}
    </Box>
  </>
);

export default ProjectInfo; 