import React, { useEffect } from 'react';

import firebase from '../firebase.js';
import Text from './Text.js';
import LocationSearch from './LocationSearch.js';
import TagSearch from './TagSearch.js';
import NonprofitAutocomplete from './NonprofitAutocomplete.js';

import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from '@material-ui/styles';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

// import MaskedInput from 'react-text-mask'
// import createNumberMask from 'text-mask-addons/dist/createNumberMask'

import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
  padding: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  gridList: {
    width: 800,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  img: {
    maxWidth: 200,
    maxHeight: 200,
  },
  centeredIcon: {
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  largeIcon: {
    fontSize: '5em',
  },
}))

export default function EditGrant(props) {
  // Styles
  const classes = useStyles();

  // Initialize Firebase storage
  const storageRef = firebase.storage().ref();

  // Money mask
  // const numberMask = createNumberMask({
  //   allowDecimal: true,
  //   prefix: '$ ',
  //   suffix: '' // This will put the dollar sign at the end, with a space.
  // })

  // Hold the date selected by the date picker
  const [selectedDate, handleDateChange] = React.useState(
    (props.grantData.date_deadline !== '') ? new Date(props.grantData.date_deadline.seconds * 1000) : null
  );

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
    let newImg = img.slice();
    for (let file of fileInput.current.files) {
      let name = file.name;
      let type = file.type;

      // Make firebase reference to file location
      let ref = storageRef.child(name);

      // Add file to storage and pass the image name up to the parent
      ref.put(new File([file], name, { type: type, }))
        .then(function (snapshot) {
          // add the image name to the image array
          newImg.push(name);
        }).then(function () {
          setImg(newImg);

        });
    }
  };

  // Load image urls from their names
  const getUrls = async (imgNames) => {
    await Promise.all(imgNames.map(imgName =>
      new Promise((resolve, reject) => {
        storageRef.child(imgName).getDownloadURL().then((url) => {
          resolve(url);
        }).catch(() => {
          reject(null);
        })
      }).then((url) => {
        return {url: url, name: imgName};
      })
    )).then((urls) => {
      setUrl(urls);
    });
  }

  useEffect(() => {console.log(url)}, [url])

  // Observe the image array. When an image name is added, reload the image urls
  useEffect(() => {
    getUrls(img);
  }, [img])


  // Delete an image
  const removeImage = async (event) => {
    console.log('name of the image to be deleted: ', event.target.parentNode.id)

    let newImg = [];

    var fillNewImg = new Promise((resolve, reject) => {
      img.forEach((i, index, img) => {
        if (i !== event.target.parentNode.id) newImg.push(i);
        if (index === img.length - 1) resolve();
      });
    });

    fillNewImg.then(() => {
      console.log('updating img to ' + newImg)
      setImg(newImg);
    });
  }


  ///////////////
  // CALLBACKS //
  ///////////////
  // Get input from text fields
  const handleInput = (e) => {
    if (e.target.id === 'goal_amt') {
      props.callback(parseFloat(e.target.value.replace('$', '').replace(' ', '').replace(/,/g, '')), e.target.id)
    } else {
      props.callback(e.target.value, e.target.id);
    }
  }

  // Handle change to the date picker
  useEffect(() => {
    if (selectedDate) {
      props.callback(Math.round(selectedDate.getTime() / 1000), 'date_deadline')
    }
  }, [selectedDate]);

  // Get the location from LocationSearch
  const locationCallback = (address) => {
    props.callback(address, 'address')
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

  // Update the images array
  useEffect(() => { props.callback(img, 'images') }, [img]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.padding}>
        <Text type='card-heading' text='Grant Title' />
        <TextField
          id='title'
          defaultValue={props.grantData.title}
          fullWidth
          error={props.errors.title !== ''}
          helperText={props.errors.title}
          label='Grant Title'
          onBlur={handleInput}
          onChange={handleInput} />
      </div>
      <div className={classes.padding}>
        <Text type='card-heading' text='Grant Description' />
        <TextField
          id='desc'
          multiline
          fullWidth
          error={props.errors.desc !== ''}
          helperText={props.errors.desc}
          defaultValue={props.grantData.desc}
          label='Add a description to help donors understand why this grant is important.'
          onBlur={handleInput}
          onChange={handleInput} />
      </div>
      <div className={classes.padding}>
        <Text type='card-heading' text='Affiliated Nonprofit' />
        <NonprofitAutocomplete
          callback={nonprofitCallback}
          cfId={props.cfId}
          error={props.errors.nonprofit_name !== ''}
          helperText={props.errors.nonprofit_name}
          initialNonprofit={props.grantData.nonprofit_id} />
      </div>
      <Grid
        container
        direction='row'
        alignItems='flex-start'
        spacing={3}>
        <Grid item xs={12} sm={6}>
          <div className={classes.padding}>
            <Text type='card-heading' text='Grant Deadline' />
            <DatePicker
              label='Pick a date'
              value={selectedDate}
              fullWidth
              error={props.errors.date_deadline !== ''}
              helperText={props.errors.date_deadline}
              onChange={handleDateChange}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className={classes.padding}>
            <Text type='card-heading' text='Goal Amount' />
            <TextField
              onChange={handleInput}
              onBlur={handleInput}
              defaultValue={props.grantData.goal_amt}
              id='goal_amt'
              label='Goal amount'
              className='form-control'
              type='text'
              error={props.errors.goal_amt !== ''}
              helperText={props.errors.goal_amt}
              fullWidth />
            {/* <MaskedInput
          mask={numberMask}
          onChange={handleInput}
          defaultValue={props.grantData.goal_amt}
          id='goal_amt'
          className='form-control'
          type='text'
        /> */}
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        direction='row'
        alignItems='flex-start'
        spacing={3}>
        <Grid item xs={12} sm={6}>
          <div className={classes.padding}>
            <Text type='card-heading' text='Tags' />
            <Text type='card-subheading' text={'Search for a tag or create a new tag to help donors find the grants they are looking for.'} />
            <TagSearch
              parentCallback={tagsCallback}
              tags={props.grantData.tags} />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className={classes.padding}>
            <Text type='card-heading' text='Grant Location' />
            <Text type='card-subheading' text={'We will not directly share this address with donors. We will use it to calculate a donor\'s distance from a grant.'} />
            <LocationSearch
              parentCallback={locationCallback}
              address={props.grantData.address}
              error={props.errors.address !== ''}
              helperText={props.errors.address}
              onBlur={locationCallback} />
          </div>
        </Grid>
      </Grid>
      <div className={classes.padding}>
        <Text type='card-heading' text='Grant Images' />
        <GridList cellHeight={200} spacing={1} className={classes.gridList} >
          <GridListTile
            className={classes.img}
            key={'Upload another'}
            cols={1}
            rows={1}>
            <div className={classes.centeredIcon}>
              <label htmlFor='file-upload'>
                <IconButton
                  component='span'>
                  <AddPhotoAlternateIcon className={classes.largeIcon} />
                </IconButton>
              </label>
            </div>
          </GridListTile>
          {url.length > 0 && url.map(u => (
            <GridListTile className={classes.img} key={u.name} cols={1} rows={1}>
              <img src={u.url} />
              <GridListTileBar
                title={u.name}
                id={u.name}
                className={classes.titleBar}
                actionIcon={
                  <IconButton
                    id={u.name}
                    onClick={removeImage}
                    style={{ color: 'white' }}
                    aria-label={`delete image`}>
                    <DeleteIcon id={u.name} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
        <input
          className={classes.input}
          id='file-upload'
          type='file'
          accept='image/png, image/jpeg'
          ref={fileInput}
          onChange={uploadImages}
          multiple />
      </div>
    </MuiPickersUtilsProvider>
  );
}