import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import '../styles/Sharelink.css';

export default class Share extends Component {

  constructor(props) {
    super(props);
    this.state = {
        value : 'http://gacha.com/userid',
        copied : false,
    };
  }
  render() {
    return (
      <div className="sharelink">
        {/* <p>http//:Homepage + usercode</p> */}
        <p>Share the link </p>
        <input 
            value={this.state.value}
            onChange={({target: {value}}) => this.setState({value, copied: false})} />
        <br/>
        <br/>
        {/* <div class="btn btn03">
	        <a href="">Copy</a>
        </div> */}
        <CopyToClipboard text={this.state.value}
          onCopy={() => this.setState({copied: true})}>
          <button>Copy to clipboard </button>
        </CopyToClipboard>
        {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
        <br/>
        <br/>
      </div>
    );
  }
}