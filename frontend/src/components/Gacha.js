import React, { Component } from 'react';
import '../styles/Gacha.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';

import gacha from '../resources/gacha_img.png';
import gacha_ball from '../resources/gacha_ball.png';
import gacha_btn from '../resources/gacha_btn.png';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function rewardGenerator(items) {
  //   const items = await itemGenerator();
  console.log(items);
  let rewardList = [
    null,
    '10%',
    '100y',
    '200y',
    '500y',
    '1000y',
    '10000y',
  ].concat(items); //TODO: change it back

  // Get random index number
  let valueIndex = getRandomInt(rewardList.length);
  console.log('Got reward: ', rewardList[valueIndex]);
  console.log(
    'rewardGenerator ',
    rewardList[valueIndex],
    typeof rewardList[valueIndex]
  );
  return rewardList[valueIndex];
}

// Rewards: [null(lost),... coupons, objects(products from rakuten)]
// if null/objects => /reward => display
// if coupons => generate coupons + display

// send request to generate new coupon
async function addPost(value) {
  //   event.preventDefault();
  if (value === "notCoupon") {
    var body = {
      genre: 'GEN',
      user: JSON.parse(sessionStorage.getItem('data'))['user_id'],
      expire_date: '2021-10-10',
      value: "10%",
      status: true,
      is_coupon: false
    };
  } else {
    var body = {
    genre: 'GEN',
    user: JSON.parse(sessionStorage.getItem('data'))['user_id'],
    expire_date: '2021-10-10',
    value: value,
    status: true,
  }
}

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${
        JSON.parse(sessionStorage.getItem('data'))['token']
      }`,
    },
  };
  console.log(body, config);
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/coupons/create/',
      JSON.stringify(body),
      config
    );
    console.log('created coupon', response);
    sessionStorage.setItem('reward', JSON.stringify(response.data));
  } catch (err) {
    console.log(err);
  }
}

class Gacha extends Component {
  constructor(props) {
    console.log(JSON.parse(sessionStorage.getItem('data')))
    super(props);

    this.state = {
      active: false,
      couponActive: false,
      isExit: false,
      items: [],
    };
    this.AnimaHandler = this.AnimaHandler.bind(this);
    this.CouponHandler = this.CouponHandler.bind(this);
    this.ExitHandler = this.ExitHandler.bind(this);
  }
  componentDidMount() {
    const applicationId = '1074305052326638295';
    const apiEndpoint = `https://app.rakuten.co.jp/services/api/IchibaItem/Ranking/20170628?format=json&age=20&applicationId=${applicationId}`;
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => this.setState({ items: data.Items }));
  }

  ExitHandler() {
    console.log('exit');
    sessionStorage.clear();
    this.setState({ isExit: true });
  }
  AnimaHandler() {
    // console.log(JSON.stringify(CouponGenerator()));
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  CouponHandler() {
    // rewardList [null, ...7coupons, ...30products]
    const reward = rewardGenerator(this.state.items);

    // store to session
    sessionStorage.setItem('reward', JSON.stringify(reward));

    // if index != 0 which means got reward

    // if it is a coupon
    if (typeof reward === 'string') {
      console.log('CouponHandler reward: ', reward, typeof reward);
      // Post to backend server
      addPost(reward).then(() => {
        // Wait until promise is resolved
        this.setState((prevState) => {
          return { couponActive: true };
        });
      }).catch((err) => {
        console.log(err)
      })
    } else {
      addPost("notCoupon").then(() => {
        // Wait until promise is resolved
        this.setState((prevState) => {
          return { couponActive: true };
        });
      }).catch((err) => {
        console.log(err)
      });
    }
  }

  render() {
    if (this.state.isExit) return <Redirect to="/" />;
    if (this.state.couponActive) return <Redirect to="/Award" />;

    return (
      <div className="GachaBack">
        <div className="GachaContainer">
          <div className="LogoutButton">
            <IconButton aria-label="Exit" onClick={this.ExitHandler}>
              <ExitToAppIcon style={{ fontSize: 40 }} />
            </IconButton>
          </div>

          <img src={gacha} alt="gacha" className="Gacha" />
          <img
            src={gacha_btn}
            alt="gacha_btn"
            className={
              this.state.active ? 'GachaBtn GachaBtn-rotate' : 'GachaBtn'
            }
            onClick={this.AnimaHandler}
          />
          <img
            src={gacha_ball}
            alt="gacha_ball"
            className={
              this.state.active ? 'GachaBall GachaBall-anima' : 'GachaBall'
            }
            onClick={this.CouponHandler}
          />
        </div>
      </div>
    );
  }
}

export default Gacha;
