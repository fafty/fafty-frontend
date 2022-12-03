import { EditorState } from 'lexical'
import { PreviewAssetType } from './previewAsset'
import { AssetType } from './asset'

export type BundleAssetsType = {
  assets: AssetType[]
  slug: string
  token: string
}

export type BundleCoverType = {
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

export type BundleType = {
  token: string
  slug: string
  name: string
  description: string | EditorState | null
  items_count?: number
  blockchain?: string
  visibility?: string
  restrictions?: string
  rating?: number
  preview_assets?: PreviewAssetType[]
  likes?: number
  cover: BundleCoverType
  sensitive_content?: boolean
  pool?: string
  deleted_at?: null | string
  published_at?: string
  updated_at?: string
  created_at?: string
}
