import React, { Component } from 'react';
import '../styles/GetAdditionChance.css';

export default class GetAdditionChance extends Component {

  constructor(props) {
    super(props);
    // this.Login = this.Login.bind(this);
    // this.Register = this.Register.bind(this);
    this.ShareLink = this.ShareLink.bind(this);
  }

  // Login() {
  //   this.props.history.push('/login');
  // }

  // Register() {
  //   this.props.history.push('/register');
  // }
  ShareLink() {
    this.props.history.push('/share');
  }

  render() {
    return (
      <div className="getadditionchance">
        <h1>You can get additional chance by</h1>
        <a 
        href="" 
        className='btn btn--orange btn--radius' 
        >Get a chance for every 5000yen spent in rakutenichiba</a>
        <br></br>
        <br></br>
        <a href="" 
        className='btn btn--orange btn--radius'
        >Use rakuten points to buy  chance </a>
        <br></br>
        <br></br>
        <a href="" 
        className='btn btn--orange btn--radius'
        onClick = {this.ShareLink}
        >share with one friend to get a free GACHA</a>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}