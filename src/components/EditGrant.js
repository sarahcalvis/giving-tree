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
  input: {
    display: 'none',
  }
}))

export default function EditGrant(props) {
  // Styles
  const classes = useStyles();

  // Set tab title
  useEffect(() => { document.title = 'Create Grant-Giving Tree'; }, []);

  // Handle the date picker
  const [selectedDate, handleDateChange] = React.useState(null);
  useEffect(() => {
    if (selectedDate) {
      props.callback(Math.round(selectedDate.getTime() / 1000), 'date_deadline')
    }
  }, [selectedDate]);

  // Moniter the image input
  const fileInput = React.createRef();

  // Initialize Firebase storage
  const storageRef = firebase.storage().ref();

  // Upload images to Firebase storage
  const uploadImages = () => {
    for (let file of fileInput.current.files) {
      let name = file.name;
      let type = file.type;

      // Make firebase reference to file location
      let ref = storageRef.child(name);

      // Add file to storage and pass the image name up to the parent
      ref.put(new File([file], name, { type: type, }))
        .then(function (snapshot) {
          props.callback(name, 'images');
        });
    }
  };

  // Handle general input to text fields
  const handleInput = (e, data) => {
    props.callback(e.target.value, e.target.id);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Container className={classes.card}>
        <Card className={classes.topCard}>
          <CardContent className={classes.cardContent}>
            <Text type='card-heading' text='Public Grant Information' />
            <Text type='card-subheading' text='This information will be visible to the public.' />
            <label for='file-upload'>
              Click to upload images...
            </label>
            <input
              className={classes.input}
              id='file-upload'
              type='file'
              accept='image/png, image/jpeg'
              ref={fileInput}
              onChange={uploadImages}
              multiple />
            <TextField 
              id='title'
              fullWidth 
              label='Grant Title'
              onChange={handleInput} />
            <TextField 
              id='nonprofit_name'
              fullWidth 
              label='Nonprofit Name'
              onChange={handleInput} />
            <DatePicker 
              fullWidth 
              label='Deadine' 
              variant="inline"
              value={selectedDate}
              onChange={handleDateChange} />
            <TextField 
              id='goal_amt'
              fullWidth 
              label='Goal amount'
              onChange={handleInput} />
            <TextField 
              id='desc'
              fullWidth 
              label='Grant Description'
              onChange={handleInput} />
            <TextField 
              fullWidth 
              label='Tags' />
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
