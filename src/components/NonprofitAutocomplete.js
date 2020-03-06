import React, { useEffect } from 'react';

import firebase from '../firebase';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

export default function NonprofitAutocomplete(props) {
  const [nonprofits, setNonprofits] = React.useState([]);
  const [nonprofitData, setNonprofitData] = React.useState({ name: '', number: '', email: '', url: '', cf_id: props.cfId });
  const [selected, setSelected] = React.useState(-1);
  const [loaded, setLoaded] = React.useState(false);

  let db = firebase.firestore();

  useEffect(() => {
    for (let i in nonprofits) {
      console.log(nonprofits[i].id, props.initialNonprofit)
      if (nonprofits[i].id === props.initialNonprofit) {
        setSelected(i);
        setLoaded(true);
      } else if (i === nonprofits.length - 1) {
        setLoaded(true);
      }
    }
  }, [nonprofits])

  let transformedNonprofits = Object.values(nonprofits).map((item, index) => {
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

  // no nonprofits to select, you gotta be adding a new one my man
  // useEffect(() => { if (nonprofits.length === 0) setAdding(true) })

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
      {!adding &&
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
          (adding || nonprofits.length == 0) &&
          <Container>
            <TextField id='name' fullWidth label='Nonprofit Name' onChange={handleInput} />
            <TextField id='number' fullWidth label='Nonprofit Email' onChange={handleInput} />
            <TextField id='email' fullWidth label='Nonprofit Phone Number' onChange={handleInput} />
            <TextField id='url'
              fullWidth label='Nonprofit Website' onChange={handleInput} />
            <Grid container direction="row" justify="flex-end" alignItems="center" spacing={1}>
              <Button color='primary' variant='outlined' onClick={cancelAddMode}>Cancel</Button>
              <Button color='primary' variant='contained' onClick={addNonprofit}>Add Nonprofit</Button>
            </Grid>
          </Container>
        }
      </Grid>
    </div >
  )
}