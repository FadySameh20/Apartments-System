import React from 'react';
import Image from 'next/image';
import { Box, Button, Container, Typography, Paper, alpha } from '@mui/material';
import { Search as SearchIcon, LocationOn, Home as HomeIcon, Apartment as ApartmentIcon } from '@mui/icons-material';
import Link from 'next/link';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Grid from '../components/common/Grid';

export default function Home() {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <Header />
      
      <Box component="main" sx={{ flex: '1 0 auto' }}>
        {/* Hero Section */}
        <Box 
          sx={{
            position: 'relative',
            height: { xs: '70vh', md: '80vh' },
            display: 'flex',
            alignItems: 'center',
            background: 'linear-gradient(135deg, rgba(106, 17, 203, 0.9) 0%, rgba(37, 117, 252, 0.85) 100%)',
            color: 'white',
            textAlign: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Background dots pattern */}
          <Box 
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          
          <Container maxWidth="lg">
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              fontWeight="bold"
              sx={{ 
                fontSize: { xs: '2.5rem', md: '4rem' },
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                mb: 3,
                animation: 'fadeIn 1.5s ease-out'
              }}
            >
              Find Your Dream Apartment
            </Typography>
            <Typography 
              variant="h5" 
              paragraph
              sx={{ 
                mb: 5,
                maxWidth: '800px',
                mx: 'auto',
                opacity: 0.9,
                fontWeight: 'medium',
              }}
            >
              Browse through our collection of premium apartments designed for modern living
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              component={Link}
              href="/apartments"
              startIcon={<SearchIcon />}
              sx={{ 
                py: 1.5, 
                px: 4,
                borderRadius: 2,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                backgroundColor: 'white',
                color: 'primary.main',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  backgroundColor: alpha('#ffffff', 0.9),
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
                }
              }}
            >
              Browse Apartments
            </Button>
          </Container>
        </Box>
        
        {/* Features Section */}
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
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    height: '100%',
                    width: '100%',
                    textAlign: 'center',
                    borderRadius: 3,
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      mb: 2, 
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 80,
                      width: 80,
                      borderRadius: '50%',
                      bgcolor: alpha('#6a11cb', 0.1),
                      mx: 'auto'
                    }}
                  >
                    <LocationOn sx={{ fontSize: 40, color: 'primary.main' }} />
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                    Prime Locations
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    All our properties are situated in the most desirable areas with easy access to amenities and transportation.
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    height: '100%',
                    textAlign: 'center',
                    borderRadius: 3,
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      mb: 2, 
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 80,
                      width: 80,
                      borderRadius: '50%',
                      bgcolor: alpha('#6a11cb', 0.1),
                      mx: 'auto'
                    }}
                  >
                    <HomeIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                    Modern Designs
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Stylish and contemporary interiors designed for comfort and functionality, with attention to every detail.
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    height: '100%',
                    textAlign: 'center',
                    borderRadius: 3,
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      mb: 2, 
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 80,
                      width: 80,
                      borderRadius: '50%',
                      bgcolor: alpha('#6a11cb', 0.1),
                      mx: 'auto'
                    }}
                  >
                    <ApartmentIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                    Premium Quality
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Built with high-quality materials and finishes to ensure durability and long-lasting value.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      
      <Footer />
    </Box>
  );
}
