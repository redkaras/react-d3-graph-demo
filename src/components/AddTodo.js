import React, { PropTypes, Component } from 'react';

class AddTodo extends Component {
	constructor(props) {
		super(props);
	}

	handleKeyPress(event) {
		if(event.target.value && event.keyCode === 13) {
			let value = event.target.value;
			event.target.value = "";
			this.props.onAddTodo(this.props.todos.length, value);
		}
	}

	render() {
		return (
			<input type="text" onKeyUp={this.handleKeyPress.bind(this)} />
		);
	}
}

AddTodo.propTypes = {
	onAddTodo: PropTypes.func.isRequired,
};

export default AddTodo;
