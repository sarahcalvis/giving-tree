import React, { useEffect } from 'react';
import LargeGrantCard from '../components/LargeGrantCard.js';
import firebase from '../firebase.js';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';



export default function DGrant(props) {
  let grantId = props.location.state.grantId;

  let [grant, setGrant] = React.useState('');

  // Initialize database and specific grant in database
  const db = firebase.firestore();
  const [value, loading, error] = useDocumentOnce(db.doc('grants/'+ grantId));

  useEffect(() => {
    // doc.data() is never undefined for query doc snapshots
    if (!loading && !error) {
      console.log('val ' + value);

      setGrant(<LargeGrantCard
        grantId={grantId}
        grant={value.data().title}
        foundation={value.data().cf_name}
        nonprofit={value.data().nonprofit_name}
        goal={value.data().goal_amt}
        raised={value.data().money_raised}
        img={value.data().images[0] || 'GivingTree.png'} />);
    }
  },[value]);

  return (
    <div>
      {grant}
    </div>
  );
}
