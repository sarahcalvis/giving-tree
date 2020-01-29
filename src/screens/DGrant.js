import React, { useEffect } from 'react';
import LargeGrantCard from '../components/LargeGrantCard.js';
import firebase from '../firebase.js';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';



export default function DGrant(props) {
  let grantId = useParams().grant;
  let [grant, setGrant] = React.useState('');

  // Initialize database and specific grant in database
  const db = firebase.firestore();
  const [value, loading, error] = useDocumentOnce(db.doc('grants/' + grantId));

  useEffect(() => {
    if (!loading && !error) {
      setGrant(<LargeGrantCard
        grantId={grantId}
        grant={value.data().title}
        foundation={value.data().cf_name}
        nonprofit={value.data().nonprofit_name}
        goal={value.data().goal_amt}
        raised={value.data().money_raised}
        img={value.data().images[0] || 'GivingTree.png'} />);
    }
  }, [value]);

  return (
    <div>
      {grant}
    </div>
  );
}
