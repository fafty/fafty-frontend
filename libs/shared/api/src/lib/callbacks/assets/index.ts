import api from '../../index'
import { GetAssetsResponseType, GetAssetsParamsType } from '@fafty/shared/types'

const getAssets = async (
  params?: GetAssetsParamsType
): Promise<GetAssetsResponseType> => {
  const { data } = await api.get('/assets', { params })

  return data
}

export default getAssets
