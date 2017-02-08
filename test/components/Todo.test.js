import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Todo from '../../src/components/Todo';

test('outputs given text', t => {
	const wrapper = shallow(
		<Todo
			id={1}
			text='foo bar'
			completed={false}
			onToggle={() => {}}
		/>
	);
	t.regex(wrapper.render().text(), /foo bar/);
});

test('has a strikethrough if completed', t => {
	const wrapper = shallow(
		<Todo
			id={1}
			text="foo bar"
			completed
			onToggle={() => {}}
		/>
	);
	t.is(wrapper.prop('style').textDecoration, 'line-through');
});

test('executed callback when clicked with its id', t => {
	const onToggle = sinon.spy();
	const wrapper = shallow(
		<Todo
			id={1}
			text="foo bar"
			completed
			onToggle={onToggle}
		/>
	);
	wrapper.simulate('click');
	t.true(onToggle.calledWith(1));
});
