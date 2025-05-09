"use client";

import React from 'react';
import { Box, Container, Typography, Link as MuiLink, Divider } from '@mui/material';
import Grid from '../common/Grid';
import { 
  Mail as MailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={20}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Nawy Apartments
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Find your perfect apartment with us.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
              <Box component="li" sx={{ py: 0.5, display: 'flex', alignItems: 'center' }}>
                <LocationIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  123 Real Estate St., Cairo
                </Typography>
              </Box>
              <Box component="li" sx={{ py: 0.5, display: 'flex', alignItems: 'center' }}>
                <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                <MuiLink href="tel:+20123456789" underline="hover" color="text.secondary">
                  +20 123 456 789
                </MuiLink>
              </Box>
              <Box component="li" sx={{ py: 0.5, display: 'flex', alignItems: 'center' }}>
                <MailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                <MuiLink href="mailto:info@nawyapartments.com" underline="hover" color="text.secondary">
                  info@nawyapartments.com
                </MuiLink>
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          © {currentYear} Nawy Apartments. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 