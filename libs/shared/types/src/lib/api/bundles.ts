import { ApiResponseGeneric, PaginateWrapperType } from '../common'
import { BundleType } from '../bundle'

export type GetBundlesResponseType = PaginateWrapperType &
  ApiResponseGeneric<BundleType[]>

export type GetBundlesParamsType = {
  limit?: number
  offset?: number
  filters?: {
    blockchain?: string
  }
  sort?: string
}
