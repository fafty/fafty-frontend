import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';

import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import BaseTheme from './themes/base';
import AutoLinkPlugin from './plugins/AutoLink';
import AutocompletePlugin from './plugins/Autocomplete';
import TreeViewPlugin from './plugins/TreeView';
import ToolbarPlugin from './plugins/Toolbar';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevel';
import CodeHighlightPlugin from './plugins/CodeHighlight';
import {EditorState, LexicalEditor} from 'lexical';
import nodes from './nodes/nodes';
import { ChangeEvent, EventHandler } from 'react';

type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent<T>>;

const Placeholder = ({ text }: {text: string} ): JSX.Element => {
  return (
    <div
      className="editor-placeholder absolute text-ellipsis overflow-hidden top-4 left-4 select-none inline-block pointer-events-none text-base text-gray-400 dark:text-gray-500"
    >
      {text}
    </div>
  );
}

const initialConfig = {
  nodes: [...nodes],
  // The editor theme
  theme: BaseTheme,
  // Handling of errors during update
  onError(error: Error, editor: LexicalEditor): void {
    throw error;
  }
};

interface Props {
  isAutocomplete?: boolean,
  maxCharacters?: null | number,
  isRichText?: boolean,
  showTreeView?: boolean
  initialEditorState: null | string | EditorState
  placeholder?: string
  name?: string
  hasError?: boolean
  onChange: ChangeEventHandler
}
const Editor = ({
  isAutocomplete = true,
  maxCharacters = null,
  isRichText = true,
  showTreeView = false,
  initialEditorState = null,
  placeholder = 'Enter some description...',
  hasError = false,
  onChange
}: Props ): JSX.Element => {

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div
        {
          ...(hasError && {'aria-invalid': true})
        }
        className={`editor-container ${hasError ? 'border-red-500' : 'border-gray-100 dark:border-neutral-800' } relative mt-1 mx-auto text-black leading-5 font-normal text-left rounded-lg border  shadow ${showTreeView ? 'tree-view' : ''} ${
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
                  <ContentEditable
                    {
                      ...(hasError && {'aria-invalid': true})
                    }
                    className="editor-input relative min-h-[150px] text-base caret-current outline-none py-4 px-4 overflow-hidden"
                  />
                }
                placeholder={<Placeholder text={placeholder} />}
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
                  <ContentEditable
                    {
                      ...(hasError && {'aria-invalid': true})
                    }
                    className="editor-input relative min-h-[150px] text-base caret-current outline-none py-4 px-4 overflow-hidden"
                  />
                }
                placeholder={<Placeholder text={placeholder} />}
                initialEditorState={ initialEditorState }
              />
              <HistoryPlugin />
            </>
          )}
          { maxCharacters && <CharacterLimitPlugin charset={'UTF-8'} /> }
          { isAutocomplete && <AutocompletePlugin /> }
        </div>
        <OnChangePlugin
          ignoreSelectionChange={true}
          onChange={
            editorState => onChange(
              // @ts-expect-error Argument of type 'SerializedEditorState' is not assignable to parameter of type 'ChangeEvent<Element>'. Type 'SerializedEditorState' is missing the following properties from type 'ChangeEvent<Element>': target, nativeEvent, currentTarget,
              editorState.toJSON()
            )
          }
        />
        { showTreeView && <TreeViewPlugin /> }
      </div>
    </LexicalComposer>
  );
}

export default Editor;
