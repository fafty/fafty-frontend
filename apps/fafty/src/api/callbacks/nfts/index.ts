import api from '../../index';
import { GetNftResponse } from './types';

export const getNfts = async ({
  offset,
  limit,
}: {
  limit: number;
  offset: number;
}): Promise<GetNftResponse> => {
  const { data } = await api.get('/nfts', { params: { offset, limit } });

  return data;
};
