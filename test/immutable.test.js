import test from "ava";
import { expect } from 'chai';
import { List, Map } from 'immutable';

test('immutablility', t => {
	function increment(currentState) {
		return currentState + 1;
	}

	let state = 42;
	let nextState = increment(state);

	expect(nextState).to.equal(43);
	expect(state).to.equal(42);
});

test('A list is immutable', t => {
	function addItem(currentState, item) {
		return currentState.push(item);
	}

	let state = List.of('foo', 'bar');
	let nextState = addItem(state, 'hello');

	expect(nextState).to.equal(List.of(
		'foo',
		'bar',
		'hello'
	));

	expect(state).to.equal(List.of(
		'foo',
		'bar'
	));
});

test('A map is immutable', t => {
	function addItem(currentState, item) {
		return currentState.set(
			'items',
			currentState.get('items').push(item)
		);
	}
	let state = Map({
		items: List.of('foo', 'bar')
	});

	let nextState = addItem(state, 'hello');

	expect(nextState).to.equal(Map({
		items: List.of(
			'foo',
			'bar',
			'hello'
		)
	}));

	expect(state).to.equal(Map({
		items: List.of(
			'foo',
			'bar'
		)
	}));
});
