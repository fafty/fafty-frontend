
/**
 * @jest-environment ./src/specs/custom-environment-with-textencoder
 */
import React from 'react';
import { render } from '@testing-library/react';
import Index from '../pages/index';

import { mockIntersectionObserver } from 'jsdom-testing-mocks'
mockIntersectionObserver()

jest.mock('next/router', () => ({
  useRouter() {
    return ({
      route: '/', 
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    });
  },
}));


describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Index />);
    expect(baseElement).toBeTruthy();
  });
});
