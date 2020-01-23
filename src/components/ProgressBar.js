import React, { useEffect } from 'react';
import Text from './Text.js';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/styles';

export default function ProgressBar(props) {
  const [raised, setRaised] = React.useState(props.raised);
  const [goal, setGoal] = React.useState(props.goal);
  const [progress, setProgress] = React.useState(0);


  useEffect(() => { 
    setGoal(props.goal);
  }, [props.goal, goal]);

  useEffect(() => { 
    setRaised(props.raised);
  }, [props.raised, raised]);

  useEffect(() => { 
    setProgress(100.0 * (Number.parseFloat(raised) / Number.parseFloat(goal)));
  }, [props.raised, raised, props.goal, goal]);
  
  const StyledLinearProgress = withStyles({
    colorPrimary: {
      backgroundColor: '#bbbbbb',
    },
    root: {
      height: 10,
    },
  })(LinearProgress);
  console.log((100.0 * (Number.parseFloat(raised) / Number.parseFloat(goal))))
  return (
    <div>
      <Text type='card-subheading' text={'$' + raised + ' raised out of $' + goal} />
      <StyledLinearProgress value={progress} variant="determinate" />
    </div>
  );
}
