import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Text from './Text.js';
import ProgressBar from './ProgressBar.js';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%',
    height: 250,
  },
  cardContent: {
    flexGrow: 1,
  },
}))

export default function SmallGrantCard(props) {
  const classes = useStyles();

  // Grant details
  const [grant, setGrant] = React.useState(props.grant);
  const [foundation, setFoundation] = React.useState(props.foundation);
  const [nonprofit, setNonprofit] = React.useState(props.nonprofit);
  const [goal, setGoal] = React.useState(props.goal);
  const [raised, setRaised] = React.useState(props.raised);

  // Observe grant details
  useEffect(() => { setGrant(props.grant); }, [props.grant]);
  useEffect(() => { setFoundation(props.foundation); }, [props.foundation]);
  useEffect(() => { setNonprofit(props.nonprofit); }, [props.nonprofit]);
  useEffect(() => { setGoal(props.goal); }, [props.goal]);
  useEffect(() => { setRaised(props.raised); }, [props.raised]);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardActionArea component={Link} to={'/' + grant.split(' ').join('-')}>
          {/* <CardMedia
          className={classes.cardMedia}
          image={pictures[this.state.execPosition]}
          title="Show Image"
        /> */}
          <Text type='card-heading' text='Image here' />
          <CardContent className={classes.cardContent}>
            <Text type='card-aboveheading' text={nonprofit} />
            <Text type='card-heading' text={grant} />
            <Text type='card-subheading' text={foundation} />
            <ProgressBar goal={goal} raised={raised} />
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
