import test from 'ava';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TodoList from '../../src/components/TodoList';
import { toggleTodo } from '../../src/actions/Todo.action';

const mockStore = configureStore();
const initialState = {
	todos: [
		{ id: 0, completed: false, text: 'foo' },
		{ id: 1, completed: false, text: 'bar' },
		{ id: 2, completed: false, text: 'hello' }
	]
};

test('dispatches toggleTodo action', t => {
	const store = mockStore(initialState);
	const wrapper = mount(
		<Provider store={store}>
			<TodoList />
		</Provider>
	);
	wrapper.find('Todo').at(0).simulate('click');
	t.deepEqual(store.getActions(), [toggleTodo(0)]);
});
