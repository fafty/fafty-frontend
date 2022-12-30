import { CollectionFormDataType } from '../forms/collection'
import { ApiResponseGeneric } from '../common'
import { CollectionType } from '../collection'
import { GetAssetsResponseType } from '../api/assets'
import { GetBundlesFiltersParamsType } from './bundles'

export type CollectionAssetsType = {
  assets: GetAssetsResponseType
  slug: string
  token: string
}

export type GetCollectionResponseType = ApiResponseGeneric<CollectionType>
export type GetCollectionAssetsBySlugResponseType =
  ApiResponseGeneric<CollectionAssetsType>
export type PutCollectionResponseType = ApiResponseGeneric<CollectionType>

export type PutCollectionParamsType = {
  slug?: string
  collection: CollectionFormDataType
}

export type GetCollectionParamsType = {
  slug?: string
  limit?: number
  offset?: number
}

export type GetCollectionAssetsBySlugFiltersParamsType = {
  cached_assets_count?: {
    lg?: number | string
    ge?: number | string
  }
  price?: {
    lg?: number | string
    ge?: number | string
  }
}

export type GetCollectionAssetsBySlugParamsType = {
  slug: string
  limit: number
  offset: number
  filters?: GetCollectionAssetsBySlugFiltersParamsType
  sort?: string
}
