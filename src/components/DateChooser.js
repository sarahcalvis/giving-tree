import React, { useEffect } from 'react';

import Text from './Text.js';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles(theme => ({
  padding: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}))

export default function DateChooser(props) {
  // Styles
  const classes = useStyles();

  // Hold the date selected by the date picker
  const [selectedDate, handleDateChange] = React.useState(
    (props.date_deadline !== '') ? new Date(props.date_deadline?.seconds * 1000) : null
  );

  // Handle change to the date picker
  useEffect(() => {
    if (selectedDate) {
      props.callback(Math.round(selectedDate.getTime() / 1000), 'date_deadline')
    }
  }, [selectedDate]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid item xs={12} sm={6}>
        <div className={classes.padding}>
          <Text type='card-heading' text='Grant Deadline' />
          <DatePicker
            label='Pick a date'
            value={selectedDate}
            fullWidth
            error={props.error}
            helperText={props.helperText}
            onChange={handleDateChange}
          />
        </div>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}