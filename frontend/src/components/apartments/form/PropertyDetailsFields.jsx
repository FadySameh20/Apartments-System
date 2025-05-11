import React from 'react';
import { Grid, TextField, FormControlLabel, Switch } from '@mui/material';
import FormSectionHeader from './FormSectionHeader';
import ProjectSelector from './ProjectSelector';

/**
 * Component for property details form fields
 */
const PropertyDetailsFields = ({ 
  formData, 
  errors, 
  handleInputChange, 
  projects, 
  loadingProjects 
}) => (
  <>
    <FormSectionHeader title="Property Details" />
    <Grid container direction={"row"} spacing={2}>
      <Grid size={{xs: 12, md: 6}}>
        <TextField
          name="price"
          label="Price (EGP)"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
          fullWidth
          required
          error={!!errors.price}
          helperText={errors.price}
          InputProps={{ inputProps: { min: 0 } }}
        />
      </Grid>
      
      <Grid size={{xs: 12, md: 6}}>
        <TextField
          name="area"
          label="Area (m²)"
          type="number"
          value={formData.area}
          onChange={handleInputChange}
          fullWidth
          required
          error={!!errors.area}
          helperText={errors.area}
          InputProps={{ inputProps: { min: 0 } }}
        />
      </Grid>
    </Grid>
    
    <Grid container direction={"row"} spacing={2}>
      <Grid size={{xs: 12, md: 6}}>
        <TextField
          name="bedroomsCount"
          label="Bedrooms"
          type="number"
          value={formData.bedroomsCount}
          onChange={handleInputChange}
          fullWidth
          required
          error={!!errors.bedroomsCount}
          helperText={errors.bedroomsCount}
          InputProps={{ inputProps: { min: 0 } }}
        />
      </Grid>
      
      <Grid size={{xs: 12, md: 6}}>
        <TextField
          name="bathroomsCount"
          label="Bathrooms"
          type="number"
          value={formData.bathroomsCount}
          onChange={handleInputChange}
          fullWidth
          required
          error={!!errors.bathroomsCount}
          helperText={errors.bathroomsCount}
          InputProps={{ inputProps: { min: 0 } }}
        />
      </Grid>
    </Grid>
    
    <Grid container direction={"row"} spacing={2}>
      <Grid size={{xs: 12, md: 6}}>
        <TextField
          name="floor"
          label="Floor"
          type="number"
          value={formData.floor}
          onChange={handleInputChange}
          fullWidth
          required
          error={!!errors.floor}
          helperText={errors.floor}
          InputProps={{ inputProps: { min: 0 } }}
        />
      </Grid>

      <Grid size={{xs: 12, md: 6}}>
        <ProjectSelector 
          value={formData.projectId}
          onChange={handleInputChange}
          projects={projects}
          loadingProjects={loadingProjects}
          error={errors.projectId}
        />
      </Grid>
    </Grid>
    
    <Grid size={12}>
      <FormControlLabel
        control={
          <Switch
            name="isFinished"
            checked={formData.isFinished}
            onChange={handleInputChange}
            color="primary"
          />
        }
        label="Finished"
        sx={{ height: '100%', display: 'flex', alignItems: 'center' }}
      />
    </Grid>
  </>
);

export default PropertyDetailsFields; 