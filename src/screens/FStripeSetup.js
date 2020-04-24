import React, { useEffect } from 'react';
import { withAuthProtection } from '../auth';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText, Slide, Grid } from '@material-ui/core';


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

function FStripeSetup() {
  const classes = useStyles();

  // Set tab title
  useEffect(() => { document.title = 'Connect to Stripe' }, []);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid container className={classes.pageLayout} justify='center' spacing={2}>
        <Grid item xs={10}>
          <Link
            textDecoration='none'
            color='inherit'
            href='https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_GdKhmkaiFmOndJQ4UU6LTUm6pyfJcpQj&scope=read_write'>
            <Button
              fullWidth
              size="large"
              color='primary'
              variant='contained'>
              Connect to Stripe
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <IconButton aria-label="Stripe Information" size="medium" onClick={handleClickOpen}>
            <HelpOutlineIcon />
          </IconButton>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{"About Stripe"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <span>Stripe is a third party payment platform that handles customer payment information and allows donors to contribute to your
                  foundation's giving opportunities.&nbsp;</span>
                <span>After clicking on the link above, you will be taken to a signup page, where you will be prompted to provide your
                  foundation's basic information.&nbsp;</span>
                <span>Additionally, you will be given the opportunity to supply the information that will show up on the donors' banking and
                  credit card statements.&nbsp;</span>
                <span>Finally, you will be asked for your bank account number and routing number.&nbsp;</span>
                <span>Once all the pertinent information has been provided, you can strengthen your account's security with a second step of
                  authentication.&nbsp;</span>
                <span>If you still have questions about Stripe, please click "Learn More" below!</span>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Link
                textDecoration='none'
                color='inherit'
                href='https://stripe.com/about'
                target='_blank'
              >
                <Button onClick={handleClose} color="primary">
                  Learn More
                </Button>
              </Link>
              <Button onClick={handleClose} color="primary">
                Got it!
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </div >
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default withAuthProtection()(FStripeSetup);