import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import firebase from '../firebase.js';
import * as helper from '../helpers/ValidationHelper.js';
import Snack from '../components/Snack.js';

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

function ForgotPassword(props) {
  const { classes } = props;

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.root}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.header}>
          Reset Password
                    </Typography>
        <ForgotPasswordForm classes={classes} />
        <SignInSignUpLink classes={classes} />
      </div>
    </Container>
  );
}

const INITIAL_STATE = {
  email: '',
  errors: {
    email: '',
    submit: '',
  },
  isValid: false,
  success: false,
};

export class ForgotPasswordFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.validateForm = this.validateForm.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onSubmit(event, fb=firebase) {
    if (this.state.isValid) {
      const { email } = this.state;
      fb.auth().sendPasswordResetEmail(email)
        .then(() => {
          // Email sent.
          this.setState({ ...INITIAL_STATE, success: true });
        }).catch((error) => {
          // An error happened.
          this.setState({ errors: { ...this.state.errors, submit: error.message } });
        });
    }

    event.preventDefault();
  }

  //Written generically to match SignUp/AccountRequest/SignIn, even though there's only one field 
  onChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });

    this.setState({ errors: { ...this.state.errors, submit: '', [name]: helper.validateField(name, value) } },
      this.validateForm
    );
  };

  validateForm() {
    const noEmptyFields = Object.values(this.state).filter((s) => { return s === '' }).length === 0
    const noErrors = Object.values(this.state.errors).filter((s) => { return s !== '' }).length === 0
    this.setState({ isValid: noErrors && noEmptyFields });
  }

  render() {
    const {
      email,
      errors,
      isValid,
      success,
    } = this.state;
    
    const { classes } = this.props;
    return (
      <form className={classes.form} onSubmit={this.onSubmit} noValidate>
        {success &&
          <Snack message='Success! A password reset email has been sent.' />
        }
        <Typography component="h6" className={classes.errorMsg} >
          {errors.submit}
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          label="Email Address"
          error={errors.email !== ""}
          helperText={errors.email}
          autoFocus
        />
        <Button className={classes.submit}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={!isValid}
        >
          Reset Password
                        </Button>
      </form>
    );
  }
}
const SignInSignUpLink = ({ classes }) => (
  <Grid container>
    <Grid item xs>
      <Link href='/signin' variant="body2">
        Ready to sign in?
            </Link>
    </Grid>
    <Grid item>
      <Link href='/signup' variant="body2">
        Don't have an account? Sign Up
            </Link>
    </Grid>
  </Grid>
);

const ForgotPasswordForm = withRouter(ForgotPasswordFormBase);

export default withStyles(styles)(ForgotPassword);

export { ForgotPasswordForm, SignInSignUpLink };