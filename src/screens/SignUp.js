import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import $ from 'jquery';

import firebase from '../firebase.js';
import * as helper from '../helpers/SignUpHelper.js';

import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Grid from "@material-ui/core/Grid";
import MUILink from "@material-ui/core/Link";
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
    },
    submitError: ''
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        let errors = {
            email: helper.validateEmail(this.state.email),
            passwordOne: helper.validatePassword(this.state.passwordOne),
            passwordTwo: helper.confirmMatching(this.state.passwordOne, this.state.passwordTwo),
        }

        if (errors.email === '' && errors.passwordOne === '' && errors.passwordTwo === '') {
            const { email, passwordOne } = this.state;

            firebase.auth().createUserWithEmailAndPassword(email, passwordOne)
                .then((result) => {
                    //Do Misc Stuff for Donor Account
                    //Post to Server? Set firebase rules?

                    //-----------------------------------------
                    //--------MOVE INTO ACCOUNT REQUEST--------
                    //-----------------------------------------
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
                            else{
                                console.log("ERROR: " + data);
                            }
                        });
                    //-----------------------------------------
                    //-----------------------------------------

                    //Redirect User to Home
                    // this.props.history.push('/');
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
            submitError,
        } = this.state;

        const isInvalid =
            // passwordOne !== passwordTwo ||
            passwordOne === '' ||
            passwordTwo === '' ||
            email === '';

        const { classes } = this.props;

        return (
            <form className={classes.form} onSubmit={this.onSubmit}>
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
                    error={errors["email"] !== ""}
                    helperText={errors["email"]}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
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
                    variant="contained"
                    color="primary"
                    disabled={isInvalid}
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
            <Link to='/forgot' className={classes.links}>
                <MUILink variant="body2" component={'span'}>
                    Forgot password?
                </MUILink>
            </Link>
        </Grid>
        <Grid item>
            <Link to='/signin' className={classes.links}>
                <MUILink variant="body2" component={'span'}>
                    Already have an account? Sign In
                </MUILink>
            </Link>
        </Grid>
    </Grid>
);

const SignUpForm = withRouter(SignUpFormBase);

export default withStyles(styles)(SignUp);

export { SignUpForm, SignInForgotLink };