import React from 'react';
import { Box, Typography, Grid, Chip, alpha } from '@mui/material';

/**
 * Header section for apartment details showing name, number and status
 */
const ApartmentHeader = ({ apartment, theme }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
    <Grid container direction={"column"}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        {apartment.unitName}
      </Typography>
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Unit Number: {apartment.unitNumber}
      </Typography>
    </Grid>

    <Chip 
      label={apartment.isFinished ? "Finished" : "Not Finished"} 
      size="medium"
      sx={{ 
        fontWeight: 'medium',
        backgroundColor: apartment.isFinished 
          ? alpha(theme.palette.success.main, 0.9) 
          : alpha(theme.palette.warning.main, 0.9),
        color: 'white'
      }}
    />
  </Box>
);

export default ApartmentHeader; 