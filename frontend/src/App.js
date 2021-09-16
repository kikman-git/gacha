import { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Gacha from './components/Gacha';
import Award from './components/Award';
import Footer from './components/footer';
import Header from './components/header';
import Homepage from './components/Homepage';
import Login from './components/Loginpage';
import Register from './components/RegisterPage';
import Share from './components/ShareLink';
import Get from './components/GetAdditionChance';
import Lack from './components/LackofChance';
import Recommendation from './components/Recommendation'
import ItemDetail from "./components/ItemDetail"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Route path="/homepage" component={Homepage} />
          <Route path="/register" component={Register} />
          <Route exact path="/" component={Lack} />
          <Route path="/get" component={Get} />
          <Route path="/share" component={Share} />
          <Route path="/Award" component={Award} />
          <Route path="/gacha" component={Gacha} />
          <Route path="/login" component={Login} />
          <Route path="/recommendation" component={Recommendation} />
          <Route path="/item/:itemCode" component={ItemDetail} />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
