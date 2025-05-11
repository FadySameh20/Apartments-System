import React from 'react';
import { Grid, TextField } from '@mui/material';
import ProjectSelector from './ProjectSelector';
import FilterActions from './FilterActions';

/**
 * Desktop-specific filter layout
 */
const DesktopFilters = ({ 
  tempFilters, 
  handleInputChange, 
  projects, 
  loadingProjects, 
  handleClearFilters, 
  applyFilters 
}) => (
  <Grid container spacing={2} alignItems="center">
    <Grid size={{xs: 12, sm: 6, md: 3}}>
      <TextField
        fullWidth
        label="Unit Number"
        name="unitNumber"
        value={tempFilters.unitNumber}
        onChange={handleInputChange}
        placeholder="Search by unit number..."
        variant="outlined"
        size="small"
      />
    </Grid>
    
    <Grid size={{xs: 12, sm: 6, md: 3}}>
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
    </Grid>
    
    <Grid size={{xs: 12, sm: 6, md: 3}}>
      <ProjectSelector 
        value={tempFilters.projectId}
        onChange={handleInputChange}
        projects={projects}
        loading={loadingProjects}
      />
    </Grid>
    
    <Grid size={{xs: 12, sm: 6, md: 3}}>
      <FilterActions onApply={applyFilters} onClear={handleClearFilters} />
    </Grid>
  </Grid>
);

export default DesktopFilters; 