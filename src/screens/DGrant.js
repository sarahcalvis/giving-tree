import React, { useEffect } from 'react';
import LargeGrantCard from '../components/LargeGrantCard.js';
import firebase from '../firebase.js';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';



export default function DGrant(props) {
  let grantId = props.location.state.grantId;

  let [grant, setGrant] = React.useState('');

  // Initialize database and specific grant in database
  const db = firebase.firestore();
  const [snapshot, loading, error] = useDocumentOnce(db.collection('grants'));

  useEffect(() => {
    // doc.data() is never undefined for query doc snapshots
    if (!loading && !error) {
      setGrant(<LargeGrantCard
        grantId={grantId}
        grant={snapshot.data().title}
        foundation={snapshot.data().cf_name}
        nonprofit={snapshot.data().nonprofit_name}
        goal={snapshot.data().goal_amt}
        raised={snapshot.data().money_raised}
        img={snapshot.data().images[0] || 'GivingTree.png'} />);
    }
  }, [snapshot, loading, error]);

  return (
    <div>
      {grant}
    </div>
  );
}
