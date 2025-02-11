import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Grid, CardContent, Rating, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import products from '../data/products';
import SimilarProducts from './SimilarProducts';

const ImageContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: 500,
  overflow: 'hidden',
  borderRadius: '10px',
  cursor: 'zoom-in',
});

const ZoomImage = styled(Box)(({ backgroundImage }) => ({
  width: '100%',
  height: '100%',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: '200%',
  backgroundRepeat: 'no-repeat',
  transition: 'background-position 0.1s ease-out',
}));

const ProductDetails = () => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId));

  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [zoomPosition, setZoomPosition] = useState({ x: '50%', y: '50%' });

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const storedWishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    setCartItems(storedCartItems);
    setWishlistItems(storedWishlistItems);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  
    return () => clearTimeout(timer); 
  }, [productId]);

  const handleMouseMove = (event) => {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;
    setZoomPosition({ x: `${x}%`, y: `${y}%` });
  };

  if (!product) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
      <Grid container spacing={3}>
        {/* Image with Zoom Effect */}
        <Grid item xs={12} md={6}>
          <ImageContainer onMouseMove={handleMouseMove}>
            <ZoomImage
              backgroundImage={product.image}
              sx={{
                backgroundPosition: `${zoomPosition.x} ${zoomPosition.y}`,
              }}
            />
          </ImageContainer>
        </Grid>

        {/* Title, Price, Buttons */}
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              {product.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {product.brand}
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                ₹{product.price.toFixed(2)}
              </Typography>
              {product.rating && (
                <Box display="flex" alignItems="center" ml={2}>
                  <Rating value={product.rating.rate} precision={0.1} readOnly size="small" />
                  {!isNaN(product.rating.count) && (
                    <Typography variant="body2" color="text.secondary" ml={1}>
                      ({product.rating.count})
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <Button
                variant="contained"
                startIcon={<ShoppingCart />}
                sx={{ mr: 2 }}
                onClick={() => {
                  if (!cartItems.some((item) => item.id === product.id)) {
                    const updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
                    setCartItems(updatedCartItems);
                    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
                    window.location.reload();
                  }
                }}
              >
                Add to Cart
              </Button>
              <IconButton
                onClick={() => {
                  const updatedWishlistItems = wishlistItems.some((item) => item.id === product.id)
                    ? wishlistItems.filter((item) => item.id !== product.id)
                    : [...wishlistItems, product];

                  setWishlistItems(updatedWishlistItems);
                  localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlistItems));
                  window.location.reload();
                }}
                color="secondary"
              >
                {wishlistItems.some((item) => item.id === product.id) ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Box>
          </CardContent>
        </Grid>

        {/*Description*/}
        <Grid item xs={12}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              Description:
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              component="div"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </CardContent>
        </Grid>

        {/* Similar Products */}
        <Grid item xs={12}>
          <SimilarProducts currentProduct={product} allProducts={products} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;