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
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [contactFirstName, setContactFirstName] = React.useState('');
  const [contactLastName, setContactLastName] = React.useState('');
  const [contactEmail, setContactEmail] = React.useState('');
  const [contactPhone, setContactPhone] = React.useState('');

  // Foundation info
  const [nameHelp, setNameHelp] = React.useState('');
  const [emailHelp, setEmailHelp] = React.useState('');
  const [phoneHelp, setPhoneHelp] = React.useState('');
  const [urlHelp, setUrlHelp] = React.useState('');
  const [contactFirstNameHelp, setContactFirstNameHelp] = React.useState('');
  const [contactLastNameHelp, setContactLastNameHelp] = React.useState('');
  const [contactPhoneHelp, setContactPhoneHelp] = React.useState('');

  function functionLoadData(){
    // Foundation query
    db.collection('communityFoundations').where('personal_email','==', user.email)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          setName(doc.data().name);
          setEmail(doc.data().public_email);
          setPhone(doc.data().public_phone);
          setUrl(doc.data().foundation_url);
          setContactFirstName(doc.data().fname_contact);
          setContactLastName(doc.data().lname_contact);
          setContactEmail(doc.data().personal_email);
          setContactPhone(doc.data().personal_phone);
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }

  function onSubmit(){
    setNameHelp(helper.validateField('name', name));
    setEmailHelp(helper.validateField('email', email));
    setPhoneHelp(helper.validateField('public_phone', phone));
    setUrlHelp(helper.validateField('foundation_url', url));
    setContactFirstNameHelp(helper.validateField('fname_contact', contactFirstName));
    setContactFirstNameHelp(helper.validateField('lname_contact', contactLastName));
    setContactPhoneHelp(helper.validateField('private_phone', contactPhone));
    
    if((nameHelp === '') && (emailHelp === '') && (phoneHelp === '') && (urlHelp === '') && (contactFirstNameHelp === '') && (contactLastNameHelp === '') && (contactPhoneHelp === ''))
    {
      db.collection('communityFoundations').where('public_email','==',user.email)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
          // Build doc ref from doc.id
          db.collection("communityFoundations").doc(doc.id).update({
            name: name,
            public_email: email,
            public_phone: phone,
            foundation_url: url,
            fname_contact: contactFirstName,
            lname_contact: contactLastName,
            personal_email: contactEmail,
            personal_phone: contactPhone
          });
          console.log("Document successfully written!");
          setEdit(false);
        });
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
    }
  }

  function toggleEdit()
  {
    if(isEdit){
      setEdit(false);
    }else{
      setEdit(true);
    }
  }

  return (
    <Data 
      isEdit={isEdit}
      
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      phone={phone}
      setPhone={setPhone}
      url={url}
      setUrl={setUrl}
      contactFirstName={contactFirstName}
      setContactFirstName={setContactFirstName}
      contactLastName={contactLastName}
      setContactLastName={setContactLastName}
      contactEmail={contactEmail}
      setContactEmail={setContactEmail}
      contactPhone={contactPhone}
      setContactPhone={setContactPhone}
      
      toggleEdit={toggleEdit}
      onSubmit={onSubmit}
      functionLoadData={functionLoadData}
      
      nameHelp={nameHelp}
      emailHelp={emailHelp}
      phoneHelp={phoneHelp}
      urlHelp={urlHelp}
      contactFirstNameHelp={contactFirstNameHelp}
      contactLastNameHelp={contactLastNameHelp}
      contactPhoneHelp={contactPhoneHelp}
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
        functionLoadData={props.functionLoadData}
        name={props.name}
        email={props.email}
        phone={props.phone}
        url={props.url}
        contactFirstName={props.contactFirstName}
        contactLastName={props.contactLastName}
        contactEmail={props.contactEmail}
        contactPhone={props.contactPhone}
        onSubmit={props.onSubmit}
        toggleEdit={props.toggleEdit}
        />
    );
  }
}