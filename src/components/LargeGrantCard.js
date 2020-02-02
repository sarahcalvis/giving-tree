import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
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
  const classes = useStyles();

  // Grant details
  const [id, setId] = React.useState(props.id);
  const [title, setTitle] = React.useState(props.title);
  const [desc, setDesc] = React.useState(props.desc);
  const [goalAmt, setGoalAmt] = React.useState(props.goalAmt);
  const [moneyRaised, setMoneyRaised] = React.useState(props.moneyRaised);
  const [tags, setTags] = React.useState(props.tags);
  const [img, setImg] = React.useState(props.img);
  const [cfName, setCfName] = React.useState(props.cfName);
  const [cfUrl, setCfUrl] = React.useState(props.cfUrl);
  const [cfEmail, setCfEmail] = React.useState(props.cfEmail);
  const [cfPhone, setCfPhone] = React.useState(props.cfPhone);
  const [nonprofitName, setNonprofitName] = React.useState(props.nonprofitName);
  const [nonprofitUrl, setNonprofitUrl] = React.useState(props.nonprofitUrl);
  const [nonprofitEmail, setNonprofitEmail] = React.useState(props.nonprofitEmail);
  const [nonprofitPhone, setNonprofitPhone] = React.useState(props.nonprofitPhone);
  const [datePosted, setDatePosted] = React.useState(props.datePosted);
  const [dateDeadline, setDateDeadline] = React.useState('');

  // Observe grant details
  useEffect(() => { setId(props.id); }, [props.id]);
  useEffect(() => { setTitle(props.title); }, [props.title]);
  useEffect(() => { setDesc(props.desc); }, [props.desc]);
  useEffect(() => { setGoalAmt(props.goalAmt); }, [props.goalAmt]);
  useEffect(() => { setMoneyRaised(props.moneyRaised); }, [props.moneyRaised]);
  useEffect(() => { setTags(props.tags); }, [props.tags]);
  useEffect(() => { setImg(props.img) }, [props.img]);
  useEffect(() => { setCfName(props.cfName); }, [props.cfName]);
  useEffect(() => { setCfUrl(props.cfUrl) }, [props.cfUrl]);
  useEffect(() => { setCfEmail(props.cfEmail) }, [props.cfEmail]);
  useEffect(() => { setCfPhone(props.cfPhone) }, [props.cfPhone]);
  useEffect(() => { setNonprofitName(props.nonprofitName); }, [props.nonprofitName]);
  useEffect(() => { setNonprofitUrl(props.nonprofitUrl) }, [props.nonprofitUrl]);
  useEffect(() => { setNonprofitEmail(props.nonprofitEmail) }, [props.nonprofitEmail]);
  useEffect(() => { setNonprofitPhone(props.nonprofitPhone) }, [props.nonprofitPhone]);
  useEffect(() => { setDatePosted(props.datePosted) }, [props.datePosted]);
  useEffect(() => { setDateDeadline(props.dateDeadline) }, [props.dateDeadline]);


  return (
    <div className={classes.card}>
      {img && img.length > 0 && <ImageCarousel img={img} />}
      <CardContent className={classes.cardContent}>
        <Text type='card-aboveheading' text={nonprofitName} />
        <Text type='card-heading' text={title} />
        <Text type='card-subheading' text={cfName} />
        <Grid container direction='row' justify='space-between' alignItems='flex-end'>
          <Grid item>
            <Text type='date' text={'Posted ' + datePosted} />
          </Grid>
          <Grid item  >
            <Text type='date' text={'Deadline ' + dateDeadline} />
          </Grid>
        </Grid>
        <ProgressBar goal={goalAmt} raised={moneyRaised} />
        <Text type='card-subheading' text={desc} />
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={2}
        > {tags.length > 0 && tags.map((tag) =>
          <Grid item>
            <Tag removable={false} tag={tag} />
          </Grid>
        )} </Grid>
        <Grid container direction='row' justify='space-between' alignItems='flex-end'>
          <Grid item>
            <ContactPopout
              cfName={cfName}
              cfPhone={cfPhone}
              cfUrl={cfUrl}
              cfEmail={cfEmail}
              nonprofitName={nonprofitName}
              nonprofitPhone={nonprofitPhone}
              nonprofitUrl={nonprofitUrl}
              nonprofitEmail={nonprofitEmail} />
          </Grid>
          <Grid item  >
            <Link to={'/grants/' + id + '/give'}>
              <Button color='primary' variant='contained'>
                Donate
                </Button>
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </div >
  );
}
