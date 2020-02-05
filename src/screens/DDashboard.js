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
  const [docs, setDocs] = React.useState();
  const [snapshot, loading, error] = useCollection(db.collection('grants'));

  useEffect(() => {
    var newGrants = [];
    var newDocs = [];
    if (!loading && !error) {
      snapshot.forEach(function (doc) {
        console.log("a date: ", doc.data().date_deadline);
        newDocs.push({
          dist: -1,
          id: doc.id,
          title: doc.data().title,
          cfName: doc.data().cf_name,
          nonprofitName: doc.data().nonprofit_name,
          goalAmt: doc.data().goal_amt,
          moneyRaised: doc.data().money_raised,
          img: doc.data().images[0] || 'GivingTree.png',
          nonprofitId: doc.data().nonprofit_id,
          address: doc.data().address,
          lat: doc.data().lat,
          long: doc.data().long,
          datePosted: doc.data().date_posted,
          dateDeadline: doc.data().date_deadline,
          desc: doc.data().desc,
          tags: doc.data().tags
        });
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
      console.log("newDocs: ", newDocs);
      setDocs(newDocs);
    }
  }, [snapshot, error, loading]);

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
          img={grant.img} />
      );
    });
    console.log("newGrants: ", newGrants);
    setGrants(newGrants);
  }

  const classes = useStyles();

  return (
    <Container maxWidth='md' className={classes.container}>
      {docs &&
        <div>
          <Search docs={docs} parentCallback={searchCallback} />
          <Grid container spacing={2} >
            {grants}
          </Grid>
        </div>
      }
    </Container>
  );
}
