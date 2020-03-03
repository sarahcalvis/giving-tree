import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    flexGrow: 1,
    height: 35,
  },
  narrow: {
    maxWidth: 500,
  },
  cardMedia: {
    height: 250,
  },
});

export default function ImageCarousel(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <div className={classes.narrow}>
      <CardMedia
        className={classes.cardMedia}
        image={props.img[activeStep]}
        title="Grant Image"
      />
      <div>
        <Grid
          container
          direction='row'
          justify='space-between'
          alignItems='center'
        >
          {props.img.length > 1 &&
            <MobileStepper
              variant='dots'
              steps={props.img.length}
              position='static'
              activeStep={activeStep}
              className={classes.root}
              nextButton={
                <Button size='small' onClick={handleNext} disabled={activeStep === props.img.length - 1}>
                  Next
                <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
                  <KeyboardArrowLeft />
                  Back
              </Button>
              }
            />
          }
        </Grid>
      </div>
    </div>
  );
}