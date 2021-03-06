import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default class Loginpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserName: '',
      Password: '',
      isLoggin: false,
    };
    this.Login = this.Login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async Login(event) {
    event.preventDefault();
    console.log('Login function');
    const configForaAuthentication = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = {
      username: this.state.UserName,
      password: this.state.Password,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/accounts/login/`,
        body,
        configForaAuthentication
      );

      const token = response.data.token;
      const configForCoupons = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      };

      const coupon_response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URI}/coupons/`,
        configForCoupons
      );
      sessionStorage.setItem('coupons', JSON.stringify(coupon_response.data));

      // console.log(response.data);

      // sessionStorage.setItem('isLogin', true);
      sessionStorage.setItem('userName', this.state.UserName);
      sessionStorage.setItem('data', JSON.stringify(response.data));
      sessionStorage.setItem('gacha_chances', response.data.gacha_chances);
      this.setState({ isLoggin: true });
    } catch (err) {
      console.log(err);
    }
  }

  handleChange(event) {
    console.log('change');
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    if (this.state.isLoggin) {
      return <Redirect to="/gacha" />;
    }
    return (
      <div className="login">
        <div className="main-section">
          <div className="container">
            <div className="box">
              <h3 className="spacing-small"> Rakuten Member Login </h3>
              <form onSubmit={this.Login}>
                <table className="loginBox">
                  <tbody>
                    <tr>
                      <td className="loginBoxName">
                        <label className="userid"> UserID </label>
                      </td>
                      <td className="loginBoxValue">
                        <input
                          id="loginInner_u"
                          type="text"
                          maxlength="100"
                          size="25"
                          value={this.state.UserName}
                          name="UserName"
                          placeholder="UserName"
                          onChange={this.handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="loginBoxName">
                        <label className="passwd">Password</label>
                      </td>
                      <td className="loginBoxValue">
                        <input
                          id="loginInner_u"
                          type="password"
                          maxlength="100"
                          size="25"
                          value={this.state.Password}
                          name="Password"
                          placeholder="Password"
                          onChange={this.handleChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Button
                  style={{
                    fontSize: 10,
                    width: 100,
                  }}
                  variant="contained"
                  color="primary"
                  onClick={this.Login}
                >
                  Login
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
