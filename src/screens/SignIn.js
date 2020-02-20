import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import firebase from '../firebase.js';
import * as helper from '../helpers/SignUpHelper.js';

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
    emailError: '',
    submitError: ''
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        let emailError = helper.validateEmail(this.state.email);

        if (emailError === '') {
            const {email, password} = this.state;
            
            firebase.auth().signInWithEmailAndPassword(email,password)
            .then(() => {
                //Do Misc Stuff for Sign In
                // TODO: If user is CF, go to dashboard
                
                //Redirect User to Home
                this.props.history.push('/');
            })
            .catch((error) => {
                //Failure
                //TODO: Cleanup Firebase Error Messages
                this.setState({submitError: error.message});
            });

        }
        else {
            //Display field validation errors
            this.setState({ emailError: emailError });
        }

        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            email,
            password,
            emailError,
            submitError,
        } = this.state;

        const isInvalid =
            password === '' ||
            email === '' ;

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
                    error={emailError !== ""}
                    helperText={emailError}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    label="Password"
                />
                <Button className={classes.submit}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isInvalid}
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