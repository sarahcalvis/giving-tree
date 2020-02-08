import React, { useEffect } from 'react';

import EditGrant from '../components/EditGrant.js';

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

  // Find out whether we are editing an existing grant or creating a new one
  const [grantStatus] = React.useState(window.location.pathname === '/foundation/create-grant' ? 'create' : 'edit');

  // If we are editing the grant rather than creating one, get its ID from URL params
  const [id, setId] = React.useState(null);
  useEffect(() => {
    if (grantStatus === 'edit') {
      setId(window.location.pathname.split('/')[3]);
    }
  }, [grantStatus]);

  const grantCallback = (childData) => {   
    
    //props.parentCallback(grant);
  }

  return (
    <div className={classes.card}>
      <Grid container direction='row' justify='center' alignItems='flex-end'>
        <Grid item>
          <EditGrant parentCallback={grantCallback} />
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
                  color='primary'
                  variant='contained'>
                  Save to Drafts
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color='primary'
                  variant='contained'>
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