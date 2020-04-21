import React, { useEffect } from 'react';
import SmallGrantCard from '../components/SmallGrantCard.js';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from '../firebase.js';
import Search from '../components/Search';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

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
  const [docs, setDocs] = React.useState([]);
  const [snapshot, loading, error] = useCollection(db.collection('grants'));

  useEffect(() => {
    var newGrants = [];
    var newDocs = [];
    if (!loading && !error) {
      snapshot.forEach(function (doc) {
        const fbData = doc.data();
        //comparing by seconds vs milliseconds
        if (fbData.status === 'current') {
          newDocs.push({
            id: doc.id,
            title: fbData.title,
            cfName: fbData.cf_name,
            nonprofitName: fbData.nonprofit_name,
            goalAmt: fbData.goal_amt,
            moneyRaised: fbData.money_raised,
            img: fbData.images[0] || 'GivingTree.png',
            nonprofitId: fbData.nonprofit_id,
            address: fbData.address,
            lat: fbData.lat,
            long: fbData.long,
            datePosted: fbData.date_posted,
            dateDeadline: fbData.date_deadline,
            desc: fbData.desc,
            tags: fbData.tags
          });
          newGrants.push(
            <SmallGrantCard
              id={doc.id}
              title={fbData.title}
              cfName={fbData.cf_name}
              nonprofitName={fbData.nonprofit_name}
              goalAmt={fbData.goal_amt}
              moneyRaised={fbData.money_raised}
              img={fbData.images[0] || 'GivingTree.png'} />
          );
        }
      });
      setGrants(newGrants);
      setDocs(newDocs);
    }
  }, [snapshot, error, loading]);

  function searchCallback(results) {
    let newGrants = [];
    results.forEach((searchDoc) => {
      newGrants.push(
        <SmallGrantCard
          id={searchDoc.data.id}
          title={searchDoc.data.title}
          cfName={searchDoc.data.cfName}
          nonprofitName={searchDoc.data.nonprofitName}
          goalAmt={searchDoc.data.goalAmt}
          moneyRaised={searchDoc.data.moneyRaised}
          img={searchDoc.data.img} />
      );
    });
    if (newGrants.length === 0) newGrants.push(<Typography component="h1" variant="h4" >Sorry, no results were found.</Typography>);

    setGrants(newGrants);
  }

  const classes = useStyles();

  return (
    <Container maxWidth='md' className={classes.container}>
      {docs && docs?.length !== 0 &&
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
