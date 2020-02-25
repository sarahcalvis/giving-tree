import React from 'react';

import Text from '../components/Text.js';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  marginBottom: {
    marginBottom: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  links: {
    textDecoration: 'none'
  },
  errorMsg: {
    color: 'red',
    marginTop: theme.spacing(1),
  },
}));


function FAccountRequest() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md" >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Text type='card-heading' text={'Foundation Account Request'} />
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>

          <Container maxWidth="xs" className={classes.marginBottom}>
            <Grid container spacing={2}>
              <Grid container item xs={12}>
                <Text type='card-sectionheading' text={'Foundation Info'} />
                <Text type='card-subheading' text={'This information will be displayed publicly on all published giving opportunities.'} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Foundation Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="foundation_url"
                  variant="outlined"
                  required
                  fullWidth
                  id="foundation_url"
                  label="Website URL"
                  placeholder="www.communityfoundation.com"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="public_email"
                  variant="outlined"
                  required
                  fullWidth
                  id="public_email"
                  label="Public Email"
                  placeholder="contact@cf.com"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="public_phone"
                  variant="outlined"
                  required
                  fullWidth
                  id="public_phone"
                  label="Public Phone"
                />
              </Grid>
            </Grid>
            </Container>

            <Container maxWidth="xs">
            <Grid container spacing={2}>
              <Grid container item xs={12}>
                <Text type='card-sectionheading' text={'Personal Contact Info'} />
                <Text type='card-subheading' text={'This information will be used to sign into and manage your account.'} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="fname_contact"
                  variant="outlined"
                  required
                  fullWidth
                  id="fname_contact"
                  label="First Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lname_contact"
                  label="Last Name"
                  name="lname_contact"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="personal_email"
                  label="Personal Email"
                  name="personal_email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="personal_phone"
                  variant="outlined"
                  required
                  fullWidth
                  id="personal_phone"
                  label="Personal Phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="passwordOne"
                  label="Password"
                  type="password"
                  id="passwordOne"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="passwordTwo"
                  label="Confirm Password"
                  type="password"
                  id="passwordTwo"
                />
              </Grid>
            </Grid>
            </Container>

            
            <Container maxWidth="xs">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Request Account
          </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
              </Link>
              </Grid>
            </Grid>
            </Container>

          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default FAccountRequest;