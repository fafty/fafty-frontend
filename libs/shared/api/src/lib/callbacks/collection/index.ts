import api from '../../index'
import {
  PutCollectionParamsType,
  PutCollectionResponseType,
  GetCollectionAssetsBySlugResponseType,
  GetCollectionAssetsBySlugParamsType,
  GetCollectionResponseType,
  GetCollectionParamsType
} from '@fafty/shared/types'

const getCollection = async (
  params?: GetCollectionParamsType
): Promise<GetCollectionResponseType> => {
  const { data } = await api.get(`/collection/${params?.slug}`)

  return data
}

const getCollectionAssetsBySlug = async (
  params?: GetCollectionAssetsBySlugParamsType
): Promise<GetCollectionAssetsBySlugResponseType> => {
  const { data } = await api.get(`/collection/${params?.slug}/assets`)

  return data
}

const putCollection = async (
  params?: PutCollectionParamsType
): Promise<PutCollectionResponseType> => {
  const { data } = await api.put(`/collection/${params?.slug}`, {
    collection: params?.collection
  })

  return data
}

export { getCollection, getCollectionAssetsBySlug, putCollection }
