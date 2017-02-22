import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux'

import rootReducer from './reducers/Todo.reducer.js';
import createLogger from 'redux-logger';

export default function configureStore(initialState) {
	const middleware = [
		// add common middleware
	].concat(process.env.NODE_ENV === 'development' ? [createLogger()] : []);

	const store = createStore(
		combineReducers({
	    ...rootReducer,
	    routing: routerReducer
	  }),
		applyMiddleware(...middleware)
	);

	return store;
}
