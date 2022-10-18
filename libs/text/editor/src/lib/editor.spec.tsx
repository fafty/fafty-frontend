import { render } from '@testing-library/react';

import Editor from './editor';

describe('Editor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Editor
        initialEditorState={null}
        onChange={function (editorState: JSON): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
