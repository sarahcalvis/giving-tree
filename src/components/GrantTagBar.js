import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  button: {
    borderRadius: '25px',
    margin: '2px',
  },
}))

class GrantTagBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: props.tags,
    };
  };


  render() {

    //const tags = [];

    const tagElements = []

    for (const [index, value] of this.state.tags.entries()) {
      tagElements.push(<GrantTag tag={value} />)
    }

    return (
      tagElements
    );
  }
}



function GrantTag(props) {
  const classes = useStyles();

  return (
    <Link
      to={{
        pathname: "/",
        state: { incomingTag: props.tag }
      }}
    >
      <Button className={classes.button} size='small'  variant='outlined'>
        {props.tag}
      </Button>
    </Link>
  );
}

export default GrantTagBar;