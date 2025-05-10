import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Chip,
  useTheme,
  alpha,
  Paper,
  Stack,
  Button,
  Grid
} from '@mui/material';
import { 
  Bed as BedIcon, 
  Bathtub as BathtubIcon,
  SquareFoot as SquareFootIcon,
  Apartment as ApartmentIcon,
  Star as StarIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';
import Link from 'next/link';

export const formatPrice = (price) => {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0,
  });
};

const ApartmentCard = ({ apartment, onClick }) => {
  const { id, unitName, price, bedroomsCount, bathroomsCount, area, images, isFinished, floor } = apartment;
  const theme = useTheme();

  return (
    <Card 
      sx={{ 
        width: '100%',
        height: '100%', 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 20px rgba(0, 0, 0, 0.15)',
        }
      }}
    >
      <Box 
        sx={{ 
          position: 'relative',
          width: { xs: '100%', md: '40%' },
          minWidth: { md: '300px' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
          backgroundColor: alpha(theme.palette.background.paper, 0.6)
        }} 
      >
        <CardMedia
          component="img"
          image={images && images.length > 0 ? images[0] : 'apartment.jpg'}
          alt={unitName}
          sx={{ 
            objectFit: 'contain',
            maxWidth: '100%',
            maxHeight: { xs: '200px', sm: '220px', md: '240px' },
            borderRadius: 1
          }}
        />
      </Box>
      
      <CardContent 
        sx={{ 
          flexGrow: 1, 
          p: { xs: 2, md: 3 },
          backgroundColor: 'white',
          position: 'relative',
          width: { xs: '100%', md: '60%' },
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            justifyContent="space-between"
            alignItems={'center'}
            spacing={1}
            mb={1}
          >
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 'bold', 
                color: theme.palette.text.primary
              }}
            >
              {unitName}
            </Typography>
            
            <Stack 
              direction={'row'} 
              justifyContent={'center'}
              alignItems={'center'}
              spacing={1}
              mb={1}
            >
              <Chip
                label={isFinished ? "Finished" : "Not Finished"}
                size="medium"
                sx={{
                  backgroundColor: isFinished ? alpha(theme.palette.success.main, 0.9) : alpha(theme.palette.warning.main, 0.9),
                  color: 'white',
                  fontWeight: 'bold',
                  '& .MuiChip-label': {
                    px: 1,
                  },
                }}
              />

              <Chip
                label={formatPrice(price)}
                size="medium"
                sx={{
                  backgroundColor: alpha(theme.palette.primary.dark, 0.9),
                  color: 'white',
                  fontWeight: 'bold',
                  '& .MuiChip-label': {
                    px: 1,
                  },
                }}
              />
            </Stack>
          </Stack>
        </Box>
        
        <Paper
          elevation={0}
          sx={{
            p: 1.5,
            mb: 2,
            backgroundColor: alpha(theme.palette.primary.light, 0.08),
            borderRadius: 1.5,
            width: '100%',
          }}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, md: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <BedIcon sx={{ mr: 1, color: theme.palette.primary.main, fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                  {bedroomsCount} {bedroomsCount === 1 ? 'Bed' : 'Beds'}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <BathtubIcon sx={{ mr: 1, color: theme.palette.primary.main, fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                  {bathroomsCount} {bathroomsCount === 1 ? 'Bath' : 'Baths'}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SquareFootIcon sx={{ mr: 1, color: theme.palette.primary.main, fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                  {area} m²
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ApartmentIcon sx={{ mr: 1, color: theme.palette.primary.main, fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                  Floor {floor}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        
        <Box sx={{ mt: 2, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
          <Button 
            variant="contained"
            component={Link}
            href={`/apartments/${id}`}
            sx={{ 
              borderRadius: 1.5,
              px: 3,
              py: 3,
              fontWeight: 'bold',
              mt: 3,
            }}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ApartmentCard; 