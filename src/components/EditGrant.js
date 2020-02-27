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
  // Set tab title
  useEffect(() => { document.title = 'Create Grant-Giving Tree'; }, []);

  // Styles
  const classes = useStyles();

  // Initialize Firebase storage
  const storageRef = firebase.storage().ref();

  // Money mask
  const numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '$ ',
    suffix: '' // This will put the dollar sign at the end, with a space.
  })

  // Hold the date selected by the date picker
  const [selectedDate, handleDateChange] = React.useState(null);

  // Handle change to the date picker
  useEffect(() => {
    if (selectedDate) {
      props.callback(Math.round(selectedDate.getTime() / 1000), 'date_deadline')
    }
  }, [selectedDate]);

  ///////////
  // IMAGE //
  ///////////
  // Moniter the image input
  const fileInput = React.createRef();

  // Store the image names
  const [img, setImg] = React.useState(props.grantData.images);

  // Store the image urls
  const [url, setUrl] = React.useState([]);

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

          // add the image name to the image array
          let newImg = img.slice();
          newImg.push(name);
          setImg(newImg);
        });
    }
  };

  // Observe the image array. When an image name is added, reload the image urls
  useEffect(() => {
    console.log(props.grantData)
    if (img) {
      let newUrl = [];
      for (let i in img) {
        storageRef.child(img[i]).getDownloadURL().then(function (url) {
          newUrl.push(url);
          if (i == img.length - 1) {
            setUrl(newUrl.slice());
          }
        }).catch(function (error) {
          console.log('error getting image url: ', error)
        })
      }
    }
  }, [img])

  ///////////////
  // CALLBACKS //
  ///////////////
  // Get input from text fields
  const handleInput = (e) => {
    console.log(e.target);
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
          defaultValue={props.grantData.title}
          variant='outlined'
          label='Grant Title'
          onChange={handleInput} />
      </div>

      <div className={classes.padding}>
        <Text type='card-heading' text='Grant Images' />
        <Text type='card-subheading' text={'Add some pictures related to the grant.'} />
        {(url && url.length > 0) && <ImageCarousel img={url} />}
        <label for='file-upload'>
          {(url && url.length > 0) ? 'Upload another image' : 'Upload images'}
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
          defaultValue={props.grantData.desc}
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
          onBlur={handleInput}
          id='goal_amt'
          className='form-control'
          type='text'
        />
      </div>


      <div className={classes.padding}>
        <Text type='card-heading' text='Tags' />
        <Text type='card-subheading' text={'Search for a tag or create a new tag to help donors find the grants they are looking for.'} />
        <TagSearch parentCallback={tagsCallback} tags={props.grantData.tags} />
      </div>

      <div className={classes.padding}>
        <Text type='card-heading' text='Grant Location' />
        <Text type='card-subheading' text={'We will not directly share this address with donors. We will use it to calculate a donor\'s distance from a grant.'} />
        <LocationSearch parentCallback={locationCallback} />
      </div>

    </MuiPickersUtilsProvider>
  );
}