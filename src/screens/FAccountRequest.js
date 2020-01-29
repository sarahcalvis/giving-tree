import React from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

export default function FAccountRequest() {
  return (
    <div>
      <Button
        fullWidth
        color="primary"
        //className={classes.button}
        variant="contained">
        <Link
          color="inherit"
          target='_blank'
          rel='noopener noreferrer'
          href='https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_32D88BD1qLklliziD7gYQvctJIhWBSQ7&scope=read_write'>
          Click here to set up a Stripe account
        </Link>
      </Button>
    </div>
  );
}
