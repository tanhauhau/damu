import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home/Home';
import Demo from './Demo/Demo';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Router basename="/damu">
        <>
          <Route path="/" exact component={Home} />
          <Route path="/repl" exact component={Demo} />
        </>
      </Router>
    );
  }
}

export default App;
