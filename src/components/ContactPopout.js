import React, { useEffect } from 'react';
import Link from '@material-ui/core/Link';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  a: {
    cursor: 'pointer',
  },
  popover: {
    width: '300px',
  }
}));

export default function ContactPopout(props) {
  // Foundation and nonprofit info
  const [cfName, setCfName] = React.useState(props.cfName);
  const [cfUrl, setCfUrl] = React.useState(props.cfUrl);
  const [cfEmail, setCfEmail] = React.useState(props.cfEmail);
  const [cfPhone, setCfPhone] = React.useState(props.cfPhone);
  const [nonprofitName, setNonprofitName] = React.useState(props.nonprofitName);
  const [nonprofitUrl, setNonprofitUrl] = React.useState(props.nonprofitUrl);
  const [nonprofitEmail, setNonprofitEmail] = React.useState(props.nonprofitEmail);
  const [nonprofitPhone, setNonprofitPhone] = React.useState(props.nonprofitPhone);

  // Foundation and nonprofit observers (might delete later)
  useEffect(() => { setCfName(props.cfName); }, [props.cfName]);
  useEffect(() => { setCfUrl(props.cfUrl) }, [props.cfUrl]);
  useEffect(() => { setCfEmail(props.cfEmail) }, [props.cfEmail]);
  useEffect(() => { setCfPhone(props.cfPhone) }, [props.cfPhone]);
  useEffect(() => { setNonprofitName(props.nonprofitName); }, [props.nonprofitName]);
  useEffect(() => { setNonprofitUrl(props.nonprofitUrl) }, [props.nonprofitUrl]);
  useEffect(() => { setNonprofitEmail(props.nonprofitEmail) }, [props.nonprofitEmail]);
  useEffect(() => { setNonprofitPhone(props.nonprofitPhone) }, [props.nonprofitPhone]);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <a className={classes.a} aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        Contact
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
          variant="body2">
          Please contact <Link
            textDecoration='none'
            target='_blank'
            rel='noopener noreferrer'
            href={cfUrl}>
            {cfName}
          </Link> with any concerns at <Link href={'tel:' + cfPhone}>
            {cfPhone}
          </Link> or <Link href={'mailto:' + cfEmail}>
            {cfEmail}
          </Link>
        </Typography>
        <Typography
          variant="body2">
          <Link
            textDecoration='none'
            target='_blank'
            rel='noopener noreferrer'
            href={nonprofitUrl}>{nonprofitName}
          </Link> can be reached at <Link href={'tel:' + nonprofitPhone}>
            {nonprofitPhone}
          </Link> or <Link href={'mailto:' + nonprofitEmail}>
            {nonprofitEmail}
          </Link>
        </Typography>
      </Popover>
    </div>
  );
}