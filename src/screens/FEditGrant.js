import React, { useEffect } from 'react';

import EditGrant from '../components/EditGrant.js';
import InfoIcon from '../components/InfoIcon.js';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from 'material-ui/styles/typography';

const useStyles = makeStyles(theme => ({
  card: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

export default function FEditGrant() {
  const classes = useStyles();

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
        newData.cf_name = data;
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
                <InfoIcon infoMessage="careful about discarding this!!"></InfoIcon>
              </Grid>
              <Grid item>
                <Button
                  color='primary'
                  variant='contained'>
                  Save to Drafts
                </Button>
                <InfoIcon infoMessage="don't worry you can come back to it"></InfoIcon>
              </Grid>
              <Grid item>
                <Button
                  color='primary'
                  variant='contained'>
                  Publish
                </Button>
                <p>TRYING HARDER</p>
                <InfoIcon infoMessage="then it will be visible to the public"></InfoIcon>
              </Grid>
            </Grid>
          }
        </Grid>
      </Grid>
    </div>
  );
}