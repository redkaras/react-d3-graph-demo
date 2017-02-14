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
		// fetch(this.url)
		// 	.then(response => response.json())
		// 	.then(response => this.formatGraphData(response))
		// 	.then(data => this.initD3Graph(data))
			// .catch(err => console.log(err.message))

		fetch(this.jsonUrl)
			.then(response => response.json())
			.then(response => this.preprocessData(response))
			.then(response => this.bfsSearch(response, "38485_夏舒征", 4))
			.then(response => ({ graph: response}))
			.then(response => this.formatGraphData(response))
			.then(data => this.initD3Graph(data));
	}

	processOneNode(nodeMap, node) {
		let _key = node.id + "_" + node.name;
		let newNode = {
			_id: node.id,
			text: node.name,
			refNum: 0,
			nextTo: {}
		};
		nodeMap[_key] = newNode;

		for (let key in node) {
			if (node[key]) {
				let attribute = node[key];
				if (typeof attribute === "object") {
					let attrKey = key + "_" + (node[key].phone && typeof node[key].phone === "object" ? node[key].phone.id : node[key].id);
					if (!nodeMap[attrKey]) {
						nodeMap[attrKey] = {
							"_id": node[key].id,
							"text": node[key].name || node[key].colleagueName || node[key].familyName || node[key].friendName,
							"refNum": 0,
							"nextTo": {}
						};
						nodeMap[attrKey].nextTo[_key] = true;
					}
					newNode.nextTo[attrKey] = true;
					nodeMap[attrKey].nextTo[_key] = true;
				}
			}
		}
	}

	preprocessData(rawData) {
		let nodeMap = {};
		for (let i = 0; i < rawData.length; i++) {
			this.processOneNode(nodeMap, rawData[i]);
		}
		return nodeMap;
	}

	bfsSearch(graph, rootKey, level) {
		let result = {
			nodes: [],
			links: []
		};
		let visited = {};
		let currentLevel = [rootKey];

		while (level-- > 0 && currentLevel.length > 0) {
			let nextLevel = [];
			for (let i = 0; i < currentLevel.length; i++) {
				let _key = currentLevel[i];
				if (visited[_key]) continue;

				let node = graph[_key];
				node.index = result.nodes.length;
				result.nodes.push(node);

				visited[_key] = true;
				for (let nextKey in node.nextTo) {
					if (visited[nextKey]) continue;
					nextLevel.push(nextKey);
					result.links.push({ from: _key, to: nextKey, _id: _key + "_" + nextKey, text: _key + " -> " + nextKey });
				}
			}

			currentLevel = nextLevel;
		}

		for (let index in currentLevel) {
			let _key = currentLevel[index];
			if (!visited[_key]) {
				visited[_key] = true;
				graph[_key].index = result.nodes.length;
				result.nodes.push(graph[_key]);
			}
		}

		for (let index in result.links) {
			let link = result.links[index];
			link.from = graph[link.from].index;
			link.to = graph[link.to].index;
		}

		return result;
	}

	formatGraphData(dataObject) {
		return {
			nodes: dataObject.graph.nodes.map( node => ({ id: node._id , text: node.text }) ),
			links: dataObject.graph.links.map( link => ({
				source: link.from,
				target: link.to,
				id: link._id,
				text: link.text
			}) )
		};
	}

	initD3Graph(data) {
		// let svg = this.refs.directedGraph;

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
			<svg ref="directedGraph" width="1000" height="800">
				<g className="links">
					{this.state.links.map(link => (
						<line
							key={link.id}
							x1={this.state.nodes[link.source].x}
							y1={this.state.nodes[link.source].y}
							x2={this.state.nodes[link.target].x}
							y2={this.state.nodes[link.target].y} />
					))}
				</g>
				<g className="nodes">
					{this.state.nodes.map(node => (
						<g key={"g_" + node.id}>
							<circle key={node.id} cx={node.x} cy={node.y} r={15} />
							<text x={node.x - 10} y={node.y - 20}>{node.text}</text>
						</g>
					))};
				</g>
			</svg>
		);
	}
}

export default GraphDemo;
