import React, { useEffect } from 'react';
import SmallGrantCard from '../components/SmallGrantCard.js';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from '../firebase.js';
import Search from '../components/Search';
import CustomizedExpansionPanels from '../components/CustomizedExpansionPanels.js'
import { makeStyles } from '@material-ui/core/styles';
//import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';



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
        const fbData = doc.data();
        //comparing by seconds vs milliseconds
        if (fbData.status === 'current') {   
          newDocs.push({
            dist: -1,
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

  function searchCallback(childData) {
    var newGrants = [];
    childData.forEach((meta) => {
      newGrants.push(
        <SmallGrantCard
          id={meta.grant.id}
          title={meta.grant.title}
          cfName={meta.grant.cfName}
          nonprofitName={meta.grant.nonprofitName}
          goalAmt={meta.grant.goalAmt}
          moneyRaised={meta.grant.moneyRaised}
          img={meta.grant.img} />
      );
    });
    setGrants(newGrants);
  }

  const classes = useStyles();

  return (
    <Container maxWidth='md' className={classes.container}>
    <CustomizedExpansionPanels />
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









