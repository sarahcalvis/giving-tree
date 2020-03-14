import React, { useEffect } from 'react';

import Link from '@material-ui/core/Link';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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
  const id = open ? 'Contact information' : undefined;

  return (
    <div>
      <a id="a-id" className={classes.a} aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        <Button variant='outlined' color='primary' id="contact-button">
          Contact
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
          Please contact <Link
            textDecoration='none'
            target='_blank'
            rel='noopener noreferrer'
            href={props.cfData.url}>
            {props.cfData.name}
          </Link> with any concerns at <Link href={'tel:' + props.cfData.phone}>
            {props.cfData.public_phone}
          </Link> or <Link href={'mailto:' + props.cfData.public_email}>
            {props.cfData.email}
          </Link>
        </Typography>
        <Typography
          className={classes.typographyBottom}
          variant="body2">
          <Link
            textDecoration='none'
            target='_blank'
            rel='noopener noreferrer'
            href={props.nonprofitData.url}>{props.nonprofitData.name}
          </Link> can be reached at <Link href={'tel:' + props.nonprofitData.phone}>
            {props.nonprofitData.phone}
          </Link> or <Link href={'mailto:' + props.nonprofitData.email}>
            {props.nonprofitData.email}
          </Link>
        </Typography>
      </Popover>
    </div>
  );
}