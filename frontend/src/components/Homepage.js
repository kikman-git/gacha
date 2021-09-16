import React, { Component } from 'react';
import '../styles/Homepage.css';
import logoLink from '../resources/rakuten_logo.svg';

export default class Homepage extends Component {

  constructor(props) {
    super(props);
    this.Login = this.Login.bind(this);
    this.Register = this.Register.bind(this);
  }

  Login() {
    this.props.history.push('/login');
  }

  Register() {
    this.props.history.push('/register');
  }

  render() {
    return (
      <div className="homepage">
        <div className="main-section">
          <div className="container">
            <div className="box">
              <h3 className="spacing-small"> Gacha game in rakuten ichba</h3>
              <img src={logoLink}
                alt="logo"
                className="Logo" />
              <p>
                <button onClick={this.Login}>login</button>
              </p>
              <p>
                <button onClick={this.Register}>Register</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
