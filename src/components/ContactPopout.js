import React from 'react';

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowRight from '@material-ui/icons/ArrowRight';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  a: {
    cursor: 'pointer',
  },
}));

export default function ContactPopout(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [icon, setIcon] = React.useState(<ArrowDropDown />);

  const handleClick = event => {
    if (open) {
      setOpen(false)
      setIcon(<ArrowDropDown />)
    } else {
      setOpen(true);
      setIcon(<ArrowRight />)
    }
  };

  const id = open ? 'Contact information' : undefined;

  return (
    <div>
      <a className={classes.a} aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        <Button endIcon={icon} >
          Contact
        </Button>
      </a>
      {open &&
        <div>
          <Typography variant="body2">
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
          <Typography variant="body2">
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
        </div>
      }
    </div>
  );
}