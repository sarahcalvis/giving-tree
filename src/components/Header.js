import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import logo from '../iconSmall.png';
import { withAuthConsumer } from '../auth';
import firebase from '../firebase.js';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, MenuItem, Menu } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { spacing } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    position: "sticky",
  },
}));

function Header(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = event => {
    setAuth(event.target.checked);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    firebase.auth().signOut().then(() => {
      props.history.push('/signin');
    }).catch((error) => {
      setErrorMsg(error.message);
    });
  }

  const SignedIn = () => (
    <React.Fragment>
      <MenuItem onClick={handleClose} to='/foundation/settings' component={Link}>Profile</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </React.Fragment>
  );

  const SignedOut = () => (
    <React.Fragment>
      <MenuItem onClick={() => props.history.push('/signin')}>Login</MenuItem>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <AppBar style={{ 'margin-bottom': 15 }} className={classes.appBar} >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            to={props.authUser?.cf ? '/foundation' : '/'}
            component={Link}>
            <img src={logo} alt="Logo" height="40" width="40" />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            Giving Tree
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
            {props.authUser ? <SignedIn/> : <SignedOut/>}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default withRouter(withAuthConsumer(Header));