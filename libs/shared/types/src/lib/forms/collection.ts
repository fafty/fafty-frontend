import { EditorState } from 'lexical'
import { AssetType } from '../asset'
import {
  FileType,
  TagType,
  CommentsOrderType,
  CommentsModerationType
} from '../common'

export type CollectionFormDataType = {
  cover: FileType | null
  name: string | null
  description: string | EditorState | null
  assets: AssetType[] | null
  allow_ratings: boolean
  comments_moderation: CommentsModerationType
  comments_order: CommentsOrderType
  tags: TagType[] | null
}
