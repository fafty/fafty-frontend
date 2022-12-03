import {
  ApiResponseGeneric,
  BillingTypeValue,
  PaginateWrapperType
} from '../../common'
import { BundleType } from '../../bundle'

export type GetUserBundlesResponseType = PaginateWrapperType &
  ApiResponseGeneric<BundleType[]>

export type GetUserBundlesFiltersParamsType = {
  limit: number
  offset: number
  filters?: {
    currency?: string
    price?: {
      lg?: number | string
      ge?: number | string
    }
    billing_type?: BillingTypeValue
  }
  sort?: string
}

export type GetUserBundlesParamsType = {
  address: string
  params?: GetUserBundlesFiltersParamsType
}
