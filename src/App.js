import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './theme';
import Routes from './components/Routes.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

export default function App() {
  return (
    <BrowserRouter>
        <div>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
              <Routes />
            <Footer />
          </ThemeProvider>
        </div>
    </BrowserRouter>
  );
}
