import React from 'react';
import { IndexRoute, Route, Link, IndexRedirect, Redirect } from 'react-router';

import App from './components/App';
import GraphDemo from './components/GraphDemo';
import Test from './components/Test';

const routes = (
	<Route path='/' component={App}>
		<Route path='test' component={Test} />
		<Route path='GraphDemo' component={GraphDemo} />
	</Route>
);

export default routes;
