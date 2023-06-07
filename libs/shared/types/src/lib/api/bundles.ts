import { ApiResponseGeneric, PaginateWrapperType } from '../common'
import { BundleType } from '../bundle'

export type GetBundlesResponseType = PaginateWrapperType &
  ApiResponseGeneric<BundleType[]>

export type GetBundlesFiltersParamsType = {
  blockchain?: string
  cached_assets_count?: {
    ge?: number
    le?: number
  }
  price?: {
    ge?: number
    le?: number
  }
}

export type GetBundlesParamsType = {
  limit?: number
  offset?: number
  filters?: GetBundlesFiltersParamsType
  sort?: string
}
