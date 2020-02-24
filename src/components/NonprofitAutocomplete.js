import React, { useEffect } from 'react';

import firebase from '../firebase';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function NonprofitAutocomplete(props) {
  const [nonprofits, setNonprofits] = React.useState([]);
  const [nonprofitData, setNonprofitData] = React.useState({ name: '', number: '', email: '', url: '', cf_id: props.cfId })

  let db = firebase.firestore();

  // Keep track of whether the 'add nonprofit' panel is open
  const [adding, setAdding] = React.useState(false);

  const addMode = () => { setAdding(true); }

  const cancelAddMode = () => { setAdding(false); }

  const addNonprofit = () => {
  }

  // Load the nonprofits
  useEffect(() => {
    let newNonprofits = [];
    db.collection('nonprofits').where('cf_id', '==', props.cfId)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          newNonprofits.push({ id: doc.id, name: doc.data().name })
        }).then(() => setNonprofits(newNonprofits));
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }, [])

  const handleInput = (e) => {
    let newNonprofitData = nonprofitData;
    newNonprofitData[e.target.id] = e.target.value;
    setNonprofitData(newNonprofitData);
    console.log(newNonprofitData);
  }

  return (
    <div>
      <Autocomplete
        options={nonprofits}
        getOptionLabel={nonprofits => nonprofits.name}
        fullWidth
        renderInput={params => (
          <TextField {...params} label='Nonprofit' fullWidth />
        )}
      />
      <Button
        onClick={addMode}>Add a new nonprofit
      </Button>
      {
        adding &&
        <div>
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
          <Button
            onClick={addNonprofit}>Add Nonprofit
          </Button>
          <Button
            onClick={cancelAddMode}>Cancel
          </Button>
        </div>
      }
    </div>
  )
}