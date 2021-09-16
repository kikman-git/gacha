import Coupon from './Coupon';
import '../styles/Award.css';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';

class Award extends Component {
  constructor(props){
    super(props);
    this.state ={
      isExit: false
    }
    this.ExitHandler = this.ExitHandler.bind(this);
  }

  ExitHandler() {
    console.log('exit');
    sessionStorage.clear();
    this.setState({isExit: true});
  }
  render() {
    if(this.state.isExit) return <Redirect to="/" />;
    return (
      <div className="AwardBack">
      <div className="AwardContainer">
        <div className="LogoutButton">
        <IconButton aria-label="Exit" onClick={this.ExitHandler}>
            <ExitToAppIcon style={{ fontSize: 40}}/>
        </IconButton>
        </div>

        <Coupon title="Coupon Name" className="Coupon" />
      </div>
      </div>
    );
  }
}
export default Award;
