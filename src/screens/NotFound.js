import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  message: {
    padding: theme.spacing(8, 0, 6),
  },
}));

function FRequestDenied() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" component="main" className={classes.message}>
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        4040404 Not Found
        </Typography>
    </Container>
  );
}

export default (FRequestDenied);
