"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Divider,
  CircularProgress,
  Button,
  Card,
  CardMedia,
  alpha,
  useTheme,
  useMediaQuery,
  Avatar
} from '@mui/material';
import {
  Bed as BedIcon,
  Bathtub as BathtubIcon,
  SquareFoot as SquareFootIcon,
  Apartment as ApartmentIcon,
  LocationOn as LocationIcon,
  Construction as ConstructionIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import { getApartment } from '../../../api/apartments';
import { formatPrice } from '../../../components/apartments/ApartmentCard';
import Link from 'next/link';

const ApartmentDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchApartmentDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getApartment(id);
        setApartment(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching apartment details:', err);
        setError('Failed to load apartment details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchApartmentDetails();
  }, [id]);

  if (!id) {
    return null; // Wait for router to be ready
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <Header />
      
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress size={60} sx={{ color: theme.palette.primary.main }} />
          </Box>
        ) : error ? (
          <Paper 
            elevation={2} 
            sx={{ 
              p: 4, 
              borderRadius: 2,
              textAlign: 'center',
              backgroundColor: alpha(theme.palette.error.light, 0.1)
            }}
          >
            <Typography variant="h6" color="error" gutterBottom>
              {error}
            </Typography>
            <Button 
              variant="contained" 
              component={Link} 
              href="/apartments"
              startIcon={<ArrowBackIcon />}
              sx={{ mt: 2 }}
            >
              Back to Apartments
            </Button>
          </Paper>
        ) : apartment ? (
          <>            
            <Paper 
              elevation={3} 
              sx={{ 
                borderRadius: 2,
                overflow: 'hidden',
                mb: 4
              }}
            >
              <Grid container direction={isMobile ? "column" : "row"} spacing={2}>
                {/* Image Gallery */}
                <Grid size={{xs: 12, md: 5}}>
                  <Box sx={{ 
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <CardMedia
                      component="img"
                      image={apartment.images && apartment.images.length > 0 
                        ? apartment.images[activeImageIndex] 
                        : '/apartment-placeholder.jpg'}
                      alt={apartment.unitName}
                      sx={{ 
                        objectFit: 'contain',
                        height: { xs: '300px', md: '400px' },
                        width: { xs: '300px', md: '400px' },
                        borderRadius: 1,
                        margin: '0 auto'
                    }}
                    />
                  </Box>
                  
                  {/* Thumbnails */}
                  {apartment.images && apartment.images.length > 1 && (
                    <Box 
                      justifyContent={"center"}
                      sx={{ 
                        display: 'flex',
                        overflowX: 'auto',
                        gap: 1,
                        p: 1,
                        bgcolor: alpha(theme.palette.primary.main, 0.05)
                      }}
                    >
                      {apartment.images.map((img, index) => (
                        <Box
                          key={index}
                          onClick={() => setActiveImageIndex(index)}
                          sx={{
                            width: 80,
                            height: 60,
                            flexShrink: 0,
                            borderRadius: 1,
                            overflow: 'hidden',
                            border: index === activeImageIndex 
                              ? `2px solid ${theme.palette.primary.main}` 
                              : '2px solid transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              opacity: 0.8
                            }
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={img}
                            alt={`${apartment.unitName} - image ${index + 1}`}
                            sx={{ 
                              height: '100%',
                              width: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                  )}
                </Grid>
                
                {/* Apartment Details */}
                <Grid size={{xs: 12, md: 6 }}>
                  <Box sx={{ p: { xs: 2, md: 4 } }}>
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
                            backgroundColor: apartment.isFinished ? alpha(theme.palette.success.main, 0.9) : alpha(theme.palette.warning.main, 0.9)
                         }}
                      />
                    </Box>

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
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <BedIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                          <Typography>
                            {apartment.bedroomsCount} {apartment.bedroomsCount === 1 ? 'Bedroom' : 'Bedrooms'}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <BathtubIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                          <Typography>
                            {apartment.bathroomsCount} {apartment.bathroomsCount === 1 ? 'Bathroom' : 'Bathrooms'}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <SquareFootIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                          <Typography>
                            {apartment.area} m²
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <ApartmentIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                          <Typography>
                            Floor {apartment.floor}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    
                    <Divider sx={{ my: 2 }} />
                    
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
                        {apartment.project.name}
                      </Typography>
                      
                      {apartment.project.location && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <LocationIcon sx={{ mr: 1, color: theme.palette.primary.main, fontSize: 20 }} />
                          <Typography variant="body2">
                            {apartment.project.location}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Developer
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {apartment.project.developer.image ? (
                        <Avatar 
                          src={apartment.project.developer.image} 
                          alt={apartment.project.developer.name}
                          sx={{ width: 60, height: 60 }}
                        />
                      ) : (
                        <Avatar sx={{ width: 60, height: 60, bgcolor: theme.palette.primary.main }}>
                          <ConstructionIcon fontSize="large" />
                        </Avatar>
                      )}
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {apartment.project.developer.name}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
            
            {/* Call to action */}
            <Paper 
              elevation={2} 
              sx={{ 
                p: 3, 
                borderRadius: 2,
                background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
                color: 'white',
                textAlign: 'center'
              }}
            >
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Interested in this property?
              </Typography>
              <Typography variant="body1" paragraph>
                Contact our real estate experts for more information or to schedule a viewing.
              </Typography>
            </Paper>
          </>
        ) : null}
      </Container>
      
      <Footer />
    </Box>
  );
};

export default ApartmentDetailsPage;
