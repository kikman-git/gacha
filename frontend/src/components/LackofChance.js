import React, { Component } from 'react';
import '../styles/LackofChance.css';
import Button from '@material-ui/core/Button';
import sad from '../resources/sad.gif';

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
        <div className="main-section">
          <div className="container">
            <div className="box">
              <h1>You don’t have enough chance</h1>
              <img src={sad}  width="130" height="130" />
              <p>Note: every customer will get a free chance after login every day</p>
              <br />
              <Button 
                style={{
                  fontSize:10,
                  width:200
                }}
                
                variant="contained" 
                color="primary" 
                onClick = {this.GetAdiitionalChance}>Get Additioal Chance</Button>
              <br/>
              <br/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
