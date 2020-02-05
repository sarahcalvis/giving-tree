import React, { useEffect } from 'react';
import Text from './Text.js';

export default function Tag(props) {
  // TODO: should receive 'removable' as a prop

  return (
    <Text type='tag' text={props.tag}/>
  )
}