import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './theme';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
          </ThemeProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
