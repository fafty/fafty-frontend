import api from '../../index';
import {
  AssetInfoResponseProps,
  AssetOwnersResponseProps,
  AssetPutParams,
  AssetResponseProps,
} from './types';

export const getAsset = async (slug?: string): Promise<AssetResponseProps> => {
  const { data } = await api.get(`asset/${slug}`);

  return data;
};

const getAssetOwners = async (slug?: string): Promise<AssetOwnersResponseProps> => {
  const { data } = await api.get(`/asset/${slug}/owners`);

  return data;
};

const getAssetInfo = async (slug?: string): Promise<AssetInfoResponseProps> => {
  const { data } = await api.get(`/asset/${slug}/info`);

  return data;
};

export const putAsset = async (
  params?: AssetPutParams
): Promise<AssetResponseProps> => {
  const { data } = await api.put(`/asset/${params?.slug}`, { asset: params?.asset });

  return data;
};

export { getAssetOwners, getAssetInfo };
