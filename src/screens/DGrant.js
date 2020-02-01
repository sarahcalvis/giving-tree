import React, { useEffect } from 'react';
import LargeGrantCard from '../components/LargeGrantCard.js';
import firebase from '../firebase.js';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';

export default function DGrant(props) {
  let id = useParams().grantId;

  // Initialize database and specific grant in database
  const db = firebase.firestore();

  // Query from grant collection
  const [nonprofitId, setNonprofitId] = React.useState('');
  const [cfId, setCfId] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [cfName, setCfName] = React.useState('');
  const [nonprofitName, setNonprofitName] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [goalAmt, setGoalAmt] = React.useState('');
  const [moneyRaised, setMoneyRaised] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [img, setImg] = React.useState('GivingTree.png');

  const [value, loading, error] = useDocumentOnce(db.doc('grants/' + id));

  useEffect(() => {
    if (!loading && !error) {
      setCfId(value.data().cf_id);
      setNonprofitId(value.data().nonprofit_id);
      setTitle(value.data().title);
      setCfName(value.data().cf_name);
      setNonprofitName(value.data().nonprofit_name);
      setDesc(value.data().desc);
      setGoalAmt(value.data().goal_amt);
      setMoneyRaised(value.data().money_raised);
      setTags(value.data().tags);
      setImg(value.data().images[0]);
    }
  }, [value, error, loading, id]);

  // Query from CF collection
  const [cfUrl, setCfUrl] = React.useState('');
  const [cfPublicPhone, setCfPublicPhone] = React.useState('');
  const [cfPublicEmail, setCfPublicEmail] = React.useState('');

  useEffect(() => {
    if (cfId !== '') {
      // query CF here
      db.collection('communityFoundations').doc(cfId).get()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document for CF ' + cfId);
          } else {
            setCfUrl(doc.data().foundation_url);
            setCfPublicPhone(doc.data().public_phone);
            setCfPublicEmail(doc.data().public_email);
          }
        })
        .catch(err => {
          console.log('Error getting CF', err);
        });
    }
  }, [cfId]);

  // Query from nonprofit collection
  const [url, setUrl] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [email, setEmail] = React.useState('');

  useEffect(() => {
    if (nonprofitId !== '') {
      // query nonprofit here
      db.collection('nonprofits').doc(nonprofitId).get()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document for nonprofit ' + nonprofitId);
          } else {
            setUrl(doc.data().url);
            setNumber(doc.data().number);
            setEmail(doc.data().email);
          }
        })
        .catch(err => {
          console.log('Error getting document', err);
        });
    }
  }, [nonprofitId])

  // Set tab title
  useEffect(() => { document.title = title; }, [title]);

  return (
    <div>
      <LargeGrantCard
        id={id}
        title={title}
        desc={desc}
        goalAmt={goalAmt}
        moneyRaised={moneyRaised}
        tags={tags}
        img={img}
        cfName={cfName}
        cfUrl={cfUrl}
        cfEmail={cfPublicEmail}
        cfPhone={cfPublicPhone}
        nonprofitName={nonprofitName}
        nonprofitUrl={url}
        nonprofitEmail={email}
        nonprofitPhone={number} />
    </div>
  );
}
