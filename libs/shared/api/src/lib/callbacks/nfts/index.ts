import api from '../../index';
import { GetNftsParamsProps, GetNftsResponseProps } from './types';

const getNfts = async (params?: GetNftsParamsProps): Promise<GetNftsResponseProps> => {
  const { data } = await api.get(`/nfts`, { params });

  return data;
};

export default getNfts;