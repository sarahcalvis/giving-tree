import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';

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
      tagElements.push(<GrantTag tag={value}/>)
    }

    return (
      tagElements
    );
  }
}



class GrantTag extends React.Component {

  render() {
    return (
      <Link
          to={{
            pathname: "/",
            state: { incomingTag: this.props.tag }
          }}
        >
          <Button>
              {this.props.tag}
          </Button>
        </Link>
    );
  }
}

export default(GrantTagBar);