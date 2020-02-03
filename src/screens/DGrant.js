import React, { useEffect } from 'react';
import LargeGrantCard from '../components/LargeGrantCard.js';
import firebase from '../firebase.js';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';

export default function DGrant(props) {
  let id = useParams().grantId;

  // Initialize database and specific grant in database
  const db = firebase.firestore();

  const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };

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
  const [imgNames, setImgNames] = React.useState('');
  const [img, setImg] = React.useState(['GivingTree.png']);
  const [datePosted, setDatePosted] = React.useState('');
  const [dateDeadline, setDateDeadline] = React.useState('');

  useEffect(() => {
    if (id) {
      console.log(id);
      db.collection('grants').doc(id).get()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document for grant ' + id);
          } else {
            setCfId(doc.data().cf_id);
            setNonprofitId(doc.data().nonprofit_id);
            setTitle(doc.data().title);
            setCfName(doc.data().cf_name);
            setNonprofitName(doc.data().nonprofit_name);
            setDesc(doc.data().desc);
            setGoalAmt(doc.data().goal_amt);
            setMoneyRaised(doc.data().money_raised);
            setTags(doc.data().tags);
            setImgNames(doc.data().images);
            setDatePosted(new Date(doc.data().date_posted.seconds * 1000).toLocaleDateString("en-US", dateOptions));
            setDateDeadline(new Date(doc.data().date_deadline.seconds * 1000).toLocaleDateString("en-US", dateOptions));
          }
        })
        .catch(err => {
          console.log('Error getting CF', err);
        });
    }
  }, []);

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

  // Get an array of image urls
  let storage = firebase.storage();
  let storageRef = storage.ref();

  useEffect(() => {
    let newImg = [];
    for (let imgName of imgNames) {
      storageRef.child(imgName).getDownloadURL().then(function (url) {
        newImg.push(url);
      }).catch(function (error) {
        console.log('error getting image url')
      })
    }
    setImg(newImg);
  }, [imgNames])

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
        nonprofitPhone={number}
        datePosted={datePosted}
        dateDeadline={dateDeadline} />
    </div>
  );
}
