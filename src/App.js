import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import firebase from './firebase.js';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './theme';

export default function App() {
  const [testMessage, setTestMessage] = useState('test failed');

  useEffect(() => {
    var db = firebase.firestore();
    var dbRef = db.collection("communityFoundations");
    var newMessage = "";

    dbRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        newMessage = doc.data().test;
        console.log(newMessage);
      });

      setTestMessage(newMessage);

      // if (this.state.loaded === false) {
      //   this.observeTestMessage();
      //   this.setState({ loaded: true })
      // }
    });
  })

  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <p>{testMessage}</p>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}
