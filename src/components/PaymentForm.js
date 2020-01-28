// TODO: will receive props describing grant
// TODO: split up elements to make it look nicer

import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import Text from '../components/Text.js';
import firebase from '../firebase.js';
import ProgressBar from '../components/ProgressBar.js';
import * as naughtyFirebase from 'firebase';
import {
  CardElement,
  injectStripe
} from 'react-stripe-elements';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  pageLayout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  stripeElement: {
    display: 'block',
    margin: '10px 0 20px 0',
    width: '100%',
    padding: '10px 14px',
    fontSize: '1em',
    fontFamily: 'Roboto',
    boxShadow: 'rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px',
    border: '0',
    outline: '0',
    borderRadius: '4px',
    background: 'white',
  },
}))


function PaymentForm(props) {
  const classes = useStyles();

  // Grant details received as props
  const [grantId] = React.useState(props.grantId);


  // Record transaction state
  const [complete, setComplete] = React.useState(false);
  const [amount, setAmount] = React.useState('');

  // Details about the grant we will get from the database
  const [raised, setRaised] = React.useState('');
  const [goal, setGoal] = React.useState('');
  const [grantName, setGrantName] = React.useState('');


  // Initialize database and specific grant in database
  // const db = firebase.firestore();
  // const docRef = db.collection('grants').doc(grantId);


  // useEffect(() => {
  //   // Load the grant details from the database
  //   docRef.onSnapshot((doc) => {
  //     if (doc.exists) {
  //       setGoal(doc.data().goal_amt);
  //       setRaised(doc.data().money_raised);
  //       setGrantName(doc.data().title);
  //     } else {
  //       console.log('No such grant!');
  //     }
  //   })
  // });

  const submit = async (ev) => {
    // Confirm payment amount is in bounds
    if (Number.parseInt(amount) > 0 &&
      !Number.parseInt(amount).isNaN &&
      Number.parseInt(amount) <= (goal - raised)) {

      // Make the payment
      let { token } = await props.stripe.createToken({ name: 'Giving Tree Donor' });
      let response = await fetch('/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: token.id + ' amount: ' + (amount * 100) + ' description: ' + grantName,
      });

      // if (response.ok) {
      //   // Update the amount in firebase
      //   docRef.update({
      //     // TODO: use a cloud function
      //     //money_raised: naughtyFirebase.firestore.FieldValue.increment(Number.parseInt(amount)),

      //     // TODO: make this a collection
      //     //donations: naughtyFirebase.firestore.FieldValue.arrayUnion(Number.parseInt(amount)),
      //   }).then(function () {
      //     // Record transaction complete
      //     setComplete(true);
      //   });
      // }
    }
  }

  return (
    <Container className={classes.pageLayout}>
      <React.Fragment>
        <Text type='card-heading' text={grantName} />
        <ProgressBar raised={raised} goal={goal} />
        {complete ?
          <Text type='card-subheading' text={'Thank you for your donation! Thanks to your gift of $' + amount + ', ' + grantName + ' is now only  $' + (goal - raised) + ' from meeting its goal of $' + goal + '!'} />
          :
          <div>
            <CardElement className={classes.stripeElement} />
            <input
              className={classes.stripeElement}
              placeholder="Amount"
              onInput={e => setAmount(e.target.value)} />
            <Button
              fullWidth
              color="primary"
              className={classes.button}
              variant="contained"
              onClick={submit}>
              Donate {Number.parseInt(amount) > 0 && '$' + amount}
              </Button>
          </div>
        }
      </React.Fragment>
    </Container>
  );
}

export default injectStripe(PaymentForm);