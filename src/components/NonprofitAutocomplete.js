import React, { useEffect } from 'react';

import firebase from '../firebase';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function NonprofitAutocomplete(props) {
  const [nonprofits, setNonprofits] = React.useState([]);

  let db = firebase.firestore();

  // Load the nonprofits
  useEffect(() => {
    let newNonprofits = [];
    db.collection('nonprofits').where('cf_id', '==', props.cfId)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        newNonprofits.push({id: doc.id, name: doc.data().name})
      }).then(() => setNonprofits(newNonprofits));
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
}, [])

return (
  <div>
    <Autocomplete
      id="combo-box-demo"
      options={nonprofits}
      getOptionLabel={nonprofits => nonprofits.name}
      fullWidth
      renderInput={params => (
        <TextField {...params} label='Nonprofit' fullWidth />
      )}
    />
  </div>
)
}