import React, { useEffect, useContext } from 'react';
import { Link as NavigationLink } from 'react-router-dom';

import { withAuthProtection } from '../auth';
import firebase from '../firebase.js';
import UserAuthContext from '../auth/context.js';
import Search from '../components/Search';
import Snack from '../components/Snack.js';
import SmallGrantCard from '../components/SmallGrantCard.js';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { useCollection } from 'react-firebase-hooks/firestore';

const useStyles = makeStyles(theme => ({
  container: {
    paddingBottom: theme.spacing(2),
  },
  toggleBar: {
    marginBottom: 4,
  },
  largeIcon: {
    fontSize: '6em',
  },
  link: {
    textDecoration: 'none',
  },
  title: {
    fontFamily: 'Fredericka the Great',
    marginTop: '16px',
    marginBottom: '13px',
  },
}));

function FDashboard(props) {

  const classes = useStyles();

  // Set tab title
  useEffect(() => { document.title = 'Giving Tree Grants'; }, [props.title]);

  // List of small grant cards
  const [docs, setDocs] = React.useState();
  const [expiredGrants, setExpiredGrants] = React.useState([]);
  const [currentGrants, setCurrentGrants] = React.useState([]);
  const [draftedGrants, setDraftedGrants] = React.useState([]);
  const [toggleBarStatus, setToggleBarStatus] = React.useState('current');

  // Foundation ID
  const user = useContext(UserAuthContext);
  const [cfName, setCfName] = React.useState('');

  // Initialize database and specific grant in database
  const db = firebase.firestore();
  const [snapshot, loading, error] = useCollection(db.collection('grants'));


  /////////////////////////////////////////////////////
  // MAKE SURE THE FOUNDATION IS CONNECTED TO STRIPE //
  /////////////////////////////////////////////////////
  const [stripeId, setStripeId] = React.useState('');
  const [stripeUpdateCompleted, setStripeUpdateCompleted] = React.useState(false);
  // If the user is entering this page redirected from the account creation page,
  // then the url will have two parameters:
  // scope- I don't think we really care about scope. hopefully it is read/write
  const qs = require('query-string');
  const parsed = qs?.parse(props.location.search);
  const code = parsed?.code;
  const stripeError = parsed?.stripeError;

  // Observe the foundation code
  useEffect(() => {
    if (code && user?.cfId) {
      submit();
    }
  }, [user]);

  // If there is a code, submit it to Stripe
  const submit = async () => {
    if (code) {
      let response = await fetch('/create', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: code,
      });
      if (response.ok) {
        let resJSON = await response.json();
        setStripeId(resJSON?.stripeId);
        updateStripeIdDB(resJSON?.stripeId);
        //send the id to the database
      } else {
        console.log('Error submitting.');
        setStripeUpdateCompleted(true);
        //it went wrong and idk what to do in this case
      }
    }
  }

  // Update Stripe ID In database
  const updateStripeIdDB = (stripeId) => {
    db.doc('communityFoundations/' + user?.cfId).update({ 'stripe_id': stripeId })
    setStripeUpdateCompleted(true);
  }

  useEffect(() => {
    let newDocs = [];
    let curGrants = [];
    let exGrants = [];
    let drGrants = [];
    if (!loading && !error) {
      snapshot.forEach(function (doc) {

        const fbData = doc.data();
        if (fbData.cf_id === user?.cfId) {
          if (cfName === '') setCfName(fbData.cf_name);
          newDocs.push({
            id: doc.id,
            title: fbData.title,
            cfName: fbData.cf_name,
            nonprofitName: fbData.nonprofit_name,
            goalAmt: fbData.goal_amt,
            moneyRaised: fbData.money_raised,
            img: fbData.images[0] || 'GivingTree.png',
            nonprofitId: fbData.nonprofit_id,
            address: fbData.address,
            lat: fbData.lat,
            long: fbData.long,
            datePosted: fbData.date_posted,
            dateDeadline: fbData.date_deadline,
            desc: fbData.desc,
            tags: fbData.tags,
            status: fbData.status
          });

          let grant = <SmallGrantCard
            id={doc.id}
            title={fbData.title}
            cfName={fbData.cf_name}
            nonprofitName={fbData.nonprofit_name}
            goalAmt={fbData.goal_amt}
            moneyRaised={fbData.money_raised}
            img={fbData.images[0] || 'GivingTree.png'}
            status={fbData.status} />;
          if (fbData.status === 'current') {
            curGrants.push(grant);
          } else if (fbData.status === 'draft') {
            drGrants.push(grant);
          } else if (fbData.status === 'expired') {
            exGrants.push(grant);
          }
        }
      });
      setDocs(newDocs);
      setCurrentGrants(curGrants);
      setDraftedGrants(drGrants);
      setExpiredGrants(exGrants);
    }
  }, [snapshot, error, loading]);

  function searchCallback(results) {
    var curGrants = [];
    var exGrants = [];
    var drGrants = [];
    results.forEach((searchDoc) => {

      let grant = <SmallGrantCard
          id={searchDoc.data.id}
          title={searchDoc.data.title}
          cfName={searchDoc.data.cfName}
          nonprofitName={searchDoc.data.nonprofitName}
          goalAmt={searchDoc.data.goalAmt}
          moneyRaised={searchDoc.data.moneyRaised}
          img={searchDoc.data.img} />
      if (searchDoc.data.status === 'current') {
        curGrants.push(grant);
      } else if (searchDoc.data.status === 'draft') {
        drGrants.push(grant);
      } else if (searchDoc.data.status === 'expired') {
        exGrants.push(grant);
      }
    });

    setCurrentGrants(curGrants);
    setDraftedGrants(drGrants);
    setExpiredGrants(exGrants);
  }

  const handleToggle = (event, status) => {
    setToggleBarStatus(status);
  };

  const buttonOptions = [
    <ToggleButton key={1} value="current">
      Current
    </ToggleButton>,
    <ToggleButton key={2} value="drafted">
      Drafted
    </ToggleButton>,
    <ToggleButton key={3} value="expired">
      Expired
    </ToggleButton>
  ];

  return (
    <Container maxWidth='md' className={classes.container}>
      {docs &&
        <div>
          <Grid container spacing={2} direction="column" alignItems="center">
          <Typography  variant={'h5'} className={classes.title}>{cfName}</Typography>
            <Grid item className={classes.toggleBar}>
              <ToggleButtonGroup id="toggle" size="small" value={toggleBarStatus} exclusive onChange={handleToggle}>
                {buttonOptions}
              </ToggleButtonGroup>
            </Grid>
          </Grid>
          <Search docs={docs} parentCallback={searchCallback} />
          <Grid container spacing={2} alignItems='center' >
            {toggleBarStatus === 'current' &&
              <Grid item xs={12} sm={6} md={4}>
                <div align='center'>
                  <IconButton component='span'>
                    <NavigationLink
                      className={classes.link}
                      to={'/foundation/create-grant'}>
                      <AddIcon
                        color='primary'
                        className={classes.largeIcon} />
                    </NavigationLink>
                  </IconButton>
                </div>
              </Grid>
            }
            {toggleBarStatus === 'current' ? currentGrants : toggleBarStatus === 'drafted' ? draftedGrants : expiredGrants}
          </Grid>
        </div>
      }
      <div>
        <Container>
          <React.Fragment>
            {code && stripeId !== '' && stripeUpdateCompleted &&
              <Snack message='Connected to Stripe' />
            }
            {code && stripeId === '' && stripeUpdateCompleted &&
              <Snack message='Sorry- our server failed! Try again later' />
            }
            {stripeError &&
              <div>
                <Snack message='You gotta connect to stripe for this to work my dude 🤡' />
                <Link
                  textDecoration='none'
                  color='inherit'
                  //target='_blank'
                  //rel='noopener noreferrer'
                  href='https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_GblAQuuPHkvIstLgnPzWLGLhh4hMRV3h&scope=read_write'>
                  <Button
                    fullWidth
                    color='primary'
                    variant='contained'>
                    Connect to Stripe
                </Button>
                </Link>
              </div>
            }
          </React.Fragment>
        </Container>
      </div >
    </Container >
  );
}
export default withAuthProtection()(FDashboard);
