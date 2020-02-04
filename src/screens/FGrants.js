import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import firebase from '../firebase.js';
import Snack from '../components/Snack.js';

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
}))

export default function FGrants(props) {
  // Set tab title
  useEffect(() => { document.title = 'Giving Tree Grants'; }, [props.title]);

  const classes = useStyles();

  const [acctId, setAcctId] = React.useState('');

  // Foundation ID
  const [id] = React.useState('1fbyawFlFR0YdMYPZbtG'); //React.useState(props.id);

  const docRef = firebase.firestore().doc('communityFoundations/' + id);

  // If the user is entering this page redirected from the account creation page,
  // then the url will have two parameters:
  // scope- I don't think we really care about scope. hopefully it is read/write
  // code- the user's code we can use to connect their stripe
  const qs = require('query-string');
  const code = qs.parse(props.location.search).code;
  const error = qs.parse(props.location.search).error;

  const updateAcctIDDB = (acctId) => {
    console.log('updating account ID to ' + acctId);
    docRef.update({ "acct_id": acctId });
  }

  const submit = async () => {
    if (code) {
      // Make the payment
      let response = await fetch('/create', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: code,
      });

      if (response.ok) {
        let resJSON = await response.json();
        setAcctId(resJSON.acctID);
        updateAcctIDDB(resJSON.acctID);
        //send the id to the database
      } else {
        console.log('did not do good');
        //it went wrong and idk what to do in this case
      }
    }
  }

  useEffect(() => {
    if (code) {
      submit();
    }
  }, []);

  return (
    <div>
      <Container className={classes.pageLayout}>
        <React.Fragment>
          {code && acctId !== '' &&
            <Snack message='Connected to Stripe' />
          }
          {code && acctId === '' &&
            <Snack message='Sorry- our server failed! Try again later' />
          }
          {error &&
            <div>
              <Snack message='You gotta connect to stripe for this to work my dude 🤡' />
              <Link
                textDecoration='none'
                color='inherit'
                //target='_blank'
                //rel='noopener noreferrer'
                href='https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_GblAQuuPHkvIstLgnPzWLGLhh4hMRV3h&scope=read_write'>
                <Button
                  fullWidth
                  color='primary'
                  variant='contained'>
                  Connect to Stripe
                </Button>
              </Link>
            </div>
          }
        </React.Fragment>
      </Container>
    </div >
  );
}