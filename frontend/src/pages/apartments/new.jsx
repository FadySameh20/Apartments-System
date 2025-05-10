import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Switch,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { CloudUpload as UploadIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { createApartment } from '../api/apartments';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
});

const CreateApartmentPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [formData, setFormData] = useState({
    unitName: '',
    unitNumber: '',
    description: '',
    price: '',
    area: '',
    bedroomsCount: '',
    bathroomsCount: '',
    floor: '',
    isFinished: false,
    projectId: '',
  });

  const [images, setImages] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear field-specific error when user edits the field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newImages = [...images, ...files];
    
    // const base64Images = await Promise.all(
    //   Array.from(newImages).map(file => {
    //     return new Promise((resolve, reject) => {
    //       const reader = new FileReader();
    //       reader.readAsDataURL(file);
    //       reader.onload = () => resolve(reader.result);
    //       reader.onerror = error => reject(error);
    //     });
    //   })
    // );
    setImages(newImages);

    // Create preview URLs for the images
    const newImagePreviewUrls = files.map(file => URL.createObjectURL(file));
    setImagePreviewUrls([...imagePreviewUrls, ...newImagePreviewUrls]);
  };

  const handleRemoveImage = (index) => {
    // Revoke object URL to prevent memory leaks
    URL.revokeObjectURL(imagePreviewUrls[index]);
    
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newImagePreviewUrls = [...imagePreviewUrls];
    newImagePreviewUrls.splice(index, 1);
    setImagePreviewUrls(newImagePreviewUrls);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Check required fields (all except description and images)
    const requiredFields = [
      'unitName', 'unitNumber', 'price', 
      'area', 'bedroomsCount', 'bathroomsCount', 
      'floor', 'projectId'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Validate number fields
    const numberFields = ['price', 'area', 'bedroomsCount', 'bathroomsCount', 'floor', 'projectId'];
    numberFields.forEach(field => {
      if (formData[field] && (isNaN(formData[field]) || Number(formData[field]) <= 0)) {
        newErrors[field] = 'Please enter a valid positive number';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setError('Please fix the errors in the form');
      return;
    }

    if (images.length === 0) {
      setError('Please upload at least one image');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const formDataToSend = new FormData();
      
      const apartmentData = {
        ...formData,
        price: Number(formData.price),
        area: Number(formData.area),
        bedroomsCount: Number(formData.bedroomsCount),
        bathroomsCount: Number(formData.bathroomsCount),
        floor: Number(formData.floor),
        projectId: Number(formData.projectId),
      };
      
      formDataToSend.append('apartmentData', JSON.stringify(apartmentData));
      images.forEach((image) => {
        formDataToSend.append('images', image);
      });

      await createApartment(formDataToSend);
              
      setSuccess(true);
      setImages([]);
      setImagePreviewUrls([]);

      // Reset form
      setFormData({
        unitName: '',
        unitNumber: '',
        description: '',
        price: '',
        area: '',
        bedroomsCount: '',
        bathroomsCount: '',
        floor: '',
        isFinished: false,
        projectId: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.message || 'An error occurred while creating the apartment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <Header />
      
      <Container component="main" sx={{ py: 4, flex: '1 0 auto' }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 2, md: 4 }, 
            borderRadius: 2,
            background: 'linear-gradient(to bottom, #f9f9f9, #ffffff)'
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            color="primary" 
            fontWeight="bold"
            align="center"
            sx={{ mb: 4 }}
          >
            Create New Apartment
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container direction={"column"} spacing={3}>
              {/* Basic Information */}
              <Grid size={12}>
                <Typography 
                  variant="h6" 
                  component="h2" 
                  color="primary.dark" 
                  fontWeight="medium"
                  sx={{ mb: 2 }}
                >
                  Basic Information
                </Typography>
              </Grid>
              
              <Grid container direction={"row"}>
                <Grid size={{ xs: 12, md: 6}}>
                  <TextField
                    name="unitName"
                    label="Unit Name"
                    value={formData.unitName}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={!!errors.unitName}
                    helperText={errors.unitName}
                  />
                </Grid>
                
                <Grid size={{ xs: 12, md: 6}}>
                  <TextField
                    name="unitNumber"
                    label="Unit Number"
                    value={formData.unitNumber}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={!!errors.unitNumber}
                    helperText={errors.unitNumber}
                  />
                </Grid>
              </Grid>
              
              <Grid size={12}>
                <TextField
                  name="description"
                  label="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>
              
              {/* Details */}
              <Grid size={12}>
                <Typography 
                  variant="h6" 
                  component="h2" 
                  color="primary.dark" 
                  fontWeight="medium"
                  sx={{ mt: 2, mb: 2 }}
                >
                  Property Details
                </Typography>
              </Grid>
              
              <Grid container direction={"row"}>
                <Grid size={{xs: 12, md: 6}}>
                  <TextField
                    name="price"
                    label="Price (EGP)"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={!!errors.price}
                    helperText={errors.price}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>
                
                <Grid size={{xs: 12, md: 6}}>
                  <TextField
                    name="area"
                    label="Area (m²)"
                    type="number"
                    value={formData.area}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={!!errors.area}
                    helperText={errors.area}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>
              </Grid>
              
              <Grid container direction={"row"}>
                <Grid size={{xs: 12, md: 6}}>
                  <TextField
                    name="bedroomsCount"
                    label="Bedrooms"
                    type="number"
                    value={formData.bedroomsCount}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={!!errors.bedroomsCount}
                    helperText={errors.bedroomsCount}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>
                
                <Grid size={{xs: 12, md: 6}}>
                  <TextField
                    name="bathroomsCount"
                    label="Bathrooms"
                    type="number"
                    value={formData.bathroomsCount}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={!!errors.bathroomsCount}
                    helperText={errors.bathroomsCount}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>
              </Grid>
              
              <Grid container direction={"row"}>
                <Grid size={{xs: 12, md: 6}}>
                  <TextField
                    name="floor"
                    label="Floor"
                    type="number"
                    value={formData.floor}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={!!errors.floor}
                    helperText={errors.floor}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>

                <Grid size={{xs: 12, md: 6}}>
                  <TextField
                    name="projectId"
                    label="Project ID"
                    type="number"
                    value={formData.projectId}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={!!errors.projectId}
                    helperText={errors.projectId}
                    InputProps={{ inputProps: { min: 1 } }}
                  />
                </Grid>
              </Grid>
              
              <Grid size={12}>
                <FormControlLabel
                  control={
                    <Switch
                      name="isFinished"
                      checked={formData.isFinished}
                      onChange={handleInputChange}
                      color="primary"
                    />
                  }
                  label="Finished"
                  sx={{ height: '100%', display: 'flex', alignItems: 'center' }}
                />
              </Grid>
              
              {/* Images */}
              <Grid size={12}>
                <Typography 
                  variant="h6" 
                  component="h2" 
                  color="primary.dark" 
                  fontWeight="medium"
                  sx={{ mt: 2, mb: 2 }}
                >
                  Images
                </Typography>
              </Grid>
              
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
                          onClick={() => handleRemoveImage(index)}
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
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              
              {/* Submit button */}
              <Grid size={12} sx={{ mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    fontWeight: 'bold',
                    position: 'relative',
                    background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #5a0cb6 0%, #1565fc 100%)',
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Apartment'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
      
      <Footer />
      
      {/* Error and Success messages */}
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError('')} severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
      
      <Snackbar 
        open={success} 
        autoHideDuration={6000} 
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccess(false)} severity="success" variant="filled">
          Apartment created successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateApartmentPage; 