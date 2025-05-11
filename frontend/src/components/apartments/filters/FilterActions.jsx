import React from 'react';
import { Box, Button } from '@mui/material';

/**
 * Component for filter action buttons (Apply/Clear)
 */
const FilterActions = ({ onApply, onClear }) => (
  <Box sx={{ display: 'flex', gap: 1 }}>
    <Button 
      variant="outlined" 
      onClick={onClear}
      sx={{ flex: 1 }}
    >
      Clear
    </Button>
    <Button 
      variant="contained" 
      onClick={onApply}
      sx={{ flex: 1 }}
    >
      Apply
    </Button>
  </Box>
);

export default FilterActions; 