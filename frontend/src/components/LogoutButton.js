import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
class LogoutButton extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isLogout: false
        };

        this.clickHandler = this.clickHandler.bind(this);
      }
    
    clickHandler(){
        console.log('log out');
        sessionStorage.clear();
        this.setState({isLogout: true});
    }
    
    render() {
        if (this.state.isLogout) {
            return <Redirect to="/login"/>;
          }
        return (
            <ExitToAppIcon onClick={this.clickHandler}/>
        )
    }
}

export default LogoutButton;