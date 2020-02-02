import React, { useEffect } from 'react';
import SmallGrantCard from '../components/SmallGrantCard.js';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import firebase from '../firebase.js';
import Search from '../components/Search';

export default function DDashboard() {
  // List of small grant cards
  const [grants, setGrants] = React.useState([]);

  // Initialize database and specific grant in database
  const db = firebase.firestore();
  const [docs, setDocs] = React.useState([]);
  const [snapshot, loading, error] = useCollectionOnce(db.collection('grants'));
  
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
            img={doc.data().images[0] || 'GivingTree.png'} />);
      });
      setGrants(newGrants);
      setDocs(newDocs);
    }
  }, [snapshot, error, loading]);
  
  function outputThis(data) {
    console.log(data);
  }
  function searchCallback(childData) {      
    var newGrants = [];
    console.log("childData in Dashboard: ", childData);
    childData.forEach(function outputThis(data) {
      console.log("data: ", data);
      console.log("data.grant: ", data.grant);
    });
    console.log("newGrants: ", newGrants);
    setGrants(newGrants);
  }

  return (
    <Container maxWidth='md'>
      <Search docs={docs} parentCallback={searchCallback}/>
      <Grid container spacing={2} >
        {grants}
      </Grid>
    </Container>
  );
}
