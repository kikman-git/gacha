import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import '../styles/Coupon.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import CouponLogo from '../resources/paella.jpg';
import Coupon100 from '../resources/coupon100.png';
import Coupon200 from '../resources/coupon200.png';
import Coupon500 from '../resources/coupon500.png';
import Coupon1000 from '../resources/coupon1000.png';
import Coupon10000 from '../resources/coupon10000.png';
import Coupon10P from '../resources/coupon10%.png';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  button:{
    marginTop: '5%',
  }
}));

export default function Coupon() {
  const classes = useStyles();
  const [couponValue, setCouponValue] = React.useState('init couponValue');
  const [expireData, setExpireData] = React.useState('');
  const [CouponImg, setImg] = React.useState(CouponLogo);

  const [isShare, setIsShare] = React.useState(false);
  const [isReturn, setIsReturn] = React.useState(false);
  const [isReCommend, setIsReCommend] = React.useState(false);

  const [gachaChances, setGachaChances] = React.useState(1);

  useEffect(() => {
    const currentReward = JSON.parse(sessionStorage.getItem('reward'));
    console.log('coupon.js currentReward: ', currentReward);
    if (currentReward === null) {
      setCouponValue(`Sorry you get nothing`);
      setExpireData('Try it again');
      // check if currentReward is a coupon
    } else if ('value' in currentReward) {
      setCouponValue(`Your Coupon is : ${currentReward.value}`);
      setExpireData(currentReward.expire_date);

      if(currentReward.value === "10%") setImg(Coupon10P);
      if(currentReward.value === "100") setImg(Coupon100);
      if(currentReward.value === "200") setImg(Coupon200);
      if(currentReward.value === "500") setImg(Coupon500);
      if(currentReward.value === "1000") setImg(Coupon1000);
      if(currentReward.value === "10000") setImg(Coupon10000);
      
    } else {
      setCouponValue(`You got an item: ${currentReward.Item.itemName}`);
      setImg(currentReward.Item.mediumImageUrls[0].imageUrl);
    }

    // UPDATE GACHA CHANCES
    //setGachaChances(JSON.parse(sessionStorage.getItem('data')['gacha_chances'])); 
  }, [couponValue]);

  // share the link
  function ShareHandler(){
    console.log('share link');
    setIsShare(true);
  }

  // return to the gacha page
  function ReturnHandler(){
    console.log('return to gacha page');
    setIsReturn(true);
  }
  
  function RecommendHandler(){
    console.log('recommend page');
    setIsReCommend(true);

  }

  // redirect to share page
  if(isShare) return <Redirect to="/share" />;
  // redirect to gacha page
  if(isReturn) return <Redirect to="/gacha" />;
  // redirect to recommend page
  if(isReCommend) return;
  return (
    <div className="CouponContainer">
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={couponValue}
          subheader={expireData}
        />
        <CardMedia
          className={classes.media}
          image={CouponImg}
          title={'Paella dish'}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Coupon Description. {CouponImg}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share" onClick={ShareHandler}>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
      
      <h2>You have {gachaChances} chances to play{gachaChances > 0? '!' : '. Please share!'}</h2>
      <Button variant="contained" className={classes.button} onClick={gachaChances > 0? ReturnHandler: ShareHandler}>
        {gachaChances > 0? 'Play Again' : 'Share'}
      </Button>

      <Button variant="contained" className={classes.button} onClick={RecommendHandler}>
        Recommend
      </Button>
    </div>
  );
}
