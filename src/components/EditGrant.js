import React, { useEffect } from 'react';

import firebase from '../firebase.js';
import Text from './Text.js';
import LocationSearch from './LocationSearch.js';
import TagSearch from './TagSearch.js';
import NonprofitAutocomplete from './NonprofitAutocomplete.js';
import GrantDescription from './GrantDescription.js';
import GrantTitle from './GrantTitle.js';
import DateChooser from './DateChooser.js';
import ImageTiles from './ImageTiles.js';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  padding: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}))

export default function EditGrant(props) {
  // Styles
  const classes = useStyles();

  // Initialize Firebase storage
  const storageRef = firebase.storage().ref();

  ///////////
  // IMAGE //
  ///////////
  // Moniter the image input
  const fileInput = React.createRef();

  // Store the image names
  const [img, setImg] = React.useState(props.grantData?.images);

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
        return { url: url, name: imgName };
      })
    )).then((urls) => {
      setUrl(urls);
    });
  }

  // Observe the image array. When an image name is added, reload the image urls
  useEffect(() => { getUrls(img) }, [img]);


  // Delete an image
  const removeImage = async (event) => {
    let newImg = [];
    img.forEach((i, index, img) => {
      if (i !== event.target.parentNode.id) newImg.push(i);
      if (newImg.length === img.length - 1) setImg(newImg);
    });
  }


  ///////////////
  // CALLBACKS //
  ///////////////
  // Get input from text fields
  const handleInput = (e) => {
    if (e.target.id === 'goal_amt') {
      props.callback(e.target.value.replace('$', '').replace(/,/g, ''), e.target.id);
    } else {
      props.callback(e.target.value, e.target.id);
    }
  }

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
    props.callback(value, 'nonprofit_name');
  }

  // Update the images array
  useEffect(() => { props.callback(img, 'images') }, [img]);

  return (
    <div>
      <GrantTitle
        error={props.errors?.title !== ''}
        helperText={props.errors?.title}
        defaultValue={props.grantData?.title}
        onChange={handleInput} />
      <GrantDescription
        error={props.errors?.desc !== ''}
        helperText={props.errors?.desc}
        defaultValue={props.grantData?.desc}
        onChange={handleInput} />
      <div className={classes.padding}>
        <Text type='card-heading' text='Affiliated Nonprofit' />
        <Text type='card-subheading' text={'This information will be publicly visible to donors.'} />
        <NonprofitAutocomplete
          callback={nonprofitCallback}
          cfId={props.cfId}
          error={props.errors?.nonprofit_name !== ''}
          helperText={props.errors?.nonprofit_name}
          initialNonprofit={props.grantData?.nonprofit_id} />
      </div>
      <Grid container direction='row' alignItems='flex-start' spacing={3}>
        <DateChooser
          error={props.errors?.date_deadline !== ''}
          helperText={props.errors?.date_deadline}
          callback={props.callback}
          date_deadline={props.grantData?.date_deadline} />
        <Grid item xs={12} sm={6}>
          <div className={classes.padding}>
            <Text type='card-heading' text='Goal Amount' />
            <TextField
              onChange={handleInput}
              defaultValue={props.grantData?.goal_amt}
              id='goal_amt'
              label='Goal amount'
              className='form-control'
              type='text'
              error={props.errors?.goal_amt !== ''}
              helperText={props.errors?.goal_amt}
              fullWidth />
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
              tags={props.grantData?.tags} />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className={classes.padding}>
            <Text type='card-heading' text='Grant Location' />
            <Text type='card-subheading' text={'We will not directly share this address with donors. We will use it to calculate a donor\'s distance from a grant.'} />
            <LocationSearch
              parentCallback={locationCallback}
              address={props.grantData?.address}
              error={props.errors?.address !== ''}
              helperText={props.errors?.address} />
          </div>
        </Grid>
      </Grid>
      <ImageTiles
        uploadImages={uploadImages}
        url={url} removeImage={removeImage}
        fileInput={fileInput}
        callback={props.callback} />
    </div>
  );
}