import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Grid,
  Drawer,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
  Pagination
} from '@mui/material';
import { FilterList } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import products from '../data/products';
import categories from '../data/categories';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import RecommendedProducts from '../components/RecommendedProducts';

const ProductShowcase = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const storedWishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    setCartItems(storedCartItems);
    setWishlistItems(storedWishlistItems);
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

  const handleAddToWishlist = (product) => {
    const isInWishlist = wishlistItems.some(item => item.id === product.id);
    let updatedWishlistItems;
    if (isInWishlist) {
      updatedWishlistItems = wishlistItems.filter(item => item.id !== product.id);
    } else {
      updatedWishlistItems = [...wishlistItems, product];
    }
    setWishlistItems(updatedWishlistItems);
    localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlistItems));
    window.location.reload();
  };

  const isProductInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const colors = useMemo(() => {
    const uniqueColors = new Set(products.map(product => product.color));
    return Array.from(uniqueColors);
  }, []);

  const brands = useMemo(() => {
    const uniqueBrands = new Set(products.map(product => product.brand));
    return Array.from(uniqueBrands);
  }, []);

  const priceRange = useMemo(() => {
    const prices = products.map(product => product.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices))
    };
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState([priceRange.min, priceRange.max]);
  const [selectedBrand, setSelectedBrand] = useState('all'); 
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 

  const productsPerPage = 48;

  
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const productCategories = product.category.split(',').map(cat => cat.trim());
      const matchesCategory = selectedCategory === 'all' ||
        productCategories.some(cat => cat.toLowerCase().includes(selectedCategory.toLowerCase()));

      const matchesPrice = product.price >= selectedPriceRange[0] &&
        product.price <= selectedPriceRange[1];

      const matchesColor = selectedColor === 'all' ||
        product.color.toLowerCase() === selectedColor.toLowerCase();

      const matchesBrand = selectedBrand === 'all' ||
        product.brand.toLowerCase() === selectedBrand.toLowerCase();

      const matchesRating = selectedRatings.length === 0 ||
        (product.rating && selectedRatings.some(rating => product.rating.rate >= parseInt(rating)));

      return matchesCategory && matchesPrice && matchesColor && matchesBrand && matchesRating;
    });
  }, [selectedCategory, selectedPriceRange, selectedColor, selectedBrand, selectedRatings]);

  // Calculate the products to display based on the current page
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  return (
    <Box sx={{ maxWidth: 1400, margin: '0 auto', padding: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={700} fontFamily={'Quicksand'}>
          Latest Collection
        </Typography>
        {isMobile && (
          <Button
            startIcon={<FilterList />}
            onClick={() => setIsMobileFiltersOpen(true)}
            variant="outlined"
          >
            Filters
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Desktop Sidebar */}
        {!isMobile && (
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ position: 'sticky', top: 20 }}>
              <FilterSidebar
                isMobile={isMobile}
                isMobileFiltersOpen={isMobileFiltersOpen}
                setIsMobileFiltersOpen={setIsMobileFiltersOpen}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                selectedPriceRange={selectedPriceRange}
                setSelectedPriceRange={setSelectedPriceRange}
                priceRange={priceRange}
                categories={categories}
                colors={colors}
                brands={brands}
                selectedRatings={selectedRatings}
                setSelectedRatings={setSelectedRatings}
              />
            </Paper>
          </Grid>
        )}

        {/* Mobile Filter Drawer */}
        <Drawer
          anchor="right"
          open={isMobileFiltersOpen}
          onClose={() => setIsMobileFiltersOpen(false)}
        >
          <Box sx={{ width: 280 }}>
            <FilterSidebar
              isMobile={isMobile}
              isMobileFiltersOpen={isMobileFiltersOpen}
              setIsMobileFiltersOpen={setIsMobileFiltersOpen}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              selectedPriceRange={selectedPriceRange}
              setSelectedPriceRange={setSelectedPriceRange}
              priceRange={priceRange}
              categories={categories}
              colors={colors}
              brands={brands}
              selectedRatings={selectedRatings}
              setSelectedRatings={setSelectedRatings}
            />
          </Box>
        </Drawer>

        {/* Product Grid */}
        <Grid item xs={12} md={!isMobile ? 9 : 12}>
          <Grid container spacing={3}>
            {paginatedProducts.map((product) => (
              <Grid item xs={6} sm={4} md={3} key={product.id}>
                <ProductCard
                  product={product}
                  handleAddToCart={handleAddToCart}
                  handleAddToWishlist={handleAddToWishlist}
                  isProductInWishlist={isProductInWishlist}
                />
              </Grid>
            ))}
          </Grid>

          {filteredProducts.length === 0 && (
            <Box textAlign="center" py={8}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No products match your selected filters.
              </Typography>
              <Button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedColor('all');
                  setSelectedPriceRange([priceRange.min, priceRange.max]);
                  setSelectedBrand('all');
                  setSelectedRatings([]);
                }}
                color="primary"
              >
                Reset Filters
              </Button>
            </Box>
          )}

          {/* Pagination */}
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Grid>
      </Grid>

      {/* Recommended Products */}
      <Box mt={5}>
        <RecommendedProducts products={products} />
      </Box>
    </Box>
  );
};

export default ProductShowcase;