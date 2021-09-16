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
  // console.log(items);
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
  value = typeof value === 'string' ? value : 'notCoupon';
  if (value === 'notCoupon') {
    var body = {
      genre: 'GEN',
      user: JSON.parse(sessionStorage.getItem('data'))['id'],
      expire_date: '2021-10-10',
      value: '10%',
      status: true,
      is_coupon: false,
    };
  } else {
    var body = {
      genre: 'GEN',
      user: JSON.parse(sessionStorage.getItem('data'))['id'],
      expire_date: '2021-10-10',
      value: value,
      status: true,
    };
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
      `${process.env.REACT_APP_BACKEND_URI}/coupons/create/`,
      JSON.stringify(body),
      config
    );
    sessionStorage.setItem('reward', JSON.stringify(response.data));
  } catch (err) {
    console.log(err);
  }
}

class Gacha extends Component {
  constructor(props) {
    console.log(
      'gacha constructor',
      JSON.parse(sessionStorage.getItem('data'))
    );
    // console.log(JSON.parse(sessionStorage.getItem('data')).gacha_chances);
    super(props);

    this.state = {
      active: false,
      couponActive: false,
      isExit: false,
      items: [],
      gachaChances: Number(sessionStorage.getItem('gacha_chances')),
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

    // sessionStorage.setItem('reward', JSON.stringify(reward));
    addPost(reward)
      .then(() => {
        console.log('resolved addPost', sessionStorage.getItem('reward'));
        if (typeof reward != 'string')
          sessionStorage.setItem('reward', JSON.stringify(reward));
      })
      .catch((err) => console.log(err));
    this.setState((prevState) => {
      const gotResponse = sessionStorage.getItem('reward') != undefined;
      console.log(gotResponse, sessionStorage.getItem('reward'));
      return {
        couponActive: typeof reward === 'string' ? gotResponse : true,
        gachaChances: prevState.gachaChances - 1,
      };
    });
  }

  render() {
    if (this.state.isExit) return <Redirect to="/" />;
    if (this.state.couponActive) {
      sessionStorage.setItem('gacha_chances', this.state.gachaChances);
      return <Redirect to="/Award" />;
    }
    console.log('considtion', sessionStorage.getItem('data'));
    console.log(
      'bug',
      this.state.gachaChances <= 0 && sessionStorage.getItem('data') != null
    );
    if (this.state.gachaChances <= 0 && sessionStorage.getItem('data') != null)
      return <Redirect to="/lack" />;

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
