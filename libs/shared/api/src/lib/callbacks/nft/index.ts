import api from '../../index';
import { NftInfoResponseProps, NftOwnersResponseProps } from './types';

const getNftOwners = async (slug?: string): Promise<NftOwnersResponseProps> => {
  const { data } = await api.get(`/nft/${slug}/owners`);

  return data;
};

const getNftInfo = async (slug?: string): Promise<NftInfoResponseProps> => {
  const { data } = await api.get(`/nft/${slug}/info`);

  return data;
};

export { getNftOwners, getNftInfo };