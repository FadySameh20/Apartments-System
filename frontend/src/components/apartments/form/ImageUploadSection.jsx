import React from 'react';
import { Grid, Button } from '@mui/material';
import { CloudUpload as UploadIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import FormSectionHeader from './FormSectionHeader';
import ImagePreview from './ImagePreview';

// Hidden file input component
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
});

/**
 * Component for uploading and previewing apartment images
 */
const ImageUploadSection = ({ imagePreviewUrls, handleImageUpload, handleRemoveImage }) => (
  <>
    <FormSectionHeader title="Images" />
    <Grid size={12}>
      <Button
        component="label"
        variant="outlined"
        startIcon={<UploadIcon />}
        sx={{ mb: 2 }}
      >
        Upload Images
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        />
      </Button>
      
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {imagePreviewUrls.map((url, index) => (
          <Grid size={{xs: 6, sm: 4, md: 3}} key={index}>
            <ImagePreview 
              url={url} 
              index={index} 
              onRemove={() => handleRemoveImage(index)} 
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  </>
);

export default ImageUploadSection; 