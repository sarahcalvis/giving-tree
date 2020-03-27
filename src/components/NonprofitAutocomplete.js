import React, { useEffect } from 'react';

import firebase from '../firebase';
import * as helper from '../helpers/ValidationHelper.js';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

export default function NonprofitAutocomplete(props) {
  // nonprofit already in database
  const [nonprofits, setNonprofits] = React.useState([]);

  // nonprofit data for new nonprofit
  const [nonprofitData, setNonprofitData] = React.useState({ name: '', number: '', email: '', url: '', cf_id: props.cfId });

  // errors for new nonprofit
  const [errors, setErrors] = React.useState({ name: '', number: '', email: '', url: '' });

  // check if nonprofit is ready for upload
  const [valid, setValid] = React.useState(false);

  // selected autocomplete item
  const [selected, setSelected] = React.useState(-1);

  let db = firebase.firestore();

  // Select correct nonprofit
  useEffect(() => {
    if (props.initialNonprofit === '') {
      setSelected(0);
      if (typeof props.callback !== 'undefined') {
        props.callback({}, { name: nonprofits[0]?.name, id: nonprofits[0]?.id });
      }
    }
    else {
      for (let i in nonprofits) {
        if (nonprofits[i].id === props.initialNonprofit) {
          setSelected(i);
          break;
        }
      }
    }
  }, [nonprofits])

  // Map nonprofit objects to labels
  let transformedNonprofits = Object.values(nonprofits).map((item, index) => {
    item.dataLabel = item.name;
    return item;
  })

  // Keep track of whether the 'add nonprofit' panel is open
  const [adding, setAdding] = React.useState(false);

  const addMode = () => { setAdding(true); }

  const cancelAddMode = () => { setAdding(false); }

  // Add a nonprofit to the database
  const addNonprofit = () => {
    db.collection('nonprofits').doc().set(nonprofitData)
      .then(function () {
        setAdding(false);
      }).catch(function (error) {
        console.error('Error writing draft: ', error);
      })
  }

  // Load the nonprofits
  useEffect(() => {
    let newNonprofits = [];
    db.collection('nonprofits').where('cf_id', '==', props.cfId)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          newNonprofits.push({ id: doc.id, name: doc.data().name })
        })
      }).then(() => setNonprofits(newNonprofits))
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }, [adding])

  // Handle change to add nonprofit text boxes
  const handleInput = (e) => {
    // update info
    let newNonprofitData = { name: '', number: '', email: '', url: '', cf_id: props.cfId };
    for (let property in nonprofitData) newNonprofitData[property] = nonprofitData[property];
    newNonprofitData[e.target.id] = e.target.value;
    setNonprofitData(newNonprofitData);

    // validate
    let newErrors = { name: '', number: '', email: '', url: '' };
    for (let property in errors) newErrors[property] = errors[property];
    newErrors[e.target.id] = helper.validateField(e.target.id, e.target.value);
    setErrors(newErrors);
  }

  // observe add nonprofit text boxes to see if they are ready for upload
  useEffect(() => {
    setValid(
      helper.validateField('name', nonprofitData.name) === '' &&
      helper.validateField('number', nonprofitData.number) === '' &&
      helper.validateField('email', nonprofitData.email) === '' &&
      helper.validateField('url', nonprofitData.url) === ''
    )
  }, [nonprofitData])

  return (
    <div>
      {selected > -1 &&
        <div>
          {!adding && nonprofits.length > 0 &&
            <Grid container
              direction='row'
              justify='space-between'
              alignItems='center'>
              <Grid item xs='8'>
                <Autocomplete
                  options={transformedNonprofits}
                  getOptionLabel={nonprofits => nonprofits.name}
                  autoHighlight
                  disableClearable
                  defaultValue={transformedNonprofits[selected]}
                  onChange={props.callback}
                  renderInput={params => (
                    <TextField
                      {...params}
                      fullWidth
                      onChange={props.callback}
                      defaultValue={transformedNonprofits[selected]}
                      label='Select affiliated nonprofit'
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Button color='primary' variant='contained' onClick={addMode}>Add a new nonprofit</Button>
              </Grid>
            </Grid>
          }
          <Grid item>
            {
              (adding || nonprofits.length === 0) &&
              <Container>
                <TextField
                  id='name'
                  fullWidth
                  label='Nonprofit Name'
                  onChange={handleInput}
                  error={errors.name !== ''}
                  helperText={errors.name} />
                <TextField
                  id='number'
                  fullWidth
                  label='Nonprofit Phone Number'
                  onChange={handleInput}
                  error={errors.number !== ''}
                  helperText={errors.number} />
                <TextField
                  id='email'
                  fullWidth
                  label='Nonprofit Email'
                  onChange={handleInput}
                  error={errors.email !== ''}
                  helperText={errors.email} />
                <TextField
                  id='url'
                  fullWidth
                  label='Nonprofit Website'
                  onChange={handleInput}
                  error={errors.url !== ''}
                  helperText={errors.url} />
                <Grid container direction="row" justify="flex-end" alignItems="center">
                  <Grid item style={{ padding: 2 }}>
                    <Button
                      color='primary'
                      variant='outlined'
                      onClick={cancelAddMode}>
                      Cancel
                </Button>
                  </Grid>
                  <Grid item style={{ padding: 2 }}>
                    <Button
                      color='primary'
                      variant='contained'
                      onClick={addNonprofit}
                      disabled={!valid}>
                      Add Nonprofit
                </Button>
                  </Grid>
                </Grid>
              </Container>
            }
          </Grid>
        </div>
      }
    </div >
  )
}