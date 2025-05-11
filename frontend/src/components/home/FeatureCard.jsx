import React from 'react';
import {
    Box,
    Typography,
    Paper,
    alpha,
} from '@mui/material';

export default function FeatureCard({ icon: Icon, title, description }) {
    return (
        <Paper
            elevation={0}
            sx={{ 
            p: 4, 
            height: '100%',
            textAlign: 'center',
            borderRadius: 3,
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
            transition: 'transform 0.3s ease',
            '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
            }
            }}
        >
            <Box 
                sx={{ 
                    mb: 2, 
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 80,
                    width: 80,
                    borderRadius: '50%',
                    bgcolor: alpha('#6a11cb', 0.1),
                    mx: 'auto'
                }}
                >
                <Icon sx={{ fontSize: 40, color: 'primary.main' }} />
            </Box>
            <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                {title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                {description}
            </Typography>
        </Paper>
    );
}
