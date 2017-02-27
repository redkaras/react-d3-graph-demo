import React, { PropTypes, Component } from 'react';

class Todo extends Component {
	constructor(props) {
		super(props);
	}

	onClick() {
		this.props.onToggle(this.props.id);
	}

	render() {
		return (
			<li
				style={{textDecoration: this.props.completed ? 'line-through': 'none'}}
				onClick={this.onClick.bind(this)}
			>
				{this.props.text}
			</li>
		);
	}
}

Todo.propTypes = {
	id: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
	completed: PropTypes.bool.isRequired,
	onToggle: PropTypes.func.isRequired,
};

export default Todo;
