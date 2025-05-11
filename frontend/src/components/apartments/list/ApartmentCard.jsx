import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  useTheme,
  alpha,
  Stack,
  Button,
  Grid,
  useMediaQuery,
} from '@mui/material';
import { 
  Apartment as ApartmentIcon,
  Business,
} from '@mui/icons-material';
import Link from 'next/link';
import StatusChip from '../../common/StatusChip';
import { formatPrice } from '../../../utils/formatters';
import DeveloperInfo from '../details/DeveloperInfo';

const ApartmentCard = ({ apartment }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const {
    id,
    unitName,
    unitNumber,
    price,
    images,
    isFinished,
    project,
   } = apartment;

   const { name: projectName, developer } = project;

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
          image={images && images.length > 0 ? images[0] : null}
          alt={unitName}
          sx={{ 
            objectFit: 'contain',
            maxWidth: '100%',
            maxHeight: { xs: '200px', sm: '220px', md: '600px' },
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
            alignItems={isMobile ? 'center' : 'start'}
            spacing={1}
            mb={1}
          >
           <Box sx={{ mb: 2 }}>
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                color: theme.palette.text.primary,
                lineHeight: 1.2
              }}
            >
              {unitName}
            </Typography>
            
            <Stack direction="row" spacing={1} alignItems="center" mb={3} mt={3}>
              <ApartmentIcon color="primary" sx={{ fontSize: 18 }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  color: theme.palette.text.secondary,
                  fontWeight: 500
                }}
              >
                Unit Number: {unitNumber}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
              <Business color="primary" sx={{ fontSize: 18 }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  color: theme.palette.text.secondary,
                  fontWeight: 500
                }}
              >
                Project: {projectName}
              </Typography>
            </Stack>
          </Box>
            
            <Stack 
              direction={'row'} 
              justifyContent={'center'}
              alignItems={'center'}
              spacing={1}
              mb={1}
            >
              <StatusChip 
                label={isFinished ? "Finished" : "Not Finished"} 
                color={isFinished ? "success" : "warning"}
              />
              <StatusChip 
                label={formatPrice(price)} 
                color="primary" 
              />
            </Stack>
          </Stack>
        </Box>
        
        <Box>
          <Grid container spacing={2} mt={8} direction={"row"} justifyContent={"space-between"} alignItems="center">
              <DeveloperInfo
                developer={developer}
                showTitle={false}
                theme={theme}
              />

              <Button 
                variant="contained"
                component={Link}
                href={`/apartments/${id}`}
                sx={{ 
                  borderRadius: 2,
                  px: 3,
                  py: 2.5,
                  fontWeight: 'bold',
                  boxShadow: theme.shadows[2],
                  '&:hover': {
                    boxShadow: theme.shadows[4],
                  }
                }}
              >
                View Details
              </Button>
          </Grid>
        </Box>        
      </CardContent>
    </Card>
  );
};

export default ApartmentCard;
