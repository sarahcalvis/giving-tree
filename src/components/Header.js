import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles(theme => ({
  header: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: '#45a329',
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <div>
      <header className={classes.header}>
        <Container maxWidth="sm">
          <Typography variant="body1">Header stub</Typography>
        </Container>
      </header>
    </div>
  );
}