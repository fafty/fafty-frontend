import api from '../../../index'
import {
  GetUserAssetsParamsType,
  GetUserAssetsResponseType
} from '@fafty/shared/types'

const getUserAssets = async (
  props?: GetUserAssetsParamsType
): Promise<GetUserAssetsResponseType> => {
  const { data } = await api.get(`/user/${props?.address}/assets`, {
    params: props?.params
  })

  return data
}

export default getUserAssets
