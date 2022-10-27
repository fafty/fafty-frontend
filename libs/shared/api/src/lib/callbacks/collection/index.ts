import api from '../../index';
import {
  PutCollectionParamsProps,
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

const putCollection = async (
  params?: PutCollectionParamsProps
): Promise<GetCollectionResponseProps> => {
  const { data } = await api.put(`/collection/${params?.slug}`, { collection: params?.collection });

  return data;
};

export { getCollection, getCollectionAssetsBySlug, putCollection };