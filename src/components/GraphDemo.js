import React, { Component } from 'react';
import * as d3 from 'd3';
import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();

class GraphDemo extends Component {
	constructor(props) {
		super(props);
		this.url = "http://localhost:3001/getDemoGraph";
		this.jsonUrl = "http://localhost:3001/test.json";
		this.width = 800;
		this.height = 600;
		this.state = {
			width: 800,
			height: 600,
			nodes: [],
			links: []
		}
	}

	componentWillMount() {
		fetch(this.url)
			.then(response => response.json())
			.then(response => this.formatGraphData(response))
			.then(data => this.initD3Graph(data))
			// .catch(err => console.log(err.message))

		fetch(this.jsonUrl)
			.then(response => response.json())
			.then(response => console.log(response));

	}

	processOneNode(nodeMap, node) {
		let _key = node.id + "_" + node.name;
		nodeMap[_key] = node;
		node.refNum = 0;

		for (let key in node) {
			let attribute = node[key];
			if (typeof attribute === "object") {
				let attrKey = key + "_" + node[key].id + "_" + node[key].name;
				if (nodeMap[attrKey]) {
					//pass;
				}
			}
		}
	}

	preprocessData(rawData) {
		let nodeMap = {};
		for (let i = 0; i < rawData.length; i++) {
			this.processOneNode(nodeMap, rawData[i]);
		}
		console.log(nodeMap);
	}

	formatGraphData(dataObject) {
		return {
			nodes: dataObject.graph.nodes.map( node => ({ id: node._id, text: node.text}) ),
			links: dataObject.graph.links.map( link => ({
				source: link.from,
				target: link.to,
				id: link._id,
				text: link.text
			}) )
		};
	}

	initD3Graph(data) {
		let svg = this.refs.directedGraph;

		let simulation = d3.forceSimulation()
			.force("link", d3.forceLink().id(d => d.id))
			.force("charge", d3.forceManyBody())
			.force("center", d3.forceCenter(this.width / 2, this.height / 2));
		let that = this;
		function close() {
			console.log("close");
			that.ticked();
		}
		simulation.nodes(data.nodes).on("tick", close);
		simulation.force(data.links);

		this.setState({
			nodes: data.nodes,
			links: data.links
		});
	}

	ticked() {
		this.setState(this.state);
	}

	render() {
		return (
			<svg ref="directedGraph" width="800" height="600">
				<g className="links">
					{this.state.links.map(link => (<line key={link.id} x1={this.state.nodes[link.source].x} y1={this.state.nodes[link.source].y} x2={this.state.nodes[link.target].x} y2={this.state.nodes[link.target].y} />))}
				</g>
				<g className="nodes">
					{this.state.nodes.map(node => (<g><circle key={node.id} cx={node.x} cy={node.y} r={20} /> <text x={node.x - 10} y={node.y - 20}>{node.text}</text></g> ))};
				</g>		
			</svg>
		);
	}
}

export default GraphDemo;
