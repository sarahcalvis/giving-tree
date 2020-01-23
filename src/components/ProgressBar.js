import React, { useEffect } from 'react';
import Text from './Text.js';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
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
      backgroundColor: '#dddddd',
    },
    root: {
      height: 5,
    },
  })(LinearProgress);

  return (
    <div>
      <StyledLinearProgress value={progress} variant="determinate" />
      <Grid container>
        <Grid item>
          <Text type='progress-bold' text={'$' + raised + ' raised \t'} />
        </Grid>
        <Grid item/>
        <Grid item>
          <Text type='progress' text={' of $' + goal} />
        </Grid>
      </Grid>
    </div>
  );
}
