import React from 'react';
import { Box, TextField } from '@mui/material';
import ProjectSelector from './ProjectSelector';
import FilterActions from './FilterActions';

/**
 * Mobile-specific filter layout
 */
const MobileFilters = ({ 
  tempFilters, 
  handleInputChange, 
  projects, 
  loadingProjects, 
  handleClearFilters, 
  applyFilters 
}) => (
  <>
    <Box sx={{ mb: 2 }}>
      <TextField
        fullWidth
        label="Unit Number"
        name="unitNumber"
        value={tempFilters.unitNumber}
        onChange={handleInputChange}
        placeholder="Search by unit number..."
        variant="outlined"
        size="small"
        sx={{ mb: 2 }}
      />
    </Box>

    <Box sx={{ mb: 2 }}>
      <TextField
        fullWidth
        label="Unit Name"
        name="unitName"
        value={tempFilters.unitName}
        onChange={handleInputChange}
        placeholder="Search by unit name..."
        variant="outlined"
        size="small"
      />
    </Box>

    <Box sx={{ mb: 3 }}>
      <ProjectSelector 
        value={tempFilters.projectId}
        onChange={handleInputChange}
        projects={projects}
        loading={loadingProjects}
      />
    </Box>

    <FilterActions onApply={applyFilters} onClear={handleClearFilters} />
  </>
);

export default MobileFilters; 