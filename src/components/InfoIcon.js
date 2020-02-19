//FYI: highly reccommend looking at contactpopout for help with this
import React, { useEffect } from 'react';

import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  a: {
    cursor: 'pointer',
  },
  popover: {
    maxWidth: 500,
  },
  typographyTop: {
    padding: theme.spacing(2),
  },
  typographyBottom: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }
}));

export default function ContactPopout(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'Info' : undefined;

  return (
    <div>
      <a className={classes.a} aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        <Button variant='outlined' color='primary'>
          ?
        </Button>
      </a>
      <Popover
        className={classes.popover}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography
          className={classes.typographyTop}
          variant="body2">
            {props.infoMessage}
        </Typography>
      </Popover>
    </div>
  );
}