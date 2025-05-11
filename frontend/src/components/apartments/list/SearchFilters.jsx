import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Button,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton
} from '@mui/material';
import { FilterList as FilterIcon, Close as CloseIcon } from '@mui/icons-material';
import MobileFilters from '../filters/MobileFilters';
import DesktopFilters from '../filters/DesktopFilters';

/**
 * Search filters component for filtering apartments
 */
const SearchFilters = ({ onFilterChange, onClearFilters, filters, projects, loadingProjects }) => {
  // Initialize tempFilters with properly defined projectId to avoid undefined
  const [tempFilters, setTempFilters] = useState(filters);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Update tempFilters when filters change from parent
  useEffect(() => {
    setTempFilters({
      unitNumber: filters.unitNumber || '',
      unitName: filters.unitName || '',
      projectId: filters.projectId || ''
    });
  }, [filters]);

  const handleInputChange = (e) => {
    setTempFilters({ ...tempFilters, [e.target.name]: e.target.value });
  };

  const handleClearFilters = () => {
    onClearFilters();
    // Ensure all filter values are empty strings, not undefined
    setTempFilters({
      unitNumber: '',
      unitName: '',
      projectId: ''
    });
  };

  const applyFilters = () => {
        // Send only non-empty filters to the backend
    const activeFilters = Object.fromEntries(
      Object.entries(tempFilters).filter(([_, value]) => value !== '')
    );
    
    if(Object.keys(activeFilters).length !== 0) {
      onFilterChange(activeFilters);
    }
  
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const toggleMobileFilters = () => {
    setMobileOpen(!mobileOpen);
  };

  // Filters content based on device size
  const filtersContent = (
    <Box sx={{ p: 2 }}>
      {isMobile && (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 2 
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Filters
          </Typography>
          
          <IconButton onClick={toggleMobileFilters} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      {isMobile ? (
        <MobileFilters 
          tempFilters={tempFilters}
          handleInputChange={handleInputChange}
          projects={projects}
          loadingProjects={loadingProjects}
          handleClearFilters={handleClearFilters}
          applyFilters={applyFilters}
        />
      ) : (
        <DesktopFilters 
          tempFilters={tempFilters}
          handleInputChange={handleInputChange}
          projects={projects}
          loadingProjects={loadingProjects}
          handleClearFilters={handleClearFilters}
          applyFilters={applyFilters}
        />
      )}
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          <Button
            variant="outlined"
            onClick={toggleMobileFilters}
            startIcon={<FilterIcon />}
            fullWidth
            sx={{ mb: 2 }}
          >
            Filter Apartments
          </Button>

          <Drawer
            anchor="bottom"
            open={mobileOpen}
            onClose={toggleMobileFilters}
            PaperProps={{
              sx: { 
                width: '100%',
                maxHeight: '80vh',
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
              }
            }}
          >
            {filtersContent}
          </Drawer>
        </>
      ) : (
        <Paper
          elevation={1}
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: '#fff',
          }}
        >
          {filtersContent}
        </Paper>
      )}
    </>
  );
};

export default SearchFilters; 