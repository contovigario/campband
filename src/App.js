//import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home.js';
import Tweet from './components/Tweet.js';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav></Nav>
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/tweet" exact component={Tweet}></Route>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
