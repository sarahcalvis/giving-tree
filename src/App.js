import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import firebase from './firebase.js';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './theme';
import { Elements, StripeProvider } from 'react-stripe-elements';

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
    });
  })

  return (
    <StripeProvider apiKey="pk_test_y69Z0N4wM6r6dyy6Sh4kcrWH00bivSnSRM">
      <div>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Elements>
              <p>{testMessage}</p>
            </Elements>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </StripeProvider>
  );
}
