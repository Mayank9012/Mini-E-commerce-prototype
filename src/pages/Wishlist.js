import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AddShoppingCart, Remove } from '@mui/icons-material';
import RecommendedProducts from '../components/RecommendedProducts';
import products from '../data/products';
import { useNavigate } from 'react-router-dom';

const WishlistItemCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(2),
}));

const WishlistItemImage = styled(CardMedia)(({ theme }) => ({
  width: 150,
  objectFit: 'cover',
}));

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedWishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    setWishlistItems(storedWishlistItems);
  }, []);

  const handleAddToWishlist = (product) => {
    const existingItem = wishlistItems.find(item => item.id === product.id);
    if (existingItem) {
      return; 
    }
    const updatedWishlistItems = [...wishlistItems, product];
    setWishlistItems(updatedWishlistItems);
    localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlistItems));
    window.location.reload();
  };

  const handleRemoveFromWishlist = (id) => {
    const updatedWishlistItems = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updatedWishlistItems);
    localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlistItems));
    window.location.reload();
  };

  const handleAddToCart = (product) => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = storedCartItems.find(item => item.id === product.id);
    if (existingItem) {
      return; 
    }
    const updatedCartItems = [...storedCartItems, { ...product, quantity: 1 }];
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    window.location.reload();
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Wishlist
      </Typography>
      {wishlistItems.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Your wishlist is empty.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {wishlistItems.map(item => (
              <WishlistItemCard key={item.id}>
                <WishlistItemImage image={item.image} alt={item.title} />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" onClick={() => navigate(`/product/${item.id}`)} sx={{ cursor: 'pointer' }}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.brand}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.color}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ₹{item.price.toFixed(2)}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddToCart(item)}
                      sx={{ mr: 2 }}
                    >
                      <AddShoppingCart />
                      Add to Cart
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >
                      <Remove />
                      Remove
                    </Button>
                  </Box>
                </CardContent>
              </WishlistItemCard>
            ))}
          </Grid>
        </Grid>
      )}
      {/* Recommended Products */}
      <Box mt={5}>
        <RecommendedProducts products={products} />
      </Box>
    </Box>
  );
};

export default Wishlist;