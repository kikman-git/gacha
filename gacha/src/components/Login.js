import React from 'react';
import '../styles/Login.css';
import Footer from './footer';

function Login() {

  function Login() {
    console.log('Login function');
  }

  return (
    <div className="login">
      <p>
        user ID: <input type="text" name="userID" maxlength="20"></input>
        <br></br>
        password: <input type="password" name="password" maxlength="16"></input>
      </p>
      <p>
        <button onClick={Login}>login</button>
      </p>
    </div>
  );
}

export default Login;
