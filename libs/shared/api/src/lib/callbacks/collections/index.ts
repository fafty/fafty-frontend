import api from '../../index'
import {
  GetCollectionsParamsType,
  GetCollectionsResponseType
} from '@fafty/shared/types'

const getCollections = async (
  params: GetCollectionsParamsType
): Promise<GetCollectionsResponseType> => {
  const { data } = await api.get('/collections', { params })

  return data
}

export default getCollections
