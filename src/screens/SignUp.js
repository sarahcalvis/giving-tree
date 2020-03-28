import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import firebase from '../firebase.js';
import * as helper from '../helpers/ValidationHelper.js';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";


const styles = theme => ({
  root: {
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
    marginTop: theme.spacing(1),
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
  }
});

function SignUp(props) {
  const { classes } = props;

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.root}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.header}>
          Sign Up
                    </Typography>
        <SignUpForm classes={classes} />
        <SignInForgotLink classes={classes} />
      </div>
    </Container>
  );
}

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  errors: {
    email: '',
    passwordOne: '',
    passwordTwo: '',
    submit: '',
  },
  isValid: false,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    if (this.state.isValid) {
      const { email, passwordOne } = this.state;

      firebase.auth().createUserWithEmailAndPassword(email, passwordOne)
        .then((result) => {
          //Do Misc Stuff for Donor Account
          //Post to Server? Set firebase rules? Create empty donor document?

          //Redirect User to Home
          this.props.history.push('/');
        })
        .catch((error) => {
          //Failure
          //TODO: Cleanup Firebase Error Messages
          this.setState({ errors: { ...this.state.errors, submit: error.message } });
        });
    }

    event.preventDefault();
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
      email,
      passwordOne,
      passwordTwo,
      errors,
      isValid,
    } = this.state;

    const { classes } = this.props;

    return (
      <form className={classes.form} onSubmit={this.onSubmit} noValidate>
        <Typography component="h6" className={classes.errorMsg} >
          {errors.submit}
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          label="Email Address"
          error={errors["email"] !== ""}
          helperText={errors["email"]}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="passwordOne"
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          label="Password"
          error={errors["passwordOne"] !== ""}
          helperText={errors["passwordOne"]}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="passwordTwo"
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          label="Confirm Password"
          error={errors["passwordTwo"] !== ""}
          helperText={errors["passwordTwo"]}
        />
        <Button className={classes.submit}
          type="submit"
          fullWidth
          id="submit-button"
          variant="contained"
          color="primary"
          disabled={!isValid}
        >
          Sign Up
                        </Button>
      </form>
    );
  }
}

const SignInForgotLink = ({ classes }) => (
  <Grid container>
    <Grid item xs>
      <Link href='/forgot' variant="body2">
        Forgot password?
            </Link>
    </Grid>
    <Grid item>
      <Link href='/signin' variant="body2">
        Already have an account? Sign In
            </Link>
    </Grid>
  </Grid>
);

const SignUpForm = withRouter(SignUpFormBase);

export default withStyles(styles)(SignUp);

export { SignUpForm, SignInForgotLink };