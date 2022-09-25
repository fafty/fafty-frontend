import api from '../../index';
import { NftsParams, NftsResponse } from './types';

export const getNfts = async (params?: NftsParams): Promise<NftsResponse> => {
  const { data } = await api.get(`/nfts`, { params });

  return data;
};
