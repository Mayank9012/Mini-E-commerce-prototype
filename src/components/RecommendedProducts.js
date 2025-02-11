import React, { useEffect, useState } from 'react';
import { ProductRecommender } from './ProductRecommender';
import ProductCard from './ProductCard';
import { Grid, Typography, Box } from '@mui/material';

const RecommendedProducts = ({ products }) => {
    const [recommendations, setRecommendations] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const storedWishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        setCartItems(storedCartItems);
        setWishlistItems(storedWishlistItems);
    }, []);

    useEffect(() => {
        const recommender = new ProductRecommender(products);
        const recommendedItems = recommender.getRecommendations(5);
        setRecommendations(recommendedItems);
    }, [products]);

    const handleAddToCart = (product) => {
        if (!cartItems.some((item) => item.id === product.id)) {
            const updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
            setCartItems(updatedCartItems);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            window.location.reload();
        }
    };

    const handleAddToWishlist = (product) => {
        const updatedWishlistItems = wishlistItems.some((item) => item.id === product.id)
            ? wishlistItems.filter((item) => item.id !== product.id)
            : [...wishlistItems, product];

        setWishlistItems(updatedWishlistItems);
        localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlistItems));
        window.location.reload();
    };

    const isProductInWishlist = (productId) => {
        return wishlistItems.some((item) => item.id === productId);
    };

    return (
        <Box className="recommended-products" sx={{ padding: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Recommended for You
            </Typography>
            <Grid container spacing={3}>
                {recommendations.map(product => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Box sx={{ mb: 3 }}>
                            <ProductCard
                                product={product}
                                handleAddToCart={handleAddToCart}
                                handleAddToWishlist={handleAddToWishlist}
                                isProductInWishlist={isProductInWishlist}
                            />
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                {product.reason}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default RecommendedProducts;