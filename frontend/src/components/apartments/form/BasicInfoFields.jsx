import React from 'react';
import { Grid, TextField } from '@mui/material';
import FormSectionHeader from './FormSectionHeader';

/**
 * Component for basic apartment information fields
 */
const BasicInfoFields = ({ formData, errors, handleInputChange }) => (
  <>
    <FormSectionHeader title="Basic Information" />
    <Grid container direction={"row"} spacing={2}>
      <Grid size={{ xs: 12, md: 6}}>
        <TextField
          name="unitName"
          label="Unit Name"
          value={formData.unitName}
          onChange={handleInputChange}
          fullWidth
          required
          error={!!errors.unitName}
          helperText={errors.unitName}
        />
      </Grid>
      
      <Grid size={{ xs: 12, md: 6}}>
        <TextField
          name="unitNumber"
          label="Unit Number"
          value={formData.unitNumber}
          onChange={handleInputChange}
          fullWidth
          required
          error={!!errors.unitNumber}
          helperText={errors.unitNumber}
        />
      </Grid>
    </Grid>
    
    <Grid size={12}>
      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleInputChange}
        multiline
        rows={4}
        fullWidth
      />
    </Grid>
  </>
);

export default BasicInfoFields; 