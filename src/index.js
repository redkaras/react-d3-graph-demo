import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './configureStore';
import { toggleTodo } from './actions/Todo.action';

import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import './styles/index.css';
import logo from './styles/logo.svg';
import './styles/App.css';

import routes from './routes';

const store = configureStore({
	todos: [
		{ id: 0, completed: false, text: 'foo' },
		{ id: 1, completed: false, text: 'bar' },
		{ id: 2, completed: false, text: 'hello' }
	]
});

//store.dispatch(toggleTodo(1));
const history = syncHistoryWithStore(browserHistory, store);
// history.listen(location => alert(location.pathname));
ReactDOM.render(
  <Provider store={store}>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React d3 graph demo</h2>
        </div>
        <Router history={history} routes={routes} />
      </div>
  </Provider>,
  document.getElementById('root')
);
