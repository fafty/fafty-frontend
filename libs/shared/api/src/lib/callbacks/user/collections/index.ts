import api from '../../../index'
import {
  GetUserCollectionsResponseType,
  GetUserCollectionsCallbackType
} from '@fafty/shared/types'

const getUserCollections = async (
  props?: GetUserCollectionsCallbackType
): Promise<GetUserCollectionsResponseType> => {
  const { data } = await api.get(`/user/${props?.address}/collections`, {
    params: props?.params
  })

  return data
}

export default getUserCollections
