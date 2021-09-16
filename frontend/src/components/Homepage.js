import React, { Component } from 'react';
import '../styles/Homepage.css';
import logoLink from '../resources/rakuten_logo.svg';
import Button from '@material-ui/core/Button';

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
              <h3 className="spacing-small"> Gacha game in Rakuten Ichiba</h3>
              <img src={logoLink} alt="logo" className="Logo" />
              <p>
                <Button 
                style={{
                  fontSize:10,
                  width:100
                }}
                
                variant="contained" 
                color="primary" 
                onClick={this.Login}>login</Button>
              </p>
              <p>
                <Button 
                  style={{
                    fontSize:10,
                    width:100
                  }}
                  
                  variant="contained" 
                  color="primary" 
                  onClick={this.Register}>Register</Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
