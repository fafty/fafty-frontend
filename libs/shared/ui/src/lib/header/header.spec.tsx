import { render } from '@testing-library/react';

import Header from './header';

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
describe('Header', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Header address={undefined} balance={0} isAuth={false} onLogOut={()=> (console.log('logout'))} />);
    expect(baseElement).toBeTruthy();
  });
});
