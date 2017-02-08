import React, { Component } from 'react';
import logo from '../styles/logo.svg';
import '../styles/App.css';

// import TodoList from './TodoList';
import GraphDemo from './GraphDemo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React d3 graph demo</h2>
        </div>
        <GraphDemo />
      </div>
    );
  }
}

export default App;
