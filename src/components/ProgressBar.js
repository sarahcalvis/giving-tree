import React, { useEffect } from 'react';
import Text from './Text.js';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function ProgressBar(props) {
  const [raised, setRaised] = React.useState(props.raised);
  const [goal, setGoal] = React.useState(props.goal);
  const [progress, setProgress] = React.useState(100 * Number.parseFloat(raised) / Number.parseFloat(goal))

  useEffect(() => { setRaised(props.raised); }, [props.raised]);

  useEffect(() => { setGoal(props.goal); }, [props.goal]);

  useEffect(() => { setProgress(100 * Number.parseFloat(raised) / Number.parseFloat(goal)); }, [props.goal, props.raised]);

  return (
    <div>
      <Text type='card-subheading' text={'$' + props.raised + ' raised out of $' + props.goal} />
      <LinearProgress value={progress} variant="determinate" />
    </div>
  );
}
