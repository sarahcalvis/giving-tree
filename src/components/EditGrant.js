import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Text from './Text.js';
import ProgressBar from './ProgressBar.js';
import ContactPopout from './ContactPopout.js';
import ImageCarousel from './ImageCarousel.js'
import Tag from './Tag.js';
import Validation from './Validation.js';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 500,
  },
  topCard: {
    marginBottom: theme.spacing(2),
  },
  cardContent: {
    flexGrow: 1,
  },
}))

export default function EditGrant(props) {
  const classes = useStyles();
  const [imgKey, setImgKey] = React.useState(0);

  // Set tab title
  useEffect(() => { document.title = 'Create Grant-Giving Tree'; }, [props.title]);

  useEffect(() => {
    //Force image carousel to rerender after 500ms
    //TODO: Find better way to fix
    setTimeout(function () { setImgKey(1); }, 500)
  }, []);

  return (
    <Container className={classes.card}>
      <Card className={classes.topCard}>
        <CardContent>
          <Validation fullWidth label='Address' type='address'/>
        </CardContent>
      </Card>
      <Card>
        {/* <ImageCarousel key={imgKey} img={props.img} /> */}
        <CardContent className={classes.cardContent}>
          <TextField fullWidth label='Grant Title' />
          <TextField fullWidth label='Nonprofit Name' />
          <Grid container direction='row' justify='space-between' alignItems='flex-end' spacing={0}>
            <Grid item>
              <Text type='date' text={'Posted: N/A'} />
            </Grid>
            <Grid item  >
              <Text type='date' text={'Deadline: '} />
            </Grid>
          </Grid>
          <TextField fullWidth label='Goal amount' />
          <TextField fullWidth label='Grant Description' />
          <TextField fullWidth label='Tags' />
        </CardContent>
      </Card>
    </Container>
  );
}
