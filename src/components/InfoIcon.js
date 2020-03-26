import React, { useEffect } from 'react';

import { Info } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    cursor: 'pointer',
  },
  typography: {
    maxWidth: 300,
    padding: theme.spacing(2),
  },
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
  const id = open ? 'info-popover' : undefined;

  return (
    <div>
      <IconButton className={classes.button} aria-describedby={id} variant="contained" color="primary" onClick={handleClick} variant='outlined' color='secondary'>
        <Info />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography
          className={classes.typography}
          variant="body2">
          {props.infoMessage}
        </Typography>
      </Popover>
    </div>
  );
}