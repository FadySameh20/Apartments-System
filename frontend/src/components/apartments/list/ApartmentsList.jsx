import React, { useState, useEffect } from 'react';
import { Box, Container, Pagination, useMediaQuery, useTheme, Grid } from '@mui/material';
import ApartmentCard from './ApartmentCard';
import LoadingIndicator from '../../common/LoadingIndicator';
import ErrorMessage from '../../common/ErrorMessage';
import SearchFilters from './SearchFilters';
import BrowseApartmentsHeader from './BrowseApartmentsHeader';
import NoApartmentsFound from './NoApartmentsFound';
import ResultsCounter from './ResultsCounter';
import { getApartments } from '../../../api/apartments';
import { getProjects } from '../../../api/projects';

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
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const pageSize = isMobile ? 4 : 8;
  
  useEffect(() => {
    fetchProjects();
  }, []);
  
  useEffect(() => {
    fetchApartments(page, filters);
  }, [page, filters]);

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

  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const projectsData = await getProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoadingProjects(false);
    }
  }
  
  const handleFilterChange = (newFilters) => {
    console.log(newFilters);
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
        <BrowseApartmentsHeader />
        
        {/* Search filters */}
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
          <NoApartmentsFound />
        ) : (
          !isLoading && (
            <>
              <ResultsCounter count={apartments.length} total={totalCount} />
              
              <Grid container spacing={3}>
                {apartments.map((apartment) => (
                  <Grid 
                    key={apartment.id}
                    size={12}
                    sx={{ display: 'flex' }}
                  >
                    <ApartmentCard apartment={apartment} />
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