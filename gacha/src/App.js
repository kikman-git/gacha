import { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Gacha from './components/Gacha';
import Award from './components/Award';
import Footer from './components/footer';
import Header from './components/header'
import Homepage from './components/Homepage';
import Login from './components/Loginpage';

import Share from './components/Sharelink'
import Get from './components/GetAdditionChance'
import Lack from './components/LackofChance'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router >
          <Route exact path="/" component={Lack} />
          <Route exact path="/get" component={Get} />
          <Route exact path="/share" component={Share} />
          <Route exact path="/Award" component={Award} />
          <Route path="/gacha" component={Gacha} />
          <Route path="/login" component={Login} />

        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;