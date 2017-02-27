import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
// import TodoList from './TodoList';
// import GraphDemo from './GraphDemo';

export default function App({ children }) {
  return (
    <div>
      <header>
        Links:
        {' '}
        <Link to="/Test">Test</Link>
        {' '}
        <Link to="/GraphDemo">Graph</Link>
        {' '}
        <Link to="/TodoList">TodoList</Link>
      </header>
      <div>
        <button onClick={() => browserHistory.push('/GraphDemo')}>Go to /GraphDemo</button>
      </div>
      <div style={{ marginTop: '1.5em' }}>{children}</div>
    </div>
  )
}
