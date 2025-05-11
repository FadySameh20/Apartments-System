import React from 'react';
import {
    Box,
    Button,
    Container,
    Typography,
    alpha,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import Link from 'next/link';

export default function HeroSection() {
  return (
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
            component="p"
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
  );
}
