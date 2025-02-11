import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { ContextProductRecommender } from './ContextProductRecommender';
import ProductCard from './ProductCard';

const SimilarProducts = ({ currentProduct, allProducts }) => {
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
        const recommender = new ContextProductRecommender(allProducts);
        const recommendedItems = recommender.getContextRecommendations(currentProduct);
        setRecommendations(recommendedItems);
    }, [currentProduct, allProducts]);

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

    if (recommendations.length === 0) return null;

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                You May Also Like
            </Typography>
            <Grid container spacing={2}>
                {recommendations.map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product.id}>
                        <Box sx={{ mb: 3 }}>
                            <ProductCard
                                product={product}
                                handleAddToCart={handleAddToCart}
                                handleAddToWishlist={handleAddToWishlist}
                                isProductInWishlist={isProductInWishlist}
                            />
                            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2 }}>
                                {product.reason}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SimilarProducts;