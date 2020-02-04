import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Text from './Text.js';
import ProgressBar from './ProgressBar.js';
import ContactPopout from './ContactPopout.js';
import ImageCarousel from './ImageCarousel.js'
import Tag from './Tag.js';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 500,
  },
  cardContent: {
    flexGrow: 1,
  },
}))

export default function LargeGrantCard(props) {
  console.log(props.img);

  const classes = useStyles();
  const [imgKey, setImgKey] = React.useState(0);

  // Set tab title
  useEffect(() => { document.title = props.title + '-Giving Tree'; }, [props.title]);

  useEffect(() => {
    //Force image carousel to rerender after 500ms
    //TODO: Find better way to fix
    setTimeout(function () { setImgKey(1); }, 500)
  }, []);

  return (
    <Container className={classes.card}>
      <Card>
        <ImageCarousel key={imgKey} img={props.img} />
        <CardContent className={classes.cardContent}>
          <Text type='card-aboveheading' text={props.nonprofitData.name} />
          <Text type='card-heading' text={props.title} />
          <Text type='card-subheading' text={props.cfData.name} />
          <Grid container direction='row' justify='space-between' alignItems='flex-end' spacing={0}>
            <Grid item>
              <Text type='date' text={'Posted ' + props.datePosted} />
            </Grid>
            <Grid item  >
              <Text type='date' text={'Deadline ' + props.dateDeadline} />
            </Grid>
          </Grid>
          <ProgressBar goal={props.goalAmt} raised={props.moneyRaised} />
          <Text type='card-subheading' text={props.desc} />
          <Tag removable={false} tag={props.tags} />
          {props.user == 'donor' &&
            <Grid container direction='row' justify='space-between' alignItems='flex-end'>
              <Grid item>
                <ContactPopout
                  cfData={props.cfData}
                  nonprofitData={props.nonprofitData} />
              </Grid>
              <Grid item  >
                <Link to={'/grants/' + props.id + '/give'}>
                  <Button color='primary' variant='contained'>
                    Donate
                </Button>
                </Link>
              </Grid>
            </Grid>
          }
        </CardContent>
      </Card>
    </Container>
  );
}
