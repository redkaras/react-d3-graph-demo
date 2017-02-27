import React, { Component } from 'react';
import * as d3 from 'd3';
import dagre from 'dagre';
import dagreD3 from 'dagre-d3';
import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();

class GraphDemo extends Component {
	constructor(props) {
		super(props);
		this.url = "http://" + window.location.hostname + ":3001/getDemoGraph";
		this.jsonUrl = "http://" + window.location.hostname + ":3001/test.json";
		this.width = 1400;
		this.height = 800;
		this.state = {
			width: 1400,
			height: 800,
			nodes: [],
			links: []
		}

		this.count = 0;
		this.renderSVG = new dagreD3.render();

		fetch(this.jsonUrl)
			.then(response => response.json())
			.then(response => this.preprocessData(response))
			.then(response => this.bfsSearch(response, "38485_夏舒征", 4))
			.then(response => ({ graph: response}))
			.then(response => this.formatGraphData(response))
			// .then(response => console.log(response))
			.then(data => this.initD3Graph(data));
	}

	processOneNode(nodeMap, node) {
		let _key = node.id + "_" + node.name;
		let newNode = {
			_id: node.id,
			text: node.name,
			refNum: 0,
			nextTo: {},
			children: [],
			type: "main"
		};
		nodeMap[_key] = newNode;

		for (let key in node) {
			if (node[key]) {
				let attribute = node[key];
				if (typeof attribute === "object") {
					let attrKey = (node[key].phone && typeof node[key].phone === "object" ? "phone_" + node[key].phone.id : key + "_" + node[key].id);
					if (!nodeMap[attrKey]) {
						nodeMap[attrKey] = {
							_id: node[key].id,
							text: node[key].name || node[key].colleagueName || node[key].familyName || node[key].friendName,
							refNum: 0,
							nextTo: {},
							children: [],
							type: "attr"
						};
					}
					if (!newNode.nextTo[attrKey]) newNode.refNum++;
					newNode.nextTo[attrKey] = true;
					if (!nodeMap[attrKey].nextTo[_key]) nodeMap[attrKey].refNum++;
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
		var g = new dagre.graphlib.Graph();
		g.setGraph({});
		g.setDefaultEdgeLabel(() => ({}));
		g.graph().rankdir = "LR";
		g.graph().nodesep = 20;
		g.graph().edgesep = 20;
		g.graph().ranksep = 150;
		
		dataObject.graph.nodes.forEach(n => {
			g.setNode(n.index, { text: n.text, width: 10, height: 10, id: n._id})
		});

		dataObject.graph.links.forEach(e => {
			g.setEdge(e.from, e.to)
		});

		dagre.layout(g);
		var reg = /[^\w]/g;
		function convertToAlphabetaKeyObject(obj, reg) {
			var result = {};
			for (var key in obj) {
				var keyArray = key.split(reg);
				var newKey = keyArray[0] + "->" + keyArray[1];
				result[newKey] = obj[key];
			}
			return result;
		}

		g._alphabetaEdgeLabels = convertToAlphabetaKeyObject(g._edgeLabels, reg);

		return {
			nodes: Object.keys(g._nodes).map(k => g._nodes[k]).map( node => ({ id: node.id , text: node.text, x: node.x, y: node.y }) ),
			links: dataObject.graph.links.map( link => ({
				source: link.from,
				target: link.to,
				id: link._id,
				text: link.text,
				points: g._alphabetaEdgeLabels[link.from + "->" + link.to].points
			}) )
		};
	}

	initD3Graph(data) {
		// let svg = this.refs.directedGraph;

		// let simulation = d3.forceSimulation()
		// 	.force("link", d3.forceLink().id(d => d.id))
		// 	.force("charge", d3.forceManyBody())
		// 	.force("center", d3.forceCenter(this.width / 3 + 50, this.height / 2 + 100));
		// let that = this;
		// function close() {
		// 	console.log("close");
		// 	that.ticked();
		// }
		// simulation.nodes(data.nodes).on("tick", close);
		// simulation.force(data.links);

		this.setState({
			nodes: data.nodes,
			links: data.links
		});
	}

	ticked() {
		if (this.count++ > 20) {
			return;
		}
		this.setState(this.state);
	}

				// <g className="links">
				// 	{this.state.links.map(link => (
				// 		<line
				// 			key={link.id}
				// 			x1={this.state.nodes[link.source].x}
				// 			y1={this.state.nodes[link.source].y}
				// 			x2={this.state.nodes[link.target].x}
				// 			y2={this.state.nodes[link.target].y} />
				// 	))}
				// </g>
	// render() {		
	// 	return (
	// 		<svg ref="directedGraph" width="1400" height="1800">
	// 		</svg>
	// 	);
	// }
	render() {		
		return (
			<svg ref="directedGraph" width="1400" height="1800">
				<defs>
					<marker id="idArrow"
         		viewBox="0 0 20 20" refX="0" refY="10"
         		markerUnits="strokeWidth" markerWidth="10" markerHeight="25"
         		orient="auto">
         		<path d="M 0 0 L 20 10 L 0 20 z" fill="purple" stroke="black"/>
      		</marker>
				</defs>
				<g className="links">
					{this.state.links.map(link => (
						<path
							key={link.id}
							stroke="blue"
							strokeWidth="2"
							fill="none" 
							d={ "M " + link.points[0].x + " " + link.points[0].y + " Q " + link.points[1].x + " " + link.points[1].y + "  " + link.points[2].x + " " + link.points[2].y }
							markerEnd="url(#idArrow)" />
					))}
				</g>
				<g className="nodes">
					{this.state.nodes.map(node => (
						<g key={"g_" + node.id}>
							<circle key={node.id} cx={node.x} cy={node.y} r={10} />
							<text x={node.x - 20} y={node.y - 10}>{node.text}</text>
						</g>
					))};
				</g>
			</svg>
		);
	}
}

export default GraphDemo;
