import { EditorState } from 'lexical'
import {
  CommentsModerationType,
  CommentsOrderType,
  TagType,
  FileType
} from '../common'

export interface AssetFormDataType {
  media: FileType | null
  name: string | null
  description: string | EditorState | null
  unlockable_content: string | EditorState | null
  sensitive_content: boolean
  supply_units: number | null
  blockchain: string
  collection_token: string
  allow_ratings: boolean
  comments_moderation: CommentsModerationType
  comments_order: CommentsOrderType
  tags: TagType[] | null
}
