import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import CardMedia from '@material-ui/core/CardMedia';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import firebase from '../firebase.js';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    flexGrow: 1,
  },
  cardMedia: {
    height: 400,
  },
});

export default function ImageCarousel(props) {
  const [img, setImg] = React.useState(props.img);
  useEffect(() => { setImg(props.img) }, [props.img]);

  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <div>
      <CardMedia
        className={classes.cardMedia}
        image={img[activeStep]}
        title="Grant Image"
      />
      <MobileStepper
        variant="dots"
        steps={img.length}
        position="static"
        activeStep={activeStep}
        className={classes.root}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
            Next
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
        </Button>
        }
      />
    </div>
  );
}