import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/todo.reducer.js';
import createLogger from 'redux-logger';

export default function configureStore(initialState) {
	const middleware = [
		// add common middleware
	].concat(process.env.NODE_ENV === 'development' ? [createLogger()] : []);

	const store = createStore(
		rootReducer,
		initialState,
		applyMiddleware(...middleware)
	);

	return store;
}
