import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './theme';
import { Elements, StripeProvider } from 'react-stripe-elements';
import Routes from './components/Routes.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

export default function App() {
  return (
    <BrowserRouter>
      <StripeProvider apiKey="pk_test_y69Z0N4wM6r6dyy6Sh4kcrWH00bivSnSRM">
        <div>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Elements>
              <Routes />
            </Elements>
            <Footer />
          </ThemeProvider>
        </div>
      </StripeProvider>
    </BrowserRouter>
  );
}
