import api from '../../index'
import {
  GetBundleParamsType,
  GetBundleResponseType,
  PutBundleParamsType,
  PutBundleResponseType,
  GetBundleAssetsBySlugResponseType,
  GetBundleAssetsBySlugParamsType
} from '@fafty/shared/types'

const getBundle = async (
  params?: GetBundleParamsType
): Promise<GetBundleResponseType> => {
  const { data } = await api.get(`/bundle/${params?.slug}`)

  return data
}

const getBundleAssetsBySlug = async (
  params?: GetBundleAssetsBySlugParamsType
): Promise<GetBundleAssetsBySlugResponseType> => {
  const { data } = await api.get(`/bundle/${params?.slug}/assets`)

  return data
}

const putBundle = async (
  params?: PutBundleParamsType
): Promise<PutBundleResponseType> => {
  const { data } = await api.put(`/bundle/${params?.slug}`, {
    bundle: params?.bundle
  })

  return data
}
export { getBundle, getBundleAssetsBySlug, putBundle }
