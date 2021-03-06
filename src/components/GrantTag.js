import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  button: {
    borderRadius: '25px',
    margin: '2px',
  },
  link: {
    textDecoration: 'none',
  }
}))

function GrantTag(props) {
  const classes = useStyles();

  return (
    <Link
      to={{
        pathname: "/",
        state: { incomingTag: props.tag }
      }}
      className={classes.link}
      id="grant-link"
    >
      <Button className={classes.button} size='small'  variant='outlined'>
        {props.tag}
      </Button>
    </Link>
  );
}

export default GrantTag;