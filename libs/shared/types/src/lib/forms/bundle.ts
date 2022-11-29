import { EditorState } from 'lexical'
import {
  CommentsModerationType,
  CommentsOrderType,
  FileType,
  TagType
} from '../common'
import { AssetType } from '../asset'

export type BundleFormDataType = {
  cover: FileType | null
  name: string | null
  description: string | EditorState | null
  assets: AssetType[] | null
  allow_ratings: boolean
  comments_moderation: CommentsModerationType
  comments_order: CommentsOrderType
  tags: TagType[] | null
}
