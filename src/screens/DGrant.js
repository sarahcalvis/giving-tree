import React, { useEffect } from 'react';
import LargeGrantCard from '../components/LargeGrantCard.js';
import firebase from '../firebase.js';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';



export default function DGrant(props) {
  let id = useParams().grantId;
  let [grant, setGrant] = React.useState('');

  // Initialize database and specific grant in database
  const db = firebase.firestore();
  const [value, loading, error] = useDocumentOnce(db.doc('grants/' + id));

  useEffect(() => {
    if (!loading && !error) {
      setGrant(<LargeGrantCard
        id={id}
        title={value.data().title}
        cfName={value.data().cf_name}
        nonprofitName={value.data().nonprofit_name}
        desc={value.data().desc}
        goalAmt={value.data().goal_amt}
        moneyRaised={value.data().money_raised}
        img={value.data().images[0] || 'GivingTree.png'} />);
    }
  }, [value, error, loading, id]);

  return (
    <div>
      {grant}
    </div>
  );
}
