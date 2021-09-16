import React, { Component } from 'react';
import '../styles/GetAdditionChance.css';
import Button from '@material-ui/core/Button';

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
        <div className="lackofchance">
          <div className="main-section">
            <div className="container">
              <div className="box">
                <h1>You can get additional chance by</h1>
                <Button 
                  style={{
                    fontSize:10,
                    width:300
                  }}
                  
                  variant="contained" 
                  color="primary" >Get a chance for every 5000yen spent in rakutenichiba</Button>
                <br></br>
                <br></br>
                <Button 
                  style={{
                    fontSize:10,
                    width:300
                  }}
                  
                  variant="contained" 
                  color="primary">Use rakuten points to buy  chance </Button>
                <br></br>
                <br></br>
                <Button 
                  style={{
                    fontSize:10,
                    width:300
                  }}
                  
                  variant="contained" 
                  color="primary"
                  onClick = {this.ShareLink}>share with one friend to get a free GACHA</Button>
                <br></br>
                <br></br>
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    )   
  }
}