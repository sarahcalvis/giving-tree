import React, { useEffect, withContext } from 'react';
import SmallGrantCard from '../components/SmallGrantCard.js';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from '../firebase.js';
import Search from '../components/Search';
import { makeStyles } from '@material-ui/core/styles';
import UserAuthContext from '../auth/context.js';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles(theme => ({
  container: {
    paddingBottom: theme.spacing(2),
  },
}));

export default function FDashboard(props) {
  // List of small grant cards
  const [grants, setGrants] = React.useState([]);
  const [expiredGrants, setExpiredGrants] = React.useState([]);
  const [currentGrants, setCurrentGrants] = React.useState([]);
  const [draftedGrants, setDraftedGrants] = React.useState([]);
  const [shownGrants, setShownGrants] = React.useState([]);
  const [status, setStatus] = React.useState('current');

  const handleChange = (event, newStatus) => {
    setStatus(newStatus);
    if(newStatus === 'current') {
        setShownGrants(currentGrants);
    } else if(newStatus === 'drafted') {
        setShownGrants(draftedGrants);
    } else {
        setShownGrants(expiredGrants);
    }
  };

  const children = [
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
  // Foundation ID
  const [id] = React.useState(props.id);
  //const user = withContext(UserAuthContext);
  // Initialize database and specific grant in database
  const db = firebase.firestore();
  const [docs, setDocs] = React.useState([]);
  const [snapshot, loading, error] = useCollection(db.collection('grants'));

  useEffect(() => {
    var newGrants = [];
    var newDocs = [];
    var curGrants = [];
    var exGrants = [];
    var drGrants = [];
    if (!loading && !error) {
      snapshot.forEach(function (doc) {
        //console.log("cf_id, id: ", doc.data().cf_id, user.id);
        /////////////////////////////////////////////////////
        // JUST A TEST //////////////////////////////////////
        // NEED TO EVENTUALLY CHANGE THE COMPARISON!!!!!/////
        /////////////////////////////////////////////////////
        if(doc.data().cf_id === 'p80ZpdUu9hx6nVoYO6Do') {
            newDocs.push({
            dist: -1,
            id: doc.id,
            title: doc.data().title,
            cfName: doc.data().cf_name,
            nonprofitName: doc.data().nonprofit_name,
            goalAmt: doc.data().goal_amt,
            moneyRaised: doc.data().money_raised,
            img: doc.data().images[0] || 'GivingTree.png',
            nonprofitId: doc.data().nonprofit_id,
            address: doc.data().address,
            lat: doc.data().lat,
            long: doc.data().long,
            datePosted: doc.data().date_posted,
            dateDeadline: doc.data().date_deadline,
            desc: doc.data().desc,
            tags: doc.data().tags,
            status: doc.data().status,
            });
            let grant = <SmallGrantCard
                        id={doc.id}
                        title={doc.data().title}
                        cfName={doc.data().cf_name}
                        nonprofitName={doc.data().nonprofit_name}
                        goalAmt={doc.data().goal_amt}
                        moneyRaised={doc.data().money_raised}
                        img={doc.data().images[0] || 'GivingTree.png'} />;
            if(doc.data().status === 'current') {
                curGrants.push(grant);
            } else if (doc.data().status === 'drafted') {
                drGrants.push(grant);
            } else if (doc.data().status === 'expired') {
                exGrants.push(grant);
            }
            newGrants.push(grant);
        }
      });
      setGrants(newGrants);
      setCurrentGrants(curGrants);
      setDraftedGrants(drGrants);
      setExpiredGrants(exGrants);
      setShownGrants(curGrants);
      console.log("newDocs: ", newDocs);
      setDocs(newDocs);
    }
  }, [snapshot, error, loading]);

  useEffect(() => {
    var newGrants = [];
    var curGrants = [];
    var exGrants = [];
    var drGrants = [];

    docs.forEach((doc)=> {
        let grant = <SmallGrantCard
            id={doc.id}
            title={doc.data().title}
            cfName={doc.data().cf_name}
            nonprofitName={doc.data().nonprofit_name}
            goalAmt={doc.data().goal_amt}
            moneyRaised={doc.data().money_raised}
            img={doc.data().images[0] || 'GivingTree.png'} />;
        if(doc.data().status === 'current') {
            curGrants.push(grant);
        } else if (doc.data().status === 'drafted') {
            drGrants.push(grant);
        } else if (doc.data().status === 'expired') {
            exGrants.push(grant);
        }
    });
      setCurrentGrants(curGrants);
      setDraftedGrants(drGrants);
      setExpiredGrants(exGrants);
  }, [docs, grants]);

  function searchCallback(childData) {
    console.log("childData in dashboard: ", childData);
    var newGrants = [];
    childData.forEach((meta) => {
      newGrants.push(
        <SmallGrantCard
          id={meta.grant.id}
          title={meta.grant.title}
          cfName={meta.grant.cfName}
          nonprofitName={meta.grant.nonprofitName}
          goalAmt={meta.grant.goalAmt}
          moneyRaised={meta.grant.moneyRaised}
          img={meta.grant.img} />
      );
    });
    setGrants(newGrants);
    console.log("newGrants: ", newGrants);
  }

  const classes = useStyles();

  return (
    <Container maxWidth='md' className={classes.container}>
      {docs &&
        <div>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
                <ToggleButtonGroup size="small" value={status} exclusive onChange={handleChange}>
                {children}
                </ToggleButtonGroup>
            </Grid>
          </Grid>
          <Search docs={docs} parentCallback={searchCallback} />
          <Grid container spacing={2} >
            {shownGrants}
          </Grid>
        </div>
      }
    </Container>
  );
}
