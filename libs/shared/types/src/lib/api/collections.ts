import { ApiResponseGeneric, PaginateWrapperType } from '../common'
import { CollectionType } from '../collection'

export type GetCollectionsResponseType = PaginateWrapperType &
  ApiResponseGeneric<CollectionType[]>

export type GetCollectionsParamsType = {
  limit?: number
  offset?: number
  filters?: {
    blockchain?: string
  }
  sort?: string
}
