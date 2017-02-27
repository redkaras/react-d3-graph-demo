import { combineReducers } from 'redux';
import { ADD_TODO, TOGGLE_TODO, addTodo,  } from '../actions/Todo.action';

const initialState = [];

export default function todos(state = initialState, action)  {
	switch (action.type) {
		case TOGGLE_TODO:
			return state.map(t => {
				if (t.id === action.payload) {
					return { ...t, completed: !t.completed };
				}
				return t;
			});
		case ADD_TODO:
			return state.concat({
					...action.payload,
					completed: false
				});
		default:
			return state;
	}
};
