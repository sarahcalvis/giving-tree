import React from 'react';
import Text from './Text.js';

export default function ProgressBar(props) {
  return (
    <Text type='card-subheading' text={'$' + props.raised + ' raised out of $' + props.goal} />
  );
}
