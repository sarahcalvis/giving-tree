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
  a: {
    color: '#FFFFFF',
    textDecoration: 'none',
  },
}))

export default function FAccountRequest() {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.pageLayout}>
        <React.Fragment>
          <Button
            fullWidth
            color="primary"
            variant="contained">
            <Link
              textDecoration='none'
              color='inherit'
              target='_blank'
              rel='noopener noreferrer'
              href='https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_32D88BD1qLklliziD7gYQvctJIhWBSQ7&scope=read_write'>
              Click here to set up a Stripe account
          </Link>
          </Button>
        </React.Fragment>
      </Container>
    </div>
  );
}
