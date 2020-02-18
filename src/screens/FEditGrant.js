import React, { useEffect } from 'react';

import EditGrant from '../components/EditGrant.js';
import firebase from '../firebase'

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  card: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

export default function FEditGrant() {
  const classes = useStyles();

  let db = firebase.firestore();

  // Grant data to upload to firebase
  const [grantData, setGrantData] = React.useState(
    {
      cf_name: '',
      cf_id: '',
      title: '',
      nonprofit_name: '',
      nonprofit_id: '',
      address: '',
      lat: '',
      long: '',
      date_posted: '',
      date_deadline: '',
      money_raised: 0,
      goal_amt: '',
      desc: '',
      tags: [],
      status: '',
      images: [],
    })

  // Find out whether we are editing an existing grant or creating a new one
  const [grantStatus] = React.useState(window.location.pathname === '/foundation/create-grant' ? 'create' : 'edit');

  // If we are editing the grant rather than creating one, get its ID from URL params
  const [id, setId] = React.useState(null);
  useEffect(() => {
    if (grantStatus === 'edit') {
      setId(window.location.pathname.split('/')[3]);
    }
  }, [grantStatus]);

  const callback = (data, type) => {
    let newData = grantData;

    switch (type) {
      case 'title':
        newData.title = data;
        break;
      case 'nonprofit_name':
        newData.nonprofit_name = data;
        break;
      case 'nonprofit_id':
        newData.nonprofit_id = data;
        break;
      case 'address':
        newData.address = data;
        break;
      case 'lat':
        newData.lat = data;
        break;
      case 'long':
        newData.long = data;
        break;
      case 'date_deadline':
        newData.date_deadline = data;
        break;
      case 'goal_amt':
        newData.goal_amt = data;
        break;
      case 'desc':
        newData.desc = data;
        break;
      case 'tags':
        newData.tags.push(data);
        break;
      case 'images':
        newData.images.push(data);
        break;
    }
    setGrantData(newData);
    console.log(grantData);
  }

  const saveToDrafts = () => {
    let newGrantData = grantData;
    newGrantData.status = 'draft';
    // TODO: set CF name/id
    setGrantData(newGrantData);
    db.collection('grants').doc().set(grantData)
      .then(function () {
        console.log('Draft saved');
      })
      .catch(function (error) {
        console.error('Error writing draft: ', error);
      })
  }

  const publish = () => {
    let newGrantData = grantData;
    newGrantData.status = 'current';
    // TODO: set CF name/id
    setGrantData(newGrantData);
    db.collection('grants').doc().set(grantData)
      .then(function () {
        console.log('Grant published');
      })
      .catch(function (error) {
        console.error('Error writing draft: ', error);
      })
  }

  return (
    <div className={classes.card}>
      <Grid container direction='row' justify='center' alignItems='flex-end'>
        <Grid item>
          <EditGrant grantData={grantData} callback={callback} />
        </Grid>
        <Grid item>
          {grantStatus === 'edit' &&
            <Grid container
              spacing={2}
              direction="column"
              justify="flex-end"
              alignItems="flex-start">
              <Grid item>
                <Button
                  color='primary'
                  variant='contained'>
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color='primary'
                  variant='contained'>
                  Save
                </Button>
              </Grid>
            </Grid>
          }
          {grantStatus === 'create' &&
            <Grid container
              spacing={2}
              direction="column"
              justify="flex-end"
              alignItems="flex-start">
              <Grid item>
                <Button
                  color='primary'
                  variant='contained'>
                  Discard
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={saveToDrafts}
                  color='primary'
                  variant='contained'>
                  Save to Drafts
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color='primary'
                  variant='contained'
                  onClick='publish'>
                  Publish
                </Button>
              </Grid>
            </Grid>
          }
        </Grid>
      </Grid>
    </div>
  );
}