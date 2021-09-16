import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { Link } from "react-router-dom";
import '../styles/CustomCard.css'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 400,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    marginRight: 'auto',
    outline: 'none',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));




function CustomCard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const link = `item/${props.item.itemCode}`
  console.log(props)
  const maxSteps = props.item.mediumImageUrls.length >0? props.item.mediumImageUrls.length: 1

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };





  return (
      <Card id='card_root'>
        <div id='card_imagebox' style={{position:'relative'}}>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
        {props.item.mediumImageUrls.map((image, index) => (
            <div key={image.imageUrl}>
                <img className={classes.img} src={image.imageUrl} alt="medium-image"/>
            </div>))}
          </SwipeableViews>
          <div id='card_stepper'>
          <MobileStepper
          variant="dots"
          steps={maxSteps>1? maxSteps: 0 }
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1} id='outline'>
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0} id='outline'>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </Button>
          }
          />
          </div>
    </div>

    <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {/* <a href={props.item.itemUrl}>{props.item.itemName}</a> */}
          <Link to={link}>{props.item.itemName}</Link>
        </Typography>
      </CardContent>
      <Typography style={{marginLeft: '10px'}}>
                {props.item.itemPrice} yen
      </Typography>
    </Card>
  );
}

export default CustomCard;