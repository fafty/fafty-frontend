import api from '../../index';
import {
  GetCollectionNftsBySlugParamsProps,
  GetCollectionNftsBySlugResponseProps,
  GetCollectionParamsProps,
  GetCollectionResponseProps,
} from './types';

const getCollection = async (
  params?: GetCollectionParamsProps
): Promise<GetCollectionResponseProps> => {
  const { data } = await api.get(`/collection/${params?.slug}`);

  return data;
};

const getCollectionNftsBySlug = async (
  params?: GetCollectionNftsBySlugParamsProps
): Promise<GetCollectionNftsBySlugResponseProps> => {
  const { data } = await api.get(`/collection/${params?.slug}/nfts`);

  return data;
};
export { getCollection, getCollectionNftsBySlug };