import api from '../../index'
import {
  PutBundleParamsProps,
  GetBundleAssetsBySlugParamsProps,
  GetBundleAssetsBySlugResponseProps,
  GetBundleParamsProps,
  GetBundleResponseProps
} from './types'

const getBundle = async (
  params?: GetBundleParamsProps
): Promise<GetBundleResponseProps> => {
  const { data } = await api.get(`/bundle/${params?.slug}`)

  return data
}

const getBundleAssetsBySlug = async (
  params?: GetBundleAssetsBySlugParamsProps
): Promise<GetBundleAssetsBySlugResponseProps> => {
  const { data } = await api.get(`/bundle/${params?.slug}/assets`)

  return data
}

const putBundle = async (
  params?: PutBundleParamsProps
): Promise<GetBundleResponseProps> => {
  const { data } = await api.put(`/bundle/${params?.slug}`, {
    bundle: params?.bundle
  })

  return data
}
export { getBundle, getBundleAssetsBySlug, putBundle }
