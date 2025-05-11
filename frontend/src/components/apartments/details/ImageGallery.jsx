import React from 'react';
import { Box, CardMedia, alpha, useTheme, useMediaQuery } from '@mui/material';

/**
 * Image gallery component with main image and thumbnails
 */
const ImageGallery = ({ images, activeImageIndex, setActiveImageIndex }) => {
  const theme = useTheme();
  
  return (
    <>
      <Box sx={{ 
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <CardMedia
          component="img"
          image={images && images.length > 0 
            ? images[activeImageIndex] 
            : '/apartment-placeholder.jpg'}
          alt="Apartment"
          sx={{ 
            objectFit: 'contain',
            height: { xs: '300px', md: '400px' },
            width: { xs: '300px', md: '400px' },
            borderRadius: 1,
            margin: '0 auto'
          }}
        />
      </Box>
      
      {/* Thumbnails */}
      {images && images.length > 1 && (
        <Box 
          justifyContent={"center"}
          sx={{ 
            display: 'flex',
            overflowX: 'auto',
            gap: 1,
            p: 1,
            bgcolor: alpha(theme.palette.primary.main, 0.05)
          }}
        >
          {images.map((img, index) => (
            <Box
              key={index}
              onClick={() => setActiveImageIndex(index)}
              sx={{
                width: 80,
                height: 60,
                flexShrink: 0,
                borderRadius: 1,
                overflow: 'hidden',
                border: index === activeImageIndex 
                  ? `2px solid ${theme.palette.primary.main}` 
                  : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  opacity: 0.8
                }
              }}
            >
              <CardMedia
                component="img"
                image={img}
                alt={`Apartment - image ${index + 1}`}
                sx={{ 
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover'
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default ImageGallery;
