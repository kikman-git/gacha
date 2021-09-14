import React, { Component } from 'react';
import '../styles/Login.css';

export default class Loginpage extends Component {
  constructor(props) {
    super(props);
    this.Login = this.Login.bind(this);
  }

  Login() {
    console.log('Login function');
  }

  render() {
    return (
      <div className="login">
        <p>
          user ID: <input type="text" name="userID" maxlength="20"></input>
          <br></br>
          password:{' '}
          <input type="password" name="password" maxlength="16"></input>
        </p>
        <p>
          <button onClick={this.Login}>login</button>
        </p>
      </div>
    );
  }
}
