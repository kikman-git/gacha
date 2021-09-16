import React, { Component } from 'react';
import '../styles/Gacha.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import gacha from '../resources/gacha_img.png';
import gacha_ball from '../resources/gacha_ball.png';
import gacha_btn from '../resources/gacha_btn.png';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function rewardGenerator(items) {
  //   const items = await itemGenerator();
  console.log(items);
  let rewardList = [null, '10%', '100y', '200y', '500y', '1000y', '10000y']; //.concat(items);

  // Get random index number
  let valueIndex = getRandomInt(rewardList.length);
  console.log(rewardList[valueIndex]);
  return rewardList[valueIndex];
}

// Rewards: [null(lost),... coupons, objects(products from rakuten)]
// if null/objects => /reward => display
// if coupons => generate coupons + display

// send request to generate new coupon
async function addPost(value) {
  //   event.preventDefault();
  const body = {
    genre: 'GEN',
    user: JSON.parse(window.sessionStorage.getItem('data'))['id'],
    expire_date: '2021-10-10',
    value: value,
    status: true,
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${
        JSON.parse(window.sessionStorage.getItem('data'))['token']
      }`,
    },
  };

  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/coupons/create/',
      JSON.stringify(body),
      config
    );
    console.log('created coupon', response);
    sessionStorage.setItem('new_coupon', JSON.stringify(response.data));
  } catch (err) {
    console.log(err);
  }
}

class Gacha extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      couponActive: false,
      items: [],
    };

    this.AnimaHandler = this.AnimaHandler.bind(this);
    this.CouponHandler = this.CouponHandler.bind(this);
  }
  componentDidMount() {
    const applicationId = '1074305052326638295';
    const apiEndpoint = `https://app.rakuten.co.jp/services/api/IchibaItem/Ranking/20170628?format=json&age=20&applicationId=${applicationId}`;
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => this.setState({ items: data }));
  }

  AnimaHandler() {
    // console.log(JSON.stringify(CouponGenerator()));
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  CouponHandler() {
    // rewardList [null, ...7coupons, ...30products]
    const reward = rewardGenerator(this.state.items);

    // if index != 0 which means got reward
    console.log(typeof reward);
    if (reward) {
      const currentState = this.state;
      this.setState({ couponActive: !currentState.couponActive });

      // check if reward is a coupon or a product
      // if it is a coupon
      if (typeof reward === String) {
        console.log('coupon created');
        addPost(reward); // Post to backend server
      }
    }
    sessionStorage.setItem('reward', reward);
  }

  render() {
    if (this.state.couponActive) {
      return <Redirect to="/Award" />;
    }
    return (
      <div className="GachaContainer">
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
        <button className="playBtn" onClick={this.AnimaHandler}>
          {' '}
          Play{' '}
        </button>
      </div>
    );
  }
}

export default Gacha;
