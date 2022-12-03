import { CollectionFormDataType } from '../forms/collection'
import { ApiResponseGeneric } from '../common'
import { CollectionType } from '../collection'
import { GetAssetsResponseType } from '../api/assets'

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

export type GetCollectionAssetsBySlugParamsType = {
  slug: string
  limit: number
  offset: number
  filters?: {
    currency?: string
    price?: {
      lg?: number | string
      ge?: number | string
    }
    // billing_type?: BillingTypeValue;
  }
  sort?: string
}
