import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

class TagBarGrant extends React.Component {

  render() {
    const tagElements = []

    for (const [index, value] of this.props.tags.entries()) {
      tagElements.push(<Tag tag={value}/>)
    }

    return (
      <Container >
        <Grid container spacing={32} >
          {tagElements}
        </Grid>
      </Container>
      
    );
  }
}



class Tag extends React.Component {

  render() {
    return (
      <Grid item xs={2}>
      <Link
        to={{
          pathname: "/",
          state: { incomingTag: this.props.tag }
        }}
      >
        <Button variant="outlined" color="primary">
            {this.props.tag}
        </Button>
      </Link>
      </Grid>
      
    );
  }
}

export default(TagBarGrant);