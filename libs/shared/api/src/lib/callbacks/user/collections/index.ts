import api from '../../../index'
import {
  GetUserCollectionsCallbackProps,
  GetUserCollectionsResponseProps,
} from './types'

const getUserCollections = async (
  props?: GetUserCollectionsCallbackProps
): Promise<GetUserCollectionsResponseProps> => {
  const { data } = await api.get(`/user/${props?.address}/collections`, {
    params: props?.params,
  })

  return data
}

export default getUserCollections
