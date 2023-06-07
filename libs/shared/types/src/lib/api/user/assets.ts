import { ApiResponseGeneric, PaginateWrapperType } from '../../common'
import { AssetType } from '../../asset'

export type GetUserAssetsResponseType = PaginateWrapperType &
  ApiResponseGeneric<AssetType[]>

export type AssetsUserFilterStateType = {
  visibility?: string[]
  restrictions?: string[]
  blockchain?: string[]
  price?: { lg?: string; ge?: string }
  type?: string[]
}

export type GetUserFilterPaginateType = {
  filters?: AssetsUserFilterStateType
  limit: number
  offset: number
}

export type GetUserAssetsParamsType = {
  address: string
  params?: GetUserFilterPaginateType
}
