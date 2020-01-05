import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import firebase from './firebase.js';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './theme';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      testMessage: "test failed",
    }
  }
  componentDidMount() {
    var db = firebase.firestore();
    var dbRef = db.collection("communityFoundations");
    var testMessage = "";

    dbRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        testMessage = doc.data().test;
        console.log(testMessage);
      });

      this.setState({ testMessage: testMessage})

      if (this.state.loaded === false) {
        this.observeTestMessage();
        this.setState({ loaded: true })
      }
    });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <p>{this.state.testMessage}</p>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
