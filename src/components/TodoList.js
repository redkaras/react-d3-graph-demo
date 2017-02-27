import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { addTodo, toggleTodo } from '../actions/Todo.action';

const TodoList = props => (
	<div>
		<AddTodo {...props} onAddTodo={props.addTodo} />
	  <ul style={{ textAlign: 'left' }}>
			{props.todos.map(todo => (
				<Todo
					key={todo.id}
					{...todo}
					onToggle={props.toggleTodo}
				/>
			))}
		</ul>
		
	</div>
);

TodoList.propTypes = {
	todos: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		text: PropTypes.string.isRequired,
		completed: PropTypes.bool.isRequired,
	})).isRequired,
	toggleTodo: PropTypes.func.isRequired,
	routing: PropTypes.Any
};

const mapStateToProps = (state) => {
	return {
		todos: state.todo
	};
};

const actionCreators = {
	toggleTodo,
	addTodo
};

export default connect(
	mapStateToProps,
	actionCreators
)(TodoList);
