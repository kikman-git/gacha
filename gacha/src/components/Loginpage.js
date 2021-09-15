import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import { Redirect } from 'react-router-dom';

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
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/accounts/login/`,
        { username: this.state.UserName, password: this.state.Password },
        config
      );

      this.setState({ isLoggin: true });
      // sessionStorage.setItem('isLogin', true);
      sessionStorage.setItem('userName', this.state.UserName);
      window.sessionStorage.setItem('data', JSON.stringify(response.data));
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
        <form onSubmit={this.Login}>
          <input
            type="text"
            value={this.state.UserName}
            name="UserName"
            placeholder="UserName"
            onChange={this.handleChange}
          />
          <br />

          <input
            type="password"
            value={this.state.Password}
            name="Password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <br />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
