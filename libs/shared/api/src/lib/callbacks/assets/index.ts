import api from '../../index';
import { GetAssetsParamsProps, GetAssetsResponseProps } from './types';

const getAssets = async (params?: GetAssetsParamsProps): Promise<GetAssetsResponseProps> => {
  const { data } = await api.get(`/assets`, { params });

  return data;
};

export default getAssets;