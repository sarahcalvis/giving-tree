import React from 'react';

import Text from './Text.js';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  padding: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}))

export default function GrantTitle(props) {
  // Styles
  const classes = useStyles();
  return (
    <div className={classes.padding}>
      <Text type='card-heading' text='Grant Title' />
      <TextField
        id='title'
        defaultValue={props.defaultValue}
        fullWidth
        error={props.error}
        helperText={props.helperText}
        label='Grant Title'
        onChange={props.callback} />
    </div>
  );
}