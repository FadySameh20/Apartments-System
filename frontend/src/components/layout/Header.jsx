import React, { useState } from 'react';
import { 
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Apartment as ApartmentIcon,
  AddCircleOutline as AddIcon
} from '@mui/icons-material';
import Link from 'next/link';

const navItems = [
  { name: 'Home', href: '/', icon: <HomeIcon /> },
  { name: 'Apartments', href: '/apartments', icon: <ApartmentIcon /> },
  { name: 'New', href: '/apartments/new', icon: <AddIcon /> }
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold' }}>
        Nawy Apartments
      </Typography>
      <List>
        {navItems.map((item) => (
          <Link key={item.name} href={item.href} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {item.icon}
                  <ListItemText primary={item.name} sx={{ ml: 1 }} />
                </Box>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <Box>
      <AppBar position="static" color="default" elevation={1}>
        <Container maxWidth="lg">
          <Toolbar>
            <Typography
              variant="h6"
              component={Link}
              href="/"
              sx={{
                flexGrow: 1,
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
            >
              Nawy Apartments
            </Typography>
            
            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex' }}>
                {navItems.map((item) => (
                  <Button 
                    key={item.name} 
                    component={Link} 
                    href={item.href}
                    startIcon={item.icon}
                    sx={{ ml: 2 }}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': { width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Header; 