import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux'

import rootReducer from './reducers/Todo.reducer.js';
import createLogger from 'redux-logger';

export default function configureStore(initialState) {
	const middleware = [
		// add common middleware
	].concat(process.env.NODE_ENV === 'development' ? [createLogger()] : []);

	const reducer = combineReducers({
    todo: rootReducer,
    routing: routerReducer
  });

	const store = createStore(
		reducer,
	  initialState,
		applyMiddleware(...middleware)
	);

	return store;
}
