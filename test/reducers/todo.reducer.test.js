import test from 'ava';
import { todos } from '../../src/reducers/todo.reducer';
import { toggleTodo } from '../../src/actions/todo.action';

test('todo reducer', t => {
	t.deepEqual(todos([
			{ id: 0, completed: false, text: 'foo' },
			{ id: 1, completed: false, text: 'bar' },
			{ id: 2, completed: false, text: 'hello' }
		], toggleTodo(1)),
		[
			{ id: 0, completed: false, text: 'foo' },
			{ id: 1, completed: true, text: 'bar' },
			{ id: 2, completed: false, text: 'hello' }
		]);
});
