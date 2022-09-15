import api from '../../index';
import { GetCollectionResponse } from './types';

export const getCollections = async ({
  offset,
  limit,
}: {
  limit: number;
  offset: number;
}): Promise<GetCollectionResponse> => {
  const { data } = await api.get('/collections', { params: { offset, limit } });

  return data;
};
