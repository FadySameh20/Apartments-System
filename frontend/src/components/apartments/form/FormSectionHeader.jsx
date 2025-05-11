import React from 'react';
import { Grid, Typography } from '@mui/material';

/**
 * Component for section headers in forms
 */
const FormSectionHeader = ({ title }) => (
  <Grid size={12}>
    <Typography 
      variant="h6" 
      component="h2" 
      color="primary.dark" 
      fontWeight="medium"
      sx={{ mt: 2, mb: 2 }}
    >
      {title}
    </Typography>
  </Grid>
);

export default FormSectionHeader; 