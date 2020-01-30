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
import { useDocumentOnce } from 'react-firebase-hooks/firestore';

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
  const [status, setStatus] = React.useState('incomplete');
  const [amount, setAmount] = React.useState('');

  // Details about the grant we will get from the database
  const [grant, setGrant] = React.useState('');
  const [raised, setRaised] = React.useState('');
  const [goal, setGoal] = React.useState('');

  // Payment details we will get from the database
  const [cfId, setCfId] = React.useState('');
  const [acctId, setAcctId] = React.useState('');

  // Initialize database and specific grant in database
  const db = firebase.firestore();
  const [value, loading, error] = useDocumentOnce(db.doc('grants/' + grantId));


  // Load grant details from the database
  useEffect(() => {
    if (!loading && !error) {
      setGrant(value.data().title);
      setGoal(value.data().goal_amt);
      setRaised(value.data().money_raised);
      setCfId(value.data().cf_id);
    }
  }, [value, error, loading]);

  // Load community foundation details from the database
  useEffect(() => {
    if (cfId !== '' && cfId) {
      db.collection('communityFoundations').doc(cfId).get()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document for CF ' + cfId);
          } else {
            setAcctId(doc.data().acct_id)
          }
        })
        .catch(err => {
          console.log('Error getting document', err);
        });
    }
  }, [cfId])

  const submit = async (ev) => {
    // Confirm payment amount is in bounds
    if (Number.parseInt(amount) > 0 &&
      !Number.parseInt(amount).isNaN &&
      Number.parseInt(amount) <= (goal - raised) && 
      acctId !== '') {

      // Make the payment
      let { token } = await props.stripe.createToken({ name: 'Giving Tree Donor' });
      console.log('token created')
      let response = await fetch('/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: token.id + ' amount: ' + (amount * 100) + ' description: ' + grant + ' account: ' + acctId,
      });
      console.log(response);
      let resJSON = await response.json();
      console.log(JSON.stringify(resJSON));
      if (response.ok) {
        // // Update the amount in firebase
        // docRef.update({
        //   // TODO: use a cloud function
        //   //money_raised: naughtyFirebase.firestore.FieldValue.increment(Number.parseInt(amount)),

        //   // TODO: make this a collection
        //   //donations: naughtyFirebase.firestore.FieldValue.arrayUnion(Number.parseInt(amount)),
        // }).then(function () {
        // Record transaction complete
        setStatus('complete');
      } else {
        setStatus('error');
      }
    }
  }

  return (
    <Container className={classes.pageLayout}>
      <React.Fragment>
        <Text type='card-heading' text={grant} />
        <ProgressBar raised={raised} goal={goal} />
        {status === 'incomplete' &&
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
        {status === 'complete' &&
          <Text type='card-subheading' text={'Thank you for your donation! Thanks to your gift of $' + amount + ', ' + grant + ' is now only  $' + (goal - raised) + ' from meeting its goal of $' + goal + '!'} />
        }
        {status === 'error' &&
          <Text type='card-subheading' text={'Sorry, an error occurred 🤡'} />
        }
      </React.Fragment>
    </Container>
  );
}

export default injectStripe(PaymentForm);