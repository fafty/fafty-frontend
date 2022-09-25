import api from '../../index';
import {
  GetCollectionParams,
  GetCollectionResponse,
  GetCollectionsResponse,
} from './types';

export const getCollections = async ({
  offset,
  limit,
}: {
  limit: number;
  offset: number;
}): Promise<GetCollectionsResponse> => {
  const { data } = await api.get('/collections', { params: { offset, limit } });

  return data;
};

export const getCollection = async (
  params?: GetCollectionParams
): Promise<GetCollectionResponse> => {
  const { data } = await api.get(`/collection/${params?.slug}`);

  return data;
};
