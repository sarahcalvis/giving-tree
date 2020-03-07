import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

function Copyright() {
  return (
   <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Giving Tree
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  footerRoot: {
    align: 'center',
    minHeight: '10vh',
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    align: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.grey[300],
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.footerRoot}>
        <Container className={classes.footer}>
            <Copyright />
        </Container>
    </div>
  );
}