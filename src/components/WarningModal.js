
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


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
    const [cfInput, setCfInput] = React.useState(null);
    const [isValid, setIsValid] = React.useState("false");
    const handleInput = (e) => {
      console.log("input data: ", e.target.value);
      setCfInput(e.target.value);      
    }

    useEffect(() => {
      console.log("in use effect with cfInput === props.cfName: ", (cfInput === props.cfName));
      console.log("in use effect with cfInput", cfInput);
      console.log("in use effect with props.cfName: ", props.cfName);
      setIsValid(cfInput === props.cfName);
      /*
      if(cfInput === props.cfName) {
        setIsValid("true");
      }
      else {
        setIsValid("false");
      }
*/
    }, [cfInput, props.cfName]);

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
                Are you sure? This action can't be undone! Type "{props.cfName}" to confirm. 
                </Typography>
                <TextField 
                  id='cf-name-field'
                  fullWidth 
                  label='Community Foundation Name'
                  onChange={handleInput} />
                <Button
                variant="outlined"
                color="primary"
                type="submit"
                disabled={!isValid}
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