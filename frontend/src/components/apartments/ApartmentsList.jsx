import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Pagination, useMediaQuery, useTheme, Paper, alpha, Grid } from '@mui/material';
import ApartmentCard from './ApartmentCard';
import LoadingIndicator from '../common/LoadingIndicator';
import ErrorMessage from '../common/ErrorMessage';
import SearchFilters from './SearchFilters';
import { getApartments } from '../../pages/api/apartments';

const ApartmentsList = () => {
  const [apartments, setApartments] = useState([]);
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(null);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const itemsPerPage = isMobile ? 4 : 8;
  
  useEffect(() => {
    const fetchApartments = async () => {
      try {
        setIsLoading(true);
        const data = await getApartments();
        setApartments(data);
        setFilteredApartments(data);
        setError(null);
      } catch (err) {
        setError('Failed to load apartments. Please try again later.');
        console.error('Error fetching apartments:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchApartments();
  }, []);
  
  useEffect(() => {
    if (!filters || !apartments.length) return;
    
    const filtered = apartments.filter(apartment => {
      // Unit Number filter
      if (filters.unitNumber && !apartment.unitNumber.toString().includes(filters.unitNumber)) {
        return false;
      }
      
      // Unit Name filter
      if (filters.unitName && !apartment.unitName?.toString().toLowerCase().includes(filters.unitName.toLowerCase())) {
        return false;
      }
      
      // Project filter
      if (filters.project && !apartment.project?.name?.toLowerCase().includes(filters.project.toLowerCase())) {
        return false;
      }
      
      return true;
    });
    
    setFilteredApartments(filtered);
    setPage(1); // Reset to first page when filtering
  }, [filters, apartments]);
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  const handlePageChange = (_event, value) => {
    setPage(value);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Calculate pagination
  const pageCount = Math.ceil(filteredApartments.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedApartments = filteredApartments.slice(startIndex, startIndex + itemsPerPage);
  
  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <LoadingIndicator message="Loading apartments..." />
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <ErrorMessage 
          message={error} 
          onRetry={() => window.location.reload()} 
        />
      </Container>
    );
  }
  
  return (
    <Box 
      sx={{ 
        background: 'linear-gradient(to bottom, #f0f8ff, #e6f2ff)',
        minHeight: '100vh',
        py: { xs: 3, md: 6 }
      }}
    >
      <Container maxWidth="lg">
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 2, md: 4 }, 
            mb: 4, 
            borderRadius: 3,
            background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
            color: 'white',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            fontWeight="bold"
            sx={{ 
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
            }}
          >
            Browse Apartments
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ opacity: 0.9 }}
          >
            Discover your perfect home from our selection of apartments
          </Typography>
        </Paper>
        
        {/* Search filters - now handled responsively in the SearchFilters component */}
        <Box sx={{ mb: 4 }}>
          <SearchFilters onFilterChange={handleFilterChange} />
        </Box>
        
        {displayedApartments.length === 0 ? (
          <Paper 
            sx={{ 
              p: 4, 
              textAlign: 'center',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              background: alpha(theme.palette.error.light, 0.1)
            }}
          >
            <Typography variant="h6" gutterBottom>
              No apartments found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your filters to find more options.
            </Typography>
          </Paper>
        ) : (
          <>
            <Box 
              sx={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
                px: 2,
                py: 1.5,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                borderRadius: 2
              }}
            >
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 'medium',
                  color: theme.palette.primary.main
                }}
              >
                Showing {displayedApartments.length} of {filteredApartments.length} apartments
              </Typography>
            </Box>
            
            <Grid container spacing={3}>
              {displayedApartments.map((apartment) => (
                <Grid 
                  key={apartment.id}
                  size={12}
                  sx={{ display: 'flex' }}
                >
                  <ApartmentCard 
                    apartment={apartment} 
                    onClick={() => {
                      console.log(`Navigate to apartment ${apartment.id}`);
                    }} 
                  />
                </Grid>
              ))}
            </Grid>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 2 }}>
              <Pagination 
                count={pageCount} 
                page={page} 
                onChange={handlePageChange} 
                color="primary"
                size={isMobile ? "medium" : "large"}
                siblingCount={isMobile ? 0 : 1}
                sx={{
                  '& .MuiPaginationItem-root': {
                    fontWeight: 'medium',
                  },
                  '& .Mui-selected': {
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    }
                  }
                }}
              />
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default ApartmentsList; 