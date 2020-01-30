import React from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';


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

export default function FAccountRequest(props) {
  const classes = useStyles();

  // If the user is entering this page redirected from the account creation page,
  // then the url will have two parameters:
  // scope- I don't think we really care about scope. hopefully it is read/write
  // code- the user's code we can use to connect their stripe
  const qs = require('query-string');
  const code = qs.parse(props.location.search).code;
  const error = qs.parse(props.location.search).error;

  return (
    <div>
      <Container className={classes.pageLayout}>
        <React.Fragment>
          {code &&
            <p>Connected to Stripe!</p>
          }
          {!code && !error &&
            <Link
              textDecoration='none'
              color='inherit'
              //target='_blank'
              //rel='noopener noreferrer'
              href='https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_GblAQuuPHkvIstLgnPzWLGLhh4hMRV3h&scope=read_write&redirect_uri=http://localhost:3000/request-account'>
              <Button
                fullWidth
                color='primary'
                variant='contained'>
                Connect to Stripe
            </Button>
            </Link>
          }
          {error &&
            <p>you gotta connect to stripe for this to work my dude</p>
          }
        </React.Fragment>
      </Container>
    </div >
  );
}
