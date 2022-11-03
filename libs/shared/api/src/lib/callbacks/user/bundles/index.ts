import api from '../../../index'
import {
  GetUserBundlesCallbackProps,
  GetUserBundlesResponseProps,
} from './types'

const getUserBundles = async (
  props?: GetUserBundlesCallbackProps
): Promise<GetUserBundlesResponseProps> => {
  const { data } = await api.get(`/user/${props?.address}/bundles`, {
    params: props?.params,
  })

  return data
}

export default getUserBundles
