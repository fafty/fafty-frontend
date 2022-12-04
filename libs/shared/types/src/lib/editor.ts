import { EditorState } from 'lexical'
import { ChangeEventHandler } from 'react'

export type EditorPropsType = {
  isAutocomplete?: boolean
  maxCharacters?: null | number
  isRichText?: boolean
  showTreeView?: boolean
  initialEditorState: null | string | EditorState
  placeholder?: string
  name: string
  hasError: boolean
  onChange: ChangeEventHandler
  namespace: string
  loading?: boolean
}
