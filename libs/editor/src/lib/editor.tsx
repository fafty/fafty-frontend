import CharacterLimitPlugin from '@lexical/react/LexicalCharacterLimitPlugin';
import LexicalComposer from '@lexical/react/LexicalComposer';
import RichTextPlugin from '@lexical/react/LexicalRichTextPlugin';
import PlainTextPlugin from '@lexical/react/LexicalPlainTextPlugin';
import ContentEditable from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import AutoFocusPlugin from '@lexical/react/LexicalAutoFocusPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import LinkPlugin from '@lexical/react/LexicalLinkPlugin';
import ListPlugin from '@lexical/react/LexicalListPlugin';
import LexicalMarkdownShortcutPlugin from '@lexical/react/LexicalMarkdownShortcutPlugin';
import OnChangePlugin from "@lexical/react/LexicalOnChangePlugin";
// import { useSharedHistoryContext } from './context/SharedHistory';

import AutoLinkPlugin from './plugins/AutoLink';
import AutocompletePlugin from './plugins/Autocomplete';
import BaseTheme from './themes/base';
import TreeViewPlugin from './plugins/TreeView';
import ToolbarPlugin from './plugins/Toolbar';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevel';
import CodeHighlightPlugin from './plugins/CodeHighlight';
import { $getRoot, $getSelection, EditorState } from 'lexical';
import nodes from './nodes/nodes';

const Placeholder = ({ text }: {text: string} ): JSX.Element => {
  return (
    <div
      className="editor-placeholder absolute text-ellipsis overflow-hidden top-4 left-4 select-none inline-block pointer-events-none text-base"
    >
      {text}
    </div>
  );
}

const editorConfig = {
  nodes: [...nodes],
  // The editor theme
  theme: BaseTheme,
  // Handling of errors during update
  onError(error: any) {
    throw error;
  }
};

interface Props {
  isAutocomplete?: boolean,
  maxCharacters?: null | number,
  isRichText?: boolean,
  showTreeView?: boolean
  initialEditorState: null | string | EditorState
  onChange: (editorState: JSON) => void
}
const Editor = ({
  
  isAutocomplete = true,
  maxCharacters = null,
  isRichText = true,
  showTreeView = false,
  initialEditorState = null,
  onChange
}: Props ): JSX.Element => {
 
  return (
    <>
      <LexicalComposer initialConfig={editorConfig}>
        <div
          className={`editor-container relative my-5 mx-auto max-w-[600px] text-black leading-5 font-normal text-left rounded-lg border border-gray-100 dark:border-neutral-800 shadow ${showTreeView ? 'tree-view' : ''} ${
            !isRichText ? 'plain-text' : ''
          }`}
        >
          { isRichText && <ToolbarPlugin /> }
          <AutoFocusPlugin />
          <AutoLinkPlugin />
          <div className="editor-inner relative bg-white dark:bg-neutral-900/90 dark:text-gray-200 overflow-hidden rounded-b-lg">
            { isRichText ? (
              <>     
                <HistoryPlugin />
                <RichTextPlugin
                  contentEditable={
                    <ContentEditable className="editor-input relative min-h-[150px] text-base caret-current outline-none py-4 px-4 overflow-hidden" />
                  }
                  placeholder={<Placeholder text='Enter some description...' />}
                  initialEditorState={ initialEditorState }
                />
                <CodeHighlightPlugin />
                <ListPlugin />
                <ListMaxIndentLevelPlugin maxDepth={7} />
                <LinkPlugin />
              </>
            ) : (
              <>
                <PlainTextPlugin
                  contentEditable={
                    <ContentEditable className="editor-input relative min-h-[150px] text-base caret-current outline-none py-4 px-4 overflow-hidden" />
                  }
                  placeholder={<Placeholder text='Enter some description...' />}
                  initialEditorState={ initialEditorState }
                />
                <HistoryPlugin />
              </>
            )}
            { maxCharacters && (
              <>
                <CharacterLimitPlugin charset={'UTF-8'} />
              </>
            )}
            {isAutocomplete && <AutocompletePlugin />}
          </div>
          <OnChangePlugin
            ignoreSelectionChange={true}
            onChange={
              editorState => onChange(
                // @ts-ignore
                editorState.toJSON()
              )
            }
          />
          { showTreeView && <TreeViewPlugin /> }
        </div>
      </LexicalComposer>
    </>
  );
}

export default Editor;

