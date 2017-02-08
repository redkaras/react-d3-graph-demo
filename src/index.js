import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import './styles/index.css';

import configureStore from './configureStore';
import { toggleTodo } from './actions/Todo.action';

const store = configureStore({
	todos: [
		{ id: 0, completed: false, text: 'foo' },
		{ id: 1, completed: false, text: 'bar' },
		{ id: 2, completed: false, text: 'hello' }
	]
});

store.dispatch(toggleTodo(1));

ReactDOM.render(
  <Provider store={store}>
  	<App />
  </Provider>,
  document.getElementById('root')
);
