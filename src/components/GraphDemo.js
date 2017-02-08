import React, { Component } from 'react';
import * as d3 from 'd3';

class GraphDemo extends Component {
	constructor(props) {
		super(props);
		console.log(d3);
	}

	componentWillMount() {
		console.log("componentWillMount");
	}

	render() {
		return (
			<svg>
				<g transform="translate(10, 20)">
					<rect width="800" height="600" stroke="black" fill="green" />
					<circle cx="100" cy="50" r="50" stroke="black"  fill="red"/>
				</g>
			</svg>
		);
	}
}

export default GraphDemo;
