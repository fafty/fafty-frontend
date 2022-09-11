import api from '../../index';
import { InfoResponse, OwnersResponse } from './types';

export const getNftOwners = async (slug?: string): Promise<OwnersResponse> => {
  const { data } = await api.get(`/nft/${slug}/owners`);

  return data;
};

export const getNftInfo = async (slug?: string): Promise<InfoResponse> => {
  const { data } = await api.get(`/nft/${slug}/info`);

  return data;
};
