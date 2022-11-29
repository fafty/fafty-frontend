import {
  ApiResponseGeneric,
  BillingTypeValue,
  PaginateWrapperType
} from '../../common'
import { CollectionType } from '../../collection'

export type GetUserCollectionsResponseType = PaginateWrapperType &
  ApiResponseGeneric<CollectionType[]>

export type GetUserCollectionsParamsType = {
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

export type GetUserCollectionsCallbackType = {
  address: string
  params?: GetUserCollectionsParamsType
}
