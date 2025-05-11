"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import { createApartment } from '../../api/apartments';
import { getProjects } from '../../api/projects';
import Layout from '@/components/layout/Layout';
import BasicInfoFields from '@/components/apartments/form/BasicInfoFields';
import PropertyDetailsFields from '@/components/apartments/form/PropertyDetailsFields';
import ImageUploadSection from '@/components/apartments/form/ImageUploadSection';
import LoadingIndicator from '@/components/common/LoadingIndicator';

const CreateApartmentPage = () => {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  
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

  useEffect(() => {
    const fetchProjects = async () => {
      setLoadingProjects(true);
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects');
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

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
      setError('Please make sure to fill the required fields in the form');
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
      
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      images.forEach((image) => {
        formDataToSend.append('images', image);
      });

      console.log(formDataToSend);
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
      setError(error.response.data.error || 'An error occurred while creating the apartment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container sx={{ py: 4 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 2, md: 4 }, 
            borderRadius: 2
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
              <BasicInfoFields 
                formData={formData}
                handleInputChange={handleInputChange}
                errors={errors}
              />
              <PropertyDetailsFields 
                formData={formData}
                handleInputChange={handleInputChange}
                errors={errors}
                projects={projects}
                loadingProjects={loadingProjects}
              />

              <ImageUploadSection 
                imagePreviewUrls={imagePreviewUrls}
                handleImageUpload={handleImageUpload}
                handleRemoveImage={handleRemoveImage}
              />
              
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
                  {loading ? <LoadingIndicator /> : 'Create Apartment'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
      
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
    </Layout>
  );
};

export default CreateApartmentPage;
