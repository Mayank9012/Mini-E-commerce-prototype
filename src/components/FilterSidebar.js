import React from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Slider, IconButton, Stack, Checkbox, FormControlLabel, Button } from '@mui/material';
import { Close, Star } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const FilterSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const FilterSidebar = ({
  isMobile,
  isMobileFiltersOpen,
  setIsMobileFiltersOpen,
  selectedCategory,
  setSelectedCategory,
  selectedColor,
  setSelectedColor,
  selectedBrand,
  setSelectedBrand,
  selectedPriceRange,
  setSelectedPriceRange,
  priceRange,
  categories,
  colors,
  brands,
  selectedRatings = [], 
  setSelectedRatings
}) => {
  const handleRatingChange = (event) => {
    const value = event.target.value;
    setSelectedRatings((prevRatings) =>
      prevRatings.includes(value)
        ? prevRatings.filter((rating) => rating !== value)
        : [...prevRatings, value]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedColor('all');
    setSelectedBrand('all');
    setSelectedPriceRange([priceRange.min, priceRange.max]);
    setSelectedRatings([]);
  };

  return (
    <FilterSection>
      {isMobile && (
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={() => setIsMobileFiltersOpen(false)}>
            <Close />
          </IconButton>
        </Box>
      )}

      <Stack spacing={3}>
        <FormControl fullWidth>
          <InputLabel>Article</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Category"
          >
            <MenuItem value="all">All Articles</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Color</InputLabel>
          <Select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            label="Color"
          >
            <MenuItem value="all">All Colors</MenuItem>
            {colors.map((color) => (
              <MenuItem key={color} value={color}>{color}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Brand</InputLabel>
          <Select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            label="Brand"
          >
            <MenuItem value="all">All Brands</MenuItem>
            {brands.map((brand) => (
              <MenuItem key={brand} value={brand}>{brand}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box>
          <Typography gutterBottom>Price Range</Typography>
          <Slider
            value={selectedPriceRange}
            onChange={(_, newValue) => setSelectedPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={priceRange.min}
            max={priceRange.max}
            valueLabelFormat={(value) => `₹${value}`}
          />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">₹{selectedPriceRange[0]}</Typography>
            <Typography variant="body2">₹{selectedPriceRange[1]}</Typography>
          </Box>
        </Box>

        <Box>
          <Typography gutterBottom>Rating</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedRatings.includes('3')}
                onChange={handleRatingChange}
                value="3"
              />
            }
            label={
              <Box display="flex" alignItems="center">
                <Star fontSize="small" sx={{ color: 'gold' }} />
                <Star fontSize="small" sx={{ color: 'gold' }} />
                <Star fontSize="small" sx={{ color: 'gold' }} />
                <Typography variant="body2" ml={1}>and up</Typography>
              </Box>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedRatings.includes('4')}
                onChange={handleRatingChange}
                value="4"
              />
            }
            label={
              <Box display="flex" alignItems="center">
                <Star fontSize="small" sx={{ color: 'gold' }} />
                <Star fontSize="small" sx={{ color: 'gold' }} />
                <Star fontSize="small" sx={{ color: 'gold' }} />
                <Star fontSize="small" sx={{ color: 'gold' }} />
                <Typography variant="body2" ml={1}>and up</Typography>
              </Box>
            }
          />
        </Box>

        <Button variant="outlined" color="primary" onClick={handleClearFilters}>
          Clear Filters
        </Button>
      </Stack>
    </FilterSection>
  );
};

export default FilterSidebar;