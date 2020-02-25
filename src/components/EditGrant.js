import React, { useEffect } from 'react';

import firebase from '../firebase.js';
import Text from './Text.js';
import LocationSearch from './LocationSearch.js';
import TagSearch from './TagSearch.js';
import ImageCarousel from './ImageCarousel.js';
import NonprofitAutocomplete from './NonprofitAutocomplete.js';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
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
  },
  padding: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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

  // Store the image names for the carousel
  const [img, setImg] = React.useState([]);

  // Store the image 

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
          props.callback(name, 'images')
          getUrls(name);
        });
    }
  };

  // Get the array of images when another image is uploaded
  const getUrls = (imgName) => {
    let newImg = img.slice(); // Need a new reference to trigger state reload
    storageRef.child(imgName).getDownloadURL().then(function (url) {
      newImg.push(url);
      setImg(newImg);
      console.log(img);
    }).catch(function (error) {
      console.log('error getting image url: ', error)
    })
  }

  // Handle general input to text fields
  const handleInput = (e, data) => {
    props.callback(e.target.value, e.target.id);
  }

  // Get the location from LocationSearch
  const locationCallback = (address) => {
    props.callback(address.address.description, 'address');
    props.callback(address.lat, 'lat');
    props.callback(address.long, 'long');
  }

  // Get the tags from TagSearch
  const tagsCallback = (tags) => {
    props.callback(tags.freeText, 'newTags');
    props.callback(tags.tags.concat(tags.freeText), 'tags');
  }

  // Get the nonprofit from NonprofitAutocomplete
  const nonprofitCallback = (event, value) => {
    props.callback(value.id, 'nonprofit_id');
    props.callback(value.name, 'nonprofit_name');
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>

      <Text type='heading' text='Create a Grant' />

      <div className={classes.padding}>
        <Text type='card-heading' text='Grant Title' />
        <Text type='card-subheading' text={'What is this grant for?'} />
        <TextField
          id='title'
          variant='outlined'
          label='Grant Title'
          onChange={handleInput} />
      </div>

      <div className={classes.padding}>
        <Text type='card-heading' text='Grant Images' />
        <Text type='card-subheading' text={'Add some pictures related to the grant.'} />
        {img.length > 0 && <ImageCarousel img={img} />}
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
      </div>

      <div className={classes.padding}>
        <Text type='card-heading' text='Grant Description' />
        <Text type='card-subheading' text={'Add a some information to help donors understand why this grant is important.'} />
        <TextField
          id='desc'
          multiline
          variant='outlined'
          label='Grant Description'
          onChange={handleInput} />
      </div>

      <div className={classes.padding}>
        <Text type='card-heading' text='Affiliated Nonprofit' />
        <Text type='card-subheading' text={'The nonprofit that made this grant request.'} />
        <NonprofitAutocomplete
          callback={nonprofitCallback}
          cfId={props.cfId} />
      </div>

      <div className={classes.padding}>
        <Text type='card-heading' text='Deadline' />
        <Text type='card-subheading' text={'The last day that donors can give to this grant.'} />
        <DatePicker
          label='Pick a date'
          value={selectedDate}
          onChange={handleDateChange} />
      </div>

      <div className={classes.padding}>
        <Text type='card-heading' text='Goal Amount' />
        <Text type='card-subheading' text={'The total amount you want to raise for this grant. If you receive donations from outside giving tree, you can always edit this amount.'} />
        <TextField
          id='goal_amt'
          variant='outlined'
          label='Goal amount'
          onChange={handleInput} />
      </div>


      <div className={classes.padding}>
        <Text type='card-heading' text='Tags' />
        <Text type='card-subheading' text={'Search for a tag or acreate a new tag to help donors find the grants they are looking for.'} />
        <TagSearch parentCallback={tagsCallback} />
      </div>

      <div className={classes.padding}>
        <Text type='card-heading' text='Grant Location' />
        <Text type='card-subheading' text={'We will not directly share this address with donors. We will use it to calculate a donor\'s distance from a grant.'} />
        <LocationSearch parentCallback={locationCallback} />
      </div>

    </MuiPickersUtilsProvider>
  );
}