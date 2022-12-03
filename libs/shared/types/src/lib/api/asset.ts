import { ApiResponseGeneric } from '../index'
import { AssetCreatorType, AssetType } from '../asset'
import { AssetFormDataType } from '../forms'

export type AssetOwnersApiType = {
  token: string
  slug: string
  creator: AssetCreatorType
  //@todo change owners to model
  owners: string[]
}

export type AssetInfoType = Pick<
  AssetType,
  | 'blockchain'
  | 'contract_address'
  | 'slug'
  | 'token'
  | 'token_id'
  | 'token_standard'
>

export type GetAssetResponseType = ApiResponseGeneric<AssetType>
export type AssetInfoResponseType = ApiResponseGeneric<AssetInfoType>
export type AssetPutResponseType = ApiResponseGeneric<AssetType>
export type AssetOwnersResponseType = ApiResponseGeneric<AssetOwnersApiType>

export type AssetPutParamsType = {
  slug?: string
  asset: AssetFormDataType
}
