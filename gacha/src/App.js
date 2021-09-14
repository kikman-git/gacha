import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Gacha from './components/Gacha';
import Award from './components/Award';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Gacha}  />
        <Route path="/Award" component={Award}  />
      </Router>
    </div>
  );
}

export default App;
