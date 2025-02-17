import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Drawer, List, ListItem, ListItemText, Badge } from '@mui/material';
import { Favorite, Person, ShoppingCart, Menu } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  '& a': {
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
  },
  '& .title': {
    fontFamily: 'playfairdisplay-bold, playfair display, serif',
    fontSize: '24px',
    color: theme.palette.primary.main,
  },
  '& .subtitle': {
    fontFamily: 'wf_0d73174536064218a7ae9cb49, orig_dm_sans_18_pt_regular',
    fontSize: '14px',
    fontWeight: 700,
    color: theme.palette.secondary.main,
  },
  '& .logo-image': {
    marginRight: theme.spacing(1),
  },
}));

const Header = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const updateItems = () => {
    const updatedWishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    const updatedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setWishlistItems(updatedWishlist);
    setCartItems(updatedCart);
  };

  useEffect(() => {
    updateItems(); 

    const handleCustomStorageEvent = (event) => {
      if (event.detail === 'wishlist' || event.detail === 'cart') {
        updateItems();
      }
    };

    window.addEventListener('customStorageChange', handleCustomStorageEvent);

    return () => {
      window.removeEventListener('customStorageChange', handleCustomStorageEvent);
    };
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = (
    <List>
      <ListItem button component={Link} to="/Shop">
        <ListItemText primary="Shop" />
      </ListItem>
      <ListItem button component={Link} to="/wishlist">
        <ListItemText primary="Wishlist" />
      </ListItem>
      <ListItem button component={Link} to="/auth">
        <ListItemText primary="Account" />
      </ListItem>
      <ListItem button component={Link} to="/cart">
        <ListItemText primary="Cart" />
      </ListItem>
    </List>
  );

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        {isMobile ? (
          <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <Menu />
            </IconButton>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
              {menuItems}
            </Drawer>
          </>
        ) : (
          <Box display="flex" flexGrow={1}>
            <Typography variant="h6" fontFamily={"Quicksand "} fontWeight={600} component={Link} to="/Shop" sx={{ textDecoration: 'none', color: '#762f51' }}>
              Shop
            </Typography>
          </Box>
        )}

        <Box display="flex" justifyContent="center" flexGrow={1}>
          <LogoContainer>
            <a href="/" target="_self">
              <img
                src="https://static.wixstatic.com/media/20a295_b15c1c0b29c04005a9f963fe566e2b3f~mv2.png/v1/crop/x_586,y_131,w_637,h_858/fill/w_71,h_90,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logo%20without%20BG.png"
                alt="StyledGenie Logo"
                className="logo-image"
                width="31"
                height="40"
              />
              <div>
                <div className="title">StyledGenie</div>
                <div className="subtitle">Styling Made Simple!</div>
              </div>
            </a>
          </LogoContainer>
        </Box>

        {!isMobile && (
          <Box display="flex" justifyContent="flex-end" flexGrow={1}>
            <Badge badgeContent={wishlistItems.length} color="secondary">
              <IconButton component={Link} to="/wishlist" color="inherit">
                <Favorite />
              </IconButton>
            </Badge>
            <IconButton component={Link} to="/auth" color="inherit">
              <Person />
            </IconButton>
            <Badge badgeContent={cartItems.length} color="secondary">
              <IconButton component={Link} to="/cart" color="inherit">
                <ShoppingCart />
              </IconButton>
            </Badge>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
