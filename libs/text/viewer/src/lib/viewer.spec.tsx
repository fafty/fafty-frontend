import { render } from '@testing-library/react';

import Viewer from './viewer';

describe('Viewer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Viewer
        initialEditorState={null}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
