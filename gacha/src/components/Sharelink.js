import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import '../styles/Sharelink.css';

export default class Share extends Component {

  constructor(props) {
    super(props);
    this.state = {
        link : '',
        copied : false,
    };
  }

  componentDidMount() {
    fetch("https://swapi.dev/api/people/1/")
        .then(response => response.json())
        .then(data => {
            this.setState({
                link : 'http://gacha.com/' + data.name
            })
        })
    this.setState({
        
    })
}

  render() {
    return (
      <div className="sharelink">
        {/* <p>http//:Homepage + usercode</p> */}
       
        <p>Share the link </p>
        
        <p>
            {this.state.link}
        </p>
         
         {/* onChange={({target: {value}}) => this.setState({value, copied: false})} */}
        <br/>
        <br/>
        <CopyToClipboard text={this.state.link}
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