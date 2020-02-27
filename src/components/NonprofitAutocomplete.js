import React, { useEffect } from 'react';

import firebase from '../firebase';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

export default function NonprofitAutocomplete(props) {
  const [nonprofits, setNonprofits] = React.useState([]);
  const [nonprofitData, setNonprofitData] = React.useState({ name: '', number: '', email: '', url: '', cf_id: props.cfId })

  let db = firebase.firestore();

  let transformedNonprofits = Object.values(nonprofits).map((item) => {
    item.dataLabel = item.name;
    return item;
  })

  // Keep track of whether the 'add nonprofit' panel is open
  const [adding, setAdding] = React.useState(false);

  const addMode = () => { setAdding(true); }

  const cancelAddMode = () => { setAdding(false); }

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

  const handleInput = (e) => {
    let newNonprofitData = nonprofitData;
    newNonprofitData[e.target.id] = e.target.value;
    setNonprofitData(newNonprofitData);
  }

  return (
    <div>
      {(nonprofits.length > 0) &&
        <div>
          <Autocomplete
            options={transformedNonprofits}
            getOptionLabel={nonprofits => nonprofits.name}
            autoHighlight
            onChange={props.callback}
            renderInput={params => (
              <TextField
                {...params}
                variant='outlined'
                onChange={props.callback}
                label='Select a nonprofit'
              />
            )}
          />
          <p>
            or
          </p>
        </div>
      }
      <Button
        color='primary'
        variant='contained'
        onClick={addMode}>Add a new nonprofit
      </Button>
      {
        adding &&
        <Container>
          <TextField
            id='name'
            fullWidth
            label='Nonprofit Name'
            onChange={handleInput} />
          <TextField
            id='number'
            fullWidth
            label='Nonprofit Email'
            onChange={handleInput} />
          <TextField
            id='email'
            fullWidth
            label='Nonprofit Phone Number'
            onChange={handleInput} />
          <TextField
            id='url'
            fullWidth
            label='Nonprofit Website'
            onChange={handleInput} />
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center">
            <Button
              color='primary'
              variant='outlined'
              onClick={cancelAddMode}>
              Cancel
            </Button>
            <Button
              color='primary'
              variant='contained'
              onClick={addNonprofit}>
              Add Nonprofit
            </Button>
          </Grid>
        </Container>
      }
    </div >
  )
}