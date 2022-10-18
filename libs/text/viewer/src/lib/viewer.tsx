import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import BaseTheme from './themes/base';
import { EditorState, LexicalEditor } from 'lexical';
import nodes from './nodes/nodes';
const Placeholder = ({ text }: { text: string }): JSX.Element => {
  return (
    <div className="editor-placeholder absolute text-ellipsis overflow-hidden top-4 left-4 select-none inline-block pointer-events-none text-base text-gray-400 dark:text-gray-500">
      {text}
    </div>
  );
};

interface Props {
  showTreeView?: boolean;
  editorState: null | string | EditorState;
  placeholder?: string;
  name?: string;
  namespace: string;
  loading?: boolean;
}

const Viewer = ({
  showTreeView = false,
  editorState = null,
  placeholder = 'Enter some description...',
  namespace = 'description',
  loading = false,
}: Props): JSX.Element => {

  const initialConfig = {
    nodes: [...nodes],
    // The editor theme
    theme: BaseTheme,
    editable: false,
    // Handling of errors during update
    onError(error: Error, editor: LexicalEditor): void {
      throw error;
    },
    namespace: namespace,
    editorState: JSON.stringify(editorState),
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
        <PlainTextPlugin
          contentEditable={
            <ContentEditable
            />
          }
          placeholder={<Placeholder text={placeholder} />}
        />
      {/* {showTreeView && <TreeViewPlugin />} */}
    </LexicalComposer>
  );
};

export default Viewer;
