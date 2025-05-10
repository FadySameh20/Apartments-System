import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Pagination, useMediaQuery, useTheme, Paper, alpha, Grid } from '@mui/material';
import ApartmentCard from './ApartmentCard';
import LoadingIndicator from '../common/LoadingIndicator';
import ErrorMessage from '../common/ErrorMessage';
import SearchFilters from './SearchFilters';
import { getApartments } from '../../api/apartments';
import { getProjects } from '../../api/projects';

const initialFilters = {
  unitNumber: '',
  unitName: '',
  projectId: '',
};

const ApartmentsList = () => {
  const [apartments, setApartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState(initialFilters);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const projectsLoaded = useRef(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const pageSize = isMobile ? 4 : 8;
  
  // Fetch projects once
  useEffect(() => {
    if (!projectsLoaded.current) {
      const fetchProjects = async () => {
        setLoadingProjects(true);
        try {
          const projectsData = await getProjects();
          setProjects(projectsData);
          projectsLoaded.current = true;
        } catch (error) {
          console.error('Error fetching projects:', error);
        } finally {
          setLoadingProjects(false);
        }
      };

      fetchProjects();
    }
  }, []);
  
  const fetchApartments = async (currentPage, currentFilters) => {
    try {
      setIsLoading(true);
      const params = {
        page: currentPage,
        pageSize,
        ...currentFilters
      };
      
      const response = await getApartments(params);
      setApartments(response.data);
      setTotalPages(response.meta.totalPages);
      setTotalCount(response.meta.totalCount);
      setError(null);
    } catch (err) {
      setError('Failed to load apartments. Please try again later.');
      console.error('Error fetching apartments:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchApartments(page, filters);
  }, [page, filters]);
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when applying new filters
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
  };
  
  const handlePageChange = (_event, value) => {
    setPage(value);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  if (isLoading && apartments.length === 0) {
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
          onRetry={() => fetchApartments(page, filters)} 
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
          <SearchFilters 
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            filters={filters}
            projects={projects}
            loadingProjects={loadingProjects}
          />
        </Box>
        
        {isLoading && <LoadingIndicator />}
        
        {!isLoading && apartments.length === 0 ? (
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
          !isLoading && (
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
                  Showing {apartments.length} of {totalCount} apartments
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                {apartments.map((apartment) => (
                  <Grid 
                    key={apartment.id}
                    size={12}
                    sx={{ display: 'flex' }}
                  >
                    <ApartmentCard 
                      apartment={apartment} 
                    />
                  </Grid>
                ))}
              </Grid>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 2 }}>
                <Pagination 
                  count={totalPages} 
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
          )
        )}
      </Container>
    </Box>
  );
};

export default ApartmentsList; 