import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
 } from '@mui/material';
import {
    LocationOn,
    Home as HomeIcon,
    Apartment as ApartmentIcon,
} from '@mui/icons-material';
import FeatureCard from './FeatureCard';

export default function FeaturesSection() {
    return (
        <Box sx={{ py: 8, background: 'linear-gradient(to bottom, #f0f8ff, #ffffff)' }}>
            <Container maxWidth="lg">
            <Typography 
                variant="h3" 
                component="h2" 
                align="center" 
                gutterBottom
                fontWeight="bold"
                color="primary"
                sx={{ mb: 6 }}
            >
                Why Choose Our Apartments?
            </Typography>
            
            <Grid container direction="column" spacing={4}>
                <Grid size={12}>
                <FeatureCard 
                    icon={LocationOn} 
                    title="Prime Locations" 
                    description="All our properties are situated in the most desirable areas with easy access to amenities and transportation."
                />
                </Grid>
                
                <Grid size={12}>
                <FeatureCard 
                    icon={HomeIcon} 
                    title="Modern Designs" 
                    description="Stylish and contemporary interiors designed for comfort and functionality, with attention to every detail."
                />
                </Grid>

                <Grid size={12}>
                <FeatureCard 
                    icon={ApartmentIcon} 
                    title="Premium Quality" 
                    description="Built with high-quality materials and finishes to ensure durability and long-lasting value."
                />
                </Grid>
            </Grid>
            </Container>
        </Box>
    );
}
