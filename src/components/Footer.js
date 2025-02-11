import React from 'react';
import { Box, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
	backgroundColor: '#f4f4f4',
  color: theme.palette.common.black,
  padding: theme.spacing(4, 2),
  marginTop: theme.spacing(4),
  boxShadow: '-3px -3px 10px rgba(0, 0, 0, 0.2)',
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.black,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const Footer = () => {
  return (
    <FooterContainer>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body2">
            We are a leading fashion retailer providing the latest trends and styles. Our mission is to make fashion accessible to everyone.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Box>
            <FooterLink href="/">Home</FooterLink>
          </Box>
          <Box>
            <FooterLink href="/shop">Shop</FooterLink>
          </Box>
          <Box>
            <FooterLink href="/wishlist">Wishlist</FooterLink>
          </Box>
          <Box>
            <FooterLink href="/cart">Cart</FooterLink>
          </Box>

        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Box>
            <IconButton href="https://www.facebook.com" target="_blank" color="inherit">
              <Facebook />
            </IconButton>
            <IconButton href="https://www.twitter.com" target="_blank" color="inherit">
              <Twitter />
            </IconButton>
            <IconButton href="https://www.instagram.com" target="_blank" color="inherit">
              <Instagram />
            </IconButton>
            <IconButton href="https://www.linkedin.com" target="_blank" color="inherit">
              <LinkedIn />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ mt: 2 }}>
            &copy; {new Date().getFullYear()} StyledGenie. All rights reserved.
          </Typography>
        </Grid>
      </Grid>
    </FooterContainer>
  );
};

export default Footer;