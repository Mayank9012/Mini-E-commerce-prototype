import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Add, Remove } from '@mui/icons-material';
import RecommendedProducts from '../components/RecommendedProducts';
import products from '../data/products';
import { useNavigate } from 'react-router-dom';

const CartItemCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(2),
}));

const CartItemImage = styled(CardMedia)(({ theme }) => ({
  width: 150,
  objectFit: 'cover',
}));

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const initializedCartItems = storedCartItems.map(item => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(initializedCartItems);
  }, []);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      return; 
    }
    const updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    window.location.reload();
  };

  const handleRemoveFromCart = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    window.location.reload();
  };

  const handleIncreaseQuantity = (id) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id && item.quantity < 5) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleDecreaseQuantity = (id) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const calculateTotalAmount = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const taxes = cartItems.reduce((total, item) => total + 5 * item.quantity, 0); 
    const deliveryCharges = 50; 
    return {
      subtotal,
      taxes,
      deliveryCharges,
      total: subtotal + taxes + deliveryCharges,
    };
  };

  const { subtotal, taxes, deliveryCharges, total } = calculateTotalAmount();

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Your cart is empty.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {cartItems.map(item => (
              <CartItemCard key={item.id}>
                <CartItemImage image={item.image} alt={item.title} />
                <CardContent sx={{ flex: 1 }} >
                  <Typography variant="h6" onClick={() => navigate(`/product/${item.id}`)} sx={{ cursor: 'pointer' }}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary" >
                    {item.brand}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.color}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ₹{item.price.toFixed(2)}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={2}>
                    <Box display="inline-flex" alignItems="center" sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
                      <IconButton onClick={() => handleDecreaseQuantity(item.id)} color="primary">
                        <Remove />
                      </IconButton>
                      <Typography variant="body2" mx={2}>
                        {item.quantity}
                      </Typography>
                      <IconButton onClick={() => handleIncreaseQuantity(item.id)} color="primary">
                        <Add />
                      </IconButton>
                    </Box>
                  </Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveFromCart(item.id)}
                    sx={{ mt: 2 }}
                  >
                    Remove
                  </Button>
                </CardContent>
              </CartItemCard>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                padding: 3,
                border: '1px solid #ccc',
                borderRadius: 2,
                position: { md: 'sticky' },
                top: { md: 20 },
                mt: { xs: 3, md: 0 },
              }}
            >
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="body2">Subtotal</Typography>
                <Typography variant="body2">₹{subtotal.toFixed(2)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="body2">Taxes</Typography>
                <Typography variant="body2">₹{taxes.toFixed(2)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="body2">Delivery Charges</Typography>
                <Typography variant="body2">₹{deliveryCharges.toFixed(2)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">₹{total.toFixed(2)}</Typography>
              </Box>
              <Button variant="contained" color="primary" fullWidth>
                Proceed to Checkout
              </Button>
            </Box>
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

export default Cart;