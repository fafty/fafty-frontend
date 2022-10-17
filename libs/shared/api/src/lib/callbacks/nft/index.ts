import api from '../../index';
import {
  NftInfoResponseProps,
  NftOwnersResponseProps,
  NftPutParams,
  NftResponseProps,
} from './types';

export const getNft = async (slug?: string): Promise<NftResponseProps> => {
  const { data } = await api.get(`nft/${slug}`);

  return data;
};

const getNftOwners = async (slug?: string): Promise<NftOwnersResponseProps> => {
  const { data } = await api.get(`/nft/${slug}/owners`);

  return data;
};

const getNftInfo = async (slug?: string): Promise<NftInfoResponseProps> => {
  const { data } = await api.get(`/nft/${slug}/info`);

  return data;
};

export const putNft = async (
  params?: NftPutParams
): Promise<NftResponseProps> => {
  const { data } = await api.put(`/nft/${params?.slug}`, { nft: params?.nft });

  return data;
};

export { getNftOwners, getNftInfo };
