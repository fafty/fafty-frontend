import api from '../../../index'
import { GetUserAssetsCallbackProps, GetUserAssetsResponseProps } from './types'

const getUserAssets = async (
  props?: GetUserAssetsCallbackProps
): Promise<GetUserAssetsResponseProps> => {
  const { data } = await api.get(`/user/${props?.address}/assets`, {
    params: props?.params
  })

  return data
}

export default getUserAssets
