import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Typography, 
  Paper,
  Button,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from '@mui/material';
import { FilterList as FilterIcon, Close as CloseIcon } from '@mui/icons-material';

const SearchFilters = ({ onFilterChange, onClearFilters, filters, projects, loadingProjects }) => {
  const [tempFilters, setTempFilters] = useState(filters);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Update tempFilters when filters change from parent
  React.useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const handleInputChange = (e) => {
    setTempFilters({ ...tempFilters, [e.target.name]: e.target.value });
  };

  const handleClearFilters = () => {
    onClearFilters();
    setTempFilters(filters);
  };

  const applyFilters = () => {
    // Send only non-empty filters to the backend
    const activeFilters = Object.fromEntries(
      Object.entries(tempFilters).filter(([_, value]) => value !== '')
    );
    
    onFilterChange(activeFilters);
    
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const toggleMobileFilters = () => {
    setMobileOpen(!mobileOpen);
  };

  // Mobile filters content
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
        <>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Unit Number"
              name="unitNumber"
              value={tempFilters.unitNumber}
              onChange={handleInputChange}
              placeholder="Search by unit number..."
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Unit Name"
              name="unitName"
              value={tempFilters.unitName}
              onChange={handleInputChange}
              placeholder="Search by unit name..."
              variant="outlined"
              size="small"
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="project-select-label">Project</InputLabel>
              <Select
                labelId="project-select-label"
                name="projectId"
                value={tempFilters.projectId}
                onChange={handleInputChange}
                label="Project"
                disabled={loadingProjects}
                sx={{
                  minWidth: '200px',
                  '& .MuiSelect-select': {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }
                }}
              >
                <MenuItem value="">
                  <em>All Projects</em>
                </MenuItem>
                {loadingProjects ? (
                  <MenuItem disabled>
                    <CircularProgress size={20} />
                  </MenuItem>
                ) : (
                  projects.map((project) => (
                    <MenuItem key={project.id} value={project.id}>
                      {project.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              variant="outlined" 
              onClick={handleClearFilters}
              fullWidth
            >
              Clear
            </Button>
            <Button 
              variant="contained" 
              onClick={applyFilters}
              fullWidth
            >
              Apply
            </Button>
          </Box>
        </>
      ) : (
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Unit Number"
              name="unitNumber"
              value={tempFilters.unitNumber}
              onChange={handleInputChange}
              placeholder="Search by unit number..."
              variant="outlined"
              size="small"
            />
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Unit Name"
              name="unitName"
              value={tempFilters.unitName}
              onChange={handleInputChange}
              placeholder="Search by unit name..."
              variant="outlined"
              size="small"
            />
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="project-select-label">Project</InputLabel>
              <Select
                labelId="project-select-label"
                name="projectId"
                value={tempFilters.projectId}
                onChange={handleInputChange}
                label="Project"
                disabled={loadingProjects}
                sx={{
                  minWidth: '200px',
                  '& .MuiSelect-select': {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }
                }}
              >
                <MenuItem value="">
                  <em>All Projects</em>
                </MenuItem>
                {loadingProjects ? (
                  <MenuItem disabled>
                    <CircularProgress size={20} />
                  </MenuItem>
                ) : (
                  projects.map((project) => (
                    <MenuItem key={project.id} value={project.id}>
                      {project.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                variant="outlined" 
                onClick={handleClearFilters}
                sx={{ flex: 1 }}
                size="medium"
              >
                Clear
              </Button>
              <Button 
                variant="contained" 
                onClick={applyFilters}
                sx={{ flex: 1 }}
                size="medium"
              >
                Apply
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              mb: 2 
            }}
          >
            <Button
              startIcon={<FilterIcon />}
              onClick={toggleMobileFilters}
              color="primary"
              variant="contained"
              size="medium"
              sx={{ 
                borderRadius: 2, 
                boxShadow: 2,
                px: 2
              }}
            >
              Filters
            </Button>
          </Box>
          
          <Drawer
            anchor="bottom"
            open={mobileOpen}
            onClose={toggleMobileFilters}
            PaperProps={{
              sx: { 
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                maxHeight: '90vh',
                p: 1
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
            borderRadius: 2, 
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
          }}
        >
          {filtersContent}
        </Paper>
      )}
    </>
  );
};

export default SearchFilters; 