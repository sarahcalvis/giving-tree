import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import firebase from '../firebase.js';
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
  const [image, setImage] = React.useState('');
  const [url, setUrl] = React.useState('');

  // Observe grant details
  useEffect(() => { setGrant(props.grant); }, [props.grant]);
  useEffect(() => { setFoundation(props.foundation); }, [props.foundation]);
  useEffect(() => { setNonprofit(props.nonprofit); }, [props.nonprofit]);
  useEffect(() => { setGoal(props.goal); }, [props.goal]);
  useEffect(() => { setRaised(props.raised); }, [props.raised]);

  // Create reference to firebase storage
  let storage = firebase.storage();
  let storageRef = storage.ref();

  // Get image
  // TODO: query database to get image name
  useEffect(() => {
    storageRef.child('GivingTree.png').getDownloadURL().then((u) => {
      setUrl(u)
    }).catch( (error) => { 
      console.log(error);
    });
  }, []);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardActionArea component={Link} to={'/' + grant.split(' ').join('-')}>
          <CardMedia
            className={classes.cardMedia}
            image={url}
            title="Grant Image"
          />
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
