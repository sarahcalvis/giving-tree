import React, { useEffect } from 'react';
import SmallGrantCard from '../components/SmallGrantCard.js';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from '../firebase.js';
import Search from '../components/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    paddingBottom: theme.spacing(2),
  },
}));

export default function DDashboard() {
  // List of small grant cards
  const [grants, setGrants] = React.useState([]);

  // Initialize database and specific grant in database
  const db = firebase.firestore();

  const [snapshot, loading, error] = useCollection(db.collection('grants'));

  useEffect(() => {
    var newGrants = [];
    if (!loading && !error) {
      snapshot.forEach(function (doc) {
        newGrants.push(
          <SmallGrantCard
            id={doc.id}
            title={doc.data().title}
            cfName={doc.data().cf_name}
            nonprofitName={doc.data().nonprofit_name}
            goalAmt={doc.data().goal_amt}
            moneyRaised={doc.data().money_raised}
            img={doc.data().images[0] || 'GivingTree.png'} />
        );
      });
      setGrants(newGrants);
    }
  }, [snapshot, error, loading]);
  /*
  useEffect(() => {
    var useless = 0;
  }, [grants]);
  */
  function searchCallback(childData) {
    var newGrants = [];
    childData.forEach((grant) => {
      newGrants.push(
        <SmallGrantCard
          id={grant.id}
          title={grant.title}
          cfName={grant.cf_name}
          nonprofitName={grant.nonprofit_name}
          goalAmt={grant.goal_amt}
          moneyRaised={grant.money_raised}
          img={grant.images[0] || 'GivingTree.png'} />
      );
    });
    setGrants(newGrants);
  }

  const classes = useStyles();

  return (
    <Container maxWidth='md' className={classes.container}>
      <Search parentCallback={searchCallback} />
      <Grid container spacing={2} >
        {grants}
      </Grid>
    </Container>
  );
}
