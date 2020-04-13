import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Text from './Text.js';
import ProgressBar from './ProgressBar.js';
import ContactPopout from './ContactPopout.js';
import ImageCarousel from './ImageCarousel.js'
import GrantTagBar from './GrantTagBar.js';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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
  link: {
    textDecoration: 'none',
  }
}))

export default function LargeGrantCard(props) {
  const classes = useStyles();

  // Set tab title
  useEffect(() => { document.title = props.title + '-Giving Tree'; }, [props.title]);

  return (
    <Container elevation={3} className={classes.card}>
      {props.user === 'foundation' &&
        <Card className={classes.topCard}>
          <CardContent>
            <Text type='card-aboveheading' text={'Address: ' + props.cfData.address} />
            <Text type='card-aboveheading' text={'Status: ' + props.status} />
          </CardContent>
        </Card>
      }
      <Card elevation={3}>
        <ImageCarousel img={props.img} />
        <CardContent className={classes.cardContent}>
          <div className={classes.topCard}>
            <Text type='card-aboveheading' text={props.nonprofitData && props.nonprofitData.name} />
            <Text type='card-heading' text={props.title} />
            <Text type='card-subheading' text={props.cfData?.name} />
          </div>
          <div className={classes.topCard}>
            <Grid container direction='row' justify='space-between' alignItems='flex-end' spacing={0}>
              <Grid item>
                <Text type='date' text={'Posted: ' + props.datePosted} />
              </Grid>
              <Grid item  >
                <Text type='date' text={'Deadline: ' + props.dateDeadline} />
              </Grid>
            </Grid>
            <ProgressBar goal={props.goalAmt} raised={props.moneyRaised} />
          </div>
          <div className={classes.topCard}>
            <Text type='card-subheading' text={props.desc} />
          </div>
          <div className={classes.topCard}>
            <GrantTagBar tags={props.tags} />
          </div>
          {props.user === 'donor' &&
            <div>
              <ContactPopout
                cfData={props.cfData}
                nonprofitData={props.nonprofitData} />
              <Link className={classes.link} to={'/grants/' + props.id + '/give'}>
                <Button fullWidth variant='contained' color='primary'>
                  Donate
                  </Button>
              </Link>
            </div>
          }
        </CardContent>
      </Card>
    </Container>
  );
}
