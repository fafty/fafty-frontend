import api from '../../index'
import {
  AssetInfoResponseProps,
  AssetOwnersResponseProps,
  AssetPutParamsProps,
  GetAssetResponseProps,
} from './types'

export const getAsset = async (
  slug?: string
): Promise<GetAssetResponseProps> => {
  const { data } = await api.get(`asset/${slug}`)

  return data
}

const getAssetOwners = async (
  slug?: string
): Promise<AssetOwnersResponseProps> => {
  const { data } = await api.get(`/asset/${slug}/owners`)

  return data
}

const getAssetInfo = async (slug?: string): Promise<AssetInfoResponseProps> => {
  const { data } = await api.get(`/asset/${slug}/info`)

  return data
}

export const putAsset = async (
  params?: AssetPutParamsProps
): Promise<GetAssetResponseProps> => {
  const { data } = await api.put(`/asset/${params?.slug}`, {
    asset: params?.asset,
  })

  return data
}

export { getAssetOwners, getAssetInfo }
