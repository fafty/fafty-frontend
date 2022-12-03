import { AssetProps } from '../../asset/types'

type PaginateProps = {
  count: number
  limit: number
  offset: number
}

export type GetUserAssetsResponseProps = {
  paginate: PaginateProps
  records: AssetProps[]
}

type AssetsUserFilterStateType = {
  filters: {
    visibility?: string[]
    restrictions?: string[]
    blockchain?: string[]
    price?: { ge: string; le: string }
    type?: string[]
  }
}

export type GetUserAssetsParamsProps = AssetsUserFilterStateType & {
  limit: number
  offset: number
}

export type GetUserAssetsCallbackProps = {
  address: string
  params?: GetUserAssetsParamsProps
}
