import React from 'react';
import ApartmentsList from '../../components/apartments/ApartmentsList';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { Box } from '@mui/material';

export default function ApartmentsPage() {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <Header />
      <Box sx={{ flex: '1 0 auto' }}>
        <ApartmentsList />
      </Box>
      <Footer />
    </Box>
  );
} 