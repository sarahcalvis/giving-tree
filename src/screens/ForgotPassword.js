import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import firebase from '../firebase.js';
import * as helper from '../helpers/SignUpHelper.js';
import Snack from '../components/Snack.js';

import { withStyles } from '@material-ui/styles';
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
    emailError: '',
    submitError: '',
    success: false,
};

class ForgotPasswordFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        let emailError = helper.validateEmail(this.state.email);

        if (emailError === '') {
            const { email } = this.state;

            firebase.auth().sendPasswordResetEmail(email)
                .then(() => {
                    // Email sent.
                    this.setState({ ...INITIAL_STATE, success: true });
                }).catch((error) => {
                    // An error happened.
                    this.setState({ submitError: error.message, success: false });
                });
        }
        else {
            //Display field validation errors
            this.setState({ emailError: emailError, success: false });
        }

        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            email,
            emailError,
            submitError,
            success,
        } = this.state;

        const isInvalid = (email === '');

        const { classes } = this.props;

        return (
            <form className={classes.form} onSubmit={this.onSubmit} noValidate>
                {success &&
                    <Snack message='Success! A password reset email has been sent.' />
                }
                <Typography component="h6" className={classes.errorMsg} >
                    {submitError}
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
                    error={emailError !== ""}
                    helperText={emailError}
                    autoFocus
                />
                <Button className={classes.submit}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isInvalid}
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