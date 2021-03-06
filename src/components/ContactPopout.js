import React from 'react';

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
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
      setIcon(<ArrowDropUp />)
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
          &emsp;Please direct any concerns to:
            <span style={{'fontWeight': 380}}>
            <br/>&emsp;
            {props.cfData?.url &&
            <Link
              textDecoration='none'
              target='_blank'
              rel='noopener noreferrer'
              href={props.cfData.url}>
              {props.cfData.name}
            </Link>
            }
            {!props.cfData?.url && <span>{props.cfData.name}</span>}
            <br/>
            {props.cfData.public_phone && 
            <span>&emsp;&emsp;Call:&nbsp;
              <Link href={'tel:' + props.cfData.public_phone}> {props.cfData.public_phone} </Link>
            </span>}
            {props.cfData.public_email && 
            <span>&emsp;&emsp;Email:&nbsp;
              <Link href={'mailto:' + props.cfData.public_email}> {props.cfData.public_email} </Link>
            </span>}

            <br/>&emsp;
            {props.nonprofitData?.url &&
            <Link
              textDecoration='none'
              target='_blank'
              rel='noopener noreferrer'
              href={props.nonprofitData.url}>
              {props.nonprofitData.name}
            </Link>}
            {!props.nonprofitData?.url && <span>{props.nonprofitData.name}</span>}
            <br/>
            {props.nonprofitData.number && 
            <span>&emsp;&emsp;Call:&nbsp;
              <Link href={'tel:' + props.nonprofitData.number}> {props.nonprofitData.number} </Link>
            </span>}
            {props.nonprofitData.email && 
            <span>&emsp;&emsp;Email:&nbsp;
              <Link href={'mailto:' + props.nonprofitData.email}> {props.nonprofitData.email} </Link>
            </span>}
            </span>
          </Typography>
          <br/>
        </div>
      }
    </div>
  );
}