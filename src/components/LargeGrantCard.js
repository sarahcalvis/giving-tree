import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import firebase from '../firebase.js';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Text from './Text.js';
import ProgressBar from './ProgressBar.js';
import { makeStyles } from '@material-ui/styles';
import { useDownloadURL } from 'react-firebase-hooks/storage';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    height: 250,
  },
  cardContent: {
    flexGrow: 1,
  },
}))

export default function LargeGrantCard(props) {
  const classes = useStyles();

  // Grant details
  const [grant, setGrant] = React.useState(props.grant);
  const [foundation, setFoundation] = React.useState(props.foundation);
  const [nonprofit, setNonprofit] = React.useState(props.nonprofit);
  const [goal, setGoal] = React.useState(props.goal);
  const [raised, setRaised] = React.useState(props.raised);
  const [img, setImg] = React.useState(props.img);

  // Create reference to firebase storage
  let storage = firebase.storage();
  let storageRef = storage.ref();

  // Get image URL
  const [downloadUrl, loading, error] = useDownloadURL(storageRef.child(img));

  // Observe grant details
  useEffect(() => { setGrant(props.grant); }, [props.grant]);
  useEffect(() => { setFoundation(props.foundation); }, [props.foundation]);
  useEffect(() => { setNonprofit(props.nonprofit); }, [props.nonprofit]);
  useEffect(() => { setGoal(props.goal); }, [props.goal]);
  useEffect(() => { setRaised(props.raised); }, [props.raised]);
  useEffect(() => { setImg(props.img) }, [props.img]);

  return (
    <div>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          {!loading && !error &&
            <CardMedia
              className={classes.cardMedia}
              image={downloadUrl}
              title="Grant Image"
            />
          }
          <CardContent className={classes.cardContent}>
            <Text type='card-aboveheading' text={nonprofit} />
            <Text type='card-heading' text={grant} />
            <Text type='card-subheading' text={foundation} />
            <ProgressBar goal={goal} raised={raised} />
            <Link to={'/grants/' + grant.split(' ').join('-') + '/give'}>Donate</Link>
          </CardContent>
        </Card>
      </Grid >
    </div>
  );
}
