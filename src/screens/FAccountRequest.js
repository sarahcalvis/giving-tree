import React, { Component } from 'react';
import $ from 'jquery';

import firebase from '../firebase.js';
import * as helper from '../helpers/ValidationHelper.js';
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
import Typography from "@material-ui/core/Typography";

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
    submit: '',
  },
  isValid: false,
};

class FAccountRequest extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  addDocument = () => {
    const cfDoc = {...this.state};
    delete cfDoc.errors;
    delete cfDoc.passwordOne;
    delete cfDoc.passwordTwo;
    delete cfDoc.isValid;
    cfDoc.status = 'requested';

    firebase.firestore().collection("communityFoundations").doc().set(cfDoc)
      .then(() => {
        //console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  onSubmit = event => {
    if (this.state.isValid) {
      const { personal_email, passwordOne } = this.state;

      firebase.auth().createUserWithEmailAndPassword(personal_email, passwordOne)
        .then((result) => {
          //Do Misc Stuff for Foundation Account
          //Post to Server? Set firebase rules?

          // User is signed in. Get the ID token.
          result.user.getIdToken().then((idToken) => {
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
          })
            .catch((error) => {
              console.log("Error with getIdToken()");
              //Failure
              this.setState({ errors: { ...this.state.errors, submit: error.message } });
            });

        })
        .catch((error) => {
          console.log("Error creating user.");
          //Failure
          //TODO: Cleanup Firebase Error Messages
          this.setState({ errors: { ...this.state.errors, submit: error.message } });
        })
        .then(this.addDocument)
        .then(() => {
          this.props.history.push('/request-sent');
        });

      event.preventDefault();
    }
  }

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });

    if (name === 'passwordTwo') {
      this.setState({ errors: { ...this.state.errors, submit: '', [name]: helper.confirmMatching(this.state.passwordOne, value) } },
        this.validateForm
      );
    }
    else {
      this.setState({ errors: { ...this.state.errors, submit: '', [name]: helper.validateField(name, value) } },
        this.validateForm
      );
    }
  };

  validateForm = () => {
    const noEmptyFields = Object.values(this.state).filter((s) => { return s === '' }).length === 0
    const noErrors = Object.values(this.state.errors).filter((s) => { return s !== '' }).length === 0
    this.setState({ isValid: noErrors && noEmptyFields });
  }


  render() {
    const {
      name,
      public_email,
      public_phone,
      personal_email,
      personal_phone,
      foundation_url,
      fname_contact,
      lname_contact,
      passwordOne,
      passwordTwo,
      errors,
      isValid,
    } = this.state;

    const { classes } = this.props;

    return (

      <Container component="main" maxWidth="md" >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Text type='card-heading' text={'Foundation Account Request'} />
          <form className={classes.form} onSubmit={this.onSubmit} noValidate>
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
                      value={name}
                      error={errors.name !== ""}
                      helperText={errors.name}
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
                      value={foundation_url}
                      error={errors.foundation_url !== ""}
                      helperText={errors.foundation_url}
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
                      value={public_email}
                      error={errors.public_email !== ""}
                      helperText={errors.public_email}
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
                      value={public_phone}
                      error={errors.public_phone !== ""}
                      helperText={errors.public_phone}
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
                      value={fname_contact}
                      error={errors.fname_contact !== ""}
                      helperText={errors.fname_contact}
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
                      value={lname_contact}
                      error={errors.lname_contact !== ""}
                      helperText={errors.lname_contact}
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
                      value={personal_email}
                      error={errors.personal_email !== ""}
                      helperText={errors.personal_email}
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
                      value={personal_phone}
                      error={errors.personal_phone !== ""}
                      helperText={errors.personal_phone}
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
                      value={passwordOne}
                      error={errors.passwordOne !== ""}
                      helperText={errors.passwordOne}
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
                      value={passwordTwo}
                      error={errors.passwordTwo !== ""}
                      helperText={errors.passwordTwo}
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
                <Typography component="h6" className={classes.errorMsg} >
                  {errors.submit}
                </Typography>
              </Container>

            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(FAccountRequest);
