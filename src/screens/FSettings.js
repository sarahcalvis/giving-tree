import React, { useEffect } from 'react';
import AuthUserContext from '../auth/context.js';

import firebase from '../firebase.js';
import * as helper from '../helpers/ValidationHelper.js';

import EditableData from '../components/FSettingsListEditable.js'
import NonEditableData from '../components/FSettingList.js'


export default function FSettings() {
 
  // Set tab title
  useEffect(() => { document.title = 'Settings- Giving Tree'; }, []);
  var db = firebase.firestore();

  const [isEdit, setEdit] = React.useState(false);
  const user = React.useContext(AuthUserContext);
  console.log(user);

  // Foundation info
  const [cfInfo, setCfInfo] = React.useState({
    name: '',
    public_email: '',
    public_phone: '',
    foundation_url: '',
    fname_contact: '',
    lname_contact: '',
    personal_email: '',
    personal_phone: ''
  });

  const [getData, setGetData] = React.useState(true);

  const functionLoadData = () =>{
    
    console.log("I've been called!!");
    /*setCfInfo({ 
      name: '',
      public_email: '',
      public_phone: '',
      foundation_url: '',
      fname_contact: '',
      lname_contact: '',
      personal_email: '',
      personal_phone: ''
    })*/
    
    // Foundation query
    db.collection('communityFoundations').where('personal_email','==', user.email)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          
          setCfInfo({ 
            name: doc.data().name,
            public_email: doc.data().public_email,
            public_phone: doc.data().public_phone,
            foundation_url: doc.data().foundation_url,
            fname_contact: doc.data().fname_contact,
            lname_contact: doc.data().lname_contact,
            personal_email: doc.data().personal_email,
            personal_phone: doc.data().personal_phone
          })
          setGetData(false);
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }

  function onSubmit(){
    db.collection('communityFoundations').where('personal_email','==',user.email)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.id, " => ", doc.data());
        // Build doc ref from doc.id
        db.collection("communityFoundations").doc(doc.id).update({
          name: cfInfo.name,
          public_email: cfInfo.public_email,
          public_phone: cfInfo.public_phone,
          foundation_url: cfInfo.foundation_url,
          fname_contact: cfInfo.fname_contact,
          lname_contact: cfInfo.lname_contact,
          personal_email: cfInfo.personal_email,
          personal_phone: cfInfo.personal_phone
        });
        console.log("Document successfully written!");
        setGetData(true);
        setEdit(false);
      });
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  }

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
      functionLoadData();
    }else{
      console.log("no need...")
    }
    
  }, [getData]);

  return (
    <Data 
      isEdit={isEdit}
      cfInfo={cfInfo}
      toggleEdit={toggleEdit}
      onSubmit={onSubmit}
      functionLoadData={functionLoadData}
    />
  );
} 

const Data = (props) => {
  if(props.isEdit){
    return(
      <EditableData
        {...props}
        key={"key"}
      />
    );
  }else{
    return(
      <NonEditableData
        cfInfo={props.cfInfo}
        toggleEdit={props.toggleEdit}
        onSubmit={props.onSubmit}
      />
    );
  }
}