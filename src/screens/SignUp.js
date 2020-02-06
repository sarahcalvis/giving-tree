import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
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
        submit: '',
    }
};

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        
        console.log("hello!");
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

        const { classes } = this.props;

        return (
            <form className={classes.form} onSubmit={this.onSubmit}>
                <Typography component="h6" className={classes.errorMsg} >
                    {errors["submit"]}
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
            <Link to='/login' className={classes.links}>
                <MUILink variant="body2" component={'span'}>
                    Already have an account? Sign In
                </MUILink>
            </Link>
        </Grid>
    </Grid>
);

export default withStyles(styles)(SignUp);

export { SignUpForm, SignInForgotLink };