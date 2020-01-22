// https://stripe.com/docs/recipes/elements-react

import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import Text from '../components/Text.js';
import Snack from '../components/Snack.js';
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
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  paymentPaper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
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


function Stripe(props) {
  const classes = useStyles();

  const [complete, setComplete] = React.useState(false);
  const [amount, setAmount] = React.useState('');
  const [description] = React.useState('sample description- replace with grant name later')

  const submit = async (ev) => {
    let { token } = await props.stripe.createToken({ name: 'Giving Tree Donor' });
    let response = await fetch('/charge', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: token.id + ' amount: ' + (amount * 100) + ' description: ' + description,
    });

    if (response.ok) setComplete(true);
  }

  return (
    <Container className={classes.pageLayout}>
      {complete ?
        <p>Payment Complete</p> :
        <React.Fragment>
          <Paper elevation={3} className={classes.paymentPaper}>
            <Text type="card-heading" text="Make a Donation" />
            <Typography
              component="h1"
              color="textSecondary"
              variant="subtitle1">
              Refer to <Link color="secondary" href="https://stripe.com/docs/testing" > Stripe testing information</Link> to try this out
            </Typography>
            <React.Fragment>
              <React.Fragment>
                <CardElement className={classes.stripeElement} />
                <input
                  className={classes.stripeElement}
                  placeholder="Amount"
                  onInput={e => setAmount(e.target.value)} />
                <Button
                  color="primary"
                  className={classes.button}
                  variant="contained"
                  onClick={submit}>
                  Donate
                  </Button>
              </React.Fragment>
            </React.Fragment>
          </Paper>
        </React.Fragment>
      }
    </Container>
  );
}

export default injectStripe(Stripe);