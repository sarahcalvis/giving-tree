import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
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
    display: 'flex',
    flexDirection: 'column',
    minHeight: '10vh',
    paddingTop: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: theme.palette.grey[300],
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.footerRoot}>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">Footer stub</Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}