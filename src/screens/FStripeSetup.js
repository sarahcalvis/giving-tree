import React, { useEffect } from 'react';
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

export default function FStripeSetup(props) {
  const classes = useStyles();

  // Set tab title
  useEffect(() => { document.title = 'Connect to Stripe' }, []);


  return (
    <div>
      <Container className={classes.pageLayout}>
        <React.Fragment>
          <Link
            textDecoration='none'
            color='inherit'
            //target='_blank'
            //rel='noopener noreferrer'
            href='https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_GdKhmkaiFmOndJQ4UU6LTUm6pyfJcpQj&scope=read_write'>
            <Button
              fullWidth
              color='primary'
              variant='contained'>
              Connect to Stripe
            </Button>
          </Link>
        </React.Fragment>
      </Container>
    </div >
  );
}
