import React, { useEffect } from 'react';

import firebase from '../firebase.js';
import Text from './Text.js';
import LocationSearch from './LocationSearch.js';
import TagSearch from './TagSearch.js';
import ImageCarousel from './ImageCarousel.js';
import NonprofitAutocomplete from './NonprofitAutocomplete.js';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

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

  // Money mask
  const numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '$ ',
    suffix: '' // This will put the dollar sign at the end, with a space.
  })

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
  const [img, setImg] = React.useState(props.grantData.images);
  const [urls, setUrls] = React.useState();

  // Update the image names when receiving them as props
  useEffect(() => {
    let newImg = props.grantData.images.slice(); // Need a new reference to trigger state reload
    setImg(newImg)
  }, [props.grantData.images])

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
          let newImg = img.push(name);
          setImg(newImg);
        });
    }
  };

  // Get the array of images when another image is uploaded
  useEffect(() => {
    let newUrls = [];
    let newImg = img.slice(); // Need a new reference to trigger state reload
    for (let i of newImg) {
      storageRef.child(i).getDownloadURL().then(function (url) {
        newUrls.push(url);
        setUrls(newUrls);
        console.log(img);
      }).catch(function (error) {
        console.log('error getting image url: ', error)
      })
    }
  }, [props.grantData.images, img]);

  // Handle general input to text fields
  const handleInput = (e) => {
    if (e.target.id === 'goal_amt') {
      props.callback(parseFloat(e.target.value.replace('$', '').replace(' ', '').replace(/,/g, '')), e.target.id)
    } else {
      props.callback(e.target.value, e.target.id);
    }
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
      <div className={classes.padding}>
        <Text type='card-heading' text='Grant Title' />
        <Text type='card-subheading' text={'What is this grant for?'} />
        <TextField
          id='title'
          value={props.grantData.title}
          variant='outlined'
          label='Grant Title'
          onChange={handleInput} />
      </div>

      <div className={classes.padding}>
        <Text type='card-heading' text='Grant Images' />
        <Text type='card-subheading' text={'Add some pictures related to the grant.'} />
        {(urls && urls.length > 0) && <ImageCarousel img={urls} />}
        <label for='file-upload'>
          {(img && img.length > 0) ? 'Upload another image' : 'Upload images'}
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
          fullWidth
          rows='6'
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
        <MaskedInput
          mask={numberMask}
          onChange={handleInput}
          id='goal_amt'
          className='form-control'
          type='text'
        />
      </div>


      <div className={classes.padding}>
        <Text type='card-heading' text='Tags' />
        <Text type='card-subheading' text={'Search for a tag or create a new tag to help donors find the grants they are looking for.'} />
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