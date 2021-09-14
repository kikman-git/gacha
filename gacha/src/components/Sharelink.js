import React, { Component } from 'react';
import '../styles/Sharelink.css';

export default class Share extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="sharelink">
        <p>http//:Homepage + usercode</p>
        <br/>
        <br/>
        <div class="btn btn03">
	        <a href="">Copy</a>
        </div>
        <br/>
        <br/>
      </div>
    );
  }
}