import api from '../../index'
import {
  GetBundlesParamsType,
  GetBundlesResponseType
} from '@fafty/shared/types'

const getBundles = async (
  params?: GetBundlesParamsType
): Promise<GetBundlesResponseType> => {
  const { data } = await api.get('/bundles', { params })

  return data
}

export default getBundles
