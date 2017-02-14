import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import expect from 'expect';

import Header from './index';

const noop = () => {};
const user = {
  authUser: {
    displayName: 'peter'
  }
};

describe('Header Test', () => {
  let node;

  beforeEach(() => {
    node = document.createElement('div');
  });

  afterEach(() => {
    unmountComponentAtNode(node);
  });

  it('should render a header correctly', () => {
    render(
      <Header user={null} logout={noop}>Foo</Header>,
      node,
      () => {
        expect(node.textContent).toContain('How much Coffee');
      }
    );
  });

  it('should display `sign-out` when signed in', () => {
    render(
      <Header user={user} logout={noop}>Foo</Header>,
      node,
      () => {
        expect(node.textContent).toContain('Sign out');
      }
    );
  });
});
