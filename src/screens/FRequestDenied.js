import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import { AuthUserContext } from '../auth';

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

  const authUser = useContext(AuthUserContext);

  useEffect(() => {
    if (authUser?.status === 'current') {
      this.props.history.push('/foundation');
    }
  }, [authUser]);

  return (
    <Container maxWidth="sm" component="main" className={classes.message}>
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        Foundation Account Denied
        </Typography>
      <Typography variant="h5" align="center" color="textSecondary" component="p">
        We have reviewed your request for a foundation account and decided that your foundation does not meet our website's criteria. Please contact us if you have any questions.
        </Typography>
    </Container>
  );
}

export default withRouter(FRequestDenied);
