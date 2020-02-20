
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
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
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    },
    
  }));

export default function WarningModal(props) {
    const classes = useStyles();
    
    return(

        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={props.open}
            className={classes.modal}
            onClose={props.handleClose}
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500
            }}
            >
            <Fade in={props.open}>
            <div className={classes.paper}>
                <CardHeader title="WARNING" />
                <Typography id="simple-modal-description">
                Are you sure? This action can't be undone!
                </Typography>
                <Button
                variant="outlined"
                color="primary"
                type="submit"
                className={classes.button}
                onClick={props.handleYes}>
                YES
                </Button>
                <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={props.handleClose}>
                NO
                </Button>
            </div>
            </Fade>
        </Modal>
    );
}