import React, { useEffect, useContext } from 'react';
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
  toggleBar: {
    marginBottom: 4,
  }
}));

export default function FDashboard(props) {

  const classes = useStyles();

  // List of small grant cards
  const [grants, setGrants] = React.useState([]);
  const [docs, setDocs] = React.useState();
  const [expiredGrants, setExpiredGrants] = React.useState([]);
  const [currentGrants, setCurrentGrants] = React.useState([]);
  const [draftedGrants, setDraftedGrants] = React.useState([]);
  const [toggleBarStatus, setToggleBarStatus] = React.useState('current');

  // Foundation ID
  const user = useContext(UserAuthContext);

  // Initialize database and specific grant in database
  const db = firebase.firestore();
  const [snapshot, loading, error] = useCollection(db.collection('grants'));

  useEffect(() => {
    let newDocs = [];
    let curGrants = [];
    let exGrants = [];
    let drGrants = [];
    if (!loading && !error) {
      snapshot.forEach(function (doc) {
        if (doc.data().cf_id === user?.cfId) {
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
            status: doc.data().status
          });

          let grant = <SmallGrantCard
            id={doc.id}
            title={doc.data().title}
            cfName={doc.data().cf_name}
            nonprofitName={doc.data().nonprofit_name}
            goalAmt={doc.data().goal_amt}
            moneyRaised={doc.data().money_raised}
            img={doc.data().images[0] || 'GivingTree.png'}
            status={doc.data().status} />;
          if (doc.data().status === 'current') {
            curGrants.push(grant);
          } else if (doc.data().status === 'draft') {
            drGrants.push(grant);
          } else if (doc.data().status === 'expired') {
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

  function searchCallback(childData) {
    // console.log("childData in dashboard: ", childData);
    var curGrants = [];
    var exGrants = [];
    var drGrants = [];
    childData.forEach((meta) => {
      let grant = <SmallGrantCard
        id={meta.grant.id}
        title={meta.grant.title}
        cfName={meta.grant.cfName}
        nonprofitName={meta.grant.nonprofitName}
        goalAmt={meta.grant.goalAmt}
        moneyRaised={meta.grant.moneyRaised}
        img={meta.grant.img} />
      if (meta.grant.status === 'current') {
        curGrants.push(grant);
      } else if (meta.grant.status === 'draft') {
        drGrants.push(grant);
      } else if (meta.grant.status === 'expired') {
        exGrants.push(grant);
      }
    });
    console.log("CURRENT GRANTS: " + curGrants);

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
            <Grid item className={classes.toggleBar}>
              <ToggleButtonGroup size="small" value={toggleBarStatus} exclusive onChange={handleToggle}>
                {buttonOptions}
              </ToggleButtonGroup>
            </Grid>
          </Grid>
          <Search docs={docs} parentCallback={searchCallback} />
          <Grid container spacing={2} >
            {toggleBarStatus === 'current' ? currentGrants : toggleBarStatus === 'drafted' ? draftedGrants : expiredGrants}
          </Grid>
        </div>
      }
    </Container>
  );
}
