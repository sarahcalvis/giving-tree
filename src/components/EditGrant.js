import React, { useEffect } from 'react';

import firebase from '../firebase.js';
import Text from './Text.js';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
  const [selectedDate, handleDateChange] = React.useState(null);
  const [img, setImg] = React.useState(null);

  const fileInput = React.createRef();

  // here's how you get the date's timestamp in seconds, which is what we upload to Firebase
  useEffect(() => { if (selectedDate) { console.log(Math.round(selectedDate.getTime() / 1000)) } }, [selectedDate]);

  const classes = useStyles();

  // Set tab title
  useEffect(() => { document.title = 'Create Grant-Giving Tree'; }, []);

  // Initialize storage
  const storageRef = firebase.storage().ref();

  const uploadFileToFirebase = () => {
    let file = fileInput.current.files[0]
    let name = file.name;
    let type = file.type;

    // Make firebase reference to file location
    let ref = storageRef.child(name);


    // browser completed reading file - display it
    ref.put(new File([file], name, { type: type, }))
      .then(function (snapshot) {
        console.log(snapshot);
      });
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Container className={classes.card}>
        <Card className={classes.topCard}>
          {img &&
            <CardMedia image={img} />
          }
          <CardContent className={classes.cardContent}>
            <Text type='card-heading' text='Public Grant Information' />
            <Text type='card-subheading' text='This information will be visible to the public.' />
            <input type='file' accept='image/png, image/jpeg' ref={fileInput} />
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
