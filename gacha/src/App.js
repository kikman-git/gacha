import { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Gacha from './components/Gacha';
import Award from './components/Award';
import Footer from './components/footer';
import Header from './components/header'
import Homepage from './components/Homepage';
import Login from './components/Loginpage';
import Register from './components/RegisterPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router >
          <Route exact path="/" component={Homepage} />
          <Route path="/login" component={Login} /> 
          <Route path='/register' component={Register} />
          <Route path='/gacha' component={Gacha} />
          {/* <Route exact path="/Award" component={Award} />
          <Route path="/gacha" component={Gacha} /> */}
          
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;