import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';
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

export default function SmallGrantCard() {
  const classes = useStyles();

  // Grant details
  const [grant] = React.useState('grant name'); //React.useState(props.grant);
  const [foundation] = React.useState('foundation name'); //React.useState(props.foundation);
  const [nonprofit] = React.useState('nonprofit name'); //React.useState(props.nonprofit);
  const [goal] = React.useState('goal amount'); //React.useState(props.goal);
  const [raised] = React.useState('amount raised'); //React.useState(props.raised);

  //TODO: componentwillupdate/useeffect

  return (
    <Card className={classes.card}>
      <CardActionArea component={Link} to={"/" + grant.split(' ').join('-')}>
        {/* <CardMedia
          className={classes.cardMedia}
          image={pictures[this.state.execPosition]}
          title="Show Image"
        /> */}
        <Text type='card-heading' text='Image here' />
        <CardContent className={classes.cardContent}>
          <Text type='card-heading' text={grant} />
          <Text type='card-subheading' text={foundation} />
          <Text type='card-subheading' text={nonprofit} />
          <ProgressBar goal={goal} raised={raised} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
