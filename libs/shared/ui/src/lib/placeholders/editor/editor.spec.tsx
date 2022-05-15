import { render } from '@testing-library/react';

import EditorPlaceholder from './editor';

describe('Meta', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditorPlaceholder title={''} description={''} />);
    expect(baseElement).toBeTruthy();
  });
});
