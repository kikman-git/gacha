import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';


export default class RegisterPage extends Component {
  constructor(props) {
    super(props);
    console.log(props.match.params.friend_uuid);
    console.log(this.props.friend_uuid);
    this.state = {
      UserName: '',
      Password: '',
      ConfirmPassword: '',
    };
    this.Register = this.Register.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async Register(event) {
    event.preventDefault();
    console.log('Login function');
    try {
      const configForaAuthentication = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      if (this.props.match.params.friend_uuid === undefined) {
        var body = {
          username: this.state.UserName,
          password: this.state.Password,
          confirm_password: this.state.ConfirmPassword,
        };
      } else {
        var body = {
          username: this.state.UserName,
          password: this.state.Password,
          confirm_password: this.state.ConfirmPassword,
          friend_uuid: this.props.match.params.friend_uuid,
        };
      }
      const response = await axios.post(
        `http://127.0.0.1:8000/accounts/register/`,
        body,
        configForaAuthentication
      );
      console.log(response);
      const token = response.data.token;
      const configForCoupons = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      };
      console.log(configForCoupons);

      const coupon_response = await axios.get(
        `http://127.0.0.1:8000/coupons/`,
        configForCoupons
      );
      sessionStorage.setItem('coupons', JSON.stringify(coupon_response.data));

      // sessionStorage.setItem('isLogin', true);
      this.setState({ isLoggin: true });
      sessionStorage.setItem('userName', this.state.UserName);
      sessionStorage.setItem('data', JSON.stringify(response.data));
      sessionStorage.setItem('gacha_chances', response.data.gacha_chances);
      console.log('gacha_chances', sessionStorage.getItem('gacha_chances'));
      // var meta1 = JSON.parse(window.localStorage.getItem("meta")); // -> retrive the data from local storage

      console.log('Register: ', response.data);
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
              <h3 className="spacing-small"> Rakuten Member register </h3>
              <form onSubmit={this.Register}>
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
                          value={this.state.Password}
                          name="Password"
                          placeholder="Password"
                          onChange={this.handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="loginBoxName">
                        <label className="passwd">Confirm Password</label>
                      </td>
                      <td className="loginBoxValue">
                        <input
                          id="loginInner_u"
                          type="password"
                          value={this.state.ConfirmPassword}
                          name="ConfirmPassword"
                          placeholder="Confirm Password"
                          onChange={this.handleChange}
                        />
                      </td>
                    </tr>
                    <br />
                  </tbody>
                </table>
                <div>
                <Button
                  style={{
                    fontSize: 10,
                    width: 100,
                  }}
                  className="loginButton"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Register
                </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
