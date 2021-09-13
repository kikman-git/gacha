import React from 'react';
import '../styles/Homepage.css';
import logoLink from '../resources/rakuten_logo.svg';

function Homepage() {

    function Login() {
        console.log('Login function');
    }
    function Register() {
        console.log('Register function');
    }
    return (
      <div className="hompage">
         <img src={logoLink}
              alt="logo"
              className="Logo"/>
         <p className="gameRule">some game rules</p>
         <button onClick={Login}>login</button>
         <button onClick={Register}>Register</button>
      </div>
    );
}
  
export default Homepage;