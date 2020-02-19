import React, { useEffect } from 'react';
import { Button, Grid, Typography, Container, FormControl, InputLabel, Input } from '@material-ui/core';
import AuthUserContext from '../auth/context.js';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import TitleIcon from '@material-ui/icons/Title'
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import ContactsIcon from '@material-ui/icons/Contacts';
import ContactsOutlinedIcon from '@material-ui/icons/ContactsOutlined';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';

import firebase from '../firebase.js';


export default function FSettings() {
 
  // Set tab title
  useEffect(() => { document.title = 'Settings- Giving Tree'; }, []);

  const [isEdit, setEdit] = React.useState(false);
  const user = React.useContext(AuthUserContext);

  // Foundation info
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState(0);
  const [contactFirstName, setContactFirstName] = React.useState('');
  const [contactLastName, setContactLastName] = React.useState('');
  const [contactEmail, setContactEmail] = React.useState('');
  const [contactPhone, setContactPhone] = React.useState(0);


  const [nameForm, setNameForm] = React.useState('');
  const [emailForm, setEmailForm] = React.useState('');
  const [phoneForm, setPhoneForm] = React.useState(0);
  const [contactFirstNameForm, setContactFirstNameForm] = React.useState('');
  const [contactLastNameForm, setContactLastNameForm] = React.useState('');
  const [contactEmailForm, setContactEmailForm] = React.useState('');
  const [contactPhoneForm, setContactPhoneForm] = React.useState(0);

  function functionLoadData(){
    // Foundation query
    var db = firebase.firestore();
    const cf = db.collection('communityFoundations').where('public_email','==','tanmr1@gcc.edu')
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              setName(doc.data().name);
              setEmail(doc.data().public_email);
              setPhone(doc.data().public_phone);
              setContactFirstName(doc.data().first_contact);
              setContactLastName(doc.data().last_contact);
              setContactEmail(doc.data().personal_email);
              setContactPhone(doc.data().personal_phone);

              setNameForm(name);
              setEmailForm(email);
              setPhoneForm(phone);
              setContactFirstNameForm(contactFirstName);
              setContactLastNameForm(contactLastName);
              setContactEmailForm(contactEmail);
              setContactPhoneForm(contactPhone);
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
  }
  


  function toggleEdit()
  {
    if(isEdit){
      setEdit(false);
    }else{
      setEdit(true);
      console.log(user);
    }
  }

  function onSubmit(){
    setEdit(false);
  }

  function Data(){
    if(isEdit){
      return(
        <EditableData/>
      );
    }else{
      return(
        <NonEditableData/>
      );
    }
  }


  function NonEditableData(){
    functionLoadData();
    return(
      <Container maxWidth="md">
        <List >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <TitleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Foundation Name" secondary={name} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <EmailIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Public Email" secondary={email} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PhoneIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Public Phone" secondary={phone} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ContactsIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Contact First Name" secondary={contactFirstName} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ContactsOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Contact Last Name" secondary={contactLastName} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AlternateEmailIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Contact Email" secondary={contactEmail} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PhoneIphoneIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Contact Phone" secondary={contactPhone} />
          </ListItem>
        </List>
        <Button onClick={toggleEdit}>Edit</Button>
      </Container>
      
    );
  }

  function EditableData(){
    return(
      <Container maxWidth="md">
        <form autoComplete='off'>
          <List >
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <TitleIcon />
                </Avatar>
              </ListItemAvatar>
              <FormControl>
                <InputLabel htmlFor="component-simple">Foundation Name</InputLabel>
                <Input defaultValue={nameForm} onChange={e => setNameForm(e.target.value)} />
              </FormControl>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EmailIcon />
                </Avatar>
              </ListItemAvatar>
              <FormControl>
                <InputLabel htmlFor="component-simple">Public Email</InputLabel>
                <Input defaultValue={email} />
              </FormControl>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PhoneIcon />
                </Avatar>
              </ListItemAvatar>
              <FormControl>
                <InputLabel htmlFor="component-simple">Public Phone</InputLabel>
                <Input defaultValue={phone} />
              </FormControl>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ContactsIcon />
                </Avatar>
              </ListItemAvatar>
              <FormControl>
                <InputLabel htmlFor="component-simple">Contact First Name</InputLabel>
                <Input defaultValue={contactFirstName} />
              </FormControl>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ContactsOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <FormControl>
                <InputLabel htmlFor="component-simple">Contact Last Name</InputLabel>
                <Input defaultValue={contactLastName} />
              </FormControl>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AlternateEmailIcon />
                </Avatar>
              </ListItemAvatar>
              <FormControl>
                <InputLabel htmlFor="component-simple">Contact Email</InputLabel>
                <Input defaultValue={contactEmail} />
              </FormControl>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PhoneIphoneIcon />
                </Avatar>
              </ListItemAvatar>
              <FormControl>
                <InputLabel htmlFor="component-simple">Contact Phone</InputLabel>
                <Input defaultValue={contactPhone} />
              </FormControl>
            </ListItem>
          </List>
        </form>
        <Button onClick={toggleEdit}>Discard</Button>
        <Button onClick={onSubmit}>Save</Button>
      </Container>
    );
  }

  return (
    <React.Fragment>
      <Data />
    </React.Fragment>
  );
} 