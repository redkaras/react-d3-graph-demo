import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/index.css';

import configureStore from './configureStore';
import { toggleTodo } from './actions/todo.action';

const store = configureStore({
	todos: [
		{ id: 0, completed: false, text: 'foo' },
		{ id: 1, completed: false, text: 'bar' },
		{ id: 2, completed: false, text: 'hello' }
	]
});

store.dispatch(toggleTodo(1));

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
