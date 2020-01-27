import React, { useEffect } from 'react';
import SmallGrantCard from '../components/SmallGrantCard.js';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import firebase from '../firebase.js';
import * as naughtyFirebase from 'firebase';

export default function DDashboard() {
  // List of small grant cards
  const [grants, setGrants] = React.useState([]);

  // Initialize database and specific grant in database
  const db = firebase.firestore();

  useEffect(() => {
    var newGrants = [];
    db.collection('grants').get().then((querySnapshot) => {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

        newGrants.push(
          <SmallGrantCard
            id={doc.id}
            grant={doc.data().title}
            foundation={doc.data().cf_name}
            nonprofit={doc.data().nonprofit_name}
            goal={doc.data().goal_amt}
            raised={doc.data().money_raised}
            img={doc.data().images[0] || 'GivingTree.png'} />);
      });
      setGrants(newGrants);
    });
  });

  return (
    <Container maxWidth='md'>
      <Grid container spacing={2} >
        {grants}
      </Grid>
    </Container>
  );
}
