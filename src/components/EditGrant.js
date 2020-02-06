import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Text from './Text.js';
import Validation from './Validation.js';
import { makeStyles } from '@material-ui/styles';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

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

  // here's how you get the date's timestamp in seconds, which is what we upload to Firebase
  useEffect(() => { if (selectedDate) { console.log(Math.round(selectedDate.getTime() / 1000)) } }, [selectedDate]);

  const classes = useStyles();
  const [imgKey, setImgKey] = React.useState(0);

  // Set tab title
  useEffect(() => { document.title = 'Create Grant-Giving Tree'; }, []);

  useEffect(() => {
    //Force image carousel to rerender after 500ms
    //TODO: Find better way to fix
    setTimeout(function () { setImgKey(1); }, 500)
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Container className={classes.card}>
        <Card className={classes.topCard}>
          <CardContent className={classes.cardContent}>
            <Text type='card-heading' text='Public Grant Information' />
            <Text type='card-subheading' text='This information will be visible to the public.' />
            <input type='file' accept='image/png, image/jpeg'/>
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
            <Validation fullWidth label='Address' type='address' />
          </CardContent>
        </Card>
      </Container>
    </MuiPickersUtilsProvider>
  );
}
