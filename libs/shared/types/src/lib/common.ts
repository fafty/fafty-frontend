export type ApiResponseGeneric<T> = T extends unknown[]
  ? { records: T }
  : { record: T }

export type CommentsModerationType =
  | 'allow_all'
  | 'automoderation'
  | 'hold_all'
  | 'disabled'

export type CommentsOrderType = 'interesting' | 'newest'

export type BillingTypeValue = 'fixed_price' | 'auction' | null

export type TagType = {
  active: boolean
  name: string
  slug: string
  description: string
  bundles_count: number
  collections_count: number
  assets_count: number
  updated_at: string
  created_at: string
}

export type PaginateType = {
  count: number
  limit: number
  offset: number
}

export type PaginateWrapperType = {
  paginate: PaginateType
}

export type FileType = {
  id: string
  src?: string
  file_id?: string
  storage: string
  metadata: {
    size: number
    filename: string
    mime_type: string
  }
}

export interface FormStepDataType<T> {
  state: T
  solved: boolean
  error: boolean
}
