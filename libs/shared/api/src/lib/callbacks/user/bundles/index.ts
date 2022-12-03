import api from '../../../index'
import {
  GetUserBundlesResponseType,
  GetUserBundlesParamsType
} from '@fafty/shared/types'

const getUserBundles = async (
  props?: GetUserBundlesParamsType
): Promise<GetUserBundlesResponseType> => {
  const { data } = await api.get(`/user/${props?.address}/bundles`, {
    params: props?.params
  })

  return data
}

export default getUserBundles
