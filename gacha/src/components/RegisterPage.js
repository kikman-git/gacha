import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import { Redirect } from "react-router-dom";

export default class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserName: "",
      Password: "",
      ConfirmPassword: "",
  }
    this.Register = this.Register.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async Register(event) {
    event.preventDefault();
    console.log('Login function');
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
    }
    try {
      const response = await axios.post(`http://127.0.0.1:8000/accounts/register/`, 
                      {username: this.state.UserName, 
                      password: this.state.Password,
                      confirm_password: this.state.ConfirmPassword}
                       , config)

      sessionStorage.setItem('isLogin', true);
      sessionStorage.setItem('userName', this.state.UserName);
      window.sessionStorage.setItem("data", JSON.stringify(response.data));
      // var meta1 = JSON.parse(window.localStorage.getItem("meta")); // -> retrive the data from local storage



    } catch (err) {
      console.log(err);
    }
  }

  handleChange(event) {
    console.log('change');
    const {name, value} = event.target
    this.setState({
        [name]: value
    })
  }

  render() {
    if (sessionStorage.getItem('isLogin')) { return  <Redirect to="/gacha"/>;}

    return (
      <div className="login">
        <form onSubmit={this.Register}>
                <input 
                    type="text" 
                    value={this.state.UserName} 
                    name="UserName" 
                    placeholder="UserName" 
                    onChange={this.handleChange} 
                />
                <br />
                
                <input 
                    type="text" 
                    value={this.state.Password} 
                    name="Password" 
                    placeholder="Password" 
                    onChange={this.handleChange} 
                />
                <br />
                <input 
                    type="text" 
                    value={this.state.ConfirmPassword} 
                    name="ConfirmPassword" 
                    placeholder="Confirm Password" 
                    onChange={this.handleChange} 
                />
                <br />
                <button>Submit</button>
        </form>
        
      </div>
    );
  }
}
