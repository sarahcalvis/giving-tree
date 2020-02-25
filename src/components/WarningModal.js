
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    buttonsWrapper: {
      paddingTop: '2em',
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
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    },
    
  }));

export default function WarningModal(props) {
    const classes = useStyles();
    const [cfInput, setCfInput] = React.useState(null);
    const [isValid, setIsValid] = React.useState("true");
    const handleInput = (e) => {
      setCfInput(e.target.value);      
    }

    useEffect(() => {
      setIsValid(!(cfInput === props.cfName));
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
                <CardHeader 
                  titleTypographyProps={{variant:'h2', fontWeight:'bold' }}
                  title="WARNING" />
                <CardContent>
                  <div>
                    <Typography variant="body1" gutterBottom>
                      Are you sure? This action can't be undone! 
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Type "{props.cfName}" to confirm. 
                    </Typography>
                    <TextField 
                      id='cf-name-field'
                      fullWidth 
                      label='Community Foundation Name'
                      onChange={handleInput} />   
                    <div className={classes.buttonsWrapper}>
                        <Button
                        variant="outlined"
                        color="primary"
                        type="submit"
                        disabled={isValid}
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
                  </div>
                </CardContent>
            </div>
            </Fade>
        </Modal>
    );
}