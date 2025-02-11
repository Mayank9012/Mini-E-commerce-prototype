import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, IconButton, Rating } from '@mui/material';
import { ShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const ProductCardContainer = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

const ProductImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&:hover': {
    '& .overlay': {
      opacity: 1,
    },
  },
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: 225,
  width: '100%',
  objectFit: 'cover',
}));

const ProductOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.3s ease-in-out',
}));

const colorMap = {
  'navy blue': '#000080',
  mustard: '#FFDB58',
  'lime green': '#32CD32',
  'sea green': '#2E8B57',
  burgundy: '#800020',
  charcoal: '#36454F',
  copper: '#B87333',
  cream: '#FFFDD0',
  peach: '#FFDAB9',
  fluorescent: '#08FF00',
  mauve: '#E0B0FF',
  rust: '#B7410E',
  'coffee brown': '#4B3621',
  taupe: '#483C32',
  'off white': '#FFFFE0',
  nude: '#FFDDCF',
  'turquoise blue': '#00FFEF',
  rose: '#FF007F',
  multi: 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)',
};

const ColorCircle = styled(Box)(({ theme, color }) => ({
  width: 16,
  height: 16,
  borderRadius: '50%',
  background: colorMap[color.toLowerCase()] || color, 
  border: '1px solid #ccc',
  display: 'inline-block',
  marginRight: theme.spacing(1),
}));

const ProductCard = ({ product, handleAddToCart, handleAddToWishlist, isProductInWishlist }) => {
  const navigate = useNavigate();

  return (
    <ProductCardContainer>
      <ProductImageContainer>
        <ProductImage
          component="img"
          image={product.image}
          alt={product.title}
        />
        <ProductOverlay className="overlay">
          <Button
            variant="contained"
            startIcon={<ShoppingCart />}
            sx={{ bgcolor: 'white', color: 'black', '&:hover': { bgcolor: 'grey.100' } }}
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </Button>
        </ProductOverlay>
      </ProductImageContainer>
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          onClick={() => navigate(`/product/${product.id}`)} 
          sx={{ cursor: 'pointer' }}
        >
          {product.brand}
        </Typography>
        <Typography
          color="text.secondary"
          gutterBottom
          component="h3"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: '1.4em',
            height: '2.8em',
            cursor: 'pointer'
          }}
          onClick={() => navigate(`/product/${product.id}`)} 
        >
          {product.title}
        </Typography>
        <Box display="flex" alignItems="center" mb={1}>
          <ColorCircle color={product.color} />
          <Typography variant="body2" color="text.secondary">
            {product.color}
          </Typography>
        </Box>
        <Typography variant="h6" color="primary">
          ₹{product.price.toFixed(2)}
        </Typography>
        {product.rating && (
          <Box display="flex" alignItems="center" flexWrap="wrap">
            <Rating value={product.rating.rate} precision={0.1} readOnly size="small" />
            {!isNaN(product.rating.count) && (
              <Typography variant="body2" color="text.secondary" ml={1}>
                ({product.rating.count})
              </Typography>
            )}
          </Box>
        )}
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={() => handleAddToWishlist(product)} color="secondary">
            {isProductInWishlist(product.id) ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Box>
      </CardContent>
    </ProductCardContainer>
  );
};

export default ProductCard;