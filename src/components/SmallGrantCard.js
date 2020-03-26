import React from 'react';
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
import { useDownloadURL } from 'react-firebase-hooks/storage';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    height: 150,
  },
  cardContent: {
    flexGrow: 1,
  },
}))

export default function SmallGrantCard(props) {
  const classes = useStyles();

  // Create reference to firebase storage
  let storage = firebase.storage();
  let storageRef = storage.ref();

  // Get image URL
  const [downloadUrl, loading, error] = useDownloadURL(storageRef.child(props.img));

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card elevation={3} className={classes.card}>
        <CardActionArea
          component={Link}
          to={'/foundation/grant/' + props.id || '/grants/' + props.id}>
          {!loading && !error &&
            <CardMedia
              className={classes.cardMedia}
              image={downloadUrl}
              title="Grant Image"
            />
          }
          <CardContent className={classes.cardContent}>
            <Text type='card-aboveheading' text={props.nonprofitName} />
            <Text type='card-heading' text={props.title} />
            <Text type='card-subheading' text={props.cfName} />
            <ProgressBar goal={props.goalAmt} raised={props.moneyRaised} />
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid >
  );
}
