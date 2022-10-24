import api from '../../index';
import {
  GetCollectionAssetsBySlugParamsProps,
  GetCollectionAssetsBySlugResponseProps,
  GetCollectionParamsProps,
  GetCollectionResponseProps,
} from './types';

const getCollection = async (
  params?: GetCollectionParamsProps
): Promise<GetCollectionResponseProps> => {
  const { data } = await api.get(`/collection/${params?.slug}`);

  return data;
};

const getCollectionAssetsBySlug = async (
  params?: GetCollectionAssetsBySlugParamsProps
): Promise<GetCollectionAssetsBySlugResponseProps> => {
  const { data } = await api.get(`/collection/${params?.slug}/assets`);

  return data;
};
export { getCollection, getCollectionAssetsBySlug };