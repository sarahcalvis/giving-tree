import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withAuthConsumer } from '../session';
import firebase from '../firebase.js';
import { AppBar, Tabs, Tab, Button, makeStyles } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';


const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'sticky',
    flexWrap: 'wrap',
  },
}));

//TODO: CHANGE ICONS INTO MENUBUTTON BASED ON USER AUTH!!!
//See ProfileTabMenu in WSAJ Project
function Header(props) {
  const classes = useStyles();
  const [errorMsg, setErrorMsg] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    firebase.auth().signOut().then(() => {
      props.history.push('/');
    }).catch((error) => {
      setErrorMsg(error.message);
    });
  }

  const SignInIcon = () => (
    <Tabs className={classes.tabs}>
      <Tab className={classes.loginTab} icon={<AccountCircle />}
        to='/signin' component={Link} />
    </Tabs>
  );

  const SignOutIcon = () => (
    <Tabs className={classes.tabs}>
      <Tab className={classes.loginTab} label='Logout' icon={<AccountCircle />}
        onClick={logout} component={Button} />
    </Tabs>
  );

  const customClaims = () => {
    props.authUser.getIdTokenResult()
    .then((idTokenResult) => {
      console.log(idTokenResult.claims);
      console.log(idTokenResult.claims.cf);
    })
    .catch((error) => {
      console.log("ERROR: " + error.message);
    });

    return "hi";
  }

  return (
    <React.Fragment>
      <AppBar className={classes.appBar} title="Giving Tree">
        {props.authUser ? <SignOutIcon /> : <SignInIcon />}
      </AppBar>
      <Button onClick = {customClaims}>Test Custom Claims</Button>
      {errorMsg !== '' && <p>{errorMsg}</p>}
    </React.Fragment>
  );
}

export default withRouter(withAuthConsumer(Header));


{/* <Tab className={this.props.classes.loginTab} aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick} icon={<AccountCircle />} />
    <Menu
      id="simple-menu"
      anchorEl={this.state.anchorEl}
      keepMounted
      open={Boolean(this.state.anchorEl)}
      onClose={this.handleClose}
    >
      <MenuItem onClick={this.logout}>Logout</MenuItem>
    </Menu> */}