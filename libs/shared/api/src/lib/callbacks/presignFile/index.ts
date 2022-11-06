import api from '../../index'
import { GetPresignFileCallbackProps, GetPresignFileResponseProps } from './types'

const getPresignFile = async (
  props?: GetPresignFileCallbackProps
): Promise<GetPresignFileResponseProps> => {
  const endpoint = props?.endpoint || '/assets/presign'
  
  const { data } = await api.post(endpoint, props?.params )

  return data
}

export default getPresignFile