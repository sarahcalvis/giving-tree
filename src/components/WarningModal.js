
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Backdrop from "@material-ui/core/Backdrop";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { WarningRounded } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    buttonsWrapper: {
      paddingTop: '2em',
    },
    button: {
      paddingLeft: '4em',
      paddingRight: '4em',
      marginRight: '1em',
    },
    header: {
      backgroundColor: theme.palette.warning,
      justifyContent:'center',
      display: 'flex',
      verticalAlign: 'center',
      direction: 'row',
      justify: 'space-between',
      alignItems: 'flex',
      spacing: '{1}',
    },
    item: {
      verticalAlign: 'center',
    },
    modal: {
      maxWidth: 'xs',
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
        <Dialog
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={props.open}
            className={classes.modal}
            onClose={props.handleClose}
            >
            <Grid container>
              <Grid item>
                <DialogTitle >
                  <Grid container className={classes.header} direction="row" justify='space-between' alignItems='flex' spacing={1}>
                    <Grid item className={classes.item}>
                      {<WarningRounded className={classes.icon}/>} 
                    </Grid>
                    <Grid item className={classes.item}>
                        Delete this Community Foundation? 
                    </Grid>
                  </Grid>
                </DialogTitle>   
              </Grid>
              <Grid item>
                
              </Grid>
              <Grid item>
                <DialogContent>
                  <DialogContentText>
                    Doing so will permanently delete its data, including all its giving opportunities. 
                  </DialogContentText>
                  <DialogContentText>
                    Confirm you want to delete this community foundation by typing: {props.cfName} 
                  </DialogContentText>
                  <TextField 
                    id='cf-name-field'
                    fullWidth 
                    label='Community Foundation Name'
                    onChange={handleInput} />
                </DialogContent>  
                <DialogActions>
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
                </DialogActions>
              </Grid>
            </Grid>
        </Dialog>
    );
}