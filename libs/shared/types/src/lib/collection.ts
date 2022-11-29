import { EditorState } from 'lexical'
import { AssetType } from './asset'

export type CollectionCoverType = {
  dominant_color: string | null
  file_id: string
  filename: string
  height: number
  mime_type: string
  size: number
  src: string
  storage: string
  type: string
  width: number
}

export type CollectionType = {
  token: string
  slug: string
  name: string
  description: string | EditorState | null
  supply?: number
  owners_count?: number
  floor_price?: number
  listed_count?: number
  sales_count?: number
  sales_volume?: number
  blockchain?: string
  visibility?: string
  restrictions?: string
  rating?: number
  preview_assets?: AssetType[]
  likes?: number
  cover: CollectionCoverType
  banner?: null | string
  sensitive_content?: boolean
  pool?: string
  deleted_at?: null | string
  published_at?: string
  updated_at?: string
  created_at?: string
}
