import api from '../../index'
import {
  AssetInfoResponseType,
  GetAssetResponseType,
  AssetPutParamsType,
  AssetOwnersResponseType,
  AssetPutResponseType
} from '@fafty/shared/types'

export const getAsset = async (
  slug?: string
): Promise<GetAssetResponseType> => {
  const { data } = await api.get(`asset/${slug}`)

  return data
}

const getAssetOwners = async (
  slug?: string
): Promise<AssetOwnersResponseType> => {
  const { data } = await api.get(`/asset/${slug}/owners`)

  return data
}

const getAssetInfo = async (slug?: string): Promise<AssetInfoResponseType> => {
  const { data } = await api.get(`/asset/${slug}/info`)

  return data
}

export const putAsset = async (
  params?: AssetPutParamsType
): Promise<AssetPutResponseType> => {
  const { data } = await api.put(`/asset/${params?.slug}`, {
    asset: params?.asset
  })

  return data
}

export { getAssetOwners, getAssetInfo }
