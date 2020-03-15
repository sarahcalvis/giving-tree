import React from 'react';

import GrantTag from './GrantTag.js';


class GrantTagBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: props.tags,
    };
  };


  render() {
    const tagElements = []

    for (const [index, value] of this.state.tags.entries()) {
      tagElements.push(<GrantTag tag={value} key={index}/>)
    }

    return (
      tagElements
    );
  }
}

export default GrantTagBar;