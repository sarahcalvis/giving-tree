import React, { useEffect } from 'react';

import firebase from '../firebase.js';
import Text from './Text.js';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 500,
  },
  topCard: {
    marginBottom: theme.spacing(2),
  },
  cardContent: {
    flexGrow: 1,
  },
}))

export default function EditGrant(props) {
  // Styles
  const classes = useStyles();

  // Set tab title
  useEffect(() => { document.title = 'Create Grant-Giving Tree'; }, []);

  // Grant data to upload to firebase
  const [grantData, setGrantData] = React.useState(
    {
      cf_name: '',
      cf_id: '',
      title: '',
      nonprofit_name: '',
      nonprofit_id: '',
      address: '',
      lat: '',
      long: '',
      date_posted: '',
      date_deadline: '',
      money_raised: 0,
      goal_amt: '',
      desc: '',
      tags: [],
      status: '',
      images: [],
    })

  // Handle the date picker
  const [selectedDate, handleDateChange] = React.useState(null);
  useEffect(() => {
    if (selectedDate) {
      let newData = grantData;
      newData.date_posted = Math.round(selectedDate.getTime() / 1000);
      setGrantData(newData)
    }
  }, [selectedDate]);

  // Moniter the image input
  const fileInput = React.createRef();

  // Initialize Firebase storage
  const storageRef = firebase.storage().ref();

  // Upload images to Firebase storage
  const uploadFileToFirebase = () => {
    for (let file of fileInput.current.files) {
      let name = file.name;
      let type = file.type;

      // Make firebase reference to file location
      let ref = storageRef.child(name);

      // Add file to storage and save its name in the grant object
      ref.put(new File([file], name, { type: type, }))
        .then(function (snapshot) {
          let newData = grantData;
          newData.images.push(name);
          setGrantData(newData);
        });
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Container className={classes.card}>
        <Card className={classes.topCard}>
          <CardContent className={classes.cardContent}>
            <Text type='card-heading' text='Public Grant Information' />
            <Text type='card-subheading' text='This information will be visible to the public.' />
            <input type='file' accept='image/png, image/jpeg' ref={fileInput} multiple />
            <Button onClick={uploadFileToFirebase} >Submit</Button>
            <TextField fullWidth label='Grant Title' />
            <TextField fullWidth label='Nonprofit Name' />
            <DatePicker fullWidth label='Deadine' variant="inline" value={selectedDate} onChange={handleDateChange} />
            <TextField fullWidth label='Goal amount' />
            <TextField fullWidth label='Grant Description' />
            <TextField fullWidth label='Tags' />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Text type='card-heading' text='Private Grant Information' />
            <Text type='card-subheading' text={'We will not directly share this address with the public. We will use it to calculate a donor\'s distance from a grant.'} />
            <TextField fullWidth label='Address' />
          </CardContent>
        </Card>
      </Container>
    </MuiPickersUtilsProvider>
  );
}
