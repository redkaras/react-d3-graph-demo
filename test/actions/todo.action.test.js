import test from 'ava';
import { toggleTodo, TOGGLE_TODO } from '../../src/actions/Todo.action';

test('toggleTodo action', t => {
	t.deepEqual(toggleTodo(10), {
		type: TOGGLE_TODO,
		payload: 10
	});
});
