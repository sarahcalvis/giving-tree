import React from 'react';

import firebase from "../firebase.js";
import WarningModal from './WarningModal.js';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
  card: {
    paddingLeft: '4em',
    paddingRight: '4em',
    marginLeft: '2em',
    marginRight: '2em',
    marginTop: '2em',
    maxWidth: '90%',
  },
  media: {
    height: '70px',
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  button: {
    paddingLeft: '4em',
    paddingRight: '4em',
    marginRight: '1em',
  },
  root: {
    flexGrow: 1,
  },
  dates: {
    textAlign: 'right',
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
  },
  cardActions: {
    display: "flex",
    alignItems: "end",
    justifyContent: "end",
    border: "none",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  tBox: {
    "& > *": {
      margin: theme.spacing(1),
      width: 275
    }
  }
}));

export default function Foundation(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  var name = props.name;
  var time = props.time;
  var dj = props.dj;
  var email = props.email;
  var phone = props.phone;
  var date = props.date;
  var status = props.status;

  function deleteDJ() {
    var db = firebase.firestore();
    console.log("foundation name is: ", props.name);
    db.collection("foundations").doc(props.name).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  };

  function approveDJ() {
    var db = firebase.firestore();
    
    db.collection("foundations").doc(props.name).update({
        status: 'current'
    })
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleYes = () => {
    deleteDJ();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApprove = () => {
    approveDJ();
  };

  return (
    <div style = {{display: (props.status === "requested" ? "inline" : "none")}}>
    <Card className={classes.card}>
      <CardHeader title={name} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          DJ: {dj}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Requested Timeslot: {time}
        </Typography>
        
        <Typography variant="body2" color="textSecondary" component="p">
          Email: {email}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" id="requestedTimeslot">
          Phone Number: {phone}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button variant="outlined" color="secondary" onClick={handleApprove} className={classes.button}>
          Approve
        </Button>
        <Button variant="outlined" color="primary" onClick={handleOpen} className={classes.button}>
          Deny
        </Button>
      </CardActions>
      <CardContent className={classes.cardContent}>
        <WarningModal
            open={open}
            handleClose={handleClose}
            handleYes={handleYes}
        ></WarningModal>
          
      </CardContent>
    </Card>
    </div>
  );
}
