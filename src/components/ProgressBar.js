import React, { useEffect } from 'react';
import Text from './Text.js';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(0),
  }
}))

export default function ProgressBar(props) {
  const classes = useStyles();

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
      borderRadius: 20,
    },
    bar: {
      borderRadius: 20,
    },
  })(LinearProgress);

  return (
    <div className={classes.root}>
      <StyledLinearProgress value={progress} variant="determinate" />
      <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-end">
        <Grid item>
          <Text type='progress-bold' text={'$' + raised + ' raised \t'} />
        </Grid>
        <Grid item>
          <Text type='progress' text={' of $' + goal} />
        </Grid>
      </Grid>
    </div>
  );
}
