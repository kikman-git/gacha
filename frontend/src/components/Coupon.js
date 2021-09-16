import React, { useState, useEffect } from 'react';
import '../styles/Coupon.css';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CouponLogo from '../resources/paella.jpg';

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
}));

export default function Coupon() {
  const classes = useStyles();
  const [couponValue, setCouponValue] = React.useState('init couponValue');
  const [expireData, setExpireData] = React.useState('');
  const [CouponImg, setImg] = React.useState(CouponLogo);

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
    } else {
      setCouponValue(`You got an item: ${currentReward.Item.itemName}`);
      setImg(currentReward.Item.mediumImageUrls[0].imageUrl);
    }
  }, [couponValue]);

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
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}