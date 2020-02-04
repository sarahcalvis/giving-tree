import React, { useEffect } from 'react';
import LargeGrantCard from '../components/LargeGrantCard.js';
import firebase from '../firebase.js';
import { useParams } from 'react-router-dom';

export default function DGrant(props) {
  // Get grant ID from URL params
  let id = useParams().grantId;

  // Initialize database
  const db = firebase.firestore();

  // Initialize storage
  const storage = firebase.storage();
  const storageRef = storage.ref();

  // Data we load
  const [grantData, setGrantData] = React.useState();
  const [cfData, setCfData] = React.useState();
  const [nonprofitData, setNonprofitData] = React.useState();
  const [img, setImg] = React.useState();

  // Tell if we are ready to load a LargeGrantCard
  const [dataLoaded, setDataLoaded] = React.useState(false);
  useEffect(() => {
    setDataLoaded(grantData && cfData && nonprofitData && img);
  }, [grantData, cfData, nonprofitData, img])

  const formatDate = (time) => {
    let dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(time * 1000).toLocaleDateString("en-US", dateOptions);
  }

  const getUrls = (imgNames) => {
    let newImg = [];
    for (let imgName of imgNames) {
      storageRef.child(imgName).getDownloadURL().then(function (url) {
        newImg.push(url);
      }).catch(function (error) {
        console.log('error getting image url: ', error)
      })
    }
    return newImg;
  }

  // Query from grant collection
  useEffect(() => {
    if (id) {
      db.collection('grants').doc(id).get()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document for grant ' + id);
          } else {
            setGrantData(doc.data());
          }
        })
        .catch(err => {
          console.log('Error getting grant', err);
        });
    }
  }, []);

  // Query from CF collection
  useEffect(() => {
    if (grantData) {
      db.collection('communityFoundations').doc(grantData.cf_id).get()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document for CF ' + grantData.cf_id);
          } else {
            setCfData(doc.data());
          }
        })
        .catch(err => {
          console.log('Error getting CF', err);
        });
    }
  }, [grantData]);

  // Query from nonprofit collection
  useEffect(() => {
    if (grantData) {
      db.collection('nonprofits').doc(grantData.nonprofit_id).get()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document for nonprofit ' + grantData.nonprofit_id);
          } else {
            setNonprofitData(doc.data());
          }
        })
        .catch(err => {
          console.log('Error getting document', err);
        });
    }
  }, [grantData])

  // Query image urls


  useEffect(() => {
    if (grantData) {
      let imag = getUrls(grantData.images);
      console.log(imag);
      setImg(imag);
    }
  }, [grantData])

  return (
    <div>
      {dataLoaded &&
        <LargeGrantCard
          id={id}
          title={grantData.title}
          desc={grantData.desc}
          goalAmt={grantData.goal_amt}
          moneyRaised={grantData.money_raised}
          tags={grantData.tags}
          img={img}
          cfName={cfData.name}
          cfUrl={cfData.url}
          cfEmail={cfData.public_email}
          cfPhone={cfData.public_phone}
          nonprofitName={nonprofitData.name}
          nonprofitUrl={nonprofitData.url}
          nonprofitEmail={nonprofitData.email}
          nonprofitPhone={nonprofitData.number}
          datePosted={formatDate(grantData.date_posted.seconds)}
          dateDeadline={formatDate(grantData.date_deadline.seconds)} />
      }
    </div>
  );
}
