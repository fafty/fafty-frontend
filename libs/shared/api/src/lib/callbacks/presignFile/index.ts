import api from '../../index'
import {
  GetPresignFileCallbackType,
  GetPresignFileResponseType
} from '@fafty/shared/types'

const getPresignFile = async (
  props?: GetPresignFileCallbackType
): Promise<GetPresignFileResponseType> => {
  const endpoint = props?.endpoint || '/assets/presign'

  const { data } = await api.post(endpoint, props?.params)

  return data
}

export default getPresignFile
