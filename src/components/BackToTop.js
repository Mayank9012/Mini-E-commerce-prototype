import React, { useState, useEffect } from 'react';
import { Fab } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  display: 'none',
  zIndex: 1000,
  height: 30,
  width: 35,
  color: 'white', 
  backgroundColor: '#762f51', 
  '&:hover': {
    backgroundColor: '#762f51', 
  },
}));

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <StyledFab
      onClick={scrollToTop}
      style={{ display: visible ? 'inline-flex' : 'none' }}
    >
      <KeyboardArrowUp sx={{ fontSize: '20px' }} /> 
    </StyledFab>
  );
};

export default BackToTop;