import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './theme';
import { Elements, StripeProvider } from 'react-stripe-elements';
import DGive from './screens/DGive.js';

export default function App() {
  return (
    <StripeProvider apiKey="pk_test_y69Z0N4wM6r6dyy6Sh4kcrWH00bivSnSRM">
      <div>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Elements>
              <DGive/>
            </Elements>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </StripeProvider>
  );
}
