
import React, { useEffect, useContext } from 'react';

import EditGrant from '../components/EditGrant.js';
import Text from '../components/Text.js';
import firebase from '../firebase';

import AuthUserContext from '../auth/context.js';
import withAuthProtection from '../auth/withAuthProtection.js';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  card: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  }
}));

function FEditGrant() {
  const classes = useStyles();

  let db = firebase.firestore();

  ///////////////////////////////
  // COMMUNITY FOUNDATION DATA //
  ///////////////////////////////
  // Figure out what community foundation is logged in
  const user = useContext(AuthUserContext);

  // Data of the CF editing or creating the grant
  const [cfData, setCfData] = React.useState();

  // Load that community foundation's data
  useEffect(() => {
    console.log(user.email);
    db.collection('communityFoundations').where('public_email', '==', user.email)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setCfData({ id: doc.id, data: doc.data() });
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }, [user]);


  ////////////////////////////////////
  // PROVISIONS FOR EDITING A GRANT //
  ////////////////////////////////////
  // Find out whether we are editing an existing grant or creating a new one
  const [grantStatus] = React.useState(window.location.pathname === '/foundation/create-grant' ? 'create' : 'edit');

  // If we are editing the grant rather than creating one, get its ID from URL params
  const [id, setId] = React.useState(null);
  useEffect(() => {
    if (grantStatus === 'edit') {
      setId(window.location.pathname.split('/')[3]);
    }
  }, [grantStatus]);

  // If editing grant, see if grant data is loaded
  const [loaded, setLoaded] = React.useState(false);

  // If editing grant, ensure CF owns it
  const [validEditor, setValidEditor] = React.useState();

  // If editing, load the grant data
  useEffect(() => {
    if (id !== null) {
      db.collection('grants').doc(id).get()
        .then(function (doc) {
          if (doc.data().cf_id === cfData.id) {
            setGrantData(doc.data())
            setValidEditor(true)
          } else {
            setValidEditor(false)
          }
        }).then(function () { setLoaded(true) })
        .catch(function (error) {
          console.error('Error getting grant: ', error);
        })
    }
  }, [cfData]);


  ////////////////
  // GRANT DATA //
  ////////////////
  // Grant data to upload to firebase
  const [grantData, setGrantData] = React.useState({
    cf_name: '',
    cf_id: '',
    title: '',
    nonprofit_name: '',
    nonprofit_id: '',
    address: '',
    lat: '',
    long: '',
    date_posted: '',
    date_deadline: '',
    money_raised: 0,
    goal_amt: '',
    desc: '',
    tags: [],
    status: '',
    images: [],
  });

  // Receive changes to the grant data from EditGrant.js
  const callback = (data, type) => {
    let newData = grantData;

    switch (type) {
      case 'newTags':
        setNewTags(data);
        break;
      case 'date_deadline':
        newData.date_deadline = { seconds: data, nanoseconds: 0 };
        break;
      case 'images':
        newData.images.push(data);
        break;
      case 'remove':
        let i = newData.images.indexOf(data);
        let newImg = newData.images.splice(i, 1);
        newData.images = newImg;
        break;
      default:
        if (newData.hasOwnProperty(type)) {
          newData[type] = data;
        }
    }
    setGrantData(newData);
    console.log(grantData);
  }

  //////////////////
  // TAG CREATION //
  //////////////////
  // Store the new tags we receive from the callback
  const [newTags, setNewTags] = React.useState([]);

  // Save the new tags to database
  const addNewTags = () => {
    db.runTransaction(function (transaction) {
      let docRef = db.collection('tags').doc('vXVDxq4ByQoKazDanGI1');
      return transaction.get(docRef).then(function (doc) {
        if (!doc.exists) {
          docRef.set({ tags: newTags })
            .then(function () {
              console.log('New tags uploaded');
            })
            .catch(function (error) {
              console.error('Error adding new tags: ', error);
            })
        }
        let totalTags = doc.data().tags.concat(newTags);
        transaction.update(docRef, { tags: totalTags });
      });
    }).then(function (newTags) {
      console.log("Tags updated to ", newTags);
    }).catch(function (err) {
      console.error(err);
    });
  }

  ///////////////////////////////////
  // UPDATE GRANTS IN THE DATABASE //
  ///////////////////////////////////
  // Save the grant to drafts
  const saveToDrafts = () => {
    addNewTags();

    // Copy grant data
    let newGrantData = grantData;

    // Update the grant status
    newGrantData.status = 'draft';

    // Add CF details
    newGrantData.cf_name = cfData.data.name;
    newGrantData.cf_id = cfData.id;

    // Update the grant data
    setGrantData(newGrantData);

    // Add the grant to the database
    db.collection('grants').doc().set(grantData)
      .then(function () {
        console.log('Draft saved');
      })
      .catch(function (error) {
        console.error('Error writing draft: ', error);
      })
  }

  // Update an edited grant
  const update = () => {
    addNewTags();

    // Add the grant to the database
    db.collection('grants').doc(id).set(grantData)
      .then(function () {
        console.log('Grant updated');
      })
      .catch(function (error) {
        console.error('Error writing draft: ', error);
      })
  }

  // Publish a new grant
  const publish = () => {
    addNewTags();

    // Copy grant data
    let newGrantData = grantData;

    // Update the grant status
    newGrantData.status = 'current';

    // Add CF details
    newGrantData.cf_name = cfData.data.name;
    newGrantData.cf_id = cfData.id;

    // Update the grant data
    setGrantData(newGrantData);

    // Set the date posted
    let time = Math.round(new Date().getTime() / 1000);
    newGrantData.date_posted = { seconds: time, nanoseconds: 0 };

    // Save the changes
    setGrantData(newGrantData);

    db.collection('grants').doc().set(grantData)
      .then(function () {
        console.log('Grant published');
      })
      .catch(function (error) {
        console.error('Error writing draft: ', error);
      })
  }

  return (
    <div className={classes.card}>
      <Grid container
        direction='row'
        justify='space-around'
        alignItems='flex-start'>
        <Grid item>
          {grantStatus === 'edit' && <Text type='heading' text='Edit Grant' />}
          {grantStatus === 'create' && <Text type='heading' text='Create Grant' />}
          {
            cfData &&
            ((grantStatus === 'edit' && loaded && validEditor) || grantStatus == 'create') &&
            < EditGrant grantData={grantData} cfId={cfData.id} callback={callback} />
          }
          {!validEditor && loaded && <Text type='card-heading' text='You cannot edit this grant because it does not belong to your community foundation' />}
        </Grid>
        <Grid item>
          <div className={classes.fab}>
            {grantStatus === 'edit' &&
              <Grid container
                spacing={2}
                direction='column'
                justify='flex-end'
                alignItems='flex-start'>
                <Grid item>
                  <Button
                    color='primary'
                    variant='contained'>
                    Cancel
                </Button>
                </Grid>
                <Grid item>
                  <Button
                    color='primary'
                    variant='contained'
                    onClick={update}>
                    Save
                </Button>
                </Grid>
              </Grid>
            }
            {grantStatus === 'create' &&
              <Grid container
                spacing={2}
                direction="column"
                justify="flex-end"
                alignItems="flex-start">
                <Grid item>
                  <Button
                    color='primary'
                    variant='contained'>
                    Discard
                </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={saveToDrafts}
                    color='primary'
                    variant='contained'>
                    Save to Drafts
                </Button>
                </Grid>
                <Grid item>
                  <Button
                    color='primary'
                    variant='contained'
                    onClick={publish}>
                    Publish
                </Button>
                </Grid>
              </Grid>
            }
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default withAuthProtection()(FEditGrant);