import React from 'react';
import { 
  Box,
  Container,
  Typography,
  Link as MuiLink,
  Divider,
  Grid,
  useMediaQuery,
  useTheme,
 } from '@mui/material';
import { 
  Mail as MailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      <Container>
        <Grid container spacing={isMobile ? 3 : 20}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Nawy Apartments
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Find your perfect apartment with us.
            </Typography>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
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