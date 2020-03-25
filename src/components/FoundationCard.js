import React from 'react';

import WarningModal from './WarningModal.js';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { IconButton, MenuItem, Menu } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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

  //Anchor element for popover menu
  const [anchorEl, setAnchorEl] = React.useState(null);

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

  //Yes on warning modal
  const handleYes = () => {
    setModalOpen(false);
    props.deleteCB(personal_email);
  };

  //No on warning modal
  const handleClose = () => {
    setModalOpen(false);
  };

  //Current CF Menu
  const CurCfMenu = () => (
    <React.Fragment>
      <MenuItem onClick={() => { setAnchorEl(null); props.denyCB(personal_email); }}>Deny</MenuItem>
    </React.Fragment>
  );

  //Requested CF Menu
  const ReqCfMenu = () => (
    <React.Fragment>
      <MenuItem onClick={() => { setAnchorEl(null); props.approveCB(personal_email); }}>Approve</MenuItem>
      <MenuItem onClick={() => { setAnchorEl(null); props.denyCB(personal_email); }}>Deny</MenuItem>
      <MenuItem onClick={() => { setAnchorEl(null); setModalOpen(true); }}>Delete</MenuItem>
    </React.Fragment>
  );

  //Denied CF Menu
  const DenCfMenu = () => (
    <React.Fragment>
      <MenuItem onClick={() => { setAnchorEl(null); props.approveCB(personal_email); }}>Approve</MenuItem>
      <MenuItem onClick={() => { setAnchorEl(null); setModalOpen(true); }}>Delete</MenuItem>
    </React.Fragment>
  );

  const setSubheader = () => {
    const f = (timestamp) => { return timestamp.toDate().toLocaleDateString("en-US") };

    let str = 'Requested ' + f(date_requested);
    if (!!date_approved) {
      str += ', Approved ' + f(date_approved);
    }
    if (!!date_denied) {
      str += ', Denied ' + f(date_denied);
    }
    if (!!date_deactivated) {
      str += ', Deactivated ' + f(date_deactivated);
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
        onClose={() => { setAnchorEl(null); }}
      >
        {status === 'requested' ? <ReqCfMenu /> : status === 'current' ? <CurCfMenu /> : <DenCfMenu />}
      </Menu>
      <WarningModal
        open={modalOpen}
        handleClose={handleClose}
        handleYes={handleYes}
        cfName={name}
      ></WarningModal>
    </Card>
  );
}



