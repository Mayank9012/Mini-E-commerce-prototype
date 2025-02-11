import React, { useEffect, useState } from 'react';
import { MostLovedRecommender } from './MostLovedRecommender';
import ProductCard from './ProductCard';
import { Box } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const sliderStyles = {
    '.slick-slide': {
        padding: '0 10px',  
        '& > div': {
            height: '100%',  
        }
    },
    '.slick-list': {
        margin: '0 -10px',  
        padding: '20px 0',  
        overflow: 'hidden',  
    },
    '.slick-track': {
        display: 'flex !important',
        alignItems: 'stretch',
        '& .slick-slide': {
            height: 'auto',
            minHeight: '400px',  
            '& > div': {
                height: '100%'
            }
        }
    },
    '.slick-dots': {
        bottom: '-35px',  
        '& li button:before': {
            fontSize: '6px'
        }
    },
    '.slick-active': {
        zIndex: 1,
        '&:hover': {
            zIndex: 2
        }
    }
};

const MostLovedProducts = ({ products }) => {
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
        const recommender = new MostLovedRecommender(products);
        const recommendedItems = recommender.getRecommendations(8);
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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <Box className="recommended-products" sx={{ 
            padding: 3,
            '& .slick-slider': {
                paddingBottom: '40px',  
                overflow: 'visible'  
            }
        }}>
            <Box sx={sliderStyles}>
                <Slider {...settings}>
                    {recommendations.map(product => (
                        <div key={product.id} style={{ height: '100%' }}>
                            <ProductCard
                                product={product}
                                handleAddToCart={handleAddToCart}
                                handleAddToWishlist={handleAddToWishlist}
                                isProductInWishlist={isProductInWishlist}
                            />
                        </div>
                    ))}
                </Slider>
            </Box>
        </Box>
    );
};

export default MostLovedProducts;