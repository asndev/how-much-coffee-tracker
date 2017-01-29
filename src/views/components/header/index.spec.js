import React from 'react';
import {render, shallow} from 'enzyme';
import Header from './index';

const noop = () => {};

describe('components', () => {
  describe('Header', () => {
    it('should render a header correctly', () => {
      const wrapper = render(
        <Header authenticated={false} logout={noop}>Foo</Header>);
      const header = wrapper.find('header');

      expect(header.length).toBe(1);
      expect(header.hasClass('header')).toBe(true);
    });

    it('should display `sign-out` when signed in', () => {
      const wrapper = shallow(
        <Header authenticated={true} logout={noop}>Foo</Header>);
      expect(wrapper.contains('Sign out')).toBe(true);
    });

    it('should set `onClick` correctly from props', () => {
      const onClickSpy = jasmine.createSpy('onClickSpy');
      const wrapper = shallow(
        <Header authenticated={true} logout={onClickSpy}>Foo</Header>);

      wrapper.find('a').simulate('click');

      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });
  });
});
