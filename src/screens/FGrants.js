import React, { useEffect } from 'react';
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

export default function FGrants(props) {
  const classes = useStyles();

  // If the user is entering this page redirected from the account creation page,
  // then the url will have two parameters:
  // scope- I don't think we really care about scope. hopefully it is read/write
  // code- the user's code we can use to connect their stripe
  const qs = require('query-string');
  const code = qs.parse(props.location.search).code;
  const error = qs.parse(props.location.search).error;

  const submit = async () => {
    if (code) {
      // Make the payment
      let response = await fetch('/create', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: code,
      });
      console.log(response);
      if (response.ok) {
        console.log('did good');
        //send the id to the database
      } else {
        console.log('did not do good');
        //it went wrong and idk what to do in this case
      }
    }
  }

  useEffect(() => {
    submit();
  }, [code, submit]);

  return (
    <div>
      <Container className={classes.pageLayout}>
        <React.Fragment>
          {code &&
            <p>You can look at your grants now</p>
          }
          {error &&
            <p>Error 404: you gotta connect to stripe for this to work my dude</p>
          }
        </React.Fragment>
      </Container>
    </div >
  );
}