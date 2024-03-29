import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
// import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
// import { TypeaheadNode } from './TypeaheadNode'

const nodes = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  CodeNode,
  CodeHighlightNode,
  // TableNode,
  // TableCellNode,
  // TableRowNode,
  AutoLinkNode,
  LinkNode,
  // TypeaheadNode
]

export default nodes
