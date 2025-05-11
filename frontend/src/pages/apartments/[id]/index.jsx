"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Grid,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import LoadingIndicator from '../../../components/common/LoadingIndicator';
import { getApartment } from '../../../api/apartments';
import ImageGallery from '@/components/apartments/details/ImageGallery';
import ApartmentHeader from '@/components/apartments/details/ApartmentHeader';
import ApartmentDetails from '@/components/apartments/details/ApartmentDetails';
import ProjectInfo from '@/components/apartments/details/ProjectInfo';
import DeveloperInfo from '@/components/apartments/details/DeveloperInfo';
import ContactUsBanner from '@/components/apartments/details/ContactUsBanner';

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

  const renderContent = () => {
    if (loading) {
      return <LoadingIndicator size={60} message="Loading apartment details..." />;
    }
    
    if (error) {
      return <ErrorDisplay error={error} theme={theme} />;
    }
    
    if (apartment) {
      return (
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
                <ImageGallery 
                  images={apartment.images} 
                  activeImageIndex={activeImageIndex}
                  setActiveImageIndex={setActiveImageIndex}
                />
              </Grid>
              
              {/* Apartment Details */}
              <Grid size={{xs: 12, md: 6 }}>
                <Box sx={{ p: { xs: 2, md: 4 } }}>
                  <ApartmentHeader apartment={apartment} theme={theme} />
                  <ApartmentDetails apartment={apartment} theme={theme} />
                  <Divider sx={{ my: 2 }} />
                  <ProjectInfo project={apartment.project} theme={theme} />
                  <Divider sx={{ my: 2 }} />
                  <DeveloperInfo developer={apartment.project.developer} theme={theme} />
                </Box>
              </Grid>
            </Grid>
          </Paper>
          
          <ContactUsBanner />
        </>
      );
    }
    
    return null;
  };

  return (
    <Container sx={{ py: 4 }}>
      {renderContent()}
    </Container>
  );
};

export default ApartmentDetailsPage;
