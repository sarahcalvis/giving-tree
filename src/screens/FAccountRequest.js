import React, { Component } from 'react';
import $ from 'jquery';

import firebase from '../firebase.js';
import * as helper from '../helpers/SignUpHelper.js';
import Text from '../components/Text.js';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';

const styles = theme => ({
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
    marginBottom: theme.spacing(3),
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
});

const INITIAL_STATE = {
  name: '',
  public_email: '',
  public_phone: '',
  personal_email: '',
  personal_phone: '',
  foundation_url: '',
  fname_contact: '',
  lname_contact: '',
  passwordOne: '',
  passwordTwo: '',
  errors: {
    public_email: '',
    public_phone: '',
    personal_email: '',
    personal_phone: '',
    foundation_url: '',
    fname_contact: '',
    lname_contact: '',
    passwordOne: '',
    passwordTwo: '',
    submitError: '',
  },
};

class FAccountRequest extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const noErrors = Object.values(errors).filter((s) => { return s !== '' }).length === 0;

    if (noErrors) {
      firebase.auth().createUserWithEmailAndPassword(email, passwordOne)
        .then((result) => {
          //Do Misc Stuff for Foundation Account
          //Post to Server? Set firebase rules?

          // User is signed in. Get the ID token.
          return result.user.getIdToken();
        })
        .then((idToken) => {
          // Pass the ID token to the server.
          $.post(
            '/setCustomClaims',
            {
              idToken: idToken,
            },
            (data, status) => {
              // This is not required. You could just wait until the token is expired
              // and it proactively refreshes.
              if (status === 'success' && data) {
                const json = JSON.parse(data);
                if (json && json.status === 'success') {
                  // Force token refresh. The token claims will contain the additional claims.
                  firebase.auth().currentUser.getIdToken(true);
                }
              }
              else {
                console.log("ERROR: " + data);
              }
            });

          //Refresh the page and display the waiting message 
          this.props.history.push('/foundation');
        })
        .catch((error) => {
          //Failure
          //TODO: Cleanup Firebase Error Messages
          this.setState({ submitError: error.message });
        });
    }
    else {
      //Display field validation errors
      this.setState({ errors: errors });
    }

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      email,
      passwordOne,
      passwordTwo,
      errors,
    } = this.state;

    const isValid = Object.values(this.state).filter((s) => { return s === '' }).length === 0;

    const { classes } = this.props;

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
                      autoFocus
                      id="name"
                      label="Foundation Name"
                      onChange={this.onChange}
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
                      onChange={this.onChange}
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
                      onChange={this.onChange}
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
                      onChange={this.onChange}
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
                      onChange={this.onChange}
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
                      onChange={this.onChange}
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
                      onChange={this.onChange}
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
                      onChange={this.onChange}
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
                      onChange={this.onChange}
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
                      onChange={this.onChange}
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
                  disabled={!isValid}
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
}

export default withStyles(styles)(FAccountRequest);
