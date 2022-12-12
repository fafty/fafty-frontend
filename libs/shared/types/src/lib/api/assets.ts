import {
  ApiResponseGeneric,
  BillingTypeValue,
  PaginateWrapperType
} from '../common'
import { AssetType } from '../asset'

export type GetAssetsResponseType = PaginateWrapperType &
  ApiResponseGeneric<AssetType[]>

export type GetAssetsFiltersParamsType = {
  currency?: string
  price?: {
    lg?: number | string
    ge?: number | string
  }
  billing_type?: BillingTypeValue
}

export type GetAssetsParamsType = {
  limit?: number
  offset?: number
  filters?: GetAssetsFiltersParamsType
  sort?: string
}
