# Fafty Web Text Editor library

## Basic usage

1. Base import

```javascript
import Editor from '@fafty-frontend/text/editor'

const onEditorChange = (text-editorState: JSON) => {
  // your code
}

export default function MyComponent() {
  return (
    <Editor initialEditorState={null} onChange={onEditorChange} />
  );
}
```

2. Dynamic import and placeholder

```javascript

import dynamic from 'next/dynamic'

import { EditorPlaceholder } from '@fafty-frontend/shared/ui';

interface EditorProps {
  isAutocomplete?: boolean
  maxCharacters?: null | number
  isRichText?: boolean
  showTreeView?: boolean
  initialEditorState: null | string
  onChange: (text-editorState: JSON) => void
}
const Editor = dynamic<EditorProps>(() => import('@fafty-frontend/text/editor').then((mod) => mod.Editor), {
  ssr: false, loading: () => <EditorPlaceholder />
});

const onEditorChange = (text-editorState: JSON) => {
  // your code
}

export default function MyComponent() {
  return (
    <Editor initialEditorState={null} onChange={onEditorChange} />
  );
}
```

Based on [Facebook Lexical](https://lexical.dev) - An extensible text text-editor framework

## Running unit tests

Run `nx test text-editor` to execute the unit tests via [Jest](https://jestjs.io).
