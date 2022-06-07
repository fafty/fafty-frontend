import { render } from '@testing-library/react';

import UploaderPlaceholder from './uploader';

describe('Meta', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UploaderPlaceholder />);
    expect(baseElement).toBeTruthy();
  });
});
