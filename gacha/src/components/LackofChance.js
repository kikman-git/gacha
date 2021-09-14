import React, { Component } from 'react';
import '../styles/LackofChance.css';

export default class Lack extends Component {

  constructor(props) {
    super(props);
    this.GetAdiitionalChance = this.GetAdiitionalChance.bind(this);
  }

  GetAdiitionalChance() {
    this.props.history.push('/get');
  }


  render() {
    return (
      <div className="lackofchance">
        <h1>You don’t have enough chance</h1>
        <br/>
        <br/>
        <p classname = ''>note:every customer will get a free chance after login every day</p>
        <button onClick = {this.GetAdiitionalChance}>Get Additioal Chance</button>
        <br/>
        <br/>
      </div>
    );
  }
}
