import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

/**
 * Component for displaying image previews with delete functionality
 */
const ImagePreview = ({ url, index, onRemove }) => (
  <Box
    sx={{
      position: 'relative',
      height: 150,
      borderRadius: 1,
      overflow: 'hidden',
      boxShadow: 2,
    }}
  >
    <Box
      component="img"
      src={url}
      alt={`Apartment image ${index + 1}`}
      sx={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
    <IconButton
      size="small"
      onClick={onRemove}
      sx={{
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        },
      }}
    >
      <DeleteIcon fontSize="small" />
    </IconButton>
  </Box>
);

export default ImagePreview; 