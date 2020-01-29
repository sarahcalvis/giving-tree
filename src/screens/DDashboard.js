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

  const [snapshot, loading, error] = useCollectionOnce(db.collection('grants'));

  useEffect(() => {
    var newGrants = [];
    if (!loading && !error) {
      snapshot.forEach(function (doc) {
        newGrants.push(
          <SmallGrantCard
            grantId={doc.id}
            grant={doc.data().title}
            foundation={doc.data().cf_name}
            nonprofit={doc.data().nonprofit_name}
            goal={doc.data().goal_amt}
            raised={doc.data().money_raised}
            img={doc.data().images[0] || 'GivingTree.png'} />);
      });
      setGrants(newGrants);
    }
  }, [snapshot, error, loading]);

  return (
    <Container maxWidth='md'>
      <Search />
      <Grid container spacing={2} >
        {grants}
      </Grid>
    </Container>
  );
}
