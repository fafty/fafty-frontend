import api from '../../index';
import { GetNftsParams, GetNftsResponse } from './types';

export const getNfts = async (params?: GetNftsParams): Promise<GetNftsResponse> => {
  const { data } = await api.get(`/nfts`, { params });

  return data;
};
