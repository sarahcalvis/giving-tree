import React, { useEffect } from 'react';
import LargeGrantCard from '../components/LargeGrantCard.js';
import firebase from '../firebase.js';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  card: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}))

export default function DGrant(props) {
  const classes = useStyles();

  // Find out if we are a foundation or a donor
  const [user] = React.useState(window.location.pathname.split('/')[1] === 'grants' ? 'donor' : 'foundation');

  // Get grant ID from URL params
  let id = useParams().grantId;

  // Initialize database
  const db = firebase.firestore();

  // Initialize storage
  const storage = firebase.storage();
  const storageRef = storage.ref();

  // Data we load
  const [grantData, setGrantData] = React.useState();
  const [cfData, setCfData] = React.useState();
  const [nonprofitData, setNonprofitData] = React.useState();
  const [img, setImg] = React.useState();

  // Tell if we are ready to load a LargeGrantCard
  const [dataLoaded, setDataLoaded] = React.useState(false);
  useEffect(() => {
    setDataLoaded(grantData && cfData && nonprofitData && img);
  }, [grantData, cfData, nonprofitData, img])

  // Format dates from Firebase Timestamps
  const formatDate = (time) => {
    let dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(time * 1000).toLocaleDateString("en-US", dateOptions);
  }

  // Delete a grant if the foundation clicks the button
  const deleteGrant = (event) => {
    db.collection('grants').doc(id).update({
      status: 'deleted'
    }).then(function() {
      console.log('Grant deleted');
    });    
  }

  // Make a grant a draft if the foundation clicks the button
  const draftifyGrant = (event) => {
    db.collection('grants').doc(id).update({
      status: 'drafted'
    }).then(function() {
      console.log('Grant moved to drafts');
    });   
  }

  // Load image URLs from image names
  const getUrls = (imgNames) => {
    let newImg = [];
    for (let imgName of imgNames) {
      storageRef.child(imgName).getDownloadURL().then(function (url) {
        newImg.push(url);
      }).catch(function (error) {
        console.log('error getting image url: ', error)
      })
    }
    return newImg;
  }

  // Query from grant collection
  useEffect(() => {
    if (id) {
      db.collection('grants').doc(id).get()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document for grant ' + id);
          } else {
            setGrantData(doc.data());
          }
        })
        .catch(err => {
          console.log('Error getting grant', err);
        });
    }
  }, []);

  // Query from CF collection
  useEffect(() => {
    if (grantData) {
      db.collection('communityFoundations').doc(grantData.cf_id).get()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document for CF ' + grantData.cf_id);
          } else {
            setCfData(doc.data());
          }
        })
        .catch(err => {
          console.log('Error getting CF', err);
        });
    }
  }, [grantData]);

  // Query from nonprofit collection
  useEffect(() => {
    if (grantData) {
      db.collection('nonprofits').doc(grantData.nonprofit_id).get()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document for nonprofit ' + grantData.nonprofit_id);
          } else {
            setNonprofitData(doc.data());
          }
        })
        .catch(err => {
          console.log('Error getting document', err);
        });
    }
  }, [grantData])

  // Query image urls
  useEffect(() => {
    if (grantData) {
      let imag = getUrls(grantData.images);
      console.log(imag);
      setImg(imag);
    }
  }, [grantData])

  return (
    <div className={classes.card}>
      <Grid container direction='row' justify='center' alignItems='flex-end'>
        {dataLoaded &&
          <Grid item>
            <LargeGrantCard
              user={user}
              id={id}
              title={grantData.title}
              desc={grantData.desc}
              goalAmt={grantData.goal_amt}
              moneyRaised={grantData.money_raised}
              tags={grantData.tags}
              datePosted={formatDate(grantData.date_posted.seconds)}
              dateDeadline={formatDate(grantData.date_deadline.seconds)}
              img={img}
              cfData={cfData}
              nonprofitData={nonprofitData}
            />
          </Grid>
        }
        {user === 'foundation' &&
          <Grid item>
            <Grid container
              spacing={2}
              direction="column"
              justify="flex-end"
              alignItems="flex-start">
              <Grid item>
                <Button 
                  color='primary' 
                  variant='contained'
                  onClick={deleteGrant}>
                  Delete
                </Button>
              </Grid>
              <Grid item>
                <Link to={'/foundation/' + id + '/edit'}>
                  <Button
                    color='primary'
                    variant='contained'>
                    Edit
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Button 
                  color='primary' 
                  variant='contained'
                  onClick={draftifyGrant}>
                  Unpublish and save to drafts
                </Button>
              </Grid>
            </Grid>
          </Grid>
        }
      </Grid>
    </div>
  );
}