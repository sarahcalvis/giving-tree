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

function SignIn(props) {
    const { classes } = props;

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.root}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" className={classes.header}>
                    Sign In
                    </Typography>
                <SignInForm classes={classes} />
                <SignUpForgotLink classes={classes} />
            </div>
        </Container>
    );
}

const INITIAL_STATE = {
    email: '',
    password: '',
    errors: {
        email: '',
        submit: '',
    },
    isValid: false,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        if (this.state.isValid) {
            const { email, password } = this.state;

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((result) => {
                    // User is signed in. Get the ID token.
                    return result.user.getIdToken();
                })
                .then((idToken) => {

                    // TODO: Redirect user based on role

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
        //this.setState({ email: "acesmndr@gmail.com", password: "notapassword"});
        if (name === 'email') {
            this.setState({ errors: { ...this.state.errors, submit: '', [name]: helper.validateField(name, value) } },
                this.validateForm
            );
        }
        else {
            this.validateForm();
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
            password,
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
                    error={errors.email !== ""}
                    helperText={errors.email}
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    label="Password"
                />
                <Button className={classes.submit}
                    type="submit"
                    fullWidth
                    id="submit-button"
                    variant="contained"
                    color="primary"
                    disabled={!isValid}
                >
                    Sign In
                        </Button>
            </form>
        );
    }
}
const SignUpForgotLink = ({ classes }) => (
    <Grid container>
        <Grid item xs>
            <Link href='/forgot' variant="body2">
                Forgot password?
            </Link>
        </Grid>
        <Grid item>
            <Link href='/signup' variant="body2">
                Don't have an account? Sign Up
            </Link>
        </Grid>
    </Grid>
);

const SignInForm = withRouter(SignInFormBase);

export default withStyles(styles)(SignIn);

export { SignInForm, SignUpForgotLink };