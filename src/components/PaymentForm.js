// TODO: will receive props describing grant
// TODO: split up elements to make it look nicer

import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import Text from '../components/Text.js';
import firebase from '../firebase.js';
import ProgressBar from '../components/ProgressBar.js';
import LinearProgress from '@material-ui/core/LinearProgress';
// FYI: removing this unused import does make the whole project crash, do not know why
import * as naughtyFirebase from 'firebase';
import {
  CardElement,
  injectStripe
} from 'react-stripe-elements';
import Button from '@material-ui/core/Button';
import { useDocument } from 'react-firebase-hooks/firestore';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 500,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
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
  const [clicked, setClicked] = React.useState(false);

  // Details about the grant we will get from the database
  const [grant, setGrant] = React.useState('');
  const [raised, setRaised] = React.useState('');
  const [goal, setGoal] = React.useState('');

  // Payment details we will get from the database
  const [cfId, setCfId] = React.useState('');
  const [acctId, setAcctId] = React.useState('');

  // Initialize database and specific grant in database
  const db = firebase.firestore();
  const [value, loading, error] = useDocument(db.doc('grants/' + grantId));


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
            setStatus('error')
          } else {
            setAcctId(doc.data().acct_id)
          }
        })
        .catch(err => {
          console.log('Error getting document', err);
          setStatus('error')
        });
    }
  }, [cfId]);

  // Set tab title
  useEffect(() => { document.title = 'Give to ' + grant; }, [grant]);

  const submit = async (ev) => {
    // Disable the donate button to avoid double payments
    setClicked(true);

    // Confirm payment amount is in bounds
    if (amountIsGood() && acctId !== '') {

      // Make the token
      let { token } = await props.stripe.createToken({ name: 'Giving Tree Donor' });

      // Set the status to waiting
      setStatus('waiting');

      // Send the payment to the server
      let response = await fetch('/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: token.id + ' amount: ' + (amount * 100) + ' description: ' + grant + ' account: ' + acctId,
      });

      console.log(response);

      if (response.ok) {
        let resJSON = await response.json();
        console.log(JSON.stringify(resJSON));

        let grantRef = db.collection('grants').doc(grantId);

        // Update the donation collection for the grant in firebase
        grantRef.collection('donations').add({
          donation: Number.parseInt(amount),
          timestamp: naughtyFirebase.firestore.Timestamp.fromDate(new Date()),
        }).then(ref => {
          console.log('Added donation of ' + amount + ' with ID ' + ref.id + ' to the donations collection');
          // Update the total donation amount for the grant in firebase
          // TODO: make a docref!
          let transaction = db.runTransaction(t => {
            return t.get(grantRef)
              .then(doc => {
                let newMoneyRaised = doc.data().money_raised + Number.parseInt(amount);
                t.update(grantRef, { money_raised: newMoneyRaised });
              });
          }).then(result => {
            console.log('Grant total updated!');

            // Record transaction complete
            setStatus('complete');
          }).catch(err => {
            console.log('Grant total update error:', err);
          });

        });
      } else {
        setStatus('error');
      }
    }
  }

  // Tell whether donation amount is valid
  const amountIsGood = () => {
    if (Number.parseInt(amount) > 0 &&
      !Number.parseInt(amount).isNaN &&
      Number.parseInt(amount) <= (goal - raised)) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Container className={classes.card}>
      <Card>
        <CardContent className={classes.cardContent}>

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
                disabled={!amountIsGood() || clicked}
                fullWidth
                color="primary"
                className={classes.button}
                variant="contained"
                onClick={submit}>
                Donate {amountIsGood() && !clicked ? ('$' + amount) : ''}
              </Button>
            </div>
          }
          {status === 'complete' &&
            <Text type='card-subheading' text={'Thank you for your donation! Thanks to your gift of $' + amount + ', ' + grant + ' is now only  $' + (goal - raised) + ' from meeting its goal of $' + goal + '!'} />
          }
          {status === 'error' &&
            <Text type='card-subheading' text={'Sorry, an error occurred 🤡'} />
          }
          {status === 'waiting' &&
            <div>
              <Text type='card-subheading' text={'Sending your donation in...'} />
              <LinearProgress />
            </div>
          }
        </CardContent>
      </Card>
    </Container>
  );
}

export default injectStripe(PaymentForm);