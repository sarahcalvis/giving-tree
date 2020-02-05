import React from 'react';
import EditGrant from '../components/EditGrant.js';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  card: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

export default function FEditGrant() {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <EditGrant />
    </div>
  );
}