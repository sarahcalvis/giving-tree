import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { withAuthProvider } from './auth';
import theme from './theme';
import Routes from './components/Routes.js';
import Header from './components/Header.js';

function App(props) {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routes />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default withAuthProvider(App);
export { App };