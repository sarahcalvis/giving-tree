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

export default function EditGrant(props) {
  // Styles
  const classes = useStyles();
  return (
      <div className={classes.padding}>
        <Text type='card-heading' text='Grant Description' />
        <TextField
          id='desc'
          multiline
          fullWidth
          error={props.error}
          helperText={props.helperText}
          defaultValue={props.defaultValue}
          label='Add a description to help donors understand why this grant is important.'
          onChange={props.onChange} />
      </div>
  );
}