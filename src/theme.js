import { createMuiTheme } from '@material-ui/core/styles';
import './App.css';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#45a329',
    },
    secondary: {
      main: '#a8a8a8',
    },
    error: {
      main: '#ff0000',
    },
    warning: {
      main: '#ff1744',
    },
    info: {
      main: '#45a329',
    },
    success: {
      main: '#45a329',
    },
    background: {
      default: '#EEE',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Fredericka the Great',
      'sans-serif'
    ].join(','),
  }
});

export default theme;