import api from '../../index';
import {
  GetCollectionNftsBySlugParams,
  GetCollectionNftsBySlugResponse,
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

export const getCollectionNftsBySlug = async (
  params?: GetCollectionNftsBySlugParams
): Promise<GetCollectionNftsBySlugResponse> => {
  const { data } = await api.get(`/collection/${params?.slug}/nfts`);

  return data;
};
