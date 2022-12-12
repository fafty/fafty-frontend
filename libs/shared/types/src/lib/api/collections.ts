import { ApiResponseGeneric, PaginateWrapperType } from '../common'
import { CollectionType } from '../collection'

export type GetCollectionsResponseType = PaginateWrapperType &
  ApiResponseGeneric<CollectionType[]>

export type GetCollectionsFiltersParamsType = {
  blockchain?: string
}

export type GetCollectionsParamsType = {
  limit?: number
  offset?: number
  filters?: GetCollectionsFiltersParamsType
  sort?: string
}
