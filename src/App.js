import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ProductShowcase from './pages/ProductShowcase';
import ProductDetails from './components/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Footer from './components/Footer';
import Header from './components/Header';
import BackToTop from './components/BackToTop'; 
import './App.css'; // Import the CSS file for transitions

const AppContent = () => {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <>
      <Header />
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames="fade"
          timeout={200}
          nodeRef={nodeRef}
        >
          <div ref={nodeRef} className="page">
            <Routes location={location}>
              <Route path="/Shop" element={<ProductShowcase />} />
              <Route path="/product/:productId" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
      <BackToTop /> 
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;