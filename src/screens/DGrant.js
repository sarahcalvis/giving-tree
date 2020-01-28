import React, { useEffect } from 'react';
import LargeGrantCard from '../components/LargeGrantCard.js';
import firebase from '../firebase.js';


export default function DGrant(props) {
  let grantId = props.location.state.grantId;

  let [grant, setGrant] = React.useState('');

  // Initialize database and specific grant in database
  const db = firebase.firestore();

  useEffect(() => {
    db.collection('grants').get(grantId).then((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setGrant(<LargeGrantCard
        grant={doc.data().title}
        foundation={doc.data().cf_name}
        nonprofit={doc.data().nonprofit_name}
        goal={doc.data().goal_amt}
        raised={doc.data().money_raised}
        img={doc.data().images[0] || 'GivingTree.png'} />);
    })
    return function cleanup() {
      // TODO: unsubscribe from Firebase query
    }
  });

  return (
    <div>
      {grant}
    </div>
  );
}
