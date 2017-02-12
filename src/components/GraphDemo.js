import React, { Component } from 'react';
import * as d3 from 'd3';

class GraphDemo extends Component {
	constructor(props) {
		super(props);
		this.url = "http://localhost:3001/getDemoGraph/589e535c8f5b09393861ab1c";
	}

	componentWillMount() {
		console.log("componentWillMount");
	}

	render() {
		return (
			<svg>
				<g transform="translate(10, 20)">
					<rect width="800" height="600" stroke="black" fill="black" />
					<circle cx="400" cy="300" r="300" stroke="black"  fill="red"/>
				</g>
			</svg>
		);
	}
}

export default GraphDemo;
