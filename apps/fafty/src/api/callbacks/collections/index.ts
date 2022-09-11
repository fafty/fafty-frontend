import api from '../../index';
import { GetCollectionResponse } from './types';

export const getCollections = async (): Promise<GetCollectionResponse> => {
  const { data } = await api.get('/collections');

  return data;
};
