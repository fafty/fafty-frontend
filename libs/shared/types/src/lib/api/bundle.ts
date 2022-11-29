import { BundleFormDataType } from '../forms'
import { BundleAssetsType, BundleType } from '../bundle'
import { ApiResponseGeneric } from '../common'

export type GetBundleResponseType = ApiResponseGeneric<BundleType>
export type PutBundleResponseType = ApiResponseGeneric<BundleType>
export type GetBundleAssetsBySlugResponseType =
  ApiResponseGeneric<BundleAssetsType>

export type PutBundleParamsType = {
  slug?: string
  bundle: BundleFormDataType
}

export type GetBundleParamsType = {
  slug: string
}

export type GetBundleAssetsBySlugParamsType = {
  slug: string
  limit: number
  offset: number
  filters?: {
    currency?: string
    price?: {
      lg?: number | string
      ge?: number | string
    }
  }
  sort?: string
}
