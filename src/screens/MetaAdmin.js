import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import FoundationCard from '../components/FoundationCard.js';
import firebase from '../firebase.js';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles(theme => ({
  container: {
    paddingBottom: theme.spacing(2),
  },
  toggleBar: {
    marginBottom: 4,
  }
}));

function MetaAdmin(props) {
  const classes = useStyles();

  const [toggleBarStatus, setToggleBarStatus] = React.useState('current');
  const [reqCfs, setReqCfs] = React.useState();
  const [curCfs, setCurCfs] = React.useState();
  const [denCfs, setDenCfs] = React.useState();

  // Initialize database
  const db = firebase.firestore();
  const [snapshot, loading, error] = useCollection(db.collection('communityFoundations'));

  useEffect(() => {
    let req = [];
    let cur = [];
    let den = [];

    if (!loading && !error) {
      snapshot.forEach((doc) => {
        switch (doc.data().status) {
          case 'requested':
            req.push(<FoundationCard data={doc.data()} />);
            break;
          case 'current':
          case 'deactivated':
            cur.push(<FoundationCard data={doc.data()} />);
            break;
          case 'denied':
            den.push(<FoundationCard data={doc.data()} />);
            break;
          default:
            console.log("Error, Bad CF Document: " + doc.id + ", " + doc.data());
        }
      })

      setReqCfs(req);
      setCurCfs(cur);
      setDenCfs(den);
    }
  }, [snapshot, error, loading]);

  const handleToggle = (event, status) => {
    setToggleBarStatus(status);
  };

  const buttonOptions = [
    <ToggleButton key={1} value="requested">
      Requested
    </ToggleButton>,
    <ToggleButton key={2} value="current">
      Current
    </ToggleButton>,
    <ToggleButton key={3} value="denied">
      Denied
    </ToggleButton>
  ];

  return (
    <Container maxWidth='md' className={classes.container}>
    <Typography variant="h4">Meta-Admin</Typography>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item className={classes.toggleBar}>
            <ToggleButtonGroup size="small" value={toggleBarStatus} exclusive onChange={handleToggle}>
              {buttonOptions}
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        <Grid item spacing={2} xs={12} >
          {toggleBarStatus === 'requested' ? reqCfs : toggleBarStatus === 'current' ? curCfs : denCfs}
        </Grid>
    </Container>
  );
}

export default MetaAdmin;