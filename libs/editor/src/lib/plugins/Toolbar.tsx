import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  COMMAND_PRIORITY_CRITICAL,
  INDENT_CONTENT_COMMAND,
  LexicalEditor,
  OUTDENT_CONTENT_COMMAND,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $getNodeByKey,
} from 'lexical';
import {
  $isParentElementRTL,
  $wrapLeafNodesInElements,
} from '@lexical/selection';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode,
} from '@lexical/list';
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
} from '@lexical/rich-text';
import {
  $createCodeNode,
  $isCodeNode,
  // getDefaultCodeLanguage,
  getCodeLanguages,
} from '@lexical/code';
import { IS_APPLE } from '../enviroments';
import {ReactComponent as TextIndentLeft} from '../icons/text-indent-left.svg'
import {ReactComponent as TextIndentRight} from '../icons/text-indent-right.svg'
import {ReactComponent as ArrowCounterclockwise} from '../icons/arrow-counterclockwise.svg'
import {ReactComponent as ArrowClockwise} from '../icons/arrow-clockwise.svg'
import {ReactComponent as TextParagraph} from '../icons/text-paragraph.svg'
import {ReactComponent as TypeH1} from '../icons/type-h1.svg'
import {ReactComponent as TypeH2} from '../icons/type-h2.svg'
import {ReactComponent as TypeH3} from '../icons/type-h3.svg'
import {ReactComponent as TypeBold} from '../icons/type-bold.svg'
import {ReactComponent as TypeItalic} from '../icons/type-italic.svg'
import {ReactComponent as TypeUnderline} from '../icons/type-underline.svg'
import {ReactComponent as TypeStrikethrough} from '../icons/type-strikethrough.svg'
import {ReactComponent as TextLeft} from '../icons/text-left.svg'
import {ReactComponent as TextRight} from '../icons/text-right.svg'
import {ReactComponent as TextCenter} from '../icons/text-center.svg'
import {ReactComponent as Justify} from '../icons/justify.svg'
import {ReactComponent as ListUl} from '../icons/list-ul.svg'
import {ReactComponent as ListOl} from '../icons/list-ol.svg'
import {ReactComponent as ChatSquareQuote} from '../icons/chat-square-quote.svg'
import {ReactComponent as Code} from '../icons/code.svg'

import Dropdown from '../ui/dropdown';

const supportedBlockTypes: Set<string> = new Set([
  'paragraph',
  'quote',
  'code',
  'h1',
  'h2',
  'h3',
  'ul',
  'ol',
]);

const codeLanguageOptions = [
  { value: '', label: 'Select language' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'plain', label: 'Plain Text' },
];

const codeLanguageMap: object = {
  md: 'markdown',
  plaintext: 'plain',
  text: 'plain',
};

// Divider between butons and dropdown menus on the toolbar.
function Divider(): JSX.Element {
  return (
    <div className="flex items-center justify-center">
      <div className="max-h-2.5 w-[1px] opacity-15 bg-gray-300 dark:bg-neutral-700">
        &nbsp;
      </div>
    </div>
  );
}

function Select({
  ariaLabel,
  className,
  onChange,
  options,
  value,
}: {
  ariaLabel?: string;
  className: string;
  onChange: (event: { target: { value: string } }) => void;
  options: { value: string; label: string }[];
  value: string;
}): JSX.Element {
  return (
    <select
      aria-label={ariaLabel}
      className={className}
      onChange={onChange}
      value={value}
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}

// Dropdown list for block types
function BlockOptionsDropdown({
  editor,
  blockType,
}: {
  editor: LexicalEditor;
  blockType: string;
}): JSX.Element {
  // action is function used to format the block
  // command: LexicalCommand<void>
  const action = ({ type, command }: { type: string; command: any }) => {
    if (blockType !== type) {
      if (['ul', 'ol'].includes(type)) {
        editor.dispatchCommand(command, null);
      } else {
        editor.update(() => {
          const selection = $getSelection();

          if ($isRangeSelection(selection)) {
            $wrapLeafNodesInElements(selection, command);
          }
        });
      }
    } else if (['ul', 'ol'].includes(type)) {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, null);
    }
  };

  const blockTypeButtons = [
    {
      type: 'paragraph',
      label: 'Paragraph',
      ariaLabel: 'Paragraph',
      icon: <TextParagraph className="w-4 h-4" aria-hidden="true" />,
      command: () => $createParagraphNode(),
    },
    {
      type: 'h1',
      label: 'Large Heading',
      ariaLabel: 'Large Heading',
      icon: <TypeH1 className="w-4 h-4" aria-hidden="true" />,
      command: () => $createHeadingNode('h1'),
    },
    {
      type: 'h2',
      label: 'Small Heading',
      ariaLabel: 'Small Heading',
      icon: <TypeH2 className="w-4 h-4" aria-hidden="true" />,
      command: () => $createHeadingNode('h2'),
    },
    {
      type: 'h3',
      label: 'Heading',
      ariaLabel: 'Heading',
      icon: <TypeH3 className="w-4 h-4" aria-hidden="true" />,
      command: () => $createHeadingNode('h3'),
    },
    {
      type: 'ul',
      label: 'Bullet List',
      ariaLabel: 'Bullet List',
      title: 'Bullet List',
      icon: <ListUl className="w-4 h-4" aria-hidden="true" />,
      command: INSERT_UNORDERED_LIST_COMMAND,
    },
    {
      type: 'ol',
      label: 'Numbered List',
      ariaLabel: 'Numbered List',
      title: 'Numbered List',
      icon: <ListOl className="w-4 h-4" aria-hidden="true" />,
      command: INSERT_ORDERED_LIST_COMMAND,
    },
    {
      type: 'quote',
      label: 'Quote',
      ariaLabel: 'Quote',
      icon: <ChatSquareQuote className="w-4 h-4" aria-hidden="true" />,
      command: () => $createQuoteNode(),
    },
    {
      type: 'code',
      label: 'Code Block',
      ariaLabel: 'Code Block',
      icon: <Code className="w-4 h-4" aria-hidden="true" />,
      command: () => $createCodeNode(),
    },
  ];

  return (
    <Dropdown
      buttonIcon={
        blockType && blockTypeButtons.find((x) => x.type === blockType)?.icon
      }
      buttonLabel={
        blockType && blockTypeButtons.find((x) => x.type === blockType)?.label
      }
      buttonClassName="w-auto h-7 md:h-8 rounded-md lg:rounded-lg px-2 hover:bg-blue-100 dark:hover:bg-neutral-600 box-border justify-center p-0 m-0 cursor-pointer flex   dark:text-gray-200 touch-manipulation items-center select-none border-0 text-sm list-none outline-none decoration-0 transition duration-250 ease-in-out"
      buttonAriaLabel="Formatting options for text alignment"
    >
      {blockTypeButtons.map((button) => (
        <div
          role="button"
          aria-label={button.ariaLabel}
          className="focus:outline-none flex items-center rounded h-7 transition duration-150 ease-in-out text-neutral-700 hover:bg-blue-100 dark:text-neutral-100 dark:hover:bg-neutral-700"
          key={button.type}
          onClick={() => {
            action({ type: button.type, command: button.command });
          }}
        >
          <div className="ml-2 justify-center">{button.icon}</div>
          <div className="mx-2 text-sm">{button.label}</div>
        </div>
      ))}
    </Dropdown>
  );
}

// Dropdown list for align text
function AlignOptionsDropdown({
  editor,
  align,
}: {
  editor: LexicalEditor;
  align: { left: boolean; center: boolean; right: boolean; justify: boolean };
}): JSX.Element {
  // array of align buttons used to create the dropdown list
  const alignsButtons = [
    {
      value: 'left',
      ariaLabel: 'Left',
      active: align.left,
      icon: <TextLeft className="w-4 h-4" aria-hidden="true" />,
    },
    {
      value: 'center',
      ariaLabel: 'Align Center',
      active: align.center,
      icon: <TextCenter className="w-4 h-4" aria-hidden="true" />,
    },
    {
      value: 'right',
      ariaLabel: 'Align Right',
      active: align.right,
      icon: <TextRight className="w-4 h-4" aria-hidden="true" />,
    },
    {
      value: 'justify',
      ariaLabel: 'Justify',
      active: align.justify,
      icon: <Justify className="w-4 h-4" aria-hidden="true" />,
    },
  ];
  const action = (value: string) => {
    editor?.dispatchCommand(FORMAT_ELEMENT_COMMAND, value);
  };

  return (
    <Dropdown
      buttonIcon={
        (alignsButtons.find((x) => x.active) || alignsButtons[0]).icon
      }
      buttonClassName="toolbar-item block-controls w-auto h-7 md:h-8 rounded-md lg:rounded-lg px-2 hover:bg-blue-100 dark:hover:bg-neutral-600 box-border justify-center p-0 m-0 cursor-pointer flex   dark:text-gray-200 touch-manipulation items-center select-none border-0 list-none outline-none decoration-0 transition duration-250 ease-in-out"
      buttonAriaLabel="Formatting options for text alignment"
      dropdownBlockClassName="grid gap-1 p-2 grid-flow-col"
    >
      {alignsButtons.map((button) => (
        <div
          role="button"
          aria-label={button.ariaLabel}
          title={button.ariaLabel}
          className={`${
            button.active ? 'bg-blue-100 dark:bg-neutral-700' : ''
          } focus:outline-none flex items-center rounded h-7 w-7 justify-center transition duration-150 ease-in-out text-neutral-700 hover:bg-blue-100 dark:text-neutral-100 dark:hover:bg-neutral-700`}
          key={button.value}
          onClick={() => {
            action(button.value);
          }}
        >
          <span
            className={`${
              button.active ? 'text-blue-500 dark:text-slate-50' : ''
            }`}
          >
            {button.icon}
          </span>
        </div>
      ))}
    </Dropdown>
  );
}

export default function ToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);
  const [blockType, setBlockType] = useState<string>('paragraph');
  const [selectedElementKey, setSelectedElementKey] = useState<string | null>(
    null
  );
  const [codeLanguage, setCodeLanguage] = useState<string>('');
  const [isRTL, setIsRTL] = useState(false);
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);
  const [isStrikethrough, setIsStrikethrough] = useState<boolean>(false);
  const [isCode, setIsCode] = useState<boolean>(false);

  const [alignText, setAlignText] = useState<{
    left: boolean;
    center: boolean;
    right: boolean;
    justify: boolean;
  }>({
    left: false,
    center: false,
    right: false,
    justify: false,
  });

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList
            ? // @ts-expect-error Property 'getTag' does not exist on type 'LexicalNode'.
              parentList.getTag()
            : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
          if ($isCodeNode(element)) {
            const language = element.getLanguage();
            setCodeLanguage(
              language
                ? codeLanguageMap[language as keyof typeof codeLanguageMap] ||
                    language
                : ''
            );
            return;
          }
        }
      }
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsCode(selection.hasFormat('code'));
      setIsRTL($isParentElementRTL(selection));
      setAlignText({
        left: element.getFormat() === 1,
        center: element.getFormat() === 2,
        right: element.getFormat() === 3,
        justify: element.getFormat() === 4,
      });
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar();
          setActiveEditor(newEditor);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [activeEditor, updateToolbar]);

  // const codeLanguges = useMemo(() => getCodeLanguages(), []);
  const onCodeLanguageSelect = useCallback(
    (e: { target: { value: string } }) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(e.target.value);
          }
        }
      });
    },
    [editor, selectedElementKey]
  );

  const historyButtons = [
    {
      type: 'undo',
      ariaLabel: 'Undo',
      title: IS_APPLE ? 'Undo (⌘+Z)' : 'Undo (Ctrl+Z)',
      disabled: !canUndo,
      icon: <ArrowCounterclockwise className="h-4 w-4" aria-hidden="true" />,
      command: UNDO_COMMAND,
    },
    {
      type: 'redo',
      ariaLabel: 'Redo',
      title: IS_APPLE ? 'Redo (⌘+Y)' : 'Undo (Ctrl+Y)',
      disabled: !canRedo,
      icon: <ArrowClockwise className="h-4 w-4" aria-hidden="true" />,
      command: REDO_COMMAND,
    },
  ];
  const baseButtons = [
    {
      type: 'bold',
      ariaLabel: `Format text as bold. Shortcut: ${IS_APPLE ? '⌘B' : 'Ctrl+B'}`,
      active: isBold,
      title: IS_APPLE ? 'Bold (⌘+B)' : 'Bold (Ctrl+B)',
      icon: <TypeBold className="w-4 h-4" aria-hidden="true" />,
    },
    {
      type: 'italic',
      ariaLabel: `Format text as italic. Shortcut: ${
        IS_APPLE ? '⌘I' : 'Ctrl+I'
      }`,
      active: isItalic,
      title: IS_APPLE ? 'Italic (⌘+I)' : 'Italic (Ctrl+I)',
      icon: <TypeItalic className="w-4 h-4" aria-hidden="true" />,
    },
    {
      type: 'underline',
      ariaLabel: `Format text to underlined. Shortcut: ${
        IS_APPLE ? '⌘U' : 'Ctrl+U'
      }`,
      active: isUnderline,
      title: IS_APPLE ? 'Underline (⌘+U)' : 'Underline (Ctrl+U)',
      icon: <TypeUnderline className="w-4 h-4" aria-hidden="true" />,
    },
    {
      type: 'strikethrough',
      ariaLabel: `Format text to strikethrough. Shortcut: ${
        IS_APPLE ? '⌘S' : 'Ctrl+S'
      }`,
      active: isStrikethrough,
      title: IS_APPLE ? 'Strikethrough (⌘+S)' : 'Strikethrough (Ctrl+S)',
      icon: <TypeStrikethrough className="w-4 h-4" aria-hidden="true" />,
    },
    {
      type: 'code',
      ariaLabel: `Format text as code. Shortcut: ${IS_APPLE ? '⌘K' : 'Ctrl+K'}`,
      active: isCode,
      title: IS_APPLE ? 'Code (⌘+K)' : 'Code (Ctrl+K)',
      icon: <Code className="w-4 h-4" aria-hidden="true" />,
    },
  ];
  const additionalButtons = [
    {
      type: 'outdent',
      ariaLabel: 'Outdent',
      title: 'Outdent',
      icon: isRTL ? (
        <TextIndentLeft className="w-4 h-4" aria-hidden="true" />
      ) : (
        <TextIndentRight className="w-4 h-4" aria-hidden="true" />
      ),
      command: OUTDENT_CONTENT_COMMAND,
    },
    {
      type: 'indent',
      ariaLabel: 'Indent',
      title: 'Indent',
      icon: isRTL ? (
        <TextIndentRight className="w-4 h-4" aria-hidden="true" />
      ) : (
        <TextIndentLeft className="w-4 h-4" aria-hidden="true" />
      ),
      command: INDENT_CONTENT_COMMAND,
    },
  ];
  return (
    <div
      className="grid grid-flow-col auto-cols-max gap-1 place-items-center bg-white dark:bg-neutral-800 p-2 rounded-t-lg"
      ref={toolbarRef}
    >
      {historyButtons.map((button) => (
        <div
          role="button"
          title={button.title}
          aria-label={button.ariaLabel}
          className={`${
            button.disabled
              ? 'cursor-not-allowed opacity-50'
              : 'hover:bg-blue-100 dark:hover:bg-neutral-600'
          } disabled:opacity-75 h-7 w-7 md:h-8 md:w-8 rounded-lg box-border justify-center p-0 m-0 cursor-pointer flex   dark:text-gray-200 touch-manipulation items-center select-none border-0 list-none outline-none decoration-0 transition duration-250 ease-in-out`}
          key={button.type}
          onClick={() => {
            activeEditor.dispatchCommand(button.command, null);
          }}
        >
          {button.icon}
        </div>
      ))}
      <Divider />
      {supportedBlockTypes.has(blockType) && (
        <>
          <BlockOptionsDropdown editor={activeEditor} blockType={blockType} />
          <Divider />
        </>
      )}
      {blockType === 'code' ? (
        <>
          <Select
            className="toolbar-item code-language h-8 rounded-lg hover:bg-blue-100 dark:hover:bg-neutral-600 box-border justify-center p-0 m-0 cursor-pointer flex   dark:text-gray-200 touch-manipulation items-center select-none border-0 list-none outline-none decoration-0 transition duration-250 ease-in-out"
            onChange={onCodeLanguageSelect}
            options={codeLanguageOptions}
            value={codeLanguage}
          />
          <i className="chevron-down inside" />
        </>
      ) : (
        <>
          {baseButtons.map((button) => (
            <div
              role="button"
              title={button.title}
              aria-label={button.ariaLabel}
              className={`${
                button.active ? 'bg-blue-100 dark:bg-neutral-700' : ''
              } h-7 w-7 md:h-8 md:w-8 rounded-md lg:rounded-lg hover:bg-blue-100 dark:hover:bg-neutral-600 box-border justify-center p-0 m-0 cursor-pointer flex   dark:text-gray-200 touch-manipulation items-center select-none border-0 list-none outline-none decoration-0 transition duration-250 ease-in-out`}
              key={button.type}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, button.type);
              }}
            >
              <span
                className={`${
                  button.active ? 'text-blue-500 dark:text-slate-50' : ''
                }`}
              >
                {button.icon}
              </span>
            </div>
          ))}
          <Divider />
          <AlignOptionsDropdown editor={editor} align={alignText} />
          <Divider />
          {additionalButtons.map((button) => (
            <div
              role="button"
              title={button.title}
              aria-label={button.ariaLabel}
              className="h-7 w-7 md:h-8 md:w-8 rounded-md lg:rounded-lg hover:bg-blue-100 dark:hover:bg-neutral-600 box-border justify-center p-0 m-0 cursor-pointer flex   dark:text-gray-200 touch-manipulation items-center select-none border-0 list-none outline-none decoration-0 transition duration-250 ease-in-out"
              key={button.type}
              onClick={() => {
                activeEditor.dispatchCommand(button.command, null);
              }}
            >
              {button.icon}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
