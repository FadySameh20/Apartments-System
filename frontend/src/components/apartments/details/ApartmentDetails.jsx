import React from 'react';
import { Typography, Grid, Divider } from '@mui/material';
import {
  Bed as BedIcon,
  Bathtub as BathtubIcon,
  SquareFoot as SquareFootIcon,
  Apartment as ApartmentIcon
} from '@mui/icons-material';
import PropertyFeature from './PropertyFeature';
import { formatPrice } from '../../../utils/formatters';

/**
 * Component to display the apartment details and features
 */
const ApartmentDetails = ({ apartment, theme }) => (
  <>
    <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
      {formatPrice(apartment.price)}
    </Typography>
    
    <Typography variant="body1" paragraph>
      {apartment.description || 'No description available.'}
    </Typography>
    
    <Divider sx={{ my: 2 }} />
    
    <Typography variant="h6" gutterBottom fontWeight="bold">
      Property Details
    </Typography>
    
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid size={6}>
        <PropertyFeature 
          icon={BedIcon} 
          value={apartment.bedroomsCount} 
          label={apartment.bedroomsCount === 1 ? 'Bedroom' : 'Bedrooms'} 
        />
      </Grid>
      <Grid size={6}>
        <PropertyFeature 
          icon={BathtubIcon} 
          value={apartment.bathroomsCount} 
          label={apartment.bathroomsCount === 1 ? 'Bathroom' : 'Bathrooms'} 
        />
      </Grid>
      <Grid size={6}>
        <PropertyFeature 
          icon={SquareFootIcon} 
          value={apartment.area} 
          label="m²" 
        />
      </Grid>
      <Grid size={6}>
        <PropertyFeature 
          icon={ApartmentIcon} 
          value="Floor" 
          label={apartment.floor} 
        />
      </Grid>
    </Grid>
  </>
);

export default ApartmentDetails; 