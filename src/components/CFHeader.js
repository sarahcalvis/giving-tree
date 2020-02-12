import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import logo from '../iconSmall.png';
import { withAuthConsumer } from '../session';
import firebase from '../firebase.js';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, MenuItem, Menu } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';


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
}));

function CFNavBar(props) {
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
  
  return (
    <React.Fragment>
      <AppBar className={classes.appBar} title="CFHeader">
        <Toolbar>
          <IconButton 
            edge="start" 
            className={classes.menuButton} 
            color="inherit" 
            aria-label="menu" 
            to='/foundation' 
            component={Link}>
          <img src={logo} alt="Logo" height="48" width="48"/>
          </IconButton>
          <Typography variant="h4" className={classes.title}>
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
                <ExitToApp/>
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
                <MenuItem onClick={handleClose} to='/foundation/settings' component={Link}>Profile</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
          
        </Toolbar>
      </AppBar>
    </React.Fragment>

  );
}

export default withRouter(withAuthConsumer(CFNavBar));