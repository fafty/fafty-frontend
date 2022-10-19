import { render } from '@testing-library/react';

import Viewer from './viewer';

describe('Viewer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Viewer
        editorState={null} namespace={''}      />
    );
    expect(baseElement).toBeTruthy();
  });
});
