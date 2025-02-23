import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import products from '../data/products';
import MostLovedProducts from '../components/MostLovedProducts';

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: 'url(https://img.freepik.com/free-photo/young-woman-wearing-fashionable-clothes_273609-21100.jpg?t=st=1740299781~exp=1740303381~hmac=eca4db4584dda1791d569f7dd600870f95ee0a34b6ec47aba780d00d8ccc3ba3&w=1800)',
  backgroundSize: ' cover',
  backgroundPosition: 'center top',
  backgroundRepeat: 'no-repeat',
  color: theme.palette.common.white,
  padding: theme.spacing(8, 2),
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(12, 2),
  },
  height: '50vh',
  marginTop: '10px',
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '##f4f4f4',
  color: 'common.white',
  boxShadow: '-3px -3px 10px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <HeroSection sx={{ mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom fontWeight={700} fontFamily={'Quicksand'} sx={{ textShadow: '4px 4px 6px rgba(0, 0, 0, 0.3)', }}>
          Welcome to StyledGenie
        </Typography>
        <Typography variant="h5" component="h1" gutterBottom fontWeight={700} fontFamily={'Quicksand'} sx={{ textShadow: '4px 4px 6px rgba(0, 0, 0, 0.3)', }}>
          Discover the latest trends in fashion and style.
        </Typography>
        <Button variant="contained" sx={{ backgroundColor: '#762f51', '&:hover': { backgroundColor: '#762f51' } }} size="large" component={Link} to="/shop">
          Shop Now
        </Button>
      </HeroSection>

      {/* Most-Loved Fashion Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center" >
          Customers' Most-Loved Fashion for You
        </Typography>
        <Typography variant="body1" component="p" textAlign="center" sx={{ mb: 4 }}>
          Discover what our community is raving about
        </Typography>
        <MostLovedProducts products={products} />
      </Container>

      {/* Service Highlights */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ mb: 4 }}>
          Our Services
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <ServiceCard>
              <CardMedia
                component="img"
                height="140"
                image="https://static.wixstatic.com/media/20a295_c62b9c9be4e14faa8c5a98f37e3f782d~mv2.jpg/v1/fill/w_363,h_246,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/stylish-people-wearing-k-pop-aesthetics-clothing.jpg"
                alt="Service 1"
              />
              <CardContent>
                <Typography variant="h6" component="h3" fontWeight={550} textAlign={"center"} >
                Personalized Style Tailored to You
                </Typography>
              </CardContent>
            </ServiceCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ServiceCard>
              <CardMedia
                component="img"
                height="140"
                image="https://static.wixstatic.com/media/20a295_69d65023121e4c99b8c329fce1de76e8~mv2.jpg/v1/fill/w_363,h_246,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/asian-fashion-designer-talking-her-colleagues-about-plan-fashion-design-video-conference_j.jpg"
                alt="Service 2"
              />
              <CardContent>
                <Typography variant="h6" component="h3" fontWeight={550} textAlign={"center"}>
                Virtual Styling Convenience
                </Typography>
              </CardContent>
            </ServiceCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ServiceCard>
              <CardMedia
                component="img"
                height="140"
                image="https://static.wixstatic.com/media/20a295_84296c72220f4fdc82767c07c7734c23~mv2.jpg/v1/fill/w_363,h_246,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/pexels-anastasia-shuraeva-8074597.jpg"
                alt="Service 2"
              />
              <CardContent>
                <Typography variant="h6" component="h3" fontWeight={550} textAlign={"center"}>
                Transformative Wardrobe Upgrades
                </Typography>
              </CardContent>
            </ServiceCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ServiceCard>
              <CardMedia
                component="img"
                height="140"
                image="https://static.wixstatic.com/media/20a295_2e52300d3bc5432eba07dfa9821d5498~mv2.jpg/v1/fill/w_363,h_246,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/pexels-kseniachernaya-3965545.jpg"
                alt="Service 3"
              />
              <CardContent>
                <Typography variant="h6" component="h3" fontWeight={550} textAlign={"center"}>
                Sustainable & Thoughtful Choices
                </Typography>
              </CardContent>
            </ServiceCard>
          </Grid>
        </Grid>
      </Container>

      {/* Testimonials */}
      <Container sx={{ py: 8, backgroundColor: 'background.paper' }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          What Our Customers Say
        </Typography>
        <Typography variant="body1" component="p" textAlign="center" sx={{ mb: 4 }}>
        Here's what our customers have to share about their experience with us.
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <TestimonialCard>
              <CardContent>
                <Typography variant="body1" component="p">
                  "StyledGenie has completely transformed my wardrobe. The personal styling service is amazing!"
                </Typography>
                <Typography variant="subtitle1" component="p" sx={{ mt: 2 }}>
                  - Jane Doe
                </Typography>
              </CardContent>
            </TestimonialCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TestimonialCard>
              <CardContent>
                <Typography variant="body1" component="p">
                  "I love the trend analysis reports. They keep me updated with the latest fashion trends."
                </Typography>
                <Typography variant="subtitle1" component="p" sx={{ mt: 2 }}>
                  - John Smith
                </Typography>
              </CardContent>
            </TestimonialCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TestimonialCard>
              <CardContent>
                <Typography variant="body1" component="p">
                  "The custom tailoring service is top-notch. My outfits fit perfectly!"
                </Typography>
                <Typography variant="subtitle1" component="p" sx={{ mt: 2 }}>
                  - Emily Johnson
                </Typography>
              </CardContent>
            </TestimonialCard>
          </Grid>
        </Grid>
      </Container>

      {/* Call-to-Action Section */}
      <Box sx={{ py: 8, textAlign: 'center', backgroundColor: '#ba7897', color: 'common.white' }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight={700} fontFamily={'Quicksand'}> 
          Ready to Elevate Your Style?
        </Typography>
        <Button variant="contained" sx={{ backgroundColor: '#762f51', '&:hover': { backgroundColor: '#762f51' } }} size="large" component={Link} to="/shop">
          Start Shopping
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
