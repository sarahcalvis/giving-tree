import React from 'react';

import WarningModal from './WarningModal.js';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import { IconButton, MenuItem, Menu } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 850,
    margin: '10px',
  },
  cardHeader: {
    paddingBottom: '0px',
  },
  sub1: {
    fontWeight: 'bold',
  },
  sub2: {
    fontWeight: 'normal',
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

export default function FoundationCard(props) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  //Open warning modal
  const handleOpen = () => {
    setModalOpen(true);
  };

  //Yes on warning modal
  const handleYes = () => {
    setModalOpen(false);
  };

  //No on warning modal
  const handleClose = () => {
    setModalOpen(false);
  };

  //Approve button
  const handleApprove = () => {
    console.log("handling approve");
  };

  const CurCfMenu = () => (
    <React.Fragment>
      <MenuItem onClick={() => { setAnchorEl(null); }}>Approve</MenuItem>
      <MenuItem onClick={() => { setAnchorEl(null); }}>Reject</MenuItem>
    </React.Fragment>
  );

  const ReqCfMenu = () => (
    <React.Fragment>
      <MenuItem onClick={() => { setAnchorEl(null); }}>Approve</MenuItem>
      <MenuItem onClick={() => { setAnchorEl(null); }}>Reject</MenuItem>
    </React.Fragment>
  );

  const DenCfMenu = () => (
    <React.Fragment>
      <MenuItem onClick={() => { setAnchorEl(null); }}>Approve</MenuItem>
      <MenuItem onClick={() => { setAnchorEl(null); }}>Reject</MenuItem>
    </React.Fragment>
  );

  const {
    name,
    public_email,
    public_phone,
    personal_email,
    personal_phone,
    foundation_url,
    fname_contact,
    lname_contact,
    status,
    date_requested,
    date_approved,
    date_denied,
    date_deactivated,
  } = props.data;

  const setSubheader = () => {
    let str = 'Requested on ' + date_requested;

    if (!!date_approved) {
      str += ', Approved on ' + date_approved;
    }
    if (!!date_denied) {
      str += ', Denied on ' + date_denied;
    }
    if (!!date_deactivated) {
      str += ', Deactivated on ' + date_deactivated;
    }

    return str;
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        action={
          <IconButton aria-label="cf_approval_settings"
            aria-controls="menu-header"
            aria-haspopup="true"
            onClick={(event) => { setAnchorEl(event.currentTarget) }}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={setSubheader()}
      />
      <CardContent>
        <Grid container spacing={2} xs={12}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" className={classes.sub1}> Foundation Info</Typography>
            <Typography variant="subtitle2" className={classes.sub2} noWrap>{foundation_url}</Typography>
            <Typography variant="subtitle2" className={classes.sub2} noWrap>{public_email}</Typography>
            <Typography variant="subtitle2" className={classes.sub2}>{public_phone}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" className={classes.sub1}>Personal Info</Typography>
            <Typography variant="subtitle2" className={classes.sub2} noWrap>{fname_contact + ' ' + lname_contact}</Typography>
            <Typography variant="subtitle2" className={classes.sub2} noWrap>{personal_email}</Typography>
            <Typography variant="subtitle2" className={classes.sub2}>{personal_phone}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Menu
        id="menu-header"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={()=>{setAnchorEl(null);}}
      >
        {status === 'requested' ? <ReqCfMenu/> : status === 'current' ? <CurCfMenu/> : <DenCfMenu/>}
      </Menu>

      <div>
        {false &&
          <CardActions>
            <Button variant="outlined" color="secondary" onClick={handleApprove} className={classes.button}>
              Approve
        </Button>
            <Button variant="outlined" color="primary" onClick={handleOpen} className={classes.button}>
              Deny
        </Button>
          </CardActions>}
      </div>

      <div>
        {false &&
          <WarningModal
            open={modalOpen}
            handleClose={handleClose}
            handleYes={handleYes}
            cfName={props.cfName}
          ></WarningModal>}
      </div>
    </Card>
  );
}



