import React from 'react';

import WarningModal from './WarningModal.js';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  card: {
    paddingLeft: '4em',
    paddingRight: '4em',
    marginLeft: '2em',
    marginRight: '2em',
    marginTop: '2em',
    maxWidth: '90%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  button: {
    paddingLeft: '4em',
    paddingRight: '4em',
    marginRight: '1em',
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
}));

export default function Foundation(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [open, setOpen] = React.useState(false);


  const handleOpen = () => {
    console.log("handling the open");
    setOpen(true);
  };

  const handleYes = () => {
    console.log("handling the yes");
    setOpen(false);
  };

  const handleClose = () => {
    console.log("handling the close");
    setOpen(false);
  };

  const handleApprove = () => {
    console.log("handling approve");
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent className={classes.cardContent}>
            <div>
              <Typography gutterBottom variant="h5" component="h2">
                Woot Woot
            </Typography>
              <Typography variant="h5" component="h2">
                be{bull}nev{bull}o{bull}lent
            </Typography>
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions>
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
            cfName={props.cfName}
          ></WarningModal>

        </CardContent>
      </Card>
    </div>
  );
}
