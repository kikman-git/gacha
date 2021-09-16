import Coupon from './Coupon';
import '../styles/Award.css';
import React, { Component } from 'react';
class Award extends Component {
  render() {
    return (
      <div className="AwardContainer">
        <Coupon title="Coupon Name" className="Coupon" />
      </div>
    );
  }
}

export default Award;
