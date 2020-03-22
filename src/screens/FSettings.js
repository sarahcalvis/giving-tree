import React, { useEffect } from 'react';
import AuthUserContext from '../auth/context.js';

import {firestore as FIRESTORE} from "firebase/app";
import firebase from '../firebase.js';

import EditableData from '../components/FSettingsListEditable.js'
import NonEditableData from '../components/FSettingList.js'


export default function FSettings() {
 
  // Set tab title
  useEffect(() => { document.title = 'Settings- Giving Tree'; }, []);
  var db = firebase.firestore();

  const [isEdit, setEdit] = React.useState(false);
  const user = React.useContext(AuthUserContext);

  const [getData, setGetData] = React.useState(true);

  // Foundation info
  const [cfInfo, setCfInfo] = React.useState({
    name: '',
    public_email: '',
    public_phone: '',
    foundation_url: '',
    fname_contact: '',
    lname_contact: '',
    personal_email: '',
    personal_phone: '',
    status: '',
    date_requested: '',
    date_approved: '',
    date_denied: '',
    date_deactivated: '',
  });

  
  function toggleEdit()
  {
    if(isEdit){
      setEdit(false);
    }else{
      setEdit(true);
    }
  }

  React.useEffect(() => {
    if(getData){
      if((user !== null)){
        FSettingsMethods().loadData(user, db, (doc) => {
          setCfInfo(doc.data());
          setGetData(false);
        });
      }
    }
  }, [getData, user, db]);
  
  if(isEdit){
    return(
      <EditableData
        isEdit={isEdit}
        cfInfo={cfInfo}
        toggleEdit={toggleEdit}
        onSubmit={(changedText) => FSettingsMethods().onSubmit(cfInfo, changedText, user, db, () => {
          setGetData(true);
          setEdit(false);
        })}
        functionLoadData={() => FSettingsMethods().loadData}
      />
    );
  }else{
    return(
      <NonEditableData
        cfInfo={cfInfo}
        toggleEdit={toggleEdit}
        onSubmit={(changedText) => FSettingsMethods().onSubmit(cfInfo, changedText, user, db, () => {
          setGetData(true, () => setEdit(false));
        })}
        toggleAccountActive={() => FSettingsMethods().toggleAccountActive(db, user, cfInfo, () => {
          setGetData(true);
        })}
      />
    );
  }
} 


// All this crapola is outside the original functional component for testing purposes.
// They say you should write your tests for your code, but since when do "they" know what they're talking about? *sobs*
export const FSettingsMethods = () => {
  const loadData = (user, db, callback) =>{
    // Foundation query
    db.collection('communityFoundations').where('personal_email','==', user.email)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
          callback(doc);
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }
  
  
  const onSubmit = (cfInfo, changedText, user, db, callback) =>{
    var temp = {...cfInfo};
    for(const key in changedText){
      temp = { ...temp, [key]: changedText[key] };
    }
  
    db.collection('communityFoundations').where('personal_email','==',user.email)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        //console.log(doc.id, " => ", doc.data());
        // Build doc ref from doc.id
        db.collection("communityFoundations").doc(doc.id).update({
          name: temp.name,
          public_email: temp.public_email,
          public_phone: temp.public_phone,
          foundation_url: temp.foundation_url,
          fname_contact: temp.fname_contact,
          lname_contact: temp.lname_contact,
          personal_email: temp.personal_email,
          personal_phone: temp.personal_phone
        }).then(
          callback(temp)
        );
        console.log("Document successfully written!");
      });
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  }
  
  const toggleAccountActive = (db, user, cfInfo, callback) => {
    if(user){
      db.collection('communityFoundations').where('personal_email','==',user.email)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          const time = (cfInfo.date_deactivated === '') ? FIRESTORE.FieldValue.serverTimestamp() : '';
          db.collection("communityFoundations").doc(doc.id).update(
            {date_deactivated: time},
          ).then(
            () => callback(time)
          );
          console.log("Deactivation successfully toggled!")
        });
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
    }
  }

  return {
    loadData,
    onSubmit,
    toggleAccountActive,
  };
}


