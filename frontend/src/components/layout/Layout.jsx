import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, background }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      background
    }}>
      <Header />
      <Box component="main" sx={{ flex: '1 0 auto' }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
